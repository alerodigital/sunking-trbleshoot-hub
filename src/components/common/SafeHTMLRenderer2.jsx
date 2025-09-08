// components/common/SafeHTMLRenderer.jsx
import React, { useState, useEffect, useMemo } from 'react';

// Inline DOMPurify configuration and fallback sanitizer
const ALLOWED_TAGS = [
  'p', 'br', 'b', 'strong', 'i', 'em', 'u', 'ul', 'ol', 'li', 
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre',
  'span', 'div', 'a', 'table', 'thead', 'tbody', 'tr', 'th', 'td'
];

const ALLOWED_ATTR = ['class', 'style', 'href', 'target', 'rel', 'colspan', 'rowspan'];

// Enhanced fallback sanitizer
const fallbackSanitize = (html) => {
  if (!html) return '';
  
  // Create a temporary container
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Remove script tags and event handlers
  const scripts = tempDiv.querySelectorAll('script, style, iframe, frame, frameset, object, embed, form, input, button, textarea, select, option');
  scripts.forEach(el => el.remove());
  
  // Remove all elements not in allowed tags
  const allElements = tempDiv.querySelectorAll('*');
  allElements.forEach(el => {
    if (!ALLOWED_TAGS.includes(el.tagName.toLowerCase())) {
      el.replaceWith(...el.childNodes);
    } else {
      // Remove disallowed attributes
      Array.from(el.attributes).forEach(attr => {
        if (!ALLOWED_ATTR.includes(attr.name.toLowerCase()) || 
            attr.name.toLowerCase().startsWith('on')) {
          el.removeAttribute(attr.name);
        }
      });
      
      // Sanitize href attributes
      if (el.tagName.toLowerCase() === 'a' && el.hasAttribute('href')) {
        const href = el.getAttribute('href');
        if (href && (
            href.toLowerCase().startsWith('javascript:') ||
            href.toLowerCase().startsWith('vbscript:') ||
            href.toLowerCase().startsWith('data:') && !href.toLowerCase().startsWith('data:text/plain')
        )) {
          el.removeAttribute('href');
        }
      }
    }
  });
  
  return tempDiv.innerHTML;
};

const SafeHTMLRenderer = ({ html, className = '', loadingComponent }) => {
  const [isPurifyLoaded, setIsPurifyLoaded] = useState(false);
  const [DOMPurify, setDOMPurify] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // Check if DOMPurify is already available globally
    if (window.DOMPurify) {
      setDOMPurify(window.DOMPurify);
      setIsPurifyLoaded(true);
      return;
    }

    // Check if script is already loading or loaded
    const existingScript = document.querySelector('script[src*="dompurify"]');
    if (existingScript) {
      const checkInterval = setInterval(() => {
        if (window.DOMPurify) {
          setDOMPurify(window.DOMPurify);
          setIsPurifyLoaded(true);
          clearInterval(checkInterval);
        }
      }, 100);
      
      return () => clearInterval(checkInterval);
    }

    // Load DOMPurify from CDN with correct integrity hash
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.5/purify.min.js';
    // Correct SHA-512 integrity hash for DOMPurify 3.0.5
    script.integrity = 'sha512-KqUc2WMPF/gxte9xVjVE4TIt1LMUTidO3BrcItFg0Ro24I7pGNzgcXdnWdezNY+8T0/JEmdC79MuwYn+8UdOqw==';
    script.crossOrigin = 'anonymous';
    script.referrerPolicy = 'no-referrer';
    script.async = true;
    
    script.onload = () => {
      if (window.DOMPurify) {
        setDOMPurify(window.DOMPurify);
        setIsPurifyLoaded(true);
      } else {
        setLoadError(true);
        setIsPurifyLoaded(true);
      }
    };
    
    script.onerror = () => {
      setLoadError(true);
      setIsPurifyLoaded(true);
    };
    
    document.head.appendChild(script);

    return () => {
      // Cleanup not needed as we want to keep DOMPurify loaded
    };
  }, []);

  // Memoize sanitized HTML to avoid unnecessary re-sanitization
  const sanitizedHTML = useMemo(() => {
    if (!html) return '';

    let cleanHTML = html;
    
    if (isPurifyLoaded) {
      if (DOMPurify) {
        // Use DOMPurify with configuration
        cleanHTML = DOMPurify.sanitize(html, {
          ALLOWED_TAGS,
          ALLOWED_ATTR,
          ADD_ATTR: ['target', 'rel'],
          ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
          FORBID_TAGS: ['style', 'script', 'iframe', 'frame', 'frameset', 'object', 'embed'],
          FORBID_ATTR: ['style', 'onerror', 'onload', 'onclick', 'onmouseover', 'onmouseout']
        });
      } else {
        // Use enhanced fallback sanitizer
        cleanHTML = fallbackSanitize(html);
      }
    }
    
    return cleanHTML;
  }, [html, isPurifyLoaded, DOMPurify]);

  // Loading component
  if (!isPurifyLoaded) {
    return loadingComponent || (
      <div className={`safe-html-loading ${className}`}>
        <div className="animate-pulse space-y-2">
          <div className="bg-gray-200 h-4 rounded w-3/4"></div>
          <div className="bg-gray-200 h-4 rounded"></div>
          <div className="bg-gray-200 h-4 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!html) return null;

  return (
    <div className={`safe-html-content ${className}`}>
      <div 
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        className="rich-text-content"
      />
      
      {/* Inline styles for consistent rendering */}
      <style jsx>{`
        .safe-html-content {
          line-height: 1.6;
          color: #374151;
          word-wrap: break-word;
        }
        
        .safe-html-content h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 1.5rem 0 0.75rem 0;
          color: #1F2937;
          line-height: 1.25;
        }
        
        .safe-html-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.25rem 0 0.625rem 0;
          color: #1F2937;
          line-height: 1.3;
        }
        
        .safe-html-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1rem 0 0.5rem 0;
          color: #1F2937;
          line-height: 1.4;
        }
        
        .safe-html-content h4, .safe-html-content h5, .safe-html-content h6 {
          font-weight: 600;
          margin: 0.875rem 0 0.4375rem 0;
          color: #1F2937;
        }
        
        .safe-html-content h4 { font-size: 1.125rem; }
        .safe-html-content h5 { font-size: 1rem; }
        .safe-html-content h6 { 
          font-size: 0.875rem; 
          text-transform: uppercase;
        }
        
        .safe-html-content p {
          margin: 0.75rem 0;
          line-height: 1.6;
        }
        
        .safe-html-content ul, .safe-html-content ol {
          margin: 0.75rem 0;
          padding-left: 1.5rem;
        }
        
        .safe-html-content ul { list-style-type: disc; }
        .safe-html-content ol { list-style-type: decimal; }
        
        .safe-html-content li {
          margin: 0.5rem 0;
          line-height: 1.5;
        }
        
        .safe-html-content ul ul { list-style-type: circle; }
        .safe-html-content ul ul ul { list-style-type: square; }
        
        .safe-html-content blockquote {
          border-left: 4px solid #E5E7EB;
          margin: 1rem 0;
          padding: 0.75rem 1rem;
          font-style: italic;
          color: #6B7280;
          background: #F9FAFB;
          border-radius: 0 0.375rem 0.375rem 0;
        }
        
        .safe-html-content blockquote p { margin: 0; }
        
        .safe-html-content strong, .safe-html-content b { font-weight: 600; }
        .safe-html-content em, .safe-html-content i { font-style: italic; }
        .safe-html-content u { text-decoration: underline; }
        .safe-html-content strike, .safe-html-content s { text-decoration: line-through; }
        
        .safe-html-content code {
          background: #F3F4F6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.875em;
        }
        
        .safe-html-content pre {
          background: #1F2937;
          color: #F9FAFB;
          padding: 1rem;
          border-radius: 0.375rem;
          margin: 1rem 0;
          overflow-x: auto;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.875rem;
          line-height: 1.5;
        }
        
        .safe-html-content pre code {
          background: none;
          padding: 0;
          border-radius: 0;
          color: inherit;
          font-size: inherit;
        }
        
        .safe-html-content a {
          color: #3B82F6;
          text-decoration: underline;
          transition: color 0.2s ease;
        }
        
        .safe-html-content a:hover { color: #2563EB; }
        
        /* Table styles */
        .safe-html-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        
        .safe-html-content th, .safe-html-content td {
          border: 1px solid #E5E7EB;
          padding: 0.5rem;
          text-align: left;
        }
        
        .safe-html-content th {
          background-color: #F9FAFB;
          font-weight: 600;
        }
        
        .safe-html-content tr:nth-child(even) {
          background-color: #F9FAFB;
        }
        
        /* Empty paragraph handling */
        .safe-html-content p:empty {
          display: none;
        }
        
        /* Ensure proper spacing */
        .safe-html-content > *:first-child { margin-top: 0; }
        .safe-html-content > *:last-child { margin-bottom: 0; }
        
        /* Responsive design */
        @media (max-width: 768px) {
          .safe-html-content h1 { font-size: 1.75rem; }
          .safe-html-content h2 { font-size: 1.375rem; }
          .safe-html-content h3 { font-size: 1.125rem; }
          
          .safe-html-content table {
            display: block;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default SafeHTMLRenderer;
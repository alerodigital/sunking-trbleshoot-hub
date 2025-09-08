// components/common/SafeHTMLRenderer.jsx
import React, { useState, useEffect } from 'react';

const SafeHTMLRenderer = ({ html, className = '' }) => {
  const [isPurifyLoaded, setIsPurifyLoaded] = useState(false);
  const [DOMPurify, setDOMPurify] = useState(null);

  useEffect(() => {
    // Load DOMPurify from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.5/purify.min.js';
    script.integrity = 'sha512-KqUc2WbRcMyeshNkbA1l2l5+GB//XIIXXYct5g9NM0jwO0Q+CpOo+J0ZkL6pFNmGkO9L7uQ8oWO3uQGoVgUaww==';
    script.crossOrigin = 'anonymous';
    script.referrerPolicy = 'no-referrer';
    
    script.onload = () => {
      setDOMPurify(window.DOMPurify);
      setIsPurifyLoaded(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load DOMPurify from CDN');
      setIsPurifyLoaded(true); // Still set to true to render without purification
    };
    
    document.head.appendChild(script);

    return () => {
      // Clean up
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  if (!html) return null;

  // If DOMPurify is not loaded yet, show a loading state
  if (!isPurifyLoaded) {
    return (
      <div className={`safe-html-content ${className}`}>
        <div className="animate-pulse bg-gray-200 h-4 rounded mb-2"></div>
        <div className="animate-pulse bg-gray-200 h-4 rounded w-3/4"></div>
      </div>
    );
  }

  // Sanitize HTML
  let sanitizedHTML = html;
  if (DOMPurify) {
    sanitizedHTML = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'p', 'br', 'b', 'strong', 'i', 'em', 'u', 'ul', 'ol', 'li', 
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre',
        'span', 'div', 'a'
      ],
      ALLOWED_ATTR: ['class', 'style', 'href', 'target', 'rel'],
      ADD_ATTR: ['target'],
      ADD_TAGS: ['iframe'], // Allow iframes if needed
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
    });
  } else {
    // Enhanced basic sanitization as fallback
    sanitizedHTML = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/on\w+='[^']*'/g, '')
      .replace(/javascript:/gi, '')
      .replace(/expression\(/gi, '')
      .replace(/vbscript:/gi, '');
  }

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
        
        .safe-html-content h4 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0.875rem 0 0.4375rem 0;
          color: #1F2937;
        }
        
        .safe-html-content h5 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0.75rem 0 0.375rem 0;
          color: #1F2937;
        }
        
        .safe-html-content h6 {
          font-size: 0.875rem;
          font-weight: 600;
          margin: 0.625rem 0 0.3125rem 0;
          color: #1F2937;
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
        
        .safe-html-content ul {
          list-style-type: disc;
        }
        
        .safe-html-content ol {
          list-style-type: decimal;
        }
        
        .safe-html-content li {
          margin: 0.5rem 0;
          line-height: 1.5;
        }
        
        .safe-html-content ul ul, .safe-html-content ol ol {
          margin: 0.25rem 0;
        }
        
        .safe-html-content ul ul {
          list-style-type: circle;
        }
        
        .safe-html-content ul ul ul {
          list-style-type: square;
        }
        
        .safe-html-content blockquote {
          border-left: 4px solid #E5E7EB;
          margin: 1rem 0;
          padding: 0.75rem 1rem;
          font-style: italic;
          color: #6B7280;
          background: #F9FAFB;
          border-radius: 0 0.375rem 0.375rem 0;
        }
        
        .safe-html-content blockquote p {
          margin: 0;
        }
        
        .safe-html-content strong, .safe-html-content b {
          font-weight: 600;
        }
        
        .safe-html-content em, .safe-html-content i {
          font-style: italic;
        }
        
        .safe-html-content u {
          text-decoration: underline;
        }
        
        .safe-html-content strike, .safe-html-content s {
          text-decoration: line-through;
        }
        
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
        
        .safe-html-content a:hover {
          color: #2563EB;
        }
        
        .safe-html-content br {
          content: '';
          display: block;
          margin: 0.5rem 0;
        }
        
        /* Nested list styling */
        .safe-html-content ul ul, .safe-html-content ol ol,
        .safe-html-content ul ol, .safe-html-content ol ul {
          margin-top: 0.25rem;
          margin-bottom: 0.25rem;
        }
        
        /* Empty paragraph handling */
        .safe-html-content p:empty {
          display: none;
        }
        
        /* Ensure proper spacing between elements */
        .safe-html-content > *:first-child {
          margin-top: 0;
        }
        
        .safe-html-content > *:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default SafeHTMLRenderer;
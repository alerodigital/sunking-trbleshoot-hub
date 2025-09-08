// components/common/SafeHTMLRenderer.jsx
import React, { useMemo, useState, useEffect } from 'react';

const SafeHTMLRenderer = ({ html, className = '' }) => {
  const [DOMPurify, setDOMPurify] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const loadDOMPurify = async () => {
      try {
        // Dynamically import DOMPurify to avoid optimization issues
        const DOMPurifyModule = await import('dompurify');
        if (isMounted) {
          setDOMPurify(DOMPurifyModule.default);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load DOMPurify:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDOMPurify();

    return () => {
      isMounted = false;
    };
  }, []);

  const sanitizedHTML = useMemo(() => {
    if (!html) return '';
    
    if (DOMPurify) {
      // Use DOMPurify with configuration
      return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          'p', 'br', 'b', 'strong', 'i', 'em', 'u', 'ul', 'ol', 'li', 
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre',
          'span', 'div', 'a', 'table', 'thead', 'tbody', 'tr', 'th', 'td'
        ],
        ALLOWED_ATTR: ['class', 'style', 'href', 'target', 'rel', 'colspan', 'rowspan'],
        ADD_ATTR: ['target', 'rel'],
        ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
      });
    }
    
    // Fallback sanitization if DOMPurify is not available
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/on\w+='[^']*'/g, '')
      .replace(/javascript:/gi, '')
      .replace(/expression\(/gi, '')
      .replace(/vbscript:/gi, '');
  }, [html, DOMPurify]);

  if (isLoading) {
    return (
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
      <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
    </div>
  );
};

export default SafeHTMLRenderer;
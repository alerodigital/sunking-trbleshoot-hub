import React from 'react';

const QuillContent = ({ html, className = '' }) => {
  // Apply Quill's CSS classes directly
  return (
    <div className={`ql-snow ${className}`}>
      <div 
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: html }}
        style={{
          fontFamily: '"Helvetica Neue", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#374151',
          padding: 0
        }}
      />
    </div>
  );
};

// Add some basic styles to match Quill's appearance
const quillStyles = `
.ql-snow .ql-editor {
  font-family: '"Helvetica Neue", "Helvetica", "Arial", sans-serif';
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
}

.ql-snow .ql-editor h1 {
  font-size: 2em;
  font-weight: bold;
  margin: 0.67em 0;
}

.ql-snow .ql-editor h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0.83em 0;
}

.ql-snow .ql-editor h3 {
  font-size: 1.17em;
  font-weight: bold;
  margin: 1em 0;
}

.ql-snow .ql-editor p {
  margin: 1em 0;
}

.ql-snow .ql-editor ul, 
.ql-snow .ql-editor ol {
  padding-left: 1.5em;
  margin: 1em 0;
}

.ql-snow .ql-editor li {
  margin: 0.5em 0;
}

.ql-snow .ql-editor blockquote {
  border-left: 4px solid #ccc;
  margin: 1em 0;
  padding-left: 1em;
}

.ql-snow .ql-editor pre {
  background-color: #f6f8fa;
  border-radius: 3px;
  padding: 12px;
  overflow: auto;
}

.ql-snow .ql-editor code {
  background-color: #f6f8fa;
  border-radius: 3px;
  padding: 2px 4px;
}

.ql-snow .ql-editor a {
  color: #0366d6;
  text-decoration: underline;
}

.ql-snow .ql-editor strong {
  font-weight: bold;
}

.ql-snow .ql-editor em {
  font-style: italic;
}

.ql-snow .ql-editor u {
  text-decoration: underline;
}

.ql-snow .ql-editor s {
  text-decoration: line-through;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = quillStyles;
  document.head.append(style);
}

export default QuillContent;
// RichTextEditor.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

const RichTextEditor = ({ value = '', onChange, placeholder = '' }) => {
  const [activeFormats, setActiveFormats] = useState(new Set());
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const editorRef = useRef(null);

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // Format text command
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    updateActiveFormats();
    handleContentChange();
  };

  // Update active format states
  const updateActiveFormats = () => {
    const formats = new Set();
    try {
      if (document.queryCommandState('bold')) formats.add('bold');
      if (document.queryCommandState('italic')) formats.add('italic');
      if (document.queryCommandState('underline')) formats.add('underline');
      if (document.queryCommandState('strikeThrough')) formats.add('strikethrough');
      if (document.queryCommandState('insertUnorderedList')) formats.add('bullet');
      if (document.queryCommandState('insertOrderedList')) formats.add('number');
      if (document.queryCommandState('justifyLeft')) formats.add('left');
      if (document.queryCommandState('justifyCenter')) formats.add('center');
      if (document.queryCommandState('justifyRight')) formats.add('right');
    } catch {
      // Handle browsers that don't support some commands
      console.warn('Some format commands not supported');
    }
    setActiveFormats(formats);
  };

  // Handle content changes
  const handleContentChange = () => {
    if (editorRef.current && onChange) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  };

  // Handle input events
  const handleInput = () => {
    handleContentChange();
    updateActiveFormats();
  };

  // Handle key events
  const handleKeyDown = (e) => {
    // Handle Tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
      handleContentChange();
    }
    
    // Handle Enter key for proper paragraph breaks
    if (e.key === 'Enter' && !e.shiftKey) {
      document.execCommand('formatBlock', false, 'p');
    }
  };

  // Handle selection changes
  const handleSelectionChange = () => {
    updateActiveFormats();
  };


  // Format dropdown options
  const formatOptions = [
    { label: 'Normal text', command: 'formatBlock', value: 'p' },
    { label: 'Heading 1', command: 'formatBlock', value: 'h1' },
    { label: 'Heading 2', command: 'formatBlock', value: 'h2' },
    { label: 'Heading 3', command: 'formatBlock', value: 'h3' },
  ];

  // Toolbar button component
  const ToolbarButton = ({ command, icon, isActive = false, value = null, title, onClick }) => (
    <button
      type="button"
      className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
        isActive 
          ? 'bg-gray-200 text-gray-800 shadow-sm' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
      }`}
      onClick={onClick || (() => formatText(command, value))}
      title={title}
      onMouseDown={(e) => e.preventDefault()} // Prevent editor losing focus
    >
      <Icon icon={icon} className="w-4 h-4" />
    </button>
  );

  // Format dropdown component
  const FormatDropdown = () => (
    <div className="relative">
      <button
        type="button"
        className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
        onClick={() => setShowFormatDropdown(!showFormatDropdown)}
        onMouseDown={(e) => e.preventDefault()}
      >
        Normal text
        <Icon icon="mdi:chevron-down" className="w-4 h-4" />
      </button>
      
      {showFormatDropdown && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[140px]">
          {formatOptions.map((option, index) => (
            <button
              key={index}
              type="button"
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
              onClick={() => {
                formatText(option.command, option.value);
                setShowFormatDropdown(false);
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="rich-text-editor border border-gray-300 rounded-md overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-2 bg-gray-50 flex items-center gap-2">
        {/* Undo/Redo */}
        <ToolbarButton
          command="undo"
          icon="mdi:undo"
          title="Undo (Ctrl+Z)"
        />
        <ToolbarButton
          command="redo"
          icon="mdi:redo"
          title="Redo (Ctrl+Y)"
        />
        
        {/* Format Dropdown */}
        <FormatDropdown />
        
        {/* Text Formatting */}
        <ToolbarButton
          command="bold"
          icon="mdi:format-bold"
          isActive={activeFormats.has('bold')}
          title="Bold (Ctrl+B)"
        />
        <ToolbarButton
          command="italic"
          icon="mdi:format-italic"
          isActive={activeFormats.has('italic')}
          title="Italic (Ctrl+I)"
        />
        <ToolbarButton
          command="underline"
          icon="mdi:format-underline"
          isActive={activeFormats.has('underline')}
          title="Underline (Ctrl+U)"
        />
        <ToolbarButton
          command="strikeThrough"
          icon="mdi:format-strikethrough"
          isActive={activeFormats.has('strikethrough')}
          title="Strikethrough"
        />
        
        {/* Lists */}
        <ToolbarButton
          command="insertUnorderedList"
          icon="mdi:format-list-bulleted"
          isActive={activeFormats.has('ul')}
          title="Bullet List"
        />
        <ToolbarButton
          command="insertOrderedList"
          icon="mdi:format-list-numbered"
          isActive={activeFormats.has('ol')}
          title="Numbered List"
        />
      </div>
      
      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        className="p-4 min-h-[300px] outline-none text-gray-900 text-sm leading-relaxed focus:ring-0"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onMouseUp={handleSelectionChange}
        onKeyUp={handleSelectionChange}
        onFocus={updateActiveFormats}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
      
      {/* Click outside to close dropdown */}
      {showFormatDropdown && (
        <div 
          className="fixed inset-0 z-0"
          onClick={() => setShowFormatDropdown(false)}
        />
      )}
      
      {/* Custom Styles */}
      <style jsx>{`
        .rich-text-editor [contentEditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          pointer-events: none;
          position: absolute;
          z-index: 1;
        }
        
        [contentEditable]:focus {
          outline: none;
        }
        
        [contentEditable] h1 {
          font-size: 1.875rem;
          font-weight: 700;
          line-height: 1.25;
          margin: 1rem 0 0.5rem 0;
        }
        
        [contentEditable] h2 {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.3;
          margin: 0.875rem 0 0.5rem 0;
        }
        
        [contentEditable] h3 {
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.4;
          margin: 0.75rem 0 0.5rem 0;
        }
        
        [contentEditable] p {
          margin: 0.5rem 0;
          line-height: 1.6;
        }
        
        [contentEditable] ul, [contentEditable] ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }
        
        [contentEditable] li {
          margin: 0.25rem 0;
          line-height: 1.5;
        }
        
        [contentEditable] a {
          color: #3B82F6;
          text-decoration: underline;
        }
        
        [contentEditable] a:hover {
          color: #2563EB;
        }
        
        [contentEditable] blockquote {
          border-left: 4px solid #E5E7EB;
          margin: 1rem 0;
          padding-left: 1rem;
          font-style: italic;
          color: #6B7280;
        }
        
        [contentEditable] strong {
          font-weight: 600;
        }
        
        [contentEditable] em {
          font-style: italic;
        }
        
        [contentEditable] u {
          text-decoration: underline;
        }
        
        [contentEditable] strike {
          text-decoration: line-through;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
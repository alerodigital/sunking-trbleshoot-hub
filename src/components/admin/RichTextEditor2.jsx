// RichTextEditor.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';

const RichTextEditor2 = ({ value = '', onChange, placeholder = '' }) => {
  const [activeFormats, setActiveFormats] = useState(new Set());
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [currentFormat, setCurrentFormat] = useState('p');
  const editorRef = useRef(null);
  const formatDropdownRef = useRef(null);

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
      updateActiveFormats();
    }
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formatDropdownRef.current && !formatDropdownRef.current.contains(event.target)) {
        setShowFormatDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format text using modern approach
  const formatText = useCallback((command, value = null) => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const documentFragment = range.extractContents();

    if (command === 'formatBlock') {
      const blockElement = document.createElement(value);
      blockElement.appendChild(documentFragment);
      range.insertNode(blockElement);
    } else if (command === 'insertUnorderedList' || command === 'insertOrderedList') {
      const listType = command === 'insertUnorderedList' ? 'ul' : 'ol';
      const listElement = document.createElement(listType);
      
      // Create list items for each paragraph or text node
      if (documentFragment.childNodes.length > 0) {
        Array.from(documentFragment.childNodes).forEach(node => {
          if (node.nodeType === Node.TEXT_NODE || node.nodeName === 'SPAN') {
            const li = document.createElement('li');
            li.appendChild(node.cloneNode(true));
            listElement.appendChild(li);
          } else if (node.nodeName === 'P' || node.nodeName === 'DIV') {
            const li = document.createElement('li');
            Array.from(node.childNodes).forEach(child => li.appendChild(child.cloneNode(true)));
            listElement.appendChild(li);
          } else if (node.nodeName === 'LI') {
            listElement.appendChild(node.cloneNode(true));
          }
        });
      } else {
        // Create empty list item if no content
        const li = document.createElement('li');
        listElement.appendChild(li);
      }
      
      range.insertNode(listElement);
    } else {
      // For inline formatting
      const span = document.createElement('span');
      if (command === 'bold') span.style.fontWeight = 'bold';
      if (command === 'italic') span.style.fontStyle = 'italic';
      if (command === 'underline') span.style.textDecoration = 'underline';
      if (command === 'strikeThrough') span.style.textDecoration = 'line-through';
      
      span.appendChild(documentFragment);
      range.insertNode(span);
    }

    // Restore selection
    selection.removeAllRanges();
    selection.addRange(range);
    
    editorRef.current.focus();
    updateActiveFormats();
    handleContentChange();
  }, []);

  // Update active format states
  const updateActiveFormats = useCallback(() => {
    const formats = new Set();
    const selection = window.getSelection();
    
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0);
      const startContainer = range.startContainer;
      
      // Check if we're in a list
      let parent = startContainer.parentElement;
      while (parent && parent !== editorRef.current) {
        if (parent.tagName === 'UL') formats.add('bullet');
        if (parent.tagName === 'OL') formats.add('number');
        if (parent.tagName === 'LI') {
          if (parent.parentElement.tagName === 'UL') formats.add('bullet');
          if (parent.parentElement.tagName === 'OL') formats.add('number');
        }
        parent = parent.parentElement;
      }

      // Check text formatting
      const hasStyle = (style, value) => {
        const element = startContainer.nodeType === Node.TEXT_NODE ? 
          startContainer.parentElement : startContainer;
        return window.getComputedStyle(element)[style] === value;
      };

      if (hasStyle('fontWeight', 'bold') || hasStyle('fontWeight', '700')) formats.add('bold');
      if (hasStyle('fontStyle', 'italic')) formats.add('italic');
      if (hasStyle('textDecoration', 'underline')) formats.add('underline');
      if (hasStyle('textDecoration', 'line-through')) formats.add('strikethrough');

      // Check block format
      const blockElement = startContainer.nodeType === Node.TEXT_NODE ? 
        startContainer.parentElement : startContainer;
      if (blockElement.tagName === 'H1') setCurrentFormat('h1');
      else if (blockElement.tagName === 'H2') setCurrentFormat('h2');
      else if (blockElement.tagName === 'H3') setCurrentFormat('h3');
      else setCurrentFormat('p');
    }

    setActiveFormats(formats);
  }, []);

  // Handle content changes
  const handleContentChange = useCallback(() => {
    if (editorRef.current && onChange) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  }, [onChange]);

  // Handle input events
  const handleInput = useCallback(() => {
    handleContentChange();
    updateActiveFormats();
  }, [handleContentChange, updateActiveFormats]);

  // Handle key events
  const handleKeyDown = useCallback((e) => {
    // Handle Tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const selection = window.getSelection();
      if (selection.rangeCount) {
        const range = selection.getRangeAt(0);
        const tabNode = document.createTextNode('\u00A0\u00A0\u00A0\u00A0');
        range.insertNode(tabNode);
        range.setStartAfter(tabNode);
        range.setEndAfter(tabNode);
        selection.removeAllRanges();
        selection.addRange(range);
        handleContentChange();
      }
    }
    
    // Handle Enter key for proper list behavior
    if (e.key === 'Enter' && !e.shiftKey) {
      const selection = window.getSelection();
      if (selection.rangeCount) {
        const range = selection.getRangeAt(0);
        const startContainer = range.startContainer;
        
        // Check if we're in a list item
        let listItem = startContainer;
        while (listItem && listItem !== editorRef.current && listItem.tagName !== 'LI') {
          listItem = listItem.parentElement;
        }
        
        if (listItem && listItem.tagName === 'LI') {
          e.preventDefault();
          const newListItem = document.createElement('li');
          listItem.parentElement.insertBefore(newListItem, listItem.nextSibling);
          
          // Move selection to new list item
          const newRange = document.createRange();
          newRange.setStart(newListItem, 0);
          newRange.setEnd(newListItem, 0);
          selection.removeAllRanges();
          selection.addRange(newRange);
          
          handleContentChange();
          return;
        }
      }
      
      // Regular enter behavior
      document.execCommand('formatBlock', false, 'p');
    }
  }, [handleContentChange]);

  // Format dropdown options
  const formatOptions = [
    { label: 'Paragraph', command: 'formatBlock', value: 'p' },
    { label: 'Heading 1', command: 'formatBlock', value: 'h1' },
    { label: 'Heading 2', command: 'formatBlock', value: 'h2' },
    { label: 'Heading 3', command: 'formatBlock', value: 'h3' },
    { label: 'Blockquote', command: 'formatBlock', value: 'blockquote' },
  ];

  // Get current format label
  const getCurrentFormatLabel = () => {
    const format = formatOptions.find(opt => opt.value === currentFormat);
    return format ? format.label : 'Paragraph';
  };

  // Toolbar button component
  const ToolbarButton = ({ command, icon, isActive = false, value = null, title, onClick }) => (
    <button
      type="button"
      className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
        isActive 
          ? 'bg-blue-100 text-blue-600 shadow-sm border border-blue-200' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-transparent'
      }`}
      onClick={onClick || (() => formatText(command, value))}
      title={title}
      onMouseDown={(e) => e.preventDefault()}
    >
      <Icon icon={icon} className="w-4 h-4" />
    </button>
  );

  // Format dropdown component
  const FormatDropdown = () => (
    <div className="relative" ref={formatDropdownRef}>
      <button
        type="button"
        className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors border border-gray-300"
        onClick={() => setShowFormatDropdown(!showFormatDropdown)}
        onMouseDown={(e) => e.preventDefault()}
      >
        {getCurrentFormatLabel()}
        <Icon icon="mdi:chevron-down" className="w-4 h-4" />
      </button>
      
      {showFormatDropdown && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 min-w-[140px]">
          {formatOptions.map((option, index) => (
            <button
              key={index}
              type="button"
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md ${
                currentFormat === option.value 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700'
              }`}
              onClick={() => {
                formatText(option.command, option.value);
                setCurrentFormat(option.value);
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
      <div className="border-b border-gray-200 p-2 bg-gray-50 flex items-center gap-2 flex-wrap">
        {/* Format Dropdown */}
        <FormatDropdown />
        
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        
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
        
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        
        {/* Lists */}
        <ToolbarButton
          command="insertUnorderedList"
          icon="mdi:format-list-bulleted"
          isActive={activeFormats.has('bullet')}
          title="Bullet List"
        />
        <ToolbarButton
          command="insertOrderedList"
          icon="mdi:format-list-numbered"
          isActive={activeFormats.has('number')}
          title="Numbered List"
        />

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Alignment */}
        <ToolbarButton
          command="justifyLeft"
          icon="mdi:format-align-left"
          title="Align Left"
        />
        <ToolbarButton
          command="justifyCenter"
          icon="mdi:format-align-center"
          title="Align Center"
        />
        <ToolbarButton
          command="justifyRight"
          icon="mdi:format-align-right"
          title="Align Right"
        />
      </div>
      
      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        className="p-4 min-h-[300px] outline-none text-gray-900 text-base leading-relaxed focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onMouseUp={updateActiveFormats}
        onKeyUp={updateActiveFormats}
        onFocus={updateActiveFormats}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
      
      {/* Custom Styles */}
      <style jsx>{`
        .rich-text-editor [contentEditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          pointer-events: none;
          position: absolute;
        }
        
        .rich-text-editor [contentEditable] {
          position: relative;
          min-height: 300px;
        }
        
        .rich-text-editor h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 1rem 0 0.5rem 0;
          color: #1F2937;
        }
        
        .rich-text-editor h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0.875rem 0 0.5rem 0;
          color: #1F2937;
        }
        
        .rich-text-editor h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0.75rem 0 0.5rem 0;
          color: #1F2937;
        }
        
        .rich-text-editor p {
          margin: 0.75rem 0;
          line-height: 1.6;
          color: #374151;
        }
        
        .rich-text-editor ul, .rich-text-editor ol {
          margin: 0.75rem 0;
          padding-left: 1.5rem;
        }
        
        .rich-text-editor ul {
          list-style-type: disc;
        }
        
        .rich-text-editor ol {
          list-style-type: decimal;
        }
        
        .rich-text-editor li {
          margin: 0.5rem 0;
          line-height: 1.5;
          color: #374151;
        }
        
        .rich-text-editor blockquote {
          border-left: 4px solid #E5E7EB;
          margin: 1rem 0;
          padding-left: 1rem;
          font-style: italic;
          color: #6B7280;
          background: #F9FAFB;
          padding: 1rem;
          border-radius: 0 0.375rem 0.375rem 0;
        }
        
        .rich-text-editor strong {
          font-weight: 600;
        }
        
        .rich-text-editor em {
          font-style: italic;
        }
        
        .rich-text-editor u {
          text-decoration: underline;
        }
        
        .rich-text-editor strike {
          text-decoration: line-through;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor2;
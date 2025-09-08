import React, { useRef, useEffect, useState, useCallback } from 'react';

const QuillEditor = ({ value, onChange, placeholder, disabled = false }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  

 

  // Initialize Quill
  const initQuill = useCallback(async () => {
    if (isLoading || isLoaded || quillRef.current) return;
    
    setIsLoading(true);
    try {
      // Dynamically load Quill and its CSS
      const QuillModule = await import('quill');
      const Quill = QuillModule.default;
      
      // Load CSS separately
      await import('quill/dist/quill.core.css');
      await import('quill/dist/quill.snow.css');

     
      
      if (editorRef.current && !quillRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: 'snow',
          placeholder: placeholder,
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, 4, false] }],
              [{ 'color': [] }, { 'background': [] }],    
              [{ size: [ 'small', 'Medium', 'large', 'huge' ]}],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
            //   ['link', 'image'],
            //   ['link'],
              ['clean']
            ]
          }
        });

        // Set initial value if provided
        if (value) {
          quillRef.current.root.innerHTML = value;
        }

        // Handle text changes
        quillRef.current.on('text-change', () => {
          if (onChange && quillRef.current) {
            const htmlContent = quillRef.current.root.innerHTML;
            onChange(htmlContent);
          }
        });
        
        // Enable/disable based on prop
        quillRef.current.enable(!disabled);
        
        setIsLoaded(true);
      }
    } catch (error) {
      console.error('Error loading Quill editor:', error);
    } finally {
      setIsLoading(false);
    }
  }, [value, onChange, placeholder, disabled, isLoading, isLoaded]);

  // Initialize when component mounts
  useEffect(() => {
    initQuill();
  }, [initQuill]);

  // Handle value changes from parent
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      // Preserve cursor position
      const selection = quillRef.current.getSelection();
      quillRef.current.root.innerHTML = value;
      if (selection) {
        quillRef.current.setSelection(selection);
      }
    }
  }, [value]);

  // Handle disabled state changes
  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.enable(!disabled);
    }
  }, [disabled]);

  return (
    <div className="w-full">
      <div ref={editorRef} className="min-h-[300px]"></div>
      {isLoading && (
        <div className="min-h-[300px] flex items-center justify-center border rounded-lg bg-gray-50">
          <p className="text-gray-500">Loading editor...</p>
        </div>
      )}
    </div>
  );
};

export default QuillEditor;
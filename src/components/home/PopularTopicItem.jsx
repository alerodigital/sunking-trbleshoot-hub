import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SafeHTMLRenderer from '../common/SafeHTMLRenderer';
import { useSubtopicViews } from '../../hooks/useSubtopicViews'; // Import the view tracking hook

const PopularTopicItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);

  const { mutate: recordView } = useSubtopicViews(); // Get the view recording function

  // Check if this FAQ has already been viewed in this session
  useEffect(() => {
    const viewedItems = JSON.parse(localStorage.getItem('viewedFAQs') || '[]');
    setHasBeenViewed(viewedItems.includes(faq.id));
  }, [faq.id]);

  const handleClick = () => {
    // Record view only if it hasn't been viewed in this session and is being opened
    if (!isOpen && faq.id && !hasBeenViewed) {
      recordView(faq.id);

      // Mark as viewed in local storage
      const viewedItems = JSON.parse(localStorage.getItem('viewedFAQs') || '[]');
      if (!viewedItems.includes(faq.id)) {
        viewedItems.push(faq.id);
        localStorage.setItem('viewedFAQs', JSON.stringify(viewedItems));
        setHasBeenViewed(true);
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-800">
      <button
        className="w-full flex justify-between items-center py-3 sm:py-4 px-2 sm:px-0 text-left hover:bg-gray-50 cursor-pointer"
        onClick={handleClick} // Use the new handler
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-medium text-gray-900 pr-4">{faq.title}</span>

        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "minus" : "plus"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Icon
              icon={isOpen ? "mdi:minus" : "mdi:plus"}
              className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
            />
          </motion.div>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-3 sm:pb-4 pr-2 sm:pr-8 px-2 sm:px-0">
              {/* <p className="text-sm sm:text-base text-black">{faq.answer}</p> */}
              {faq.content && (
                <div className="prose max-w-none">
                  <SafeHTMLRenderer html={faq.content} />
                </div>
              )}
              {/* Form Link Buttons */}
              {
                faq.formLinks && faq.formLinks.length > 0 && (
                  <div className="flex items-center gap-5 mt-8 mb-4">
                    {
                      faq?.formLinks.map((form, index)=>(
                        <a key={index} href={form.url} rel="noopener noreferrer" target="_blank"   className='px-6 py-2 cursor-pointer border-none rounded-full bg-[#F6D852] w-[147px] font-semibold text-center'>
{form.name}
                        </a>
                      ))
                    }
                  
                </div>
                )
              }
            
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PopularTopicItem;
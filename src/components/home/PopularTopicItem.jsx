import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';

const PopularTopicItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800">
      <button
        className="w-full flex justify-between items-center py-3 sm:py-4 px-2 sm:px-0 text-left hover:bg-gray-50 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-medium text-gray-900 pr-4">{faq.question}</span>
        
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
              <p className="text-sm sm:text-base text-black">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PopularTopicItem;
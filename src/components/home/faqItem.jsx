import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FaqItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-4">
      {/* FAQ Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left text-gray-900 font-bold"
      >
        <span>{faq.question}</span>
        <motion.span
          initial={false}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400 font-light text-2xl"
        >
          +
        </motion.span>
      </button>

      {/* FAQ Answer (animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-gray-600 font-normal"
          >
            {faq.answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FaqItem;

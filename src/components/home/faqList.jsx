import React, { useState } from 'react';

// FaqItem Component (now local to this file)
const FaqItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      {/* FAQ button */}
      <button
        className="w-full flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
      {/* FAQ answer content */}
      <div
        className={`overflow-hidden transition-max-h duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <p className="mt-4 text-gray-600 pr-6">{faq.answer}</p>
      </div>
    </div>
  );
};

const FaqList = ({ faqs }) => {
  return (
    <div className="space-y-0 divide-y divide-gray-200">
      {/* Check if any FAQs exist */}
      {faqs.length > 0 ? (
        faqs.map((faq) => <FaqItem key={faq.id} faq={faq} />)
      ) : (
        <p className="text-gray-500 text-center py-4">No FAQs found for this topic.</p>
      )}
    </div>
  );
};

export default FaqList;

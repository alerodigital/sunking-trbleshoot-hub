import React, { useState } from 'react';
import FaqList from './faqList.jsx';

// Mock data to match UI
const topics = [
  { id: '1', name: 'Satellite Issues and Activation' },
  { id: '2', name: 'General Questions' },
  { id: '3', name: 'Account Management' },
];

const allFaqs = [
  { id: '1', topicId: '1', question: 'StarTimes Activation Steps', answer: 'You can search or browse topics...' },
  { id: '2', topicId: '1', question: 'Satellite Escalation Procedure', answer: 'You can search or browse topics...' },
  { id: '3', topicId: '1', question: 'Card Replacements', answer: 'Go to the login page and click "Forgot password"...' },
  { id: '4', topicId: '2', question: 'My app is not loading.', answer: 'Try clearing your cache and cookies, or reinstalling the app...' },
  { id: '5', topicId: '3', question: 'The search bar is not working.', answer: 'Check your network connection and try again...' },
];

const TopicSection = () => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [faqs] = useState(allFaqs);

  const filteredFaqs = selectedTopic
    ? faqs.filter(faq => faq.topicId === selectedTopic)
    : allFaqs;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Section Header */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Topic
      </h2>
      
      {/* Topic Dropdown */}
      <div className="w-full max-w-sm mx-auto mb-8">
        <label htmlFor="topics" className="sr-only">Select a topic</label>
        <select
          id="topics"
          name="topics"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm py-3 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
        >
          <option value="">Select a Topic</option>
          {topics.map(topic => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
      </div>

      {/* FAQs List */}
      <h3 className="text-xl font-bold mb-4 text-center">Popular Topics</h3>
      <FaqList faqs={filteredFaqs} />
    </div>
  );
};

export default TopicSection;

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { topics, faqs, popularTopics } from '../../data/topicsData.js';
import PopularTopicItem from './PopularTopicItem.jsx'; // Corrected import path

const TopicSection = () => {
  const [selectedTopic, setSelectedTopic] = useState('');

  // Show popular topics by default, filter by selected topic when dropdown changes
  const displayedFaqs = selectedTopic === '' 
    ? faqs.filter(faq => popularTopics.some(popular => popular.title === faq.question))
    : faqs.filter(faq => faq.topicId === selectedTopic);

  // Get section title based on selection
  const sectionTitle = selectedTopic === ''
    ? 'Popular Topics'
    : topics.find(topic => topic.id === selectedTopic)?.name || 'Popular Topics';

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 lg:gap-8">
      {/* Section Header */}
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
        Topic
      </h2>
      
      {/* Topic Dropdown */}
      <div className="relative w-full max-w-lg">
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="w-full h-12 pt-2 pr-12 pb-2 pl-4 border-[1.5px] border-gray-300 rounded-[5px] bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer text-sm sm:text-base"
        >
          <option value="">Select a Topic</option>
          {topics.map(topic => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        <Icon 
          icon="mdi:chevron-down" 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-900 pointer-events-none"
        />
      </div>

      {/* Topics Section */}
      <div className="flex-1">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">{sectionTitle}</h3>
        <div className="space-y-0">
          {displayedFaqs.map((faq) => (
            <PopularTopicItem key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicSection;
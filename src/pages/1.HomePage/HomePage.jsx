import React, { useState } from 'react';
import HeroSection from '../../components/home/heroSection.jsx';
import TopicSection from '../../components/home/topicSection.jsx';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [selectedFAQId, setSelectedFAQId] = useState('');

  const handleSearchSelect = (term) => {
    setSearchTerm(term);
    // Clear topic selection when searching
    if (term) {
      setSelectedTopicId('');
    }
  };

  const handleTopicSelect = (topicId, faqId = '') => {
    setSelectedTopicId(topicId);
    setSelectedFAQId(faqId);
    // Clear search when selecting a topic
    setSearchTerm('');
  };

  return (
    <div className='overflow-hidden'>
      {/* Hero Section */}
      <HeroSection  onSearchSelect={handleSearchSelect}
        onTopicSelect={handleTopicSelect}  className="bg-[#F5F3F0]" />


      {/* Topics and FAQs Section */}
      <TopicSection className="bg-white " searchTerm={searchTerm}
        selectedTopicId={selectedTopicId}
        selectedFAQId={selectedFAQId} />
    </div>
  );
};

export default HomePage;

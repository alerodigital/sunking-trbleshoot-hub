import React from 'react';
import HeroSection from '../../components/home/heroSection.jsx';
import TopicSection from '../../components/home/topicSection.jsx';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection className="bg-[#F5F3F0]" />

      {/* Topics and FAQs Section */}
      <TopicSection className="bg-white" />
    </div>
  );
};

export default HomePage;

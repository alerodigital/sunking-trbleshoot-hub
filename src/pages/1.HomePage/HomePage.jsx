import React from 'react';
import HeroSection from '../../components/home/heroSection.jsx';
import TopicSection from '../../components/home/topicSection.jsx';

const HomePage = () => {
  return (
    <div className="bg-[#F5F3F0]">
      {/* Hero Section */}
      <HeroSection />

      {/* Topics and FAQs Section */}
      <TopicSection />
    </div>
  );
};

export default HomePage;

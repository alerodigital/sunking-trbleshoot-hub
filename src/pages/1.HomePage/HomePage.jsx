import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../../components/homepage/HeroSection.jsx';
import TopicSection from '../../components/homepage/TopicSection.jsx';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white"
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Topics and FAQs Section */}
      <TopicSection />
    </motion.div>
  );
};

export default HomePage;

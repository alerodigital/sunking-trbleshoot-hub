import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import PopularTopicItem from './PopularTopicItem.jsx'; // Corrected import path
import { useHomepageTopics, usePopularTopics, useTopicFAQs, usePopularSubtopics } from '../../hooks/useHomepageData';

const TopicSection = ({ searchTerm = '', selectedTopicId = '', selectedFAQId = '' }) => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [internalSelectedTopic, setInternalSelectedTopic] = useState('');
  const [highlightedFAQ, setHighlightedFAQ] = useState('');

   // Fetch data from Firebase
   const { data: topics = [], isLoading: topicsLoading } = useHomepageTopics();
   const { data: popularTopics = [], isLoading: popularLoading } = usePopularTopics();
   const { data: topicFAQs = [], isLoading: faqsLoading } = useTopicFAQs(internalSelectedTopic);

   const { data: popularSubtopics = [], isLoading: subtopicsLoading } = usePopularSubtopics(10);

   // Sync with external selected topic
  useEffect(() => {
    if (selectedTopicId) {
      setInternalSelectedTopic(selectedTopicId);
    }
  }, [selectedTopicId]);


  // Sync with external selected FAQ
  useEffect(() => {
    if (selectedFAQId) {
      setHighlightedFAQ(selectedFAQId);
      // Scroll to the highlighted FAQ after a short delay
      setTimeout(() => {
        const element = document.getElementById(selectedFAQId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  }, [selectedFAQId]);

  // Filter FAQs based on search term if provided
  const filterFAQsBySearch = (faqsArray) => {
    if (!searchTerm) return faqsArray;
    
    const searchLower = searchTerm.toLowerCase();
    return faqsArray.filter(faq => 
      faq.title.toLowerCase().includes(searchLower) ||
      faq.content.toLowerCase().includes(searchLower)
    );
  };

  // Show popular topics by default, filter by selected topic when dropdown changes
  // const displayedFAQs = internalSelectedTopic === '' 
  //   ? filterFAQsBySearch(popularTopics.flatMap(topic => 
  //       topicFAQs.filter(faq => faq.topicId === topic.id).slice(0, 3) // Show top 3 from each popular topic
  //     ))
  //   : filterFAQsBySearch(topicFAQs);

   // Get FAQs to display based on current selection
   const getDisplayedFAQs = () => {
    // If a topic is selected, show FAQs from that topic
    if (internalSelectedTopic) {
      return filterFAQsBySearch(topicFAQs);
    }
    
    // If no topic is selected but we have a search term, show popular subtopics matching the search
    // if (searchTerm) {
    //   return getPopularSubtopicsToDisplay();
    // }
    
    // If no topic selected and no search term, show popular subtopics
    return getPopularSubtopicsToDisplay();
  };

    // Get popular subtopics to show when no topic is selected
  const getPopularSubtopicsToDisplay = () => {
    let subtopicsToShow = popularSubtopics;

    // console.log("subtopicsToShow", subtopicsToShow)
    
    // Filter by search term if provided
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      subtopicsToShow = popularSubtopics.filter(subtopic => 
        subtopic.title.toLowerCase().includes(searchLower) ||
        (subtopic.content && subtopic.content.toLowerCase().includes(searchLower))
      );
    }
    
    return subtopicsToShow;
  };


  // Get section title based on selection
  const getSectionTitle = () => {
    if (searchTerm) {
      return `Search Results for "${searchTerm}"`;
    }
    if (internalSelectedTopic === '') {
      return 'Popular Topics';
    }
    return topics.find(topic => topic.id === internalSelectedTopic)?.topic || 'Topic';
  };

  const displayedFAQs = getDisplayedFAQs();
    const isLoading = topicsLoading || popularLoading || faqsLoading;

    const handleTopicChange = (topicId) => {
      setInternalSelectedTopic(topicId);
      setHighlightedFAQ(''); // Reset highlighted FAQ when topic changes
    };

    if (isLoading) {
      return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 lg:gap-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-12 bg-gray-200 rounded w-full max-w-lg mb-8"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      );
    }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 lg:gap-8">
      {/* Section Header */}
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
        Topic
      </h2>
      
      {/* Topic Dropdown */}
      <div className="relative w-full max-w-lg">
        <select
          value={internalSelectedTopic}
          onChange={(e) => handleTopicChange(e.target.value)}
          className="w-full h-12 pt-2 pr-12 pb-2 pl-4 border-[1.5px] border-gray-300 rounded-[5px] bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer text-sm sm:text-base"
        >
          <option value="">Select a Topic</option>
          {topics.map(topic => (
            <option key={topic.id} value={topic.id}>
              {topic.topic}
            </option>
          ))}
        </select>
        <Icon 
          icon="mdi:chevron-down" 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-900 pointer-events-none"
        />
      </div>

         {/* Clear filters button when search or topic is active */}
         {(searchTerm || internalSelectedTopic) && (
        <div className="flex items-center">
          <button
            onClick={() => {
              setInternalSelectedTopic('');
              setHighlightedFAQ('');
            }}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <Icon icon="mdi:close" className="w-4 h-4 mr-1" />
            Clear filters
          </button>
        </div>
      )}

      {/* Topics Section */}
      <div className="flex-1">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">{getSectionTitle()}
        {displayedFAQs.length > 0 && ` (${displayedFAQs.length})`}</h3>

        {/* <div className="space-y-0">
          {displayedFAQs.map((faq) => (
            <PopularTopicItem key={faq.id} faq={faq} />
          ))}
        </div> */}

             {displayedFAQs.length === 0 && !internalSelectedTopic && (
          <div className="text-center py-12 text-gray-500">
            <Icon icon="mdi:file-document-outline" className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No content available for this topic yet.</p>
          </div>
        )} 
        {
          displayedFAQs.length !== 0
        && (
          <div className="space-y-0">
            {displayedFAQs.map((faq) => (
              <PopularTopicItem key={faq.id} faq={faq} />
            ))}
          </div>
        )}

       
      </div>
    </div>
  );
};

export default TopicSection;
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useSearchFAQs, useHomepageTopics } from '../../hooks/useHomepageData';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ onSearchSelect, onTopicSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();

  const { data: searchResults = [], isLoading: isSearching } = useSearchFAQs(searchTerm);
  const { data: topics = [] } = useHomepageTopics();

  const handleSearch = (e) => {
    e.preventDefault();
    // if (searchTerm.trim() && searchResults.length > 0) {
    //   // You could navigate to a search results page or show results in a dropdown
    //   setShowSearchResults(true);
    // }
    if (searchTerm.trim()) {
      // If there are search results, select the first topic from results
      if (searchResults.length > 0) {
        const firstResult = searchResults[0];
        onTopicSelect(firstResult.topicId);
        setShowSearchResults(false);
      }
      onSearchSelect(searchTerm);
    }
  };

  const handleSearchItemClick = (faq) => {
    // Select the topic and FAQ
    onTopicSelect(faq.topicId, faq.id);
    setSearchTerm(faq.title); // Set the search term to the FAQ title
    setShowSearchResults(false);
  };

  const handleSearchBlur = () => {
    // Delay hiding results to allow clicks on items
    setTimeout(() => setShowSearchResults(false), 200);
  };

  const handleSearchFocus = () => {
    if (searchTerm.length > 2) {
      setShowSearchResults(true);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 2) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setShowSearchResults(false);
    onSearchSelect('');
    onTopicSelect('');
  };

  return (
    <>
      <div className="relative pt-8 sm:pt-12 md:pt-16 lg:pt-24 pb-6 sm:pb-8 md:pb-12 lg:pb-16  bg-[#F7F5F0]">
        {/* Container for the sun graphic */}
        <div className="absolute top-0 right-0 h-full w-full max-w-lg lg:max-w-2xl transform translate-x-1/2 -translate-y-1/2 opacity-100 hidden lg:block !z-2">
          <img
            src="/sun.png"
            alt="Sun rays graphic"
            className="w-full h-full object-contain z-2"
          />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 ">
         
          {/* Search Bar - Responsive Width and Height */}
          <div className="mx-auto w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl md:pb-6 relative">
               {/* Header Text - Responsive Typography */}
          <h1 className="font-urbanist font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight text-gray-900 mb-6 sm:mb-8 md:mb-10 tracking-normal">
            Troubleshooting hub
          </h1>
            <form onSubmit={handleSearch} className="relative">
            <div className="relative flex items-center bg-white rounded-md border border-gray-300 shadow-sm h-12 sm:h-14 md:h-16 gap-2">
              <div className="absolute left-3 sm:left-4 flex items-center pointer-events-none">
                <Icon icon="material-symbols:search" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                id="search"
                name="search"
                type="text"
                className="flex-1 rounded-full border-0 pl-10 sm:pl-12 pr-20 sm:pr-24 md:pr-32 bg-transparent placeholder-gray-500 focus:outline-none focus:ring-0 text-xs sm:text-sm h-full"
                placeholder="How can we help..."
                value={searchTerm}
                onChange={handleInputChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
              />
              {/* Clear button (X) when there's text */}
              {searchTerm && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-20 sm:right-24 md:right-32 h-8 sm:h-10 md:h-11 w-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
                  >
                    <Icon icon="mdi:close" className="w-4 h-4" />
                  </button>
                )}
              <button
                 type="submit"
                 disabled={isSearching}
                className="absolute right-1 sm:right-2 h-8 sm:h-10 md:h-11 px-3 sm:px-4 md:px-6 cursor-pointer rounded-full text-xs sm:text-sm font-medium text-black bg-[#F6D852] hover:bg-[#F0C040] focus:outline-none transition-colors duration-200"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>

              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  {searchResults.map((result) => 
                  {
                    const topic = topics.find(t => t.id === result.topicId);
                    return (
                    <div
                      key={result.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => handleSearchItemClick(result)}
                    >
                      <div className="font-medium text-sm text-gray-900">{result.title}</div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {result.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                      </div>
                    </div>
                  )})}
                </div>
              )}

                {/* No Results Message */}
              {showSearchResults && searchTerm.length > 2 && searchResults.length === 0 && !isSearching && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4">
                  <p className="text-sm text-gray-500">No results found for "{searchTerm}"</p>
                </div>
              )}
            </form>
           
          </div>
        </div>
      </div>

      {/* Orange Section - Responsive */}
      <div className="bg-[#F36744] py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl flex flex-col gap-3 sm:gap-3.5 text-start">
            <p className="font-urbanist font-normal text-lg sm:text-xl md:text-2xl leading-6 sm:leading-7 md:leading-8 text-black">
              This is a One-Stop Help Center that guides you to solve issues, keeping both the field and Service Desk efficient.
            </p>
            <p className="font-sans font-normal text-sm sm:text-base leading-6 sm:leading-7 md:leading-8 text-black">
              For more information, or if you have queries that aren't answered here, please{' '}
              <span className="font-sans font-normal text-sm sm:text-base leading-6 sm:leading-7 md:leading-8 underline decoration-solid cursor-pointer">contact us</span> for more details.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
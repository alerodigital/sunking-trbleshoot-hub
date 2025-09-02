import React, { useState } from 'react';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="relative pt-24 pb-32 overflow-hidden bg-[#F7F5F0]">
      {/* Container for the sun graphic */}
      <div className="absolute top-0 right-0 h-full w-full max-w-lg lg:max-w-2xl transform translate-x-1/2 -translate-y-1/2 opacity-100 hidden lg:block">
        <img
          src="/rays.png"
          alt="Abstract sun rays graphic"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header Text */}
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
          Troubleshooting hub
        </h1>
        
        {/* Search Bar */}
        <div className="mt-10 max-w-xl mx-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <label htmlFor="search" className="sr-only">Search</label>
          <input
            id="search"
            name="search"
            type="text"
            className="flex-grow w-full rounded-full border-2 border-gray-300 pl-4 pr-3 py-3 leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFDE4C] text-sm md:text-base"
            placeholder="How can we help..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            className="w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-[#FFDE4C] hover:bg-[#FFD32F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFDE4C]"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

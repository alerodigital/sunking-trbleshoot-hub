import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div className="relative pt-8 sm:pt-12 md:pt-16 lg:pt-24 pb-6 sm:pb-8 md:pb-12 lg:pb-16 overflow-hidden bg-[#F7F5F0]">
        {/* Container for the sun graphic */}
        <div className="absolute top-0 right-0 h-full w-full max-w-lg lg:max-w-2xl transform translate-x-1/2 -translate-y-1/2 opacity-100 hidden lg:block">
          <img
            src="/sun.png"
            alt="Sun rays graphic"
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Header Text - Responsive Typography */}
          <h1 className="font-urbanist font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight text-gray-900 mb-6 sm:mb-8 md:mb-10 tracking-normal">
            Troubleshooting hub
          </h1>
          
          {/* Search Bar - Responsive Width and Height */}
          <div className="mx-auto w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl md:pb-6">
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-1 sm:right-2 h-8 sm:h-10 md:h-11 px-3 sm:px-4 md:px-6 cursor-pointer rounded-full text-xs sm:text-sm font-medium text-black bg-[#F6D852] hover:bg-[#F0C040] focus:outline-none transition-colors duration-200"
              >
                Search
              </button>
            </div>
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
import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div className="relative pt-12 md:pt-24 pb-8 md:pb-16 overflow-hidden bg-[#F7F5F0]">
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
          {/* Header Text */}
          <h1 className="font-urbanist font-extrabold text-3xl sm:text-4xl md:text-56 leading-tight md:leading-53 text-gray-900 mb-6 md:mb-10 tracking-normal">
            Troubleshooting hub
          </h1>
          
          {/* Search Bar */}
          <div className="mx-auto w-full max-w-2xl md:w-700">
            <div className="relative flex items-center bg-white rounded-md border border-gray-300 shadow-sm h-12 md:h-60-custom gap-2">
              <div className="absolute left-3 md:left-4 flex items-center pointer-events-none">
                <Icon icon="material-symbols:search" className="h-4 md:h-5 w-4 md:w-5 text-gray-400" />
              </div>
              <input
                id="search"
                name="search"
                type="text"
                className="flex-1 rounded-full border-0 pl-10 md:pl-12 pr-24 md:pr-32 bg-transparent placeholder-gray-500 focus:outline-none focus:ring-0 text-sm h-12 md:h-60-custom"
                placeholder="How can we help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-1 md:right-2 w-20 md:w-101 h-8 md:h-42 py-1 md:py-2 px-3 md:px-6 rounded-full text-xs md:text-sm font-medium text-black bg-[#F6D852] hover:bg-[#F0C040] focus:outline-none transition-colors duration-200"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Orange Section */}
      <div className="bg-[#F36744] py-8 md:py-12 mt-8 md:mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="w-full max-w-3xl md:w-795 min-h-20 md:h-104 flex flex-col gap-2 md:gap-3.5 text-start">
            <p className="font-urbanist font-normal text-lg md:text-2xl leading-6 md:leading-[30px] text-black">
              This is a One-Stop Help Center that guides you to solve issues, keeping both the field and Service Desk efficient.
            </p>
            <p className="font-sans font-normal text-sm md:text-base leading-5 md:leading-[30px] text-black">
              For more information, or if you have queries that aren't answered here, please{' '}
              <span className="font-sans font-normal text-sm md:text-base leading-5 md:leading-[30px] underline decoration-solid">contact us</span> for more details.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#FFCE00] py-6">
      {/* Footer Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src="https://placehold.co/100x40/000000/FFFFFF?text=sun%20king" alt="Sun King Logo" className="h-10 w-auto" />
        </div>
        
        {/* Copyright */}
        <p className="text-sm text-black">
          &copy;2025 Sun King | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

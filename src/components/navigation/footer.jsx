import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-sun-yellow py-6">
      {/* Footer Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img 
            src="/logo.png" 
            alt="Sun King" 
            className="h-10 w-auto"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
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

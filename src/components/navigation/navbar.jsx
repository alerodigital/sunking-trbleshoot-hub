import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-sun-yellow z-50 w-full">
      <div className="w-full  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-72">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/">
              <img 
                src="/logo.png" 
                alt="Sun King" 
                className="h-10 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Link>
          </div>

          {/* Admin Login Button */}
          {/* <div>
            <Link
              to="/login"
              className="inline-flex items-center justify-center w-137 h-37 py-2 px-6 rounded-full text-sm font-medium text-yellow-400 bg-black hover:bg-gray-800 transition-colors duration-200"
            >
              Admin Login
            </Link>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-yellow-400" style={{ backgroundColor: '#FFCE00' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo Section */}
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Sun King" 
              className="h-6 w-auto"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          {/* Admin Login Button */}
          <div>
            <a
              href="/login"
              className="inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-full text-yellow-400 bg-black hover:bg-gray-800 transition-colors duration-200"
              onClick={(e) => e.preventDefault()}
            >
              Admin Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
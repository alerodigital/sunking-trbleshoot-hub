import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const AdminNavbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    navigate('/login');
  };

  return (
    <nav className="bg-yellow-400 h-16">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button and Logo Section */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-black hover:bg-yellow-500 transition-colors mr-2"
            >
              <Icon icon="mdi:menu" className="w-6 h-6" />
            </button>
            <Link to="/admin" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Sun King" 
                className="h-8 w-auto mr-2"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-black font-medium text-sm sm:text-base hidden sm:block">(( Username ))</span>
            <button
              onClick={handleLogout}
              className="bg-black text-yellow-400 px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;

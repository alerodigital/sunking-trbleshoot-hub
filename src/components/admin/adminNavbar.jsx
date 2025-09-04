import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
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
          {/* Logo Section */}
          <div className="flex items-center">
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
          <div className="flex items-center space-x-4">
            <span className="text-black font-medium">(( Username ))</span>
            <button
              onClick={handleLogout}
              className="bg-black text-yellow-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
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

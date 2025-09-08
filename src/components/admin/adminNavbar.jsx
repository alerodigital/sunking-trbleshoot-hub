import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth } from '../../hooks/useAuth'; // Import the auth hook

const AdminNavbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { useCurrentUser, signOut } = useAuth(); // Use the auth hook
  const { data: user } = useCurrentUser();

  const handleLogout = async () => {
    try {
      await signOut(); // Use the signOut function from the hook
      console.log('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: navigate to login even if logout fails
      navigate('/login');
    }
  };

  // Get display name - use Firebase displayName, userData from Firestore, or email
  const getDisplayName = () => {
    if (!user) return 'User';
    
    // Priority 1: Firebase Auth displayName
    if (user.displayName) return user.displayName;
    
    // Priority 2: User data from Firestore
    if (user.userData) {
      const { firstName, lastName } = user.userData;
      if (firstName && lastName) return `${firstName} ${lastName}`;
      if (firstName) return firstName;
      if (lastName) return lastName;
    }
    
    // Priority 3: Email (without domain)
    if (user.email) {
      return user.email.split('@')[0];
    }
    
    // Fallback
    return 'User';
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
            <span className="text-black font-medium text-sm sm:text-base hidden sm:block">{getDisplayName()}</span>
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

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: 'Topics',
      path: '/admin/topics',
      icon: 'mdi:format-list-bulleted'
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: 'mdi:cog'
    }
  ];

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || 
                           (item.path === '/admin/topics' && location.pathname === '/admin');
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-black text-yellow-400'
                    : 'text-black hover:bg-gray-100'
                }`}
              >
                <Icon icon={item.icon} className="w-5 h-5 mr-3" />
                {item.name}
                {isActive && (
                  <Icon icon="mdi:chevron-right" className="w-4 h-4 ml-auto" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
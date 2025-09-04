import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminNavbar from '../../components/admin/adminNavbar.jsx';
import Sidebar from '../../components/admin/sidebar.jsx';
import TopicsPage from './TopicsPage.jsx';
import TopicDetailPage from './TopicDetailPage.jsx';
import SettingsPage from './SettingsPage.jsx';

const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 min-w-0">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/topics" replace />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/topics/:topicId" element={<TopicDetailPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminPage;

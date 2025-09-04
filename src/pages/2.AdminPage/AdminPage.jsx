import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminNavbar from '../../components/admin/adminNavbar.jsx';
import Sidebar from '../../components/admin/sidebar.jsx';
import TopicsPage from './TopicsPage.jsx';
import TopicDetailPage from './TopicDetailPage.jsx';
import SettingsPage from './SettingsPage.jsx';

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/topics" replace />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/topics/:topicId" element={<TopicDetailPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

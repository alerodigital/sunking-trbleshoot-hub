import React from 'react';
import { motion } from 'framer-motion';

const AdminPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"
    >
      {/* Admin Content */}
      <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
      <p className="mt-4 text-gray-600">This is where you will manage your topics and FAQs.</p>
    </motion.div>
  );
};

export default AdminPage;

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navigation/navbar.jsx';
import Footer from './components/navigation/footer.jsx';
import HomePage from './pages/1.HomePage/HomePage.jsx';
import AdminPage from './pages/2.AdminPage/AdminPage.jsx';
import Login from './pages/0.Auth/login.jsx';
import ResetPassword from './pages/0.Auth/resetPassword.jsx';
import { AnimatePresence } from 'framer-motion';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/reset-password';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render Navbar */}
      {!isAuthPage && <Navbar />}
      
      {/* Main content area */}
      <AnimatePresence mode="wait">
        <div className={isAuthPage ? "min-h-screen" : "flex-grow"}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </div>
      </AnimatePresence>
      
      {/* Conditionally render Footer */}
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;

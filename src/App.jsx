import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navigation/navbar.jsx';
import Footer from './components/navigation/footer.jsx';
import HomePage from './pages/1.HomePage/HomePage.jsx';
import AdminPage from './pages/2.AdminPage/AdminPage.jsx';
import Login from './pages/0.Auth/login.jsx';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  return (
    <BrowserRouter>
      {/* Main application container */}
      <div className="flex flex-col min-h-screen">
        {/* Navbar always visible */}
        <Navbar />
        
        {/* Main content area */}
        <AnimatePresence mode="wait">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </AnimatePresence>
        
        {/* Footer always visible */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/navigation/navbar.jsx';
import Footer from './components/navigation/footer.jsx';
import HomePage from './pages/1.HomePage/HomePage.jsx';
import AdminPage from './pages/2.AdminPage/AdminPage.jsx';
import Login from './pages/0.Auth/login.jsx';
import ResetPassword from './pages/0.Auth/resetPassword.jsx';
import Register from './pages/0.Auth/Register.jsx';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './hooks/useAuth.js';

// Loading Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

//Protected route Component
const ProtectedRoute = ({ children }) => {
  const { useCurrentUser, authLoading } = useAuth();
  const { data: user, isLoading: userLoading } = useCurrentUser();

  const isLoading = authLoading || userLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  return user ? children : <Navigate to="/login" replace />;
};


// Public Route Component (redirect to admin if already logged in)
const PublicRoute = ({ children }) => {
  const { useCurrentUser } = useAuth();
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return user ? <Navigate to="/admin" replace /> : children;
}

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/reset-password';
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render Navbar */}
      {!isAuthPage && !isAdminPage && <Navbar />}

      {/* Main content area */}
      <AnimatePresence mode="wait">
        <div className={isAuthPage || isAdminPage ? "min-h-screen" : "flex-grow"}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/admin/*"
              element={<ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>}
            />
            <Route
              path="/login"
              element={<PublicRoute>
                <Login />
              </PublicRoute>}
            />

            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route
              path="/reset-password"
              element={<PublicRoute>
                <ResetPassword />
              </PublicRoute>} />
          </Routes>
        </div>
      </AnimatePresence>

      {/* Conditionally render Footer */}
      {!isAuthPage && !isAdminPage && <Footer />}
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

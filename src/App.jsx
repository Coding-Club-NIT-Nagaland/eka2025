import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import SplashScreen from './components/SplashScreen';

import Navbar from './components/Navbar';
import Background from './components/Background';
import FloatingIcons from './components/FloatingIcons';

// Main Pages
import Home from './pages/Home';
import Events from './pages/Events';
import Contact from './pages/Contact';
import About from './pages/About';
import Highlights from './pages/Highlights';
import Gallery from './pages/Gallery';
import Team from './pages/Team';
import Playground from './pages/Playground';
import Sponsors from './pages/Sponsors';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminEvents from './pages/admin/Events';
import AdminMembers from './pages/admin/Members';
import AdminSchedules from './pages/admin/Schedules';

import Footer from './components/Footer';

import './App.css';
import './fonts.css';

// Protected Route Component
const ProtectedRoute = ({ isAuthenticated, redirectPath = '/admin/login' }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

function AppContent() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    // Replace this with your actual authentication check
    const token = localStorage.getItem('adminToken');
    setIsAuthenticated(!!token);
  }, []);

  // Reset scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Background components - Only show on non-admin routes */}
      {!location.pathname.startsWith('/admin') && (
        <>
          <Background />
          <FloatingIcons />
        </>
      )}

      <div className="flex flex-col flex-1">
        {/* Navbar - Only show on non-admin routes */}
        {!location.pathname.startsWith('/admin') && (
          <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        )}

        {/* Main content */}
        <main className={`flex-1 ${!location.pathname.startsWith('/admin') ? 'pt-20' : ''}`}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/highlights" element={<Highlights />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/team" element={<Team />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/sponsors" element={<Sponsors />} />
              {/* Admin Routes */}
              {/* Admin Auth Routes */}
              <Route path="/admin/login" element={
                isAuthenticated ? 
                <Navigate to="/admin/dashboard" replace /> : 
                <AdminLogin onLogin={() => setIsAuthenticated(true)} />
              } />

              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="events" element={<AdminEvents />} />
                  <Route path="members" element={<AdminMembers />} />
                  <Route path="schedules" element={<AdminSchedules />} />
                </Route>
              </Route>

              {/* 404 Route - Keep this at the bottom */}
            </Routes>
          </AnimatePresence>
        </main>
      </div>
      
      {/* Footer - now properly positioned at the bottom */}
      <Footer />

      {/* Toast */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#064e3b',
            color: '#fff',
            border: '1px solid #047857',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.15)',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#064e3b',
          },
        }}
      />
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ThemeProvider>
      <Toaster position="top-center" />
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <AppContent />
      )}
    </ThemeProvider>
  );
}

export default App;

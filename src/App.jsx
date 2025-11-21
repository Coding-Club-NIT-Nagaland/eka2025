import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';

import Navbar from './components/Navbar';
import Background from './components/Background';
import FloatingIcons from './components/FloatingIcons';

import Home from './pages/Home';
import Events from './pages/Events';
import Contact from './pages/Contact';
import About from './pages/About';
import Highlights from './pages/Highlights';
import Gallery from './pages/Gallery';
import Team from './pages/Team';
import Playground from './pages/Playground';

import './App.css';
import './fonts.css';

function AppContent() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Reset scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    // 🔥 FULLY TRANSPARENT — No gradient, no black
    <div className="min-h-screen flex flex-col bg-transparent">

      {/* Background components */}
      <Background />
      <FloatingIcons />

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navbar */}
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <div className="flex-grow flex flex-col">
          <main className="flex-grow w-full pt-20">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/highlights" element={<Highlights />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/team" element={<Team />} />
                <Route path="/playground" element={<Playground />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </div>

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
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Calendar, 
  Mail, 
  Info, 
  Menu, 
  X, 
  Sparkles,
  Award,
  Users,
  Star,
  Instagram,
  Twitter,
  Facebook,
  Youtube
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { 
    name: 'Home', 
    icon: Home, 
    path: '/',
    description: 'Back to the main page'
  },
  { 
    name: 'Events', 
    icon: Calendar, 
    path: '/events',
    description: 'Discover all events'
  },
  { 
    name: 'Highlights', 
    icon: Sparkles, 
    path: '/highlights',
    description: 'Event highlights and moments'
  },
  { 
    name: 'Gallery', 
    icon: Award, 
    path: '/gallery',
    description: 'Photo and video gallery'
  },
  { 
    name: 'Team', 
    icon: Users, 
    path: '/team',
    description: 'Meet our team'
  },
  { 
    name: 'About', 
    icon: Info, 
    path: '/about',
    description: 'Learn more about us'
  },
  { 
    name: 'Contact', 
    icon: Mail, 
    path: '/contact',
    description: 'Get in touch with us'
  }
];

const socialLinks = [
  { icon: Instagram, url: 'https://instagram.com' },
  { icon: Twitter, url: 'https://twitter.com' },
  { icon: Facebook, url: 'https://facebook.com' },
  { icon: Youtube, url: 'https://youtube.com' },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location, isMobile]);

  return (
    <>
      {/* Floating Menu Button */}
      <motion.button 
        className="fixed top-6 left-6 z-50 p-3 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <Menu className="w-6 h-6" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-emerald-700"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: 'spring',
                stiffness: 500,
                damping: 20
              }}
            />
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:bg-black/30"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 30,
                mass: 0.5
              }}
              className="fixed inset-y-0 left-0 z-50 w-80 max-w-full bg-gradient-to-b from-emerald-900 to-emerald-800 text-white shadow-2xl overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="p-6 flex items-center justify-between border-b border-emerald-700/50">
                  <Link 
                    to="/" 
                    className="flex items-center space-x-2 group"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                      <Sparkles className="w-6 h-6 text-amber-300" />
                    </div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200">
                      Ekarikthin 2025
                    </h1>
                  </Link>
                </div>
                
                {/* Navigation */}
                <nav className="flex-1 px-4 py-6">
                  <ul className="space-y-2">
                    {navItems.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <li key={item.name}>
                          <Link
                            to={item.path}
                            className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                              isActive 
                                ? 'bg-emerald-700/50 text-white shadow-lg' 
                                : 'text-emerald-100 hover:bg-emerald-700/30 hover:pl-6'
                            }`}
                            title={item.description}
                          >
                            <div className={`p-1.5 rounded-lg mr-3 ${
                              isActive 
                                ? 'bg-emerald-500/20' 
                                : 'bg-emerald-500/10 group-hover:bg-emerald-500/20'
                            }`}>
                              <item.icon 
                                className={`w-5 h-5 ${
                                  isActive ? 'text-emerald-300' : 'text-emerald-400'
                                }`} 
                              />
                            </div>
                            <span className="font-medium">{item.name}</span>
                            {isActive && (
                              <motion.div 
                                className="ml-auto w-1.5 h-1.5 bg-emerald-400 rounded-full"
                                layoutId="activeNav"
                                transition={{
                                  type: 'spring',
                                  stiffness: 500,
                                  damping: 30
                                }}
                              />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                
                {/* Footer */}
                <div className="p-6 border-t border-emerald-700/50">
                  <div className="flex justify-center space-x-4 mb-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-emerald-300 hover:text-white hover:bg-emerald-700/30 rounded-full transition-colors"
                        aria-label={social.icon.displayName}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                  <div className="text-center text-sm text-emerald-300/80">
                    <p>NIT Nagaland Presents</p>
                    <p className="text-xs mt-1 flex items-center justify-center">
                      <Star className="w-3 h-3 mr-1 text-amber-300" fill="currentColor" />
                      Ekarikthin 2025
                      <Star className="w-3 h-3 ml-1 text-amber-300" fill="currentColor" />
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

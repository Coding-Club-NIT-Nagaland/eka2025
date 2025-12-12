import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Mail, Info, Sparkles, Award, Users, Moon, Sun, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Fun emoji decorations
const emojis = ['🎉','✨','🎨','🎤','🎭','🎪','🥁','🎸','🎯','🎊','🌈','🎠','🎡','🎢','🦄','🍭','🎈','🎀'];
const randomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

// Confetti for button hover
const Confetti = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-2xl"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`
        }}
        animate={{
          y: [0, -100],
          x: [0, (Math.random() - 0.5) * 50],
          opacity: [1, 0],
          rotate: [0, Math.random() * 360]
        }}
        transition={{
          duration: 2 + Math.random() * 3,
          repeat: Infinity,
          repeatType: 'loop',
          delay: Math.random() * 5,
          ease: 'easeOut'
        }}
      >
        {randomEmoji()}
      </motion.div>
    ))}
  </div>
);

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Events', icon: Calendar, path: '/events' },
    { name: 'Highlights', icon: Sparkles, path: '/highlights' },
    { name: 'Gallery', icon: Award, path: '/gallery' },
    { name: 'Team', icon: Users, path: '/team' },
    { name: 'Playground', icon: Award, path: '/playground' },
    { name: 'Sponsors', icon: Heart, path: '/sponsors' },
    { name: 'About', icon: Info, path: '/about' },
    { name: 'Contact', icon: Mail, path: '/contact' }
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
    >
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between h-14 items-center">

            {/* Logo */}
            <motion.div
              className="flex items-center relative group mr-8 md:mr-12"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex-shrink-0 flex items-center group">
                <motion.span
                  className="text-2xl font-extrabold bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg whitespace-nowrap"
                >
                  <span className="text-yellow-200 animate-bounce inline-block">🎪</span>
                  Ekarikthin 2025
                  <span className="text-pink-200 animate-pulse inline-block">✨</span>
                </motion.span>

                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-yellow-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-2">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                const colors = [
                  'from-yellow-200 via-pink-300 to-purple-400',
                  'from-pink-300 via-purple-400 to-blue-400',
                  'from-purple-300 via-blue-400 to-teal-300',
                  'from-blue-300 via-teal-300 to-yellow-300',
                  'from-teal-300 via-yellow-300 to-pink-300',
                  'from-yellow-300 via-pink-400 to-purple-400',
                  'from-pink-400 via-purple-500 to-blue-400'
                ];
                const color = colors[index % colors.length];

                return (
                  <motion.div 
                    key={item.path}
                    className="relative group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="relative">
                      <Link
                        to={item.path}
                        className={`px-4 py-1.5 font-medium transition-colors duration-200 flex items-center ${
                          isActive
                            ? 'text-emerald-400'
                            : 'text-white/90 hover:text-white'
                        }`}
                      >
                        <item.icon className={`w-5 h-5 mr-2 ${isActive ? 'text-emerald-400' : 'text-gray-300'}`} />
                        {item.name}
                      </Link>
                      {isActive && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                          layoutId="activeNav"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                          }}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Menu Button + Theme Switch + Emoji */}
            <div className="flex items-center md:hidden relative">

              {/* Hamburger Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-full bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-400 text-white shadow-lg relative overflow-hidden group z-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                <motion.svg
                  className="h-6 w-6 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </motion.svg>
              </motion.button>

              {/* THIS DIV WAS BROKEN — NOW FIXED */}
              <div className="flex items-center space-x-3">

                {/* Theme Toggle */}
                <motion.button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-yellow-200" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-700" />
                  )}
                </motion.button>

                {/* Floating Emoji */}
                <motion.div
                  className="text-yellow-200 text-2xl"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 10, -5, 10, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity
                  }}
                >
                  {randomEmoji()}
                </motion.div>
              
              </div>  {/* FIXED: This div is now properly closed */}

              {/* Confetti */}
              <AnimatePresence>
                <motion.div
                  className="absolute -top-4 -right-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Confetti />
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
          
          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-purple-900 to-indigo-900 shadow-xl z-40"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`group flex items-center px-3 py-3 text-base font-medium rounded-md ${
                          isActive 
                            ? 'bg-white/10 text-white' 
                            : 'text-white/80 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <item.icon className={`mr-3 h-6 w-6 ${isActive ? 'text-yellow-200' : 'text-gray-300'}`} />
                        {item.name}
                        {item.emoji && (
                          <span className="ml-2 text-lg">{item.emoji}</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

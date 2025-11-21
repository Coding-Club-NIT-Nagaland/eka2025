import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Mail, Info, Sparkles, Award, Users, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Fun emoji decorations for the navbar
const emojis = ['🎉', '✨', '🎨', '🎤', '🎭', '🎪', '🥁', '🎸', '🎯', '🎊', '🌈', '🎠', '🎡', '🎢', '🦄', '🍭', '🎈', '🎀'];

// Random emoji generator
const randomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

// Fun confetti effect component
const Confetti = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-2xl"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -100],
          x: [0, (Math.random() - 0.5) * 50],
          opacity: [1, 0],
          rotate: [0, Math.random() * 360],
        }}
        transition={{
          duration: 2 + Math.random() * 3,
          repeat: Infinity,
          repeatType: 'loop',
          delay: Math.random() * 5,
          ease: 'easeOut',
        }}
      >
        {randomEmoji()}
      </motion.div>
    ))}
  </div>
);

const Navbar = ({ isMenuOpen, onMenuToggle }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Events', icon: Calendar, path: '/events' },
    { name: 'Highlights', icon: Sparkles, path: '/highlights' },
    { name: 'Gallery', icon: Award, path: '/gallery' },
    { name: 'Team', icon: Users, path: '/team' },
    { name: 'About', icon: Info, path: '/about' },
    { name: 'Contact', icon: Mail, path: '/contact' }
  ];

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
    >
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between h-14 items-center">
            <motion.div 
              className="flex items-center relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex-shrink-0 flex items-center group">
                <motion.span 
                  className="text-2xl font-extrabold bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg"
                  whileHover={{ 
                    textShadow: ['0 0 10px rgba(253, 224, 71, 0.5)', '0 0 20px rgba(236, 72, 153, 0.7)', '0 0 10px rgba(253, 224, 71, 0.5)'],
                    transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' }
                  }}
                >
                  <span className="text-yellow-200 animate-bounce inline-block">🎪</span> Ekarikthin 2025 <span className="text-pink-200 animate-pulse inline-block">✨</span>
                </motion.span>
                <motion.span 
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-yellow-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  initial={false}
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-2">
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
                    <Link
                      to={item.path}
                      className={`group relative px-4 py-1.5 rounded-full font-bold transition-all duration-300 flex items-center ${
                        isActive 
                          ? `bg-gradient-to-r ${color} text-white shadow-lg shadow-pink-500/40` 
                          : 'text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm'
                      }`}
                    >
                      <motion.span 
                        className="relative z-10 flex items-center"
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <item.icon className={`w-5 h-5 mr-2 ${isActive ? 'text-white' : 'text-yellow-200'}`} />
                        <span className="relative z-10">{item.name}</span>
                      </motion.span>
                      
                      {!isActive && (
                        <motion.span 
                          className="absolute -top-2 -right-2 text-xs bg-yellow-200 text-purple-900 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-lg"
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ 
                            scale: 1, 
                            rotate: [0, 20, -10, 10, 0],
                          }}
                          transition={{ 
                            delay: 0.2 + (index * 0.1),
                            rotate: { 
                              repeat: Infinity, 
                              repeatType: 'reverse', 
                              duration: 2,
                              ease: 'easeInOut'
                            } 
                          }}
                        >
                          {randomEmoji()}
                        </motion.span>
                      )}
                      
                      {isActive && (
                        <motion.span 
                          className="absolute -bottom-1 left-3 right-3 h-1 bg-yellow-200 rounded-full shadow-[0_0_10px_2px_rgba(253,224,71,0.5)]"
                          layoutId="activeNav"
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 30
                          }}
                        />
                      )}
                      
                      <AnimatePresence>
                        {!isActive && (
                          <motion.span 
                            className="absolute inset-0 bg-gradient-to-r from-yellow-200/30 to-pink-300/30 rounded-full opacity-0"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ 
                              opacity: 1, 
                              scale: 1.05,
                              transition: { duration: 0.3 }
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden relative">
              <motion.button 
                className="inline-flex items-center justify-center p-2 rounded-full bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-400 text-white shadow-lg focus:outline-none relative overflow-hidden group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onMenuToggle}
              >
                <span className="sr-only">Open main menu</span>
                <motion.svg
                  className="h-6 w-6 relative z-10"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                  animate={{ 
                    rotate: [0, 10, -5, 10, 0],
                    scale: [1, 1.1, 0.95, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </motion.svg>
                
                {/* Animated background */}
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                
                {/* Sparkle effect */}
                <motion.span 
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    background: ['rgba(255,255,255,0) 0%', 'rgba(255,255,255,0.8) 50%', 'rgba(255,255,255,0) 100%'],
                    backgroundSize: '200% 100%',
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut'
                  }}
                  style={{
                    backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
                    backgroundPosition: ['-100% 0', '200% 0'],
                  }}
                />
              </motion.button>

              <div className="flex items-center space-x-3 ml-2">
                <motion.button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-yellow-200" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-700" />
                  )}
                </motion.button>
                
                <motion.div 
                  className="text-yellow-200 text-2xl"
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 10, -5, 10, 0],
                  }}
                  transition={{ 
                    y: { 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: 'easeInOut' 
                    },
                    rotate: { 
                      duration: 5, 
                      repeat: Infinity, 
                      ease: 'easeInOut' 
                    }
                  }}
                >
                  {randomEmoji()}
                </motion.div>
              </div>
              
              {/* Mini confetti effect on hover */}
              <AnimatePresence>
                <motion.div 
                  className="absolute -top-4 -right-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: 1,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Confetti />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-gradient-to-b from-purple-500/95 to-pink-500/95 backdrop-blur-lg shadow-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                const colors = [
                  'from-yellow-200 to-pink-300',
                  'from-pink-300 to-purple-400',
                  'from-purple-300 to-blue-400',
                  'from-blue-300 to-teal-300',
                  'from-teal-300 to-yellow-300',
                  'from-yellow-300 to-pink-400',
                  'from-pink-400 to-purple-500'
                ];
                const color = colors[index % colors.length];
                
                return (
                  <motion.div
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * index }}
                    className="relative overflow-hidden rounded-xl"
                  >
                    <Link
                      to={item.path}
                      className={`group flex items-center px-4 py-3 rounded-xl text-base font-bold ${
                        isActive 
                          ? `bg-gradient-to-r ${color} text-white shadow-md` 
                          : 'text-white/90 hover:bg-white/20 backdrop-blur-sm'
                      }`}
                      onClick={onMenuToggle}
                    >
                      <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-yellow-200'}`} />
                      <span className="relative z-10">{item.name}</span>
                      
                      {!isActive && (
                        <motion.span 
                          className="absolute right-3 text-lg"
                          animate={{ 
                            x: [0, 3, -3, 0],
                            rotate: [0, 10, -5, 0]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            repeatType: 'reverse',
                            ease: 'easeInOut'
                          }}
                        >
                          {randomEmoji()}
                        </motion.span>
                      )}
                      
                      <motion.span 
                        className="absolute inset-0 bg-white/20 rounded-xl"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

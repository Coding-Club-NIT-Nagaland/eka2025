import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Clock } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const UpdateScroller = () => {
  const [currentUpdate, setCurrentUpdate] = useState(0);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Sample updates - replace with your actual updates
  const updates = [
    { id: 1, text: '🎉 Early bird registrations are now open!', time: '2 hours ago' },
    { id: 2, text: '🚀 New event added: Tech Workshop with industry experts', time: '5 hours ago' },
    { id: 3, text: '📢 Schedule for Day 1 has been updated', time: '1 day ago' },
    { id: 4, text: '🎤 Special guest speaker announced: Check out our speakers section', time: '2 days ago' },
  ];

  // Auto-scroll through updates
  useEffect(() => {
    if (isHovered) return; // Pause auto-scroll on hover
    
    const interval = setInterval(() => {
      setCurrentUpdate((prev) => (prev + 1) % updates.length);
    }, 3000); // Change update every 3 seconds for better visibility

    return () => clearInterval(interval);
  }, [updates.length, isHovered]);
  
  // Auto-scroll text effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const textElement = container.querySelector('.scrolling-text');
    if (!textElement) return;
    
    const textWidth = textElement.scrollWidth;
    const containerWidth = container.offsetWidth;
    
    if (textWidth > containerWidth) {
      const duration = (textWidth / 50) * 1000; // Adjust speed as needed
      
      const scrollAnimation = textElement.animate(
        [
          { transform: 'translateX(0)' },
          { transform: `translateX(-${textWidth - containerWidth}px)` }
        ],
        {
          duration: duration,
          easing: 'linear',
          fill: 'forwards'
        }
      );
      
      return () => scrollAnimation.cancel();
    }
  }, [currentUpdate]);

  return (
    <motion.div 
      className="w-screen bg-transparent backdrop-blur-xs py-0.5"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full mx-auto px-4">
        {/* Update indicator - Top row */}
        <div className="flex justify-between items-center w-full mb-0.5">
          <div className="flex items-center space-x-1.5 text-amber-300/90 px-1.5 py-0.5 rounded">
            <AlertCircle className="w-2.5 h-2.5" />
            <span className="text-[10px] font-medium">UPDATES</span>
          </div>
          <div className="flex items-center space-x-1 text-[10px] text-gray-300/80">
            <Clock className="w-2.5 h-2.5" />
            <span>{updates[currentUpdate].time}</span>
          </div>
        </div>
        
        {/* Scrolling text container - Bottom row */}
        <div className="relative w-full">
          <div className="relative w-full overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/10 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-black/10 to-transparent z-10 pointer-events-none"></div>
            
            <div 
              ref={containerRef}
              className="relative overflow-hidden w-full"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentUpdate}
                  className="scrolling-text text-xs text-white/90 font-medium whitespace-nowrap inline-block w-full"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {updates[currentUpdate].text}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center space-x-1 mt-1">
            {updates.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentUpdate(index)}
                className={`w-1 h-1 rounded-full transition-all ${
                  currentUpdate === index ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to update ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UpdateScroller;

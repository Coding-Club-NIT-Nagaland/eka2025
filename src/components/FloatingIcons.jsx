import { motion } from 'framer-motion';
import { Music, Film, Camera, Mic2, Palette, Drum } from 'lucide-react';

const FloatingIcons = () => {
  const icons = [Music, Film, Camera, Mic2, Palette, Drum];
  const colors = ["#10B981", "#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#EF4444"];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {Array(15).fill(0).map((_, i) => {
        const Icon = icons[i % icons.length];
        const size = 24 + Math.random() * 30;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: colors[Math.floor(Math.random() * colors.length)],
              opacity: 0.1 + Math.random() * 0.4,
              scale: 0.7 + Math.random() * 0.6,
            }}
            animate={{
              y: [0, -50, 0, -30, 0],
              x: [0, 20, -20, 10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5,
            }}
          >
            <Icon size={size} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingIcons;

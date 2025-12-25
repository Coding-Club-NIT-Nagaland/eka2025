import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, RefreshCw, Maximize2 } from 'lucide-react';
import { SnakeGame, TicTacToe, MemoryGame, FlappyBird } from '../components/games';

const games = [
  { 
    id: 'snake', 
    name: 'Snake Game', 
    component: <div className="bg-transparent"><SnakeGame /></div>,
    color: 'bg-emerald-600/10'
  },
  { 
    id: 'tictactoe', 
    name: 'Tic Tac Toe', 
    component: <div className="bg-transparent"><TicTacToe /></div>,
    color: 'bg-blue-600/10'
  },
  { 
    id: 'memory', 
    name: 'Memory Cards', 
    component: <div className="bg-transparent"><MemoryGame /></div>,
    color: 'bg-purple-600/10'
  },
  { 
    id: 'flappy', 
    name: 'Flappy Bird', 
    component: <div className="bg-transparent"><FlappyBird /></div>,
    color: 'bg-orange-600/10'
  },
];

const Playground = () => {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const currentGame = games[currentGameIndex];

  const nextGame = () => {
    setCurrentGameIndex((prev) => (prev + 1) % games.length);
  };

  const prevGame = () => {
    setCurrentGameIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <motion.div 
            className="flex flex-col md:flex-row md:justify-between md:items-center gap-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left">Game Zone</h1>
            <div className="flex justify-center md:justify-end">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <X size={24} /> : <Maximize2 size={20} />}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Game Navigation */}
        <div className="flex flex-col items-center mb-6 md:mb-8 space-y-4">
          <motion.h2 
            key={currentGame.id}
            className="text-2xl md:text-3xl font-bold text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentGame.name}
          </motion.h2>
          
          <div className="flex space-x-4">
            <button
              onClick={prevGame}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous game"
            >
              <ArrowLeft size={20} className="w-5 h-5" />
            </button>
            <button
              onClick={nextGame}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next game"
            >
              <ArrowRight size={20} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Game Container */}
        <motion.div
          className={`relative rounded-2xl overflow-hidden shadow-2xl ${
            isFullscreen ? 'fixed inset-0 m-0 rounded-none z-50' : 'min-h-[50vh] md:min-h-[60vh]'
          } ${currentGame.color}`}
          layout
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentGame.id}
              className="w-full h-full p-2 md:p-4 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full max-w-md mx-auto">
                {currentGame.component}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Game Instructions */}
        <motion.div
          className="mt-6 md:mt-8 p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-xl text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">How to Play</h3>
          <p className="text-gray-300">
            {currentGame.id === 'snake' && 'Use arrow keys or swipe to control the snake. Collect food to grow longer.'}
            {currentGame.id === 'tictactoe' && 'Click on the grid to place your mark. Get three in a row to win!'}
            {currentGame.id === 'memory' && 'Flip cards to find matching pairs. Remember their positions to win.'}
            {currentGame.id === 'flappy' && 'Click or tap to make the bird fly. Avoid the pipes!'}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Playground;

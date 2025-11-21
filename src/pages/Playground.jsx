import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, RefreshCw, Maximize2 } from 'lucide-react';
import { SnakeGame, TicTacToe, MemoryGame, FlappyBird } from '../components/games';

const games = [
  { id: 'snake', name: 'Snake Game', component: <SnakeGame />, color: 'from-green-500 to-emerald-600' },
  { id: 'tictactoe', name: 'Tic Tac Toe', component: <TicTacToe />, color: 'from-blue-500 to-indigo-600' },
  { id: 'memory', name: 'Memory Cards', component: <MemoryGame />, color: 'from-purple-500 to-pink-600' },
  { id: 'flappy', name: 'Flappy Bird', component: <FlappyBird />, color: 'from-yellow-500 to-orange-600' },
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
    <div className={`min-h-screen bg-gradient-to-br ${currentGame.color} text-white p-4 md:p-8`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold">Game Zone</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <X size={24} /> : <Maximize2 size={20} />}
            </button>
          </div>
        </motion.div>

        {/* Game Navigation */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={prevGame}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Previous game"
          >
            <ArrowLeft size={24} />
          </button>

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

          <button
            onClick={nextGame}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Next game"
          >
            <ArrowRight size={24} />
          </button>
        </div>

        {/* Game Container */}
        <motion.div
          className={`relative bg-black/20 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl ${
            isFullscreen ? 'fixed inset-0 m-0 rounded-none z-50' : 'min-h-[60vh]'
          }`}
          layout
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentGame.id}
              className="w-full h-full p-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {currentGame.component}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Game Instructions */}
        <motion.div
          className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-3">How to Play</h3>
          <p>Use the arrow keys or on-screen controls to play. Try to beat your high score!</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Playground;

import { useEffect, useRef, useState } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 5, y: 5 };
const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(DIRECTIONS.ArrowRight);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const gameLoopRef = useRef();

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (DIRECTIONS[e.key]) {
        if (
          (e.key === 'ArrowUp' && direction.y !== 1) ||
          (e.key === 'ArrowDown' && direction.y !== -1) ||
          (e.key === 'ArrowLeft' && direction.x !== 1) ||
          (e.key === 'ArrowRight' && direction.x !== -1)
        ) {
          setDirection(DIRECTIONS[e.key]);
        }
      } else if (e.key === ' ') {
        setIsPaused(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        // Check wall collision
        if (
          head.x < 0 || head.x >= GRID_SIZE ||
          head.y < 0 || head.y >= GRID_SIZE ||
          prevSnake.some(segment => segment.x === head.x && segment.y === head.y)
        ) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];
        
        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 10);
          // Generate new food
          const newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
          };
          setFood(newFood);
          return newSnake;
        }

        // Remove tail if no food eaten
        newSnake.pop();
        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, 150); // Increased from 100ms to 150ms for slower movement
    return () => clearInterval(gameInterval);
  }, [direction, food, gameOver, isPaused]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(DIRECTIONS.ArrowRight);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-2 md:p-4 w-full">
      <div className="mb-3 md:mb-4 flex justify-between w-full max-w-md">
        <div className="text-base md:text-lg font-medium">Score: {score}</div>
        <div className="flex gap-2">
          {gameOver ? (
            <button
              onClick={resetGame}
              className="px-3 md:px-4 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm md:text-base transition-colors"
            >
              Play Again
            </button>
          ) : (
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-3 md:px-4 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm md:text-base transition-colors"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          )}
        </div>
      </div>
      
      <div
        className="relative border-2 border-gray-200 rounded-lg overflow-hidden bg-white/10"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {/* Game Grid */}
        <div className="absolute inset-0 grid" 
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
            <div 
              key={index} 
              className="border border-white/5"
            />
          ))}
        </div>

        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute rounded-sm transition-all duration-100"
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE - 1,
              height: CELL_SIZE - 1,
              backgroundColor: index === 0 ? '#10b981' : '#34d399',
              boxShadow: '0 0 4px rgba(0,0,0,0.2)',
              zIndex: 10,
            }}
          />
        ))}
        
        {/* Food */}
        <div
          className="absolute rounded-full animate-pulse"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE - 1,
            height: CELL_SIZE - 1,
            backgroundColor: '#ef4444',
            boxShadow: '0 0 8px #ef4444',
            zIndex: 5,
          }}
        />
        
        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4">
            <div className="text-2xl md:text-3xl font-bold text-white mb-3">Game Over!</div>
            <div className="text-lg md:text-xl text-gray-200 mb-6">Final Score: {score}</div>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-lg font-medium transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
        
        {/* Pause Overlay */}
        {isPaused && !gameOver && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="text-2xl md:text-3xl font-bold text-white">Paused</div>
          </div>
        )}
      </div>
      
      {/* Mobile Controls */}
      <div className="mt-4 md:mt-6 grid grid-cols-3 gap-2 md:hidden w-full max-w-[200px] mx-auto">
        <div></div>
        <button
          onClick={() => setDirection(DIRECTIONS.ArrowUp)}
          className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-md flex items-center justify-center aspect-square"
        >
          <span className="text-xl">↑</span>
        </button>
        <div></div>
        <button
          onClick={() => setDirection(DIRECTIONS.ArrowLeft)}
          className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-md flex items-center justify-center aspect-square"
        >
          <span className="text-xl">←</span>
        </button>
        <button
          onClick={() => setDirection(DIRECTIONS.ArrowDown)}
          className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-md flex items-center justify-center aspect-square"
        >
          <span className="text-xl">↓</span>
        </button>
        <button
          onClick={() => setDirection(DIRECTIONS.ArrowRight)}
          className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-md flex items-center justify-center aspect-square"
        >
          <span className="text-xl">→</span>
        </button>
      </div>
    </div>
  );
};

export default SnakeGame;

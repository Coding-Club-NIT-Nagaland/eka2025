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

    const gameInterval = setInterval(moveSnake, 100);
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
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="mb-4 flex justify-between w-full max-w-md">
        <div className="text-lg">Score: {score}</div>
        {gameOver && (
          <button
            onClick={resetGame}
            className="px-4 py-1 bg-white/20 rounded hover:bg-white/30"
          >
            Play Again
          </button>
        )}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="px-4 py-1 bg-white/20 rounded hover:bg-white/30"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
      
      <div
        className="relative bg-black/30 rounded-lg overflow-hidden"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute bg-green-400 rounded-sm"
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE - 1,
              height: CELL_SIZE - 1,
              backgroundColor: index === 0 ? '#4ade80' : '#22c55e',
            }}
          />
        ))}
        
        {/* Food */}
        <div
          className="absolute rounded-full bg-red-500"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE - 1,
            height: CELL_SIZE - 1,
          }}
        />
        
        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold mb-4">Game Over!</div>
            <div className="text-lg mb-4">Final Score: {score}</div>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-white/20 rounded-lg hover:bg-white/30"
            >
              Play Again
            </button>
          </div>
        )}
        
        {/* Pause Overlay */}
        {isPaused && !gameOver && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-2xl font-bold">Paused</div>
          </div>
        )}
      </div>
      
      {/* Mobile Controls */}
      <div className="mt-6 grid grid-cols-3 gap-2 md:hidden">
        <div></div>
        <button
          onClick={() => setDirection(DIRECTIONS.ArrowUp)}
          className="p-4 bg-white/20 rounded"
        >
          ↑
        </button>
        <div></div>
        <button
          onClick={() => setDirection(DIRECTIONS.ArrowLeft)}
          className="p-4 bg-white/20 rounded"
        >
          ←
        </button>
        <button
          onClick={() => setDirection(DIRECTIONS.ArrowDown)}
          className="p-4 bg-white/20 rounded"
        >
          ↓
        </button>
        <button
          onClick={() => setDirection(DIRECTIONS.ArrowRight)}
          className="p-4 bg-white/20 rounded"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default SnakeGame;

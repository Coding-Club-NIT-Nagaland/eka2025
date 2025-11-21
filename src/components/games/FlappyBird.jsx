import { useEffect, useRef, useState, useCallback } from 'react';

const FlappyBird = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const gameLoopRef = useRef();
  const birdRef = useRef({ y: 250, velocity: 0 });
  const pipesRef = useRef([]);
  const frameCountRef = useRef(0);
  const isSpacePressed = useRef(false);

  // Game constants
  const GRAVITY = 0.5;
  const JUMP_FORCE = -10;
  const PIPE_WIDTH = 80;
  const PIPE_GAP = 150;
  const PIPE_FREQUENCY = 100; // frames
  const BIRD_SIZE = 30;

  // Initialize canvas and game state
  const initGame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = 400;
      canvas.height = 600;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(gameLoopRef.current);
    };
  }, []);

  // Draw bird
  const drawBird = useCallback((ctx) => {
    const bird = birdRef.current;
    
    // Draw bird body
    ctx.fillStyle = '#fbbf24'; // Yellow
    ctx.beginPath();
    ctx.arc(100, bird.y, BIRD_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw eye
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(110, bird.y - 5, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw beak
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(115, bird.y);
    ctx.lineTo(130, bird.y - 3);
    ctx.lineTo(130, bird.y + 3);
    ctx.fill();
  }, []);

  // Draw pipes
  const drawPipes = useCallback((ctx) => {
    ctx.fillStyle = '#10b981'; // Green
    
    pipesRef.current.forEach(pipe => {
      // Top pipe
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
      // Bottom pipe
      ctx.fillRect(
        pipe.x,
        pipe.topHeight + PIPE_GAP,
        PIPE_WIDTH,
        canvasRef.current.height - (pipe.topHeight + PIPE_GAP)
      );
      
      // Pipe decorations
      ctx.fillStyle = '#0d9488';
      ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, PIPE_WIDTH + 10, 20);
      ctx.fillRect(pipe.x - 5, pipe.topHeight + PIPE_GAP, PIPE_WIDTH + 10, 20);
      ctx.fillStyle = '#10b981';
    });
  }, []);

  // Draw score
  const drawScore = useCallback((ctx) => {
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(score, canvasRef.current.width / 2, 60);
    
    // Draw high score
    if (highScore > 0) {
      ctx.font = '16px Arial';
      ctx.fillText(`High Score: ${highScore}`, canvasRef.current.width / 2, 90);
    }
  }, [score, highScore]);

  // Check for collisions
  const checkCollision = useCallback(() => {
    const bird = birdRef.current;
    const canvas = canvasRef.current;
    
    // Check if bird hits the ground or ceiling
    if (bird.y - BIRD_SIZE / 2 <= 0 || bird.y + BIRD_SIZE / 2 >= canvas.height) {
      return true;
    }
    
    // Check if bird hits any pipes
    return pipesRef.current.some(pipe => {
      // Check if bird is within pipe's x-range
      if (100 + BIRD_SIZE / 2 > pipe.x && 100 - BIRD_SIZE / 2 < pipe.x + PIPE_WIDTH) {
        // Check if bird is outside the gap
        return bird.y - BIRD_SIZE / 2 < pipe.topHeight || 
               bird.y + BIRD_SIZE / 2 > pipe.topHeight + PIPE_GAP;
      }
      return false;
    });
  }, []);

  // Game loop
  const gameLoop = useCallback(() => {
    if (!isStarted || isPaused) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bird = birdRef.current;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw sky background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#7dd3fc'); // Light blue
    gradient.addColorStop(1, '#1e40af'); // Dark blue
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw ground
    ctx.fillStyle = '#78350f';
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
    
    // Draw grass on top of ground
    ctx.fillStyle = '#84cc16';
    for (let i = 0; i < canvas.width; i += 30) {
      ctx.beginPath();
      ctx.arc(i, canvas.height - 40, 10, Math.PI, 0, false);
      ctx.fill();
    }
    
    // Apply gravity
    bird.velocity += GRAVITY;
    bird.y += bird.velocity;
    
    // Generate pipes
    if (frameCountRef.current % PIPE_FREQUENCY === 0) {
      const minHeight = 50;
      const maxHeight = canvas.height - PIPE_GAP - minHeight - 40; // 40 is ground height
      const topHeight = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
      
      pipesRef.current.push({
        x: canvas.width,
        topHeight,
        scored: false
      });
    }
    
    // Update pipes
    pipesRef.current = pipesRef.current
      .map(pipe => {
        // Move pipe
        pipe.x -= 2;

        // Check if bird passed the pipe
        if (pipe.x + PIPE_WIDTH < 100 && !pipe.scored) {
          pipe.scored = true;
          setScore(prev => prev + 1);
        }

        return pipe;
      })
      .filter(pipe => pipe.x > -PIPE_WIDTH); // Remove off-screen pipes
    
    // Draw pipes
    drawPipes(ctx);
    
    // Draw bird
    drawBird(ctx);
    
    // Draw score
    drawScore(ctx);
    
    // Check for collisions
    if (checkCollision()) {
      gameOverHandler();
      return;
    }
    
    frameCountRef.current++;
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [isStarted, isPaused, drawBird, drawPipes, drawScore, checkCollision]);

  // Game over handler
  const gameOverHandler = useCallback(() => {
    cancelAnimationFrame(gameLoopRef.current);
    setGameOver(true);
    setHighScore(prev => Math.max(prev, score));
    setIsStarted(false);
  }, [score]);

  // Handle jump
  const jump = useCallback(() => {
    if (!isStarted) {
      startGame();
    } else if (gameOver) {
      resetGame();
    } else if (!isPaused) {
      birdRef.current.velocity = JUMP_FORCE;
    }
  }, [isStarted, gameOver, isPaused]);

  // Handle keyboard and touch controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (!isSpacePressed.current) {
          isSpacePressed.current = true;
          jump();
        }
      } else if (e.code === 'Escape') {
        setIsPaused(prev => !prev);
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        isSpacePressed.current = false;
      }
    };

    const handleClick = () => {
      if (!isSpacePressed.current) {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvasRef.current?.addEventListener('click', handleClick);
    
    // Touch controls for mobile
    const handleTouchStart = (e) => {
      e.preventDefault();
      jump();
    };
    
    canvasRef.current?.addEventListener('touchstart', handleTouchStart, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvasRef.current?.removeEventListener('click', handleClick);
      canvasRef.current?.removeEventListener('touchstart', handleTouchStart);
    };
  }, [jump]);

  // Start game
  const startGame = () => {
    if (!isStarted) {
      setIsStarted(true);
      setGameOver(false);
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
  };

  // Reset game
  const resetGame = () => {
    cancelAnimationFrame(gameLoopRef.current);
    
    // Reset bird
    birdRef.current = { y: 250, velocity: 0 };
    
    // Reset pipes
    pipesRef.current = [];
    
    // Reset game state
    setScore(0);
    setGameOver(false);
    frameCountRef.current = 0;
    
    // Start new game
    startGame();
  };

  // Initialize game on mount
  useEffect(() => {
    initGame();
    
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('flappyBirdHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
    
    return () => {
      cancelAnimationFrame(gameLoopRef.current);
    };
  }, [initGame]);
  
  // Save high score to localStorage when it changes
  useEffect(() => {
    if (highScore > 0) {
      localStorage.setItem('flappyBirdHighScore', highScore.toString());
    }
  }, [highScore]);
  
  // Start game loop when started
  useEffect(() => {
    if (isStarted && !gameOver && !isPaused) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [isStarted, gameOver, isPaused, gameLoop]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold">Flappy Bird</h2>
        <p className="text-sm text-white/70 mt-1">
          {!isStarted && !gameOver ? 'Press SPACE or tap to start' : 
           isPaused ? 'PAUSED - Press ESC to resume' : 
           `Score: ${score} | High Score: ${highScore}`}
        </p>
      </div>
      
      <div className="relative bg-blue-200 rounded-xl overflow-hidden">
        <canvas
          ref={canvasRef}
          width={400}
          height={600}
          className="block"
        />
        
        {/* Game overlay */}
        {!isStarted && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
            {gameOver ? (
              <div className="text-center p-6 bg-black/70 rounded-lg">
                <h3 className="text-2xl font-bold text-red-400 mb-2">Game Over!</h3>
                <p className="text-lg mb-4">Score: {score}</p>
                <button
                  onClick={resetGame}
                  className="px-6 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  Play Again
                </button>
              </div>
            ) : (
              <div className="text-center p-6 bg-black/70 rounded-lg">
                <h3 className="text-2xl font-bold text-yellow-300 mb-4">Flappy Bird</h3>
                <p className="mb-2">Press SPACE or tap to jump</p>
                <p className="text-sm text-white/70">Avoid the pipes!</p>
                <button
                  onClick={startGame}
                  className="mt-4 px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Start Game
                </button>
              </div>
            )}
          </div>
        )}
        
        {isPaused && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-2xl font-bold">PAUSED</div>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex space-x-4">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={() => setIsPaused(prev => !prev)}
          className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          disabled={!isStarted || gameOver}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
      
      <div className="mt-4 text-sm text-white/60 text-center">
        <p>Controls: SPACE/UP ARROW to jump | ESC to pause</p>
        <p className="mt-1">On mobile: Tap to jump</p>
      </div>
    </div>
  );
};

export default FlappyBird;

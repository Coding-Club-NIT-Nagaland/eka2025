import { useState, useEffect } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ x: 0, o: 0, draw: 0 });
  const [gameMode, setGameMode] = useState('human'); // 'human' or 'ai'
  const [isGameActive, setIsGameActive] = useState(true);

  // Check for winner or draw
  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setWinner(winner);
      if (winner === 'X' || winner === 'O') {
        setScores(prev => ({
          ...prev,
          [winner.toLowerCase()]: prev[winner.toLowerCase()] + 1
        }));
      } else if (winner === 'draw') {
        setScores(prev => ({
          ...prev,
          draw: prev.draw + 1
        }));
      }
      setIsGameActive(false);
    } else if (gameMode === 'ai' && !isXNext) {
      // AI's turn
      const timer = setTimeout(() => {
        makeAIMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [board, isXNext]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // 'X' or 'O'
      }
    }

    if (squares.every(square => square !== '')) {
      return 'draw';
    }

    return null;
  };

  const makeAIMove = () => {
    // Simple AI: choose a random available spot
    const availableSpots = board.map((spot, index) => (spot === '' ? index : null)).filter(val => val !== null);
    if (availableSpots.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableSpots.length);
      handleClick(availableSpots[randomIndex]);
    }
  };

  const handleClick = (i) => {
    if (board[i] || winner || !isGameActive) return;
    if (gameMode === 'ai' && !isXNext) return; // Prevent player from clicking during AI's turn

    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setWinner(null);
    setIsXNext(true);
    setIsGameActive(true);
  };

  const resetScores = () => {
    setScores({ x: 0, o: 0, draw: 0 });
    resetGame();
  };

  const toggleGameMode = () => {
    setGameMode(prev => (prev === 'human' ? 'ai' : 'human'));
    resetGame();
  };

  const renderSquare = (i) => (
    <button
      key={i}
      onClick={() => handleClick(i)}
      className={`w-16 h-16 sm:w-20 sm:h-20 text-3xl font-bold border-2 ${
        board[i] === 'X' 
          ? 'text-blue-400 border-blue-400' 
          : board[i] === 'O' 
            ? 'text-pink-400 border-pink-400' 
            : 'border-white/30 hover:border-white/60'
      } transition-all duration-200 flex items-center justify-center`}
      disabled={!!winner || !isGameActive}
    >
      {board[i]}
    </button>
  );

  const getStatus = () => {
    if (winner === 'X') return 'X wins!';
    if (winner === 'O') return 'O wins!';
    if (winner === 'draw') return 'Game ended in a draw!';
    return `Next player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">{getStatus()}</h2>
        
        <div className="flex justify-center space-x-6 my-4">
          <div className="text-blue-400">X: {scores.x}</div>
          <div className="text-gray-300">Draw: {scores.draw}</div>
          <div className="text-pink-400">O: {scores.o}</div>
        </div>
        
        <div className="flex space-x-2 mt-4">
          <button
            onClick={toggleGameMode}
            className={`px-3 py-1 rounded text-sm ${
              gameMode === 'human' 
                ? 'bg-blue-500 hover:bg-blue-600' 
                : 'bg-pink-500 hover:bg-pink-600'
            } transition-colors`}
          >
            {gameMode === 'human' ? 'vs Human' : 'vs AI'}
          </button>
          
          <button
            onClick={resetGame}
            className="px-3 py-1 bg-white/20 rounded text-sm hover:bg-white/30 transition-colors"
          >
            New Game
          </button>
          
          <button
            onClick={resetScores}
            className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30 transition-colors"
          >
            Reset Scores
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 bg-white/10 rounded-lg overflow-hidden">
        {Array(9).fill().map((_, i) => renderSquare(i))}
      </div>
      
      <div className="mt-6 text-sm text-white/60">
        {gameMode === 'ai' && (
          <p>Playing against {isXNext ? 'You (X)' : 'AI (O)'}</p>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;

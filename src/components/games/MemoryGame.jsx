import { useState, useEffect } from 'react';

// Emoji pairs for the memory game
const EMOJI_PAIRS = [
  '🎮', '🎯', '🎲', '🎳', '🎨', '🎭', '🎪', '🎰',
  '🚀', '🌙', '⭐', '🌈', '🍎', '🍕', '⚽', '🎸'
];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('easy'); // 'easy', 'medium', 'hard'
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Initialize game
  useEffect(() => {
    if (gameStarted) {
      initializeGame();
      setIsActive(true);
    }
  }, [gameStarted, difficulty]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isActive && !gameWon) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, gameWon]);

  const getCardCount = () => {
    switch (difficulty) {
      case 'easy': return 8;
      case 'medium': return 12;
      case 'hard': return 16;
      default: return 8;
    }
  };

  const initializeGame = () => {
    const cardCount = getCardCount();
    const selectedEmojis = EMOJI_PAIRS.slice(0, cardCount);
    const cardPairs = [...selectedEmojis, ...selectedEmojis];
    
    // Shuffle cards
    const shuffled = cardPairs
      .map((emoji, index) => ({
        id: index,
        emoji,
        matched: false,
        flipped: false
      }))
      .sort(() => Math.random() - 0.5);
    
    setCards(shuffled);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setTimer(0);
    setGameWon(false);
  };

  const handleCardClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || isDisabled) return;
    if (!gameStarted) setGameStarted(true);

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    
    // Update card flipped state
    const updatedCards = cards.map(card => 
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(updatedCards);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      setIsDisabled(true);
      
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard.emoji === secondCard.emoji) {
        // Match found
        setSolved(prev => [...prev, firstId, secondId]);
        
        // Update matched state
        const matchedCards = updatedCards.map(card => 
          card.id === firstId || card.id === secondId 
            ? { ...card, matched: true, flipped: true } 
            : card
        );
        setCards(matchedCards);
        
        // Check if all cards are matched
        if (solved.length + 2 === cards.length) {
          setGameWon(true);
          setIsActive(false);
        }
        
        setFlipped([]);
        setIsDisabled(false);
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          const resetCards = updatedCards.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, flipped: false } 
              : card
          );
          setCards(resetCards);
          setFlipped([]);
          setIsDisabled(false);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const changeDifficulty = (level) => {
    setDifficulty(level);
    setGameStarted(false);
  };

  const startNewGame = () => {
    setGameStarted(true);
    setIsActive(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">
          {gameWon ? '🎉 You Won! 🎉' : 'Memory Game'}
        </h2>
        
        <div className="flex justify-center space-x-6 text-sm mb-4">
          <div>Moves: {moves}</div>
          <div>Time: {formatTime(timer)}</div>
          <div>Matched: {solved.length / 2} / {getCardCount()}</div>
        </div>
        
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={() => changeDifficulty('easy')}
            className={`px-3 py-1 rounded text-xs ${
              difficulty === 'easy' 
                ? 'bg-blue-500' 
                : 'bg-white/10 hover:bg-white/20'
            } transition-colors`}
          >
            Easy (4 pairs)
          </button>
          <button
            onClick={() => changeDifficulty('medium')}
            className={`px-3 py-1 rounded text-xs ${
              difficulty === 'medium' 
                ? 'bg-blue-500' 
                : 'bg-white/10 hover:bg-white/20'
            } transition-colors`}
          >
            Medium (6 pairs)
          </button>
          <button
            onClick={() => changeDifficulty('hard')}
            className={`px-3 py-1 rounded text-xs ${
              difficulty === 'hard' 
                ? 'bg-blue-500' 
                : 'bg-white/10 hover:bg-white/20'
            } transition-colors`}
          >
            Hard (8 pairs)
          </button>
        </div>
        
        {!gameStarted && (
          <button
            onClick={startNewGame}
            className="mt-2 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
          >
            Start Game
          </button>
        )}
        
        {gameWon && (
          <div className="mt-4">
            <p className="text-green-300 font-bold">
              You won in {moves} moves and {formatTime(timer)}!
            </p>
            <button
              onClick={startNewGame}
              className="mt-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <div 
        className={`grid gap-2 ${
          difficulty === 'easy' ? 'grid-cols-4' : 
          difficulty === 'medium' ? 'grid-cols-4 sm:grid-cols-6' : 'grid-cols-4 sm:grid-cols-8'
        }`}
      >
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-2xl rounded-lg transition-all duration-300 ${
              card.flipped || card.matched
                ? 'bg-white/30 transform rotate-y-180' 
                : 'bg-white/10 hover:bg-white/20'
            } ${card.matched ? 'opacity-80' : ''}`}
            disabled={card.matched || isDisabled || !gameStarted}
          >
            {(card.flipped || card.matched) && card.emoji}
          </button>
        ))}
      </div>
      
      {gameStarted && !gameWon && (
        <button
          onClick={startNewGame}
          className="mt-6 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
        >
          Restart Game
        </button>
      )}
    </div>
  );
};

export default MemoryGame;

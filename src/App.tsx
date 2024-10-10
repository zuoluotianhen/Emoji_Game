import React, { useState, useEffect, useCallback } from 'react';
import { Timer } from 'lucide-react';
import EmojiGrid from './components/EmojiGrid';
import { generateEmojiGrid } from './utils/gameLogic';

const App: React.FC = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [time, setTime] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [emojis, setEmojis] = useState(generateEmojiGrid(level));

  const startNewGame = useCallback(() => {
    setScore(0);
    setLevel(1);
    setTime(60);
    setGameOver(false);
    setEmojis(generateEmojiGrid(1));
  }, []);

  const handleCorrectGuess = useCallback(() => {
    setScore((prevScore) => prevScore + 1);
    setLevel((prevLevel) => prevLevel + 1);
    setTime(60);
    setEmojis(generateEmojiGrid(level + 1));
  }, [level]);

  useEffect(() => {
    if (!gameOver && time > 0) {
      const timer = setTimeout(() => setTime((prevTime) => prevTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (time === 0) {
      setGameOver(true);
    }
  }, [time, gameOver]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Find the Still Emoji</h1>
      <div className="flex items-center justify-between w-full max-w-md mb-4">
        <div>Score: {score}</div>
        <div>Level: {level}</div>
        <div className="flex items-center">
          <Timer className="mr-1" />
          {time}s
        </div>
      </div>
      {gameOver ? (
        <div className="text-center">
          <h2 className="text-2xl mb-4">Game Over!</h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={startNewGame}
          >
            Play Again
          </button>
        </div>
      ) : (
        <EmojiGrid emojis={emojis} onCorrectGuess={handleCorrectGuess} level={level} />
      )}
    </div>
  );
};

export default App;
import React from 'react';

interface EmojiGridProps {
  emojis: string[];
  onCorrectGuess: () => void;
  level: number;
}

const EmojiGrid: React.FC<EmojiGridProps> = ({ emojis, onCorrectGuess, level }) => {
  const gridSize = Math.min(38, 5 + Math.floor(level / 2));
  
  return (
    <div 
      className="bg-gray-800 p-4 rounded-lg"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: '4px',
        width: 'fit-content',
        margin: '0 auto',
      }}
    >
      {emojis.map((emoji, index) => (
        <div
          key={index}
          className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded cursor-pointer"
          onClick={() => {
            if (emoji === '🎯') {
              onCorrectGuess();
            }
          }}
        >
          <span
            className="text-2xl"
            style={{
              animation: emoji !== '🎯' ? 'float 0.5s ease-in-out infinite alternate' : 'none',
            }}
          >
            {emoji}
          </span>
        </div>
      ))}
    </div>
  );
};

export default EmojiGrid;
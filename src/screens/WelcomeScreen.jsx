import React, { useState } from 'react';
import PixelButton from '../components/PixelButton';
import { useGame } from '../context/GameContext';
import '../styles/pixel-theme.css';

const WelcomeScreen = () => {
  const { startGame } = useGame();
  const [inputClass, setInputClass] = useState('');
  const [id, setId] = useState('');

  const handleStart = () => {
    if (!id.trim()) {
       setInputClass('animate-shake'); // TODO: Add shake animation in CSS
       setTimeout(() => setInputClass(''), 500);
       return;
    }
    startGame(id);
  };

  return (
    <div className="pixel-container">
      <h1 className="text-4xl mb-8 pixel-text-shadow text-[var(--pixel-primary)]">
        PIXEL QUIZ
      </h1>
      <div className="pixel-card max-w-md mx-auto">
        <p className="mb-4">ENTER YOUR ID TO START</p>
        <input 
          type="text" 
          value={id}
          onChange={(e) => setId(e.target.value)}
          className={`pixel-input mb-6 ${inputClass}`}
          placeholder="PLAYER ID"
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
        />
        <br />
        <PixelButton onClick={handleStart} variant="primary">
          START GAME
        </PixelButton>
      </div>
    </div>
  );
};

export default WelcomeScreen;

import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import WelcomeScreen from './screens/WelcomeScreen';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';
import './index.css';

const GameContent = () => {
  const { gameState } = useGame();

  switch (gameState) {
    case 'LOADING':
      return (
        <div className="text-center animate-pulse">
            <h2 className="text-2xl text-[var(--pixel-accent)]">LOADING...</h2>
        </div>
      );
    case 'PLAYING':
      return <QuizScreen />;
    case 'RESULT':
      return <ResultScreen />;
    case 'WELCOME':
    default:
      return <WelcomeScreen />;
  }
};

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen flex items-center justify-center bg-[var(--pixel-bg)] text-[var(--pixel-text)] font-[var(--pixel-font)]">
         <GameContent />
      </div>
    </GameProvider>
  );
}

export default App;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchQuestions, submitScore } from '../services/api';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState('WELCOME'); // WELCOME, LOADING, PLAYING, RESULT
  const [user, setUser] = useState({ id: '', startTime: null });
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // Array of { qn_id, answer, isCorrect }
  const [result, setResult] = useState(null);
  
  // Environment variables
  const QUESTION_COUNT = parseInt(import.meta.env.VITE_QUESTION_COUNT || '5');
  const PASS_THRESHOLD = parseInt(import.meta.env.VITE_PASS_THRESHOLD || '3');

  const startGame = async (userId) => {
    setUser({ id: userId, startTime: Date.now() });
    setGameState('LOADING');
    try {
      const qns = await fetchQuestions(QUESTION_COUNT);
      // Preload avatars
      qns.forEach((q, i) => {
         const img = new Image();
         img.src = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${q.qn_id}`;
      });
      
      setQuestions(qns);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setResult(null);
      setGameState('PLAYING');
    } catch (e) {
      console.error("Failed to start", e);
      setGameState('WELCOME'); // TODO: Show error
    }
  };

  const answerQuestion = (selectedOption) => {
    const currentQ = questions[currentQuestionIndex];
    if (!currentQ) return;

    const isCorrect = selectedOption === currentQ.answer;
    const newAnswers = [...answers, { qn_id: currentQ.qn_id, answer: selectedOption, isCorrect }];
    setAnswers(newAnswers);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishGame(newAnswers);
    }
  };

  const finishGame = async (finalAnswers) => {
    setGameState('LOADING');
    const correctCount = finalAnswers.filter(a => a.isCorrect).length;
    const isPass = correctCount >= PASS_THRESHOLD;
    
    // Construct payload for GAS
    // ID, CorrectCount, Total, isPass, etc.
    const finalScore = correctCount * (100 / questions.length);
    const payload = {
        userId: user.id,
        score: finalScore, 
        // User asked: "Calculate result and record to Sheets"
        // We'll send raw data or calculated score. Let's send calculated.
        correctCount,
        totalQuestions: questions.length,
        isPass,
        answers: finalAnswers
    };

    try {
        const res = await submitScore(payload);
        setResult({ ...res, score: finalScore, correctCount, isPass, totalQuestions: questions.length });
    } catch(e) {
        console.error("Submit failed", e);
        setResult({ score: finalScore, correctCount, isPass, totalQuestions: questions.length, error: true });
    }
    setGameState('RESULT');
  };

  const resetGame = () => {
    setGameState('WELCOME');
    setUser({ id: '', startTime: null });
    setQuestions([]);
  };

  const value = {
    gameState,
    user,
    questions,
    currentQuestionIndex,
    currentQuestion: questions[currentQuestionIndex],
    answers,
    result,
    startGame,
    answerQuestion,
    resetGame,
    PASS_THRESHOLD
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

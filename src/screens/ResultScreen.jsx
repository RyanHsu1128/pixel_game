import React from 'react';
import { useGame } from '../context/GameContext';
import PixelButton from '../components/PixelButton';
import PixelCard from '../components/PixelCard';

const ResultScreen = () => {
  const { result, resetGame, user, questions, answers } = useGame();
  const [showReview, setShowReview] = React.useState(false);

  if (!result) return <div>Calculating Results...</div>;

  return (
    <div className="pixel-container max-h-screen overflow-y-auto">
      <h1 className="text-4xl mb-4 pixel-text-shadow">GAME OVER</h1>
      
      <PixelCard className="max-w-md mx-auto animate-bounce-in">
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-2">PLAYER: {user.id}</p>
          <div className="text-6xl font-bold text-[var(--pixel-accent)] mb-2">
            {result.score ? Math.round(result.score) : 0}
          </div>
          <p>SCORE</p>
        </div>

        <div className={`text-2xl mb-8 ${result.isPass ? 'text-[var(--pixel-secondary)]' : 'text-[var(--pixel-primary)]'}`}>
          {result.isPass ? "MISSION PASSED!" : "MISSION FAILED"}
        </div>
        
        <div className="text-sm mb-6 space-y-2">
           <p>Correct Answers: {result.correctCount} / {result.totalQuestions}</p>
           {result.newTotal && <p>Total XP: {result.newTotal}</p>}
        </div>

        <div className="flex flex-col gap-4">
            <PixelButton onClick={() => setShowReview(!showReview)} variant="secondary">
                {showReview ? "HIDE REVIEW" : "REVIEW ANSWERS"}
            </PixelButton>

            {showReview && (
                <div className="custom-scrollbar">
                    {questions.map((q, idx) => {
                        const userAnswer = answers.find(a => a.qn_id === q.qn_id);
                        const isCorrect = userAnswer?.isCorrect;
                        
                        return (
                            <div key={q.qn_id} className={`review-item ${isCorrect ? 'review-correct' : 'review-wrong'}`}>
                                <p className="mb-2 font-bold text-white">{idx + 1}. {q.question}</p>
                                
                                <p className={`review-label ${isCorrect ? 'text-green' : 'text-red'}`}>
                                    YOURS: {userAnswer?.answer || "None"} ({q[userAnswer?.answer]})
                                </p>
                                
                                {!isCorrect && (
                                    <p className="review-label text-green">
                                        RIGHT: {q.answer} ({q[q.answer]})
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            <PixelButton onClick={resetGame} variant="primary">
            PLAY AGAIN
            </PixelButton>
        </div>
      </PixelCard>
    </div>
  );
};

export default ResultScreen;

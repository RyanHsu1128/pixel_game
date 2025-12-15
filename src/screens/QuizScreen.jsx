import React from 'react';
import { useGame } from '../context/GameContext';
import PixelButton from '../components/PixelButton';
import PixelCard from '../components/PixelCard';
import Avatar from '../components/Avatar';

const QuizScreen = () => {
  const { currentQuestion, currentQuestionIndex, questions, answerQuestion } = useGame();
  
  if (!currentQuestion) return <div className="text-center">Loading Question...</div>;

  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="pixel-container w-full max-w-4xl">
      {/* Progress Bar */}
      <div className="w-full h-4 border-2 border-white mb-6 relative">
        <div 
          className="h-full bg-[var(--pixel-secondary)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Boss Avatar */}
        <div className="flex-shrink-0 text-center">
             <Avatar seed={currentQuestion.qn_id} size={200} className="mb-4" />
             <div className="text-[var(--pixel-primary)] text-sm">LEVEL {currentQuestionIndex + 1}</div>
        </div>

        {/* Question Card */}
        <PixelCard className="flex-grow w-full text-left">
          <h2 className="text-xl md:text-2xl mb-6 leading-relaxed">
            {currentQuestion.question}
          </h2>

          <div className="grid grid-cols-1 gap-4">
             {['A', 'B', 'C', 'D'].map((optKey) => (
               <PixelButton 
                 key={optKey} 
                 variant="outline" 
                 className="w-full text-left justify-start hover:bg-white/20"
                 onClick={() => answerQuestion(optKey)}
               >
                 <span className="text-[var(--pixel-accent)] mr-4">{optKey}.</span> 
                 {currentQuestion[optKey]}
               </PixelButton>
             ))}
          </div>
        </PixelCard>
      </div>
    </div>
  );
};

export default QuizScreen;

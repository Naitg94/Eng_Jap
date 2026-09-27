import React, { useEffect } from 'react';
import type { PracticeQuestion } from '../../types/learning';
import { CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';

interface PracticeFeedbackProps {
  question: PracticeQuestion;
  userAnswer: string;
  isCorrect: boolean;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export const PracticeFeedback: React.FC<PracticeFeedbackProps> = ({
  question,
  userAnswer,
  isCorrect,
  onNextQuestion,
  isLastQuestion
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onNextQuestion();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNextQuestion]);

  const target = question.targetItem;

  return (
    <div className="w-full max-w-xl mx-auto animate-fadeIn mt-5">
      <div
        className={`p-5 sm:p-6 rounded-3xl border shadow-xl ${
          isCorrect
            ? 'bg-emerald-50/95 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800'
            : 'bg-rose-50/95 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800'
        }`}
      >
        {/* Status Header */}
        <div className="flex items-center gap-3">
          {isCorrect ? (
            <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <XCircle className="w-8 h-8 text-rose-600 dark:text-rose-400 shrink-0" />
          )}

          <div>
            <h3
              className={`text-lg sm:text-xl font-black tracking-tight ${
                isCorrect
                  ? 'text-emerald-900 dark:text-emerald-200'
                  : 'text-rose-900 dark:text-rose-200'
              }`}
            >
              {isCorrect ? 'Correct! ✓' : 'Incorrect ✕'}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-300">
              {question.prompt} = <span className="font-extrabold text-stone-900 dark:text-stone-100">{question.expectedAnswer}</span>
            </p>
          </div>
        </div>

        {/* Detailed Breakdown if incorrect */}
        {!isCorrect && (
          <div className="mt-3.5 p-3.5 rounded-2xl bg-white/80 dark:bg-stone-900/80 border border-rose-200 dark:border-rose-900/60 text-xs sm:text-sm space-y-1.5 shadow-xs">
            <div className="flex items-center justify-between text-stone-600 dark:text-stone-400">
              <span>Your answer:</span>
              <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">
                {userAnswer || '(no answer)'}
              </span>
            </div>
            <div className="flex items-center justify-between text-stone-800 dark:text-stone-200 font-extrabold">
              <span>Correct answer:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                {question.expectedAnswer}
              </span>
            </div>
          </div>
        )}

        {/* Character Card / Mnemonic reminder if available */}
        {target && (
          <div className="mt-4 pt-3.5 border-t border-stone-200/80 dark:border-stone-800 flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center text-2xl font-bold font-serif text-red-600 dark:text-red-400 shrink-0 shadow-xs">
              {target.character}
            </div>
            <div className="text-xs space-y-1 min-w-0">
              <div className="flex items-center gap-1 text-[11px] font-black text-amber-700 dark:text-amber-400 uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Memory Mnemonic</span>
              </div>
              <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                {target.mnemonic}
              </p>
            </div>
          </div>
        )}

        {/* Next Question CTA */}
        <button
          onClick={onNextQuestion}
          autoFocus
          className={`w-full mt-4 py-3.5 rounded-2xl font-black text-sm text-white flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer ${
            isCorrect
              ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25'
              : 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/25'
          }`}
        >
          <span>{isLastQuestion ? 'View Results' : 'Next Question'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-center text-stone-400 dark:text-stone-500 mt-2">
          Press <kbd className="font-mono bg-white/70 dark:bg-stone-800 px-1.5 py-0.5 rounded text-[10px] border border-stone-300 dark:border-stone-700">Enter ↵</kbd> to proceed
        </p>
      </div>
    </div>
  );
};

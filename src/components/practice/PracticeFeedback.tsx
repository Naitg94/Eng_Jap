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
    <div className="w-full max-w-md mx-auto animate-fadeIn mt-6">
      <div
        className={`p-5 rounded-3xl border shadow-lg ${
          isCorrect
            ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
            : 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800'
        }`}
      >
        {/* Status Header */}
        <div className="flex items-center gap-3">
          {isCorrect ? (
            <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <XCircle className="w-7 h-7 text-rose-600 dark:text-rose-400 shrink-0" />
          )}

          <div>
            <h3
              className={`text-lg font-black tracking-tight ${
                isCorrect
                  ? 'text-emerald-900 dark:text-emerald-200'
                  : 'text-rose-900 dark:text-rose-200'
              }`}
            >
              {isCorrect ? 'Correct! ✓' : 'Incorrect ✕'}
            </h3>
            <p className="text-xs font-medium text-stone-600 dark:text-stone-300">
              {question.prompt} = <span className="font-bold">{question.expectedAnswer}</span>
            </p>
          </div>
        </div>

        {/* Detailed Breakdown if incorrect */}
        {!isCorrect && (
          <div className="mt-3 p-3 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-rose-200 dark:border-rose-900/50 text-xs space-y-1">
            <div className="flex items-center justify-between text-stone-500">
              <span>Your answer:</span>
              <span className="font-bold text-rose-600 font-mono">
                {userAnswer || '(no answer)'}
              </span>
            </div>
            <div className="flex items-center justify-between text-stone-700 dark:text-stone-200 font-semibold">
              <span>Correct answer:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                {question.expectedAnswer}
              </span>
            </div>
          </div>
        )}

        {/* Character Card / Mnemonic reminder if available */}
        {target && (
          <div className="mt-3.5 pt-3 border-t border-stone-200/60 dark:border-stone-800/60 flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center text-2xl font-bold text-red-600 dark:text-red-400 shrink-0">
              {target.character}
            </div>
            <div className="text-xs space-y-0.5 min-w-0">
              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase">
                <Sparkles className="w-3 h-3" />
                <span>Mnemonic Hint</span>
              </div>
              <p className="text-stone-700 dark:text-stone-300 line-clamp-2">
                {target.mnemonic}
              </p>
            </div>
          </div>
        )}

        {/* Next Question CTA */}
        <button
          onClick={onNextQuestion}
          autoFocus
          className={`w-full mt-4 py-3 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all ${
            isCorrect
              ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
              : 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
          }`}
        >
          <span>{isLastQuestion ? 'View Results' : 'Next Question'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-center text-stone-400 dark:text-stone-500 mt-2">
          Press <kbd className="font-mono bg-white/60 dark:bg-stone-800 px-1.5 py-0.5 rounded text-[10px]">Enter ↵</kbd> to proceed
        </p>
      </div>
    </div>
  );
};

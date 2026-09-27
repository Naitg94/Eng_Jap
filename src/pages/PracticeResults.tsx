import React, { useEffect } from 'react';
import type { PracticeSessionSummary, QuestionResult } from '../types/learning';
import { ALL_HIRAGANA } from '../data/hiraganaMaster';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  Clock,
  RotateCcw,
  AlertCircle
} from 'lucide-react';

interface PracticeResultsProps {
  summary: PracticeSessionSummary;
  onPracticeAgain: () => void;
  onReviewMistakes: () => void;
  onBackToPractice: () => void;
}

export const PracticeResults: React.FC<PracticeResultsProps> = ({
  summary,
  onPracticeAgain,
  onReviewMistakes,
  onBackToPractice
}) => {
  useEffect(() => {
    if (summary.accuracy >= 70) {
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [summary.accuracy]);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const uniqueMistakes = Array.from(
    new Set(summary.mistakes.map((m: QuestionResult) => m.itemCharacter || m.expectedAnswer))
  ).map((char: string) => {
    const item = ALL_HIRAGANA.find((i) => i.character === char);
    return {
      character: char,
      romaji: item ? item.romaji : char,
      mnemonic: item ? item.mnemonic : ''
    };
  });

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4 animate-fadeIn space-y-6">
      {/* Celebration Header */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-red-500 to-rose-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-red-600/30">
          <Trophy className="w-10 h-10" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Practice Complete! 🎉
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
          {summary.accuracy >= 90
            ? 'Outstanding performance! Your kana recognition is razor sharp.'
            : summary.accuracy >= 70
            ? 'Great session! Consistent practice builds permanent recall.'
            : 'Good drill! Review the characters below to reinforce memory.'}
        </p>
      </div>

      {/* Main Score Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Accuracy */}
        <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 text-center shadow-xs">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 dark:text-stone-500">
            Accuracy
          </span>
          <div
            className={`text-4xl font-black mt-1 ${
              summary.accuracy >= 80
                ? 'text-emerald-600 dark:text-emerald-400'
                : summary.accuracy >= 60
                ? 'text-amber-500'
                : 'text-rose-500'
            }`}
          >
            {summary.accuracy}%
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-bold">
            {summary.correctCount} of {summary.totalQuestions} correct
          </span>
        </div>

        {/* Correct */}
        <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 text-center shadow-xs">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 dark:text-stone-500">
            Correct Answers
          </span>
          <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mt-1 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            <span>{summary.correctCount}</span>
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-bold">
            {summary.incorrectCount} missed
          </span>
        </div>

        {/* Time */}
        <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 text-center shadow-xs">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 dark:text-stone-500">
            Session Time
          </span>
          <div className="text-4xl font-black text-stone-900 dark:text-stone-100 mt-1 flex items-center justify-center gap-1.5">
            <Clock className="w-6 h-6 text-stone-400" />
            <span>{formatDuration(summary.durationSeconds)}</span>
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-bold">total duration</span>
        </div>
      </div>

      {/* Characters to Review Section */}
      {uniqueMistakes.length > 0 && (
        <div className="p-5 sm:p-6 rounded-3xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-rose-900 dark:text-rose-300 font-black text-sm">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>Characters to Review ({uniqueMistakes.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {uniqueMistakes.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-rose-200/80 dark:border-rose-900/40 flex items-center gap-3 shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-red-950/60 text-rose-700 dark:text-rose-400 font-bold text-2xl flex items-center justify-center font-serif shrink-0">
                  {item.character}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono font-black text-stone-900 dark:text-stone-100">
                    → {item.romaji}
                  </div>
                  {item.mnemonic && (
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate" title={item.mnemonic}>
                      {item.mnemonic}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {summary.incorrectCount > 0 && (
          <button
            onClick={onReviewMistakes}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black text-sm shadow-md shadow-amber-600/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Drill Mistakes ({summary.incorrectCount})</span>
          </button>
        )}

        <button
          onClick={onPracticeAgain}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-lg shadow-red-600/25 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Practice Again</span>
        </button>

        <button
          onClick={onBackToPractice}
          className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700 font-bold text-sm shadow-xs transition-all cursor-pointer"
        >
          <span>Change Practice Setup</span>
        </button>
      </div>
    </div>
  );
};

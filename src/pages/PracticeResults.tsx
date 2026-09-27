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
    // Fire confetti celebration if accuracy is >= 70%
    if (summary.accuracy >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
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

  // Unique mistaken characters
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
    <div className="w-full max-w-2xl mx-auto py-8 px-4 animate-fadeIn">
      {/* Celebration Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="w-16 h-16 rounded-3xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto shadow-lg shadow-red-600/10">
          <Trophy className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Practice Complete! 🎉
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {summary.accuracy >= 90
            ? 'Outstanding performance! You are mastering these characters.'
            : summary.accuracy >= 70
            ? 'Great session! Consistent practice makes permanent memory.'
            : 'Good effort! Review the characters below to strengthen your memory.'}
        </p>
      </div>

      {/* Main Score Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {/* Accuracy */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 text-center shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
            Accuracy
          </span>
          <div
            className={`text-3xl font-black mt-1 ${
              summary.accuracy >= 80
                ? 'text-emerald-600'
                : summary.accuracy >= 60
                ? 'text-amber-500'
                : 'text-rose-500'
            }`}
          >
            {summary.accuracy}%
          </div>
          <span className="text-[11px] text-stone-400 font-medium">
            {summary.correctCount} / {summary.totalQuestions}
          </span>
        </div>

        {/* Correct */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 text-center shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
            Correct
          </span>
          <div className="text-3xl font-black text-emerald-600 mt-1 flex items-center justify-center gap-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>{summary.correctCount}</span>
          </div>
          <span className="text-[11px] text-stone-400 font-medium">questions</span>
        </div>

        {/* Time */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 text-center shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
            Time
          </span>
          <div className="text-3xl font-black text-stone-800 mt-1 flex items-center justify-center gap-1">
            <Clock className="w-5 h-5 text-stone-400" />
            <span>{formatDuration(summary.durationSeconds)}</span>
          </div>
          <span className="text-[11px] text-stone-400 font-medium">total duration</span>
        </div>
      </div>

      {/* Characters to Review Section */}
      {uniqueMistakes.length > 0 && (
        <div className="mb-8 p-5 rounded-3xl bg-rose-50/60 border border-rose-200">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-sm mb-3">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>Characters to Review ({uniqueMistakes.length})</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {uniqueMistakes.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-white border border-rose-200/80 flex items-center gap-3 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 font-bold text-2xl flex items-center justify-center font-serif">
                  {item.character}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono font-bold text-stone-900">
                    → {item.romaji}
                  </div>
                  {item.mnemonic && (
                    <div className="text-[10px] text-stone-500 truncate" title={item.mnemonic}>
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
      <div className="flex flex-wrap items-center justify-center gap-3">
        {summary.incorrectCount > 0 && (
          <button
            onClick={onReviewMistakes}
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md shadow-amber-600/20 transition-all hover:scale-[1.01]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Review Mistakes ({summary.incorrectCount})</span>
          </button>
        )}

        <button
          onClick={onPracticeAgain}
          className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/20 transition-all hover:scale-[1.01]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Practice Again</span>
        </button>

        <button
          onClick={onBackToPractice}
          className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl border border-stone-300 bg-white text-stone-800 hover:bg-stone-50 font-bold text-sm shadow-xs transition-all"
        >
          <span>Change Practice Setup</span>
        </button>
      </div>
    </div>
  );
};

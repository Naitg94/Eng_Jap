import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Dumbbell,
  Layers,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const Home: React.FC = () => {
  const { dueCount, setActiveTab, setQuickPracticeConfig } = useApp();

  const handleReviewDueNow = () => {
    setQuickPracticeConfig({
      sessionSource: 'due',
      questionCount: Math.max(5, dueCount)
    });
    setActiveTab('practice');
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 sm:py-12 px-3 sm:px-6 space-y-10 sm:space-y-12 animate-fadeIn">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
          <span>Complete Japanese Hiragana Mastery</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
          Learn Japanese, <br />
          <span className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
            one character at a time.
          </span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Master 104 Hiragana characters through interactive charts, stroke order animations, handwriting canvas, and SM-2 spaced repetition drills.
        </p>

        {/* Quick Launch Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <button
            onClick={() => setActiveTab('learn')}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-sm shadow-xl shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Explore Syllabary Chart</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl border-2 border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800 font-black text-sm shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Dumbbell className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span>Custom Practice Drill</span>
          </button>
        </div>
      </div>

      {/* Due for Review Alert Box */}
      {dueCount > 0 && (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-rose-500/15 via-red-500/10 to-transparent dark:from-rose-950/40 dark:via-red-950/20 border-2 border-red-300 dark:border-red-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-stone-900 dark:text-stone-100 text-base sm:text-lg">
                {dueCount} character{dueCount === 1 ? '' : 's'} due for review today!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-0.5">
                Spaced repetition algorithm recommends refreshing these now to secure long-term memory.
              </p>
            </div>
          </div>

          <button
            onClick={handleReviewDueNow}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-red-600/25 shrink-0 transition-colors cursor-pointer text-center"
          >
            Review Now
          </button>
        </div>
      )}

      {/* Core Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Learn Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-red-400 dark:hover:border-red-600 hover:shadow-lg transition-all group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400 flex items-center justify-center font-black text-2xl font-serif shadow-xs">
              あ
            </div>
            <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Study Chart
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Explore 46 basic characters, 20 voiced dakuten, 5 handakuten, and 33 contracted yōon with visual stroke animations and audio hints.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('learn')}
            className="w-full py-3 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white font-black text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Open Chart</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Practice Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-lg transition-all group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Custom Practice
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Build personalized drills: select specific rows, test confusing pairs (さ vs ち), draw on the interactive canvas, or test vocabulary.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('practice')}
            className="w-full py-3 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 dark:hover:text-white font-black text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Start Practice</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Flashcards Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg transition-all group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              3D Flashcards
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Flip through 3D cards with keyboard shortcuts or touch. Rate your memory recall to update spaced repetition intervals automatically.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('flashcards')}
            className="w-full py-3 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white font-black text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Flip Flashcards</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

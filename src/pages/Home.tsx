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
    <div className="w-full max-w-5xl mx-auto py-10 px-4 sm:px-6 space-y-10 animate-fadeIn">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hiragana Mastery</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-none">
          Learn Japanese, <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
            one character at a time.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Master Hiragana — every sound, every combination — through flexible practice built around what you want to learn.
        </p>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('learn')}
            className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-md shadow-red-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <span>Learn Hiragana</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className="px-6 py-3.5 rounded-2xl border-2 border-stone-300 bg-white text-stone-800 hover:bg-stone-50 font-extrabold text-sm shadow-xs transition-all flex items-center gap-2"
          >
            <Dumbbell className="w-4 h-4 text-red-600" />
            <span>Take a Practice Test</span>
          </button>
        </div>
      </div>

      {/* Due for Review Highlight Prompt (if any due per spaced repetition) */}
      {dueCount > 0 && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-rose-500/10 via-red-500/10 to-transparent border-2 border-red-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm animate-pulse">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-600/30 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">
                {dueCount} character{dueCount === 1 ? '' : 's'} are due for review today.
              </h3>
              <p className="text-xs text-stone-600">
                Spaced repetition schedule recommends reviewing these now to prevent forgetting.
              </p>
            </div>
          </div>

          <button
            onClick={handleReviewDueNow}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm shrink-0 transition-colors"
          >
            Review Now
          </button>
        </div>
      )}

      {/* Core Navigation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Hiragana Card */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-red-300 transition-all group">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-2xl font-serif">
              あ
            </div>
            <h3 className="text-xl font-bold text-stone-900 group-hover:text-red-600 transition-colors">
              Hiragana
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Learn the complete Japanese phonetic alphabet, including basic rows, voiced sounds (dakuten), semi-voiced (handakuten), and contractions (yōon).
            </p>
          </div>

          <button
            onClick={() => setActiveTab('learn')}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-100 text-stone-800 hover:bg-red-600 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Practice Card */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-300 transition-all group">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
              Practice
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Create a custom practice session. Combine any groups or individual characters, try drawing on the canvas, or drill confusable pairs.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('practice')}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-100 text-stone-800 hover:bg-amber-600 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Start Practice</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Flashcards Card */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-300 transition-all group">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 group-hover:text-blue-600 transition-colors">
              Flashcards
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Quick review with zero score pressure. Flip interactive cards to reinforce character shape, reading, and mnemonics.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('flashcards')}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-100 text-stone-800 hover:bg-blue-600 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Review Flashcards</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Katakana (Coming Soon) Card */}
        <div className="p-6 rounded-3xl bg-stone-50/60 border border-dashed border-stone-300 flex flex-col justify-between space-y-4 opacity-75">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-stone-200 text-stone-400 flex items-center justify-center text-2xl font-serif">
              ア
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-stone-500">
                Katakana
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-200 text-stone-600">
                Coming Soon
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Katakana learning and practice will be available soon. Complete Hiragana first to build a solid foundation!
            </p>
          </div>

          <div className="w-full py-2 px-3 rounded-xl border border-stone-200 text-center text-xs text-stone-400 font-semibold cursor-not-allowed">
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { HiraganaTable } from '../components/hiragana/HiraganaTable';
import { useApp } from '../context/AppContext';
import type { LearningItem } from '../types/learning';
import { Sparkles, Dumbbell, Layers, BookOpen } from 'lucide-react';

export const Learn: React.FC = () => {
  const [scriptTab, setScriptTab] = useState<'hiragana' | 'katakana'>('hiragana');
  const { openCharacterModal, setActiveTab } = useApp();

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-8 px-3 sm:px-6 space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold tracking-wide uppercase bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60">
              <BookOpen className="w-3 h-3" />
              Syllabary Chart
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
            Learn Japanese Script
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
            Interactive chart with mnemonics, dakuten variants, audio hints, and mastery tracking.
          </p>
        </div>

        {/* Script Switcher: Hiragana vs Katakana */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 dark:bg-stone-800/80 rounded-2xl max-w-fit shadow-xs border border-stone-300/50 dark:border-stone-700/50">
          <button
            onClick={() => setScriptTab('hiragana')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
              scriptTab === 'hiragana'
                ? 'bg-red-600 text-white shadow-sm scale-[1.02]'
                : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Hiragana (ひらがな)
          </button>

          <button
            onClick={() => setScriptTab('katakana')}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              scriptTab === 'katakana'
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <span>Katakana</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-stone-300 dark:bg-stone-700 text-stone-800 dark:text-stone-200">
              Soon
            </span>
          </button>
        </div>
      </div>

      {/* Hiragana View */}
      {scriptTab === 'hiragana' ? (
        <div className="space-y-6">
          {/* Quick Practice Banner */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-red-500/10 via-rose-500/5 to-amber-500/5 dark:from-red-950/40 dark:via-rose-950/20 dark:to-transparent border border-red-200/90 dark:border-red-900/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-700 dark:text-red-400">
                <Sparkles className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>Ready to test your recall?</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                Jump straight into a personalized practice test or flip through flashcards.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('flashcards')}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold hover:bg-stone-50 dark:hover:bg-stone-700 transition-all shadow-xs"
              >
                <Layers className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
                <span>Flashcards</span>
              </button>

              <button
                onClick={() => setActiveTab('practice')}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold transition-all shadow-md shadow-red-600/20 hover:scale-[1.02]"
              >
                <Dumbbell className="w-3.5 h-3.5" />
                <span>Custom Practice</span>
              </button>
            </div>
          </div>

          {/* Interactive Hiragana Table */}
          <HiraganaTable
            onSelectCharacter={(item: LearningItem) => openCharacterModal(item)}
          />
        </div>
      ) : (
        /* Katakana Coming Soon View */
        <div className="p-8 sm:p-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xs max-w-xl mx-auto my-8 space-y-4 animate-fadeIn">
          <div className="w-20 h-20 rounded-3xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto text-4xl font-bold font-serif shadow-inner border border-red-200/80 dark:border-red-900/60">
            ア
          </div>

          <div>
            <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100">
              Katakana (カタカナ)
            </h3>
            <div className="inline-block my-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40">
              Coming Soon in Next Update
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto mt-2 leading-relaxed">
              Katakana learning and practice will be available soon. Complete Hiragana first to build your strong foundation!
            </p>
          </div>

          <button
            onClick={() => setScriptTab('hiragana')}
            className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-sm"
          >
            Return to Hiragana Chart
          </button>
        </div>
      )}
    </div>
  );
};

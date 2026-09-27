import React, { useState } from 'react';
import { HiraganaTable } from '../components/hiragana/HiraganaTable';
import { useApp } from '../context/AppContext';
import type { LearningItem } from '../types/learning';
import { Sparkles, Dumbbell, Layers } from 'lucide-react';

export const Learn: React.FC = () => {
  const [scriptTab, setScriptTab] = useState<'hiragana' | 'katakana'>('hiragana');
  const { openCharacterModal, setActiveTab } = useApp();

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
            Learn Japanese Script
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            Systematic study of characters, stroke orders, mnemonics, and sound variations
          </p>
        </div>

        {/* Script Switcher: Hiragana vs Katakana */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 dark:bg-stone-800 rounded-2xl max-w-fit">
          <button
            onClick={() => setScriptTab('hiragana')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
              scriptTab === 'hiragana'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Hiragana (ひらがな)
          </button>

          <button
            onClick={() => setScriptTab('katakana')}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              scriptTab === 'katakana'
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <span>Katakana (カタカナ)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-stone-300 dark:bg-stone-700 text-stone-700 dark:text-stone-300">
              Soon
            </span>
          </button>
        </div>
      </div>

      {/* Hiragana View */}
      {scriptTab === 'hiragana' ? (
        <div className="space-y-6">
          {/* Quick Practice Banner */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-red-500/10 via-rose-500/5 to-transparent border border-red-200 dark:border-red-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready to test your recall?</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300">
                Jump straight into a personalized practice test or flip through flashcards.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('flashcards')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-stone-50 transition-colors shadow-xs"
              >
                <Layers className="w-3.5 h-3.5 text-stone-500" />
                <span>Flashcards</span>
              </button>

              <button
                onClick={() => setActiveTab('practice')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-xs"
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
        <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xs max-w-xl mx-auto my-12 space-y-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-3xl bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 flex items-center justify-center mx-auto text-3xl font-bold font-serif shadow-inner">
            ア
          </div>

          <div>
            <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100">
              Katakana
            </h3>
            <div className="inline-block my-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40">
              Coming Soon
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto mt-2 leading-relaxed">
              Katakana learning and practice will be available in a future version. Complete Hiragana first to build a solid foundation!
            </p>
          </div>

          <button
            onClick={() => setScriptTab('hiragana')}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            Return to Hiragana Mastery
          </button>
        </div>
      )}
    </div>
  );
};

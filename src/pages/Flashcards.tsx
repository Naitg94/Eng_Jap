import React, { useState, useEffect } from 'react';
import type { LearningItem } from '../types/learning';
import {
  BASIC_ROWS,
  ALL_HIRAGANA,
  HIRAGANA_BASIC
} from '../data/hiraganaMaster';
import { recordFlashcardRating } from '../services/scoring';
import { useApp } from '../context/AppContext';
import {
  Check,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Filter,
  Layers,
  RotateCw
} from 'lucide-react';

export const Flashcards: React.FC = () => {
  const { refreshStats } = useApp();

  const [poolGroup, setPoolGroup] = useState<string>('basic');
  const [deck, setDeck] = useState<LearningItem[]>(HIRAGANA_BASIC);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [reviewsDone, setReviewsDone] = useState<number>(0);

  // Update deck when group changes
  useEffect(() => {
    let items: LearningItem[] = [];
    if (poolGroup === 'all') {
      items = ALL_HIRAGANA;
    } else if (poolGroup === 'basic') {
      items = HIRAGANA_BASIC;
    } else if (poolGroup === 'dakuten') {
      items = ALL_HIRAGANA.filter((i) => i.group === 'dakuten');
    } else if (poolGroup === 'handakuten') {
      items = ALL_HIRAGANA.filter((i) => i.group === 'handakuten');
    } else if (poolGroup === 'yoon') {
      items = ALL_HIRAGANA.filter((i) => i.group === 'yoon');
    } else {
      // Row specific
      items = ALL_HIRAGANA.filter((i) => i.row === poolGroup);
    }
    // Shuffle deck
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setDeck(shuffled.length > 0 ? shuffled : HIRAGANA_BASIC);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [poolGroup]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleAnswer(true);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleAnswer(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, deck, isFlipped]);

  const currentCard = deck[currentIndex] || deck[0];

  const handleAnswer = (remembered: boolean) => {
    if (!currentCard) return;

    recordFlashcardRating(currentCard.id, remembered);
    refreshStats();
    setReviewsDone((prev) => prev + 1);

    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex + 1 < deck.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Reshuffle deck for continuous practice
        const reshuffled = [...deck].sort(() => Math.random() - 0.5);
        setDeck(reshuffled);
        setCurrentIndex(0);
      }
    }, 150);
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex + 1 < deck.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (!currentCard) {
    return (
      <div className="text-center py-20 text-stone-500 dark:text-stone-400">
        No cards available for this group.
      </div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / deck.length) * 100);

  return (
    <div className="w-full max-w-lg mx-auto py-6 sm:py-8 px-3 sm:px-4 space-y-5 sm:space-y-6 animate-fadeIn">
      {/* Top Header & Group Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60">
              <Layers className="w-3 h-3" />
              Flip & Learn
            </span>
          </div>
          <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
            Flashcard Review
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Interactive self-study • Flip, rate, and reinforce memory
          </p>
        </div>

        {/* Group Selector Dropdown */}
        <div className="flex items-center gap-1.5 text-xs">
          <Filter className="w-4 h-4 text-stone-400 shrink-0" />
          <select
            value={poolGroup}
            onChange={(e) => setPoolGroup(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold focus:outline-hidden focus:ring-2 focus:ring-red-500 shadow-xs cursor-pointer"
          >
            <option value="basic">Basic Hiragana (46)</option>
            <option value="dakuten">Voiced / Dakuten (20)</option>
            <option value="handakuten">Semi-Voiced / P (5)</option>
            <option value="yoon">Contracted / Yōon (33)</option>
            <option value="all">All Hiragana (104)</option>
            <optgroup label="Basic Rows">
              {BASIC_ROWS.map((r) => (
                <option key={r.id} value={r.name.split(' ')[0]}>
                  {r.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Progress Bar & Counters */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-400 px-1 font-semibold">
          <span>
            Card <strong className="text-stone-900 dark:text-stone-100">{currentIndex + 1}</strong> of {deck.length}
          </span>
          <span>
            Reviewed this session: <strong className="text-red-600 dark:text-red-400">{reviewsDone}</strong>
          </span>
        </div>
        <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-rose-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div
        className="w-full aspect-[4/3] min-h-[300px] max-h-[380px] perspective cursor-pointer select-none"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d rounded-3xl shadow-xl shadow-stone-900/5 dark:shadow-stone-950/40 border border-stone-200/90 dark:border-stone-800 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Card Front */}
          <div className="absolute inset-0 backface-hidden bg-gradient-to-b from-white to-stone-50/80 dark:from-stone-900 dark:to-stone-850 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between">
            <div className="w-full flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700">
                {currentCard.group} Hiragana
              </span>
              <span className="text-[11px] font-medium text-stone-400 dark:text-stone-500 flex items-center gap-1">
                <RotateCw className="w-3 h-3" />
                Tap to flip
              </span>
            </div>

            {/* Huge Character */}
            <div className="text-8xl sm:text-9xl font-bold font-serif text-stone-900 dark:text-stone-100 drop-shadow-sm select-none">
              {currentCard.character}
            </div>

            <span className="text-xs text-stone-400 dark:text-stone-500 font-medium">
              Space / Tap to reveal reading & mnemonic
            </span>
          </div>

          {/* Card Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-stone-50 dark:bg-stone-900 rounded-3xl p-5 sm:p-7 flex flex-col justify-between overflow-y-auto border border-red-200/80 dark:border-red-900/60">
            {/* Header / Phonetics */}
            <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-stone-800 pb-2.5">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-serif text-red-600 dark:text-red-400">
                  {currentCard.character}
                </span>
                <span className="text-2xl font-black text-stone-900 dark:text-stone-100">
                  = {currentCard.romaji}
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  ("{currentCard.pronunciation}")
                </span>
              </div>
              <span className="text-xs font-bold text-stone-400 dark:text-stone-500 font-mono">
                {currentCard.row}
              </span>
            </div>

            {/* Mnemonic Story */}
            <div className="my-2 p-3 sm:p-3.5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200/90 dark:border-amber-900/40">
              <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Memory Mnemonic</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 mt-1 leading-relaxed">
                {currentCard.mnemonic}
              </p>
            </div>

            {/* Beginner Example Word */}
            <div className="p-3 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700 flex items-center justify-between text-xs">
              <div>
                <span className="text-stone-400 dark:text-stone-500 text-[10px] uppercase font-bold">
                  Example Word
                </span>
                <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                  {currentCard.example.word}{' '}
                  <span className="text-xs font-mono text-stone-500 dark:text-stone-400 font-normal">
                    ({currentCard.example.romaji})
                  </span>
                </div>
              </div>
              <div className="font-bold text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/50 px-2.5 py-1 rounded-lg border border-red-200/60 dark:border-red-900/40">
                {currentCard.example.meaning}
              </div>
            </div>

            <div className="text-[11px] text-center text-stone-400 dark:text-stone-500 font-medium pt-1">
              Rate your recall below to update schedule
            </div>
          </div>
        </div>
      </div>

      {/* Flashcard Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          onClick={() => handleAnswer(false)}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl border-2 border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:border-amber-500 hover:bg-amber-50/70 dark:hover:bg-amber-950/30 font-extrabold text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <X className="w-5 h-5 text-amber-500 stroke-[3]" />
          <span>Still Learning</span>
        </button>

        <button
          onClick={() => handleAnswer(true)}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md shadow-emerald-600/25 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Check className="w-5 h-5 stroke-[3]" />
          <span>Got It!</span>
        </button>
      </div>

      {/* Manual Prev / Next Controls & Keyboard Tip */}
      <div className="flex items-center justify-between px-2 text-xs text-stone-500 dark:text-stone-400">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 hover:text-stone-900 dark:hover:text-stone-100 disabled:opacity-30 p-1 font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <span className="text-[11px] opacity-75 hidden sm:inline">
          Shortcuts: Space = Flip • ← Still Learning • → Got It
        </span>

        <button
          onClick={handleNext}
          className="flex items-center gap-1 hover:text-stone-900 dark:hover:text-stone-100 p-1 font-semibold"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

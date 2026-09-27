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
  Filter
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
    setDeck(shuffled);
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
        // Reshuffle deck for endless review loop
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
      <div className="text-center py-20 text-stone-500">
        No cards available for this group.
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto py-8 px-4 space-y-6 animate-fadeIn">
      {/* Top Header & Group Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
            Flashcard Review
          </h2>
          <p className="text-xs text-stone-500">
            Unscored self-study mode • Flip, review, and reinforce
          </p>
        </div>

        {/* Group Selector Dropdown */}
        <div className="flex items-center gap-1.5 text-xs">
          <Filter className="w-3.5 h-3.5 text-stone-400" />
          <select
            value={poolGroup}
            onChange={(e) => setPoolGroup(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold focus:outline-hidden focus:ring-2 focus:ring-red-500"
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

      {/* Progress & Stats Bar */}
      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 px-1">
        <span>
          Card <strong className="text-stone-800 dark:text-stone-200">{currentIndex + 1}</strong> of {deck.length}
        </span>
        <span>
          Reviewed this session: <strong className="text-red-600">{reviewsDone}</strong>
        </span>
      </div>

      {/* 3D Flip Card Container */}
      <div
        className="w-full aspect-[4/3] max-h-[380px] perspective cursor-pointer select-none"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d rounded-3xl shadow-lg border border-stone-200/80 dark:border-stone-800 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Card Front */}
          <div className="absolute inset-0 backface-hidden bg-white dark:bg-stone-900 rounded-3xl p-8 flex flex-col items-center justify-between">
            <div className="w-full flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500">
                {currentCard.group} Hiragana
              </span>
              <span className="text-[11px] text-stone-400 font-mono">
                Click or Space to flip
              </span>
            </div>

            {/* Huge Character */}
            <div className="text-8xl sm:text-9xl font-bold font-serif text-stone-900 dark:text-stone-100 drop-shadow-xs">
              {currentCard.character}
            </div>

            <span className="text-xs text-stone-400 font-medium">
              Tap to see reading & mnemonic
            </span>
          </div>

          {/* Card Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-stone-50 dark:bg-stone-900 rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border border-red-200/60 dark:border-red-900/40">
            <div className="flex items-center justify-between border-b border-stone-200/60 dark:border-stone-800 pb-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-serif text-red-600 dark:text-red-400">
                  {currentCard.character}
                </span>
                <span className="text-xl font-black text-stone-900 dark:text-stone-100">
                  = {currentCard.romaji}
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  ("{currentCard.pronunciation}")
                </span>
              </div>
              <span className="text-xs font-semibold text-stone-400 font-mono">
                {currentCard.row}
              </span>
            </div>

            {/* Mnemonic Story */}
            <div className="my-2 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40">
              <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mnemonic Story</span>
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-200 mt-1 leading-relaxed">
                {currentCard.mnemonic}
              </p>
            </div>

            {/* Beginner Example Word */}
            <div className="p-3 rounded-2xl bg-white dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 flex items-center justify-between text-xs">
              <div>
                <span className="text-stone-400 text-[10px] uppercase font-bold">Example</span>
                <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                  {currentCard.example.word}{' '}
                  <span className="text-xs font-mono text-stone-500 font-normal">
                    ({currentCard.example.romaji})
                  </span>
                </div>
              </div>
              <div className="font-semibold text-red-600 dark:text-red-400">
                {currentCard.example.meaning}
              </div>
            </div>

            <div className="text-[11px] text-center text-stone-400">
              Rate your recall below to update schedule
            </div>
          </div>
        </div>
      </div>

      {/* Flashcard Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          onClick={() => handleAnswer(false)}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border-2 border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 font-bold text-sm shadow-xs transition-all"
        >
          <X className="w-4 h-4 text-amber-500" />
          <span>Still Learning</span>
        </button>

        <button
          onClick={() => handleAnswer(true)}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01]"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Got It!</span>
        </button>
      </div>

      {/* Manual Prev / Next Controls */}
      <div className="flex items-center justify-between px-2 text-xs text-stone-400">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 hover:text-stone-700 dark:hover:text-stone-200 disabled:opacity-30 p-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Card</span>
        </button>

        <span className="text-[11px] opacity-75">
          Shortcut: Space = Flip • ← Still Learning • → Got It
        </span>

        <button
          onClick={handleNext}
          className="flex items-center gap-1 hover:text-stone-700 dark:hover:text-stone-200 p-1"
        >
          <span>Next Card</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

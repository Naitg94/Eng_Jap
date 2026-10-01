import React, { useEffect } from 'react';
import type { LearningItem } from '../../types/learning';
import { CharacterDakutenSection } from './CharacterDakutenSection';
import { X, Sparkles, BookOpen, PenTool, ArrowRight } from 'lucide-react';

interface CharacterCardModalProps {
  item: LearningItem | null;
  onClose: () => void;
  onSelectCharacter?: (item: LearningItem) => void;
  onPracticeWriting: (item: LearningItem) => void;
  onPracticeRecognition: (item: LearningItem) => void;
}

export const CharacterCardModal: React.FC<CharacterCardModalProps> = ({
  item,
  onClose,
  onSelectCharacter,
  onPracticeWriting,
  onPracticeRecognition
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 dark:bg-black/80 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-stone-50 dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 pt-5 pb-3 border-b border-stone-200/90 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60">
              {item.group} Hiragana
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-bold">
              {item.row}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-5 sm:px-6 py-4 space-y-4">
          {/* Main Character Hero Display */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-800/70 border border-stone-200/80 dark:border-stone-700 shadow-xs">
            {/* Huge Character Block */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-red-50 to-rose-100/70 dark:from-red-950/40 dark:to-rose-950/20 border border-red-200/90 dark:border-red-900/60 flex items-center justify-center text-6xl sm:text-7xl font-bold font-serif text-red-600 dark:text-red-400 select-none shadow-inner shrink-0">
              {item.character}
            </div>

            {/* Phonetics & Details */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
                  Romaji Reading
                </span>
                <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
                  {item.romaji}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
                  Pronunciation Hint
                </span>
                <div className="text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300">
                  "{item.pronunciation}"
                </div>
              </div>

              {item.confusedWith && item.confusedWith.length > 0 && (
                <div className="pt-1 flex items-center justify-center sm:justify-start gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-bold">
                  <span>Often confused with:</span>
                  <span className="font-bold font-serif text-sm bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-lg border border-amber-200 dark:border-amber-900/40">
                    {item.confusedWith.join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Visual Mnemonic Section */}
          <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200/90 dark:border-amber-900/40 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Memory Mnemonic</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
              {item.mnemonic}
            </p>
          </div>

          {/* Dakuten / Voiced Variants Section (shows if dakuten exists) */}
          <CharacterDakutenSection
            item={item}
            onSelectCharacter={onSelectCharacter}
          />

          {/* Example Word */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/70 border border-stone-200/80 dark:border-stone-700/80 flex items-center justify-between shadow-xs">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-stone-400 dark:text-stone-500 text-[10px] font-black uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Beginner Example Word</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
                  {item.example.word}
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                  ({item.example.romaji})
                </span>
              </div>
            </div>
            <div className="text-xs font-bold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-950/60 px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/50">
              {item.example.meaning}
            </div>
          </div>

          {/* Special Notes (if any) */}
          {item.notes && (
            <div className="text-xs text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/60 p-3.5 rounded-2xl border border-stone-200 dark:border-stone-700">
              <strong className="text-stone-900 dark:text-stone-100">Note: </strong>
              {item.notes}
            </div>
          )}
        </div>

        {/* Action Buttons in Footer */}
        <div className="px-5 sm:px-6 py-4 bg-stone-100/90 dark:bg-stone-800/90 border-t border-stone-200 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            onClick={() => onPracticeWriting(item)}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
          >
            <PenTool className="w-4 h-4 text-red-600 dark:text-red-400" />
            Practice Writing
          </button>

          <button
            onClick={() => onPracticeRecognition(item)}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-red-600/20 cursor-pointer"
          >
            <span>Practice Reading</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import type { LearningItem } from '../../types/learning';
import { StrokeOrderViewer } from './StrokeOrderViewer';
import { X, Sparkles, BookOpen, PenTool, ArrowRight } from 'lucide-react';

interface CharacterCardModalProps {
  item: LearningItem | null;
  onClose: () => void;
  onPracticeWriting: (item: LearningItem) => void;
  onPracticeRecognition: (item: LearningItem) => void;
}

export const CharacterCardModal: React.FC<CharacterCardModalProps> = ({
  item,
  onClose,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-stone-50 dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-stone-200/80 dark:border-stone-800/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/40">
              {item.group} Hiragana
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
              {item.row}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-6 py-4 space-y-6">
          {/* Main Visual Hierarchy Card */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-white dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 shadow-xs">
            {/* Massive Character Display */}
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-red-50 to-rose-100/60 dark:from-red-950/30 dark:to-rose-950/10 border border-red-200 dark:border-red-900/40 flex items-center justify-center text-7xl font-bold text-red-600 dark:text-red-400 select-none shadow-inner">
              {item.character}
            </div>

            {/* Phonetics & Relationships */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                  Romaji
                </span>
                <div className="text-2xl font-black text-stone-900 dark:text-stone-100">
                  {item.romaji}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                  Pronunciation Hint
                </span>
                <div className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  "{item.pronunciation}"
                </div>
              </div>

              {item.confusedWith && item.confusedWith.length > 0 && (
                <div className="pt-1 flex items-center justify-center sm:justify-start gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
                  <span>Often confused with:</span>
                  <span className="font-bold font-serif text-sm">
                    {item.confusedWith.join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Visual Mnemonic Section */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Memory Mnemonic</span>
            </div>
            <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
              {item.mnemonic}
            </p>
          </div>

          {/* Example Word */}
          <div className="p-4 rounded-2xl bg-stone-100/80 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 text-xs font-semibold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Beginner Example</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  {item.example.word}
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  ({item.example.romaji})
                </span>
              </div>
            </div>
            <div className="text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-3 py-1.5 rounded-xl border border-red-200/60 dark:border-red-900/40">
              {item.example.meaning}
            </div>
          </div>

          {/* Special Notes (if any) */}
          {item.notes && (
            <div className="text-xs text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/50 p-3 rounded-xl border border-stone-200 dark:border-stone-700">
              <span className="font-semibold text-stone-800 dark:text-stone-200">Note: </span>
              {item.notes}
            </div>
          )}

          {/* Stroke Order Section */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 text-center">
              Step-by-Step Stroke Order
            </h4>
            <StrokeOrderViewer
              character={item.character}
              strokeSteps={item.strokeSteps}
              size={200}
            />
          </div>
        </div>

        {/* Action Buttons in Footer */}
        <div className="px-6 py-4 bg-stone-100/90 dark:bg-stone-800/80 border-t border-stone-200 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            onClick={() => onPracticeWriting(item)}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-stone-300 dark:border-stone-600 text-stone-800 dark:text-stone-200 hover:bg-white dark:hover:bg-stone-700 font-semibold text-sm transition-all shadow-xs"
          >
            <PenTool className="w-4 h-4 text-red-600 dark:text-red-400" />
            Practice Writing
          </button>

          <button
            onClick={() => onPracticeRecognition(item)}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all shadow-sm"
          >
            <span>Practice Reading</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

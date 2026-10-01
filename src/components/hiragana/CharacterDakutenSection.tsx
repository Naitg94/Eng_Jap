import React from 'react';
import type { LearningItem } from '../../types/learning';
import { getCharacterDakutenInfo } from '../../data/dakutenRelationships';
import { Layers, ArrowRight } from 'lucide-react';

interface CharacterDakutenSectionProps {
  item: LearningItem;
  onSelectCharacter?: (targetItem: LearningItem) => void;
}

export const CharacterDakutenSection: React.FC<CharacterDakutenSectionProps> = ({
  item,
  onSelectCharacter
}) => {
  const info = getCharacterDakutenInfo(item);

  // If character has no dakuten relationship (e.g. vowels あ, い, う, え, お, etc.), render nothing
  if (!info || info.variants.length === 0) {
    return null;
  }

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/50 dark:from-indigo-950/30 dark:via-stone-900/80 dark:to-purple-950/20 border border-indigo-200/90 dark:border-indigo-900/50 shadow-xs space-y-3">
      {/* Header with Title & Badge */}
      <div className="flex items-center justify-between gap-2 border-b border-indigo-100 dark:border-indigo-900/40 pb-2.5">
        <div className="flex items-center gap-1.5 text-indigo-900 dark:text-indigo-300 text-xs font-black uppercase tracking-wider">
          <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>{info.sectionTitle}</span>
        </div>

        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          {info.markBadge}
        </span>
      </div>

      {/* Educational Explanation */}
      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
        {info.description}
      </p>

      {/* Variants List / Grid */}
      <div
        className={`grid gap-2.5 ${
          info.variants.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {info.variants.map((v) => {
          const isClickable = Boolean(onSelectCharacter);

          return (
            <div
              key={v.item.id}
              onClick={() => onSelectCharacter?.(v.item)}
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onKeyDown={(e) => {
                if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onSelectCharacter?.(v.item);
                }
              }}
              title={isClickable ? `Switch to ${v.item.character} (${v.item.romaji}) card` : undefined}
              className={`p-3 rounded-xl bg-white/95 dark:bg-stone-850 dark:bg-stone-800/90 border border-indigo-200/70 dark:border-stone-700/80 shadow-2xs flex items-center justify-between gap-3 text-left transition-all ${
                isClickable
                  ? 'hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer group'
                  : ''
              }`}
            >
              {/* Left: Big Character display */}
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/60 dark:to-purple-950/40 border border-indigo-200/80 dark:border-indigo-900/60 flex items-center justify-center text-3xl sm:text-4xl font-bold font-serif text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform shrink-0 shadow-inner">
                {v.item.character}
              </div>

              {/* Middle: Details & formula */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-1.5 py-0.5 rounded border border-indigo-200/70 dark:border-indigo-900/40">
                    {v.badgeText}
                  </span>
                  <span className="text-xs font-black text-stone-900 dark:text-stone-100">
                    {v.item.romaji}
                  </span>
                  <span className="text-[11px] font-medium text-stone-400 dark:text-stone-500">
                    "{v.item.pronunciation}"
                  </span>
                </div>

                <div className="text-[11px] font-semibold text-stone-600 dark:text-stone-300 font-mono truncate">
                  {v.formula}
                </div>

                {v.item.example && (
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                    <span className="font-serif font-bold text-stone-800 dark:text-stone-200">
                      {v.item.example.word}
                    </span>{' '}
                    <span>({v.item.example.romaji})</span> •{' '}
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      {v.item.example.meaning}
                    </span>
                  </div>
                )}
              </div>

              {/* Right: Click to Study indicator */}
              {isClickable && (
                <div className="flex items-center gap-1 text-stone-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all text-[11px] font-bold shrink-0">
                  <span className="hidden sm:inline">View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

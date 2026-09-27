import React, { useState } from 'react';
import { ALL_HIRAGANA } from '../../data/hiraganaMaster';
import { X, Search, Check } from 'lucide-react';
import type { CharacterGroup } from '../../types/learning';

interface IndividualSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItemIds: string[];
  onChangeSelection: (newIds: string[]) => void;
}

export const IndividualSelectorModal: React.FC<IndividualSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedItemIds,
  onChangeSelection
}) => {
  const [activeTab, setActiveTab] = useState<CharacterGroup | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const selectedSet = new Set(selectedItemIds);

  const toggleItem = (id: string) => {
    if (selectedSet.has(id)) {
      onChangeSelection(selectedItemIds.filter((item) => item !== id));
    } else {
      onChangeSelection([...selectedItemIds, id]);
    }
  };

  const handleSelectAll = () => {
    onChangeSelection(ALL_HIRAGANA.map((i) => i.id));
  };

  const handleClearAll = () => {
    onChangeSelection([]);
  };

  const filteredItems = ALL_HIRAGANA.filter((item) => {
    if (activeTab !== 'all' && item.group !== activeTab) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      return (
        item.character.includes(q) ||
        item.romaji.toLowerCase().includes(q) ||
        item.row.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 dark:bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-stone-50 dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 pt-5 pb-3 border-b border-stone-200/90 dark:border-stone-800">
          <div>
            <h3 className="font-black text-stone-900 dark:text-stone-100 text-base sm:text-lg">
              Select Specific Kana Characters
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Pick any individual character to customize your exact practice pool
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters & Actions Bar */}
        <div className="px-5 sm:px-6 py-3 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 bg-stone-100/80 dark:bg-stone-800/60">
          {/* Search Input */}
          <div className="relative min-w-[160px] flex-1 max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search kana or romaji..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Group Filter Tabs (scrollable on mobile) */}
          <div className="flex items-center gap-1 text-xs overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'All' },
              { id: 'basic', label: 'Basic' },
              { id: 'dakuten', label: 'Dakuten' },
              { id: 'handakuten', label: 'Semi-Voiced' },
              { id: 'yoon', label: 'Yōon' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Bulk Select Buttons */}
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={handleSelectAll}
              className="px-2.5 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold hover:bg-stone-50 cursor-pointer shadow-xs"
            >
              Select All
            </button>
            <button
              onClick={handleClearAll}
              className="px-2.5 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold hover:bg-stone-50 cursor-pointer shadow-xs"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Character Grid */}
        <div className="overflow-y-auto px-5 sm:px-6 py-4 flex-1">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2.5">
            {filteredItems.map((item) => {
              const isSelected = selectedSet.has(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className={`relative aspect-square rounded-2xl border p-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-red-50 dark:bg-red-950/50 border-red-500 text-red-700 dark:text-red-400 shadow-xs scale-[1.02]'
                      : 'bg-white dark:bg-stone-800/80 border-stone-200/90 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-stone-400'
                  }`}
                >
                  {/* Selected checkmark */}
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] shadow-xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}

                  <span className="text-xl sm:text-2xl font-bold font-serif">
                    {item.character}
                  </span>
                  <span className="text-[11px] font-mono font-bold opacity-75 mt-0.5">
                    {item.romaji}
                  </span>
                </button>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-stone-400 text-xs">
              No characters match your search query.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-100/90 dark:bg-stone-800/90 flex items-center justify-between">
          <div className="text-xs text-stone-700 dark:text-stone-300 font-bold">
            <span className="text-red-600 dark:text-red-400 font-black">{selectedItemIds.length}</span> of {ALL_HIRAGANA.length} selected
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

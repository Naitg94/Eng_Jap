import React from 'react';
import {
  BASIC_ROWS,
  DAKUTEN_ROWS,
  HANDAKUTEN_ROWS,
  YOON_GROUPS,
  ALL_HIRAGANA,
  type HiraganaGroupMeta
} from '../../data/hiraganaMaster';
import { Check, Layers } from 'lucide-react';

interface GroupSelectorProps {
  selectedItemIds: string[];
  onChangeSelection: (newIds: string[]) => void;
  onOpenIndividualSelector: () => void;
}

export const GroupSelector: React.FC<GroupSelectorProps> = ({
  selectedItemIds,
  onChangeSelection,
  onOpenIndividualSelector
}) => {
  const selectedSet = new Set(selectedItemIds);

  const isGroupFullySelected = (group: HiraganaGroupMeta): boolean => {
    return group.items.every((item) => selectedSet.has(item.id));
  };

  const isGroupPartiallySelected = (group: HiraganaGroupMeta): boolean => {
    const hasSome = group.items.some((item) => selectedSet.has(item.id));
    return hasSome && !isGroupFullySelected(group);
  };

  const toggleGroup = (group: HiraganaGroupMeta) => {
    const allSelected = isGroupFullySelected(group);
    let next: string[];

    if (allSelected) {
      // Deselect all items in this group
      const groupItemIds = new Set(group.items.map((i) => i.id));
      next = selectedItemIds.filter((id) => !groupItemIds.has(id));
    } else {
      // Select all items in this group
      const toAdd = group.items.map((i) => i.id).filter((id) => !selectedSet.has(id));
      next = [...selectedItemIds, ...toAdd];
    }
    onChangeSelection(next);
  };

  const handleSelectAll = () => {
    onChangeSelection(ALL_HIRAGANA.map((i) => i.id));
  };

  const handleClearAll = () => {
    onChangeSelection([]);
  };

  const handleSelectBasicOnly = () => {
    const basicIds = BASIC_ROWS.flatMap((r) => r.items.map((i) => i.id));
    onChangeSelection(basicIds);
  };

  return (
    <div className="space-y-6">
      {/* Top Quick Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-stone-100/80 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-700">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Selected:
          </span>
          <span className="text-sm font-extrabold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded-lg border border-red-200 dark:border-red-900/40">
            {selectedItemIds.length} / {ALL_HIRAGANA.length} characters
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={handleSelectAll}
            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 font-semibold transition-colors"
          >
            Select All
          </button>
          <button
            type="button"
            onClick={handleSelectBasicOnly}
            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 font-semibold transition-colors"
          >
            Basic Only (46)
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 font-semibold transition-colors"
          >
            Clear All
          </button>

          <button
            type="button"
            onClick={onOpenIndividualSelector}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all shadow-xs"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Select Individual Characters</span>
          </button>
        </div>
      </div>

      {/* Basic Rows */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Basic Rows (46 characters)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {BASIC_ROWS.map((group) => {
            const isFull = isGroupFullySelected(group);
            const isPartial = isGroupPartiallySelected(group);

            return (
              <GroupCheckbox
                key={group.id}
                group={group}
                isFull={isFull}
                isPartial={isPartial}
                onToggle={() => toggleGroup(group)}
              />
            );
          })}
        </div>
      </div>

      {/* Voiced Sounds (Dakuten) */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Voiced Sounds — Dakuten (20 characters)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {DAKUTEN_ROWS.map((group) => {
            const isFull = isGroupFullySelected(group);
            const isPartial = isGroupPartiallySelected(group);

            return (
              <GroupCheckbox
                key={group.id}
                group={group}
                isFull={isFull}
                isPartial={isPartial}
                onToggle={() => toggleGroup(group)}
              />
            );
          })}
        </div>
      </div>

      {/* Semi-Voiced (Handakuten) */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Semi-Voiced — Handakuten (5 characters)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {HANDAKUTEN_ROWS.map((group) => {
            const isFull = isGroupFullySelected(group);
            const isPartial = isGroupPartiallySelected(group);

            return (
              <GroupCheckbox
                key={group.id}
                group={group}
                isFull={isFull}
                isPartial={isPartial}
                onToggle={() => toggleGroup(group)}
              />
            );
          })}
        </div>
      </div>

      {/* Contracted Sounds (Yōon) */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Contracted Sounds — Yōon (33 characters)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {YOON_GROUPS.map((group) => {
            const isFull = isGroupFullySelected(group);
            const isPartial = isGroupPartiallySelected(group);

            return (
              <GroupCheckbox
                key={group.id}
                group={group}
                isFull={isFull}
                isPartial={isPartial}
                onToggle={() => toggleGroup(group)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface GroupCheckboxProps {
  group: HiraganaGroupMeta;
  isFull: boolean;
  isPartial: boolean;
  onToggle: () => void;
}

const GroupCheckbox: React.FC<GroupCheckboxProps> = ({ group, isFull, isPartial, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
        isFull
          ? 'bg-red-50/80 dark:bg-red-950/30 border-red-300 dark:border-red-900/60 shadow-xs'
          : isPartial
          ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 dark:border-amber-900/50'
          : 'bg-white dark:bg-stone-800/60 border-stone-200 dark:border-stone-700/80 hover:border-stone-300'
      }`}
    >
      <div className="min-w-0 pr-2">
        <div className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
          {group.name}
        </div>
        <div className="text-[11px] text-stone-500 font-serif truncate mt-0.5">
          {group.items.map((i) => i.character).join(' ')}
        </div>
      </div>

      <div
        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
          isFull
            ? 'bg-red-600 text-white'
            : isPartial
            ? 'bg-amber-500 text-white'
            : 'border border-stone-300 dark:border-stone-600 text-transparent'
        }`}
      >
        {isFull ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : isPartial ? '–' : null}
      </div>
    </button>
  );
};

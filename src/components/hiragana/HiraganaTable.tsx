import React, { useState } from 'react';
import type { LearningItem, CharacterGroup } from '../../types/learning';
import {
  HIRAGANA_BASIC,
  HIRAGANA_DAKUTEN,
  HIRAGANA_HANDAKUTEN,
  HIRAGANA_YOON
} from '../../data/hiraganaMaster';
import { computeItemMastery } from '../../services/scoring';
import { loadAllSRSData } from '../../services/storage';

interface HiraganaTableProps {
  onSelectCharacter: (item: LearningItem) => void;
}

export const HiraganaTable: React.FC<HiraganaTableProps> = ({ onSelectCharacter }) => {
  const [activeGroup, setActiveGroup] = useState<CharacterGroup | 'reference'>('basic');
  const srsStore = loadAllSRSData();

  const getMasteryColor = (itemId: string): string => {
    const srs = srsStore[itemId];
    const mastery = computeItemMastery(srs);
    if (mastery.status === 'mastered') return 'bg-emerald-500';
    if (mastery.status === 'familiar') return 'bg-blue-500';
    if (mastery.status === 'learning') return 'bg-amber-500';
    return 'bg-stone-300 dark:bg-stone-700';
  };

  return (
    <div className="w-full space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 p-1 bg-stone-200/70 dark:bg-stone-800/70 rounded-2xl max-w-fit mx-auto sm:mx-0">
        <button
          onClick={() => setActiveGroup('basic')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeGroup === 'basic'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          Basic (46)
        </button>

        <button
          onClick={() => setActiveGroup('dakuten')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeGroup === 'dakuten'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          Voiced / Dakuten (20)
        </button>

        <button
          onClick={() => setActiveGroup('handakuten')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeGroup === 'handakuten'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          Semi-Voiced / P (5)
        </button>

        <button
          onClick={() => setActiveGroup('yoon')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeGroup === 'yoon'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          Contracted / Yōon (33)
        </button>

        <button
          onClick={() => setActiveGroup('reference')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeGroup === 'reference'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          Sokuon & Long Vowels
        </button>
      </div>

      {/* Basic Grid */}
      {activeGroup === 'basic' && (
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[480px] bg-white dark:bg-stone-900/60 rounded-3xl p-5 border border-stone-200/80 dark:border-stone-800 shadow-xs">
            <div className="text-xs font-semibold text-stone-400 dark:text-stone-500 mb-3 flex items-center justify-between">
              <span>Traditional 50-Sound (Gojuon) Table</span>
              <span>Click any card for stroke order & mnemonics</span>
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-6 gap-2 mb-2 text-center text-xs font-bold text-stone-400 dark:text-stone-500">
              <div className="text-left pl-2">Row</div>
              <div>A</div>
              <div>I</div>
              <div>U</div>
              <div>E</div>
              <div>O</div>
            </div>

            {/* Rows */}
            {[
              { row: 'A', name: 'A-row' },
              { row: 'K', name: 'K-row' },
              { row: 'S', name: 'S-row' },
              { row: 'T', name: 'T-row' },
              { row: 'N', name: 'N-row' },
              { row: 'H', name: 'H-row' },
              { row: 'M', name: 'M-row' },
              { row: 'Y', name: 'Y-row' },
              { row: 'R', name: 'R-row' },
              { row: 'W', name: 'W-row' },
              { row: 'N (ん)', name: 'N' }
            ].map((rowDef) => {
              const rowItems = HIRAGANA_BASIC.filter((i: LearningItem) => i.row === rowDef.row);
              const cols = ['A', 'I', 'U', 'E', 'O'];

              return (
                <div key={rowDef.row} className="grid grid-cols-6 gap-2 mb-2 items-center">
                  <div className="text-xs font-bold text-stone-500 dark:text-stone-400 pl-2">
                    {rowDef.row}
                  </div>

                  {cols.map((col) => {
                    const item = rowItems.find((i: LearningItem) => i.column === col);
                    if (!item) {
                      return (
                        <div
                          key={col}
                          className="aspect-square rounded-2xl bg-stone-100/40 dark:bg-stone-800/20 border border-dashed border-stone-200 dark:border-stone-800 flex items-center justify-center text-stone-300 dark:text-stone-700 text-xs"
                        >
                          —
                        </div>
                      );
                    }

                    return (
                      <CharacterTile
                        key={item.id}
                        item={item}
                        masteryColor={getMasteryColor(item.id)}
                        onClick={() => onSelectCharacter(item)}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Dakuten Grid */}
      {activeGroup === 'dakuten' && (
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[480px] bg-white dark:bg-stone-900/60 rounded-3xl p-5 border border-stone-200/80 dark:border-stone-800 shadow-xs">
            <div className="text-xs font-semibold text-stone-400 dark:text-stone-500 mb-3 flex items-center justify-between">
              <span>Dakuten (濁音) — Voiced Sounds (Tenten ゛)</span>
              <span>Click for character details</span>
            </div>

            <div className="grid grid-cols-6 gap-2 mb-2 text-center text-xs font-bold text-stone-400 dark:text-stone-500">
              <div className="text-left pl-2">Row</div>
              <div>A</div>
              <div>I</div>
              <div>U</div>
              <div>E</div>
              <div>O</div>
            </div>

            {[
              { row: 'G', label: 'G (か゛)' },
              { row: 'Z', label: 'Z (さ゛)' },
              { row: 'D', label: 'D (た゛)' },
              { row: 'B', label: 'B (は゛)' }
            ].map((rowDef) => {
              const rowItems = HIRAGANA_DAKUTEN.filter((i: LearningItem) => i.row === rowDef.row);
              const cols = ['A', 'I', 'U', 'E', 'O'];

              return (
                <div key={rowDef.row} className="grid grid-cols-6 gap-2 mb-2 items-center">
                  <div className="text-xs font-bold text-stone-500 dark:text-stone-400 pl-2">
                    {rowDef.label}
                  </div>

                  {cols.map((col) => {
                    const item = rowItems.find((i: LearningItem) => i.column === col);
                    if (!item) return <div key={col} className="aspect-square" />;

                    return (
                      <CharacterTile
                        key={item.id}
                        item={item}
                        masteryColor={getMasteryColor(item.id)}
                        onClick={() => onSelectCharacter(item)}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Handakuten Grid */}
      {activeGroup === 'handakuten' && (
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[480px] bg-white dark:bg-stone-900/60 rounded-3xl p-5 border border-stone-200/80 dark:border-stone-800 shadow-xs">
            <div className="text-xs font-semibold text-stone-400 dark:text-stone-500 mb-3">
              Handakuten (半濁音) — Semi-Voiced P-sounds (Maru ゜)
            </div>

            <div className="grid grid-cols-6 gap-2 mb-2 text-center text-xs font-bold text-stone-400 dark:text-stone-500">
              <div className="text-left pl-2">Row</div>
              <div>A</div>
              <div>I</div>
              <div>U</div>
              <div>E</div>
              <div>O</div>
            </div>

            <div className="grid grid-cols-6 gap-2 mb-2 items-center">
              <div className="text-xs font-bold text-stone-500 dark:text-stone-400 pl-2">
                P (は゜)
              </div>
              {HIRAGANA_HANDAKUTEN.map((item: LearningItem) => (
                <CharacterTile
                  key={item.id}
                  item={item}
                  masteryColor={getMasteryColor(item.id)}
                  onClick={() => onSelectCharacter(item)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Yoon Grid */}
      {activeGroup === 'yoon' && (
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[480px] bg-white dark:bg-stone-900/60 rounded-3xl p-5 border border-stone-200/80 dark:border-stone-800 shadow-xs">
            <div className="text-xs font-semibold text-stone-400 dark:text-stone-500 mb-3">
              Yōon (拗音) — Contracted Sounds with Small ゃ, ゅ, ょ
            </div>

            <div className="grid grid-cols-4 gap-2 mb-2 text-center text-xs font-bold text-stone-400 dark:text-stone-500">
              <div className="text-left pl-2">Base</div>
              <div>-ya (ゃ)</div>
              <div>-yu (ゅ)</div>
              <div>-yo (ょ)</div>
            </div>

            {[
              { row: 'きゃ group', label: 'ki (き)' },
              { row: 'しゃ group', label: 'shi (し)' },
              { row: 'ちゃ group', label: 'chi (ち)' },
              { row: 'にゃ group', label: 'ni (に)' },
              { row: 'ひゃ group', label: 'hi (ひ)' },
              { row: 'みゃ group', label: 'mi (み)' },
              { row: 'りゃ group', label: 'ri (り)' },
              { row: 'ぎゃ group', label: 'gi (ぎ)' },
              { row: 'じゃ group', label: 'ji (じ)' },
              { row: 'びゃ group', label: 'bi (び)' },
              { row: 'ぴゃ group', label: 'pi (ぴ)' }
            ].map((groupDef) => {
              const groupItems = HIRAGANA_YOON.filter((i: LearningItem) => i.row === groupDef.row);

              return (
                <div key={groupDef.row} className="grid grid-cols-4 gap-2 mb-2 items-center">
                  <div className="text-xs font-bold text-stone-500 dark:text-stone-400 pl-2">
                    {groupDef.label}
                  </div>

                  {groupItems.map((item: LearningItem) => (
                    <CharacterTile
                      key={item.id}
                      item={item}
                      masteryColor={getMasteryColor(item.id)}
                      onClick={() => onSelectCharacter(item)}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sokuon & Long Vowels Reference Tab */}
      {activeGroup === 'reference' && <ReferenceView />}
    </div>
  );
};

interface CharacterTileProps {
  item: LearningItem;
  masteryColor: string;
  onClick: () => void;
}

const CharacterTile: React.FC<CharacterTileProps> = ({ item, masteryColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative aspect-square rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 hover:border-red-500 dark:hover:border-red-500 hover:shadow-md transition-all flex flex-col items-center justify-center p-1.5 focus:outline-hidden focus:ring-2 focus:ring-red-500/50"
    >
      {/* Small mastery status dot at top right */}
      <div
        className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${masteryColor}`}
        title="Mastery indicator"
      />

      <span className="text-2xl sm:text-3xl font-bold text-stone-800 dark:text-stone-100 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:scale-105 transition-all">
        {item.character}
      </span>
      <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 font-mono mt-0.5">
        {item.romaji}
      </span>
    </button>
  );
};

const ReferenceView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Sokuon Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-base">
            っ
          </div>
          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">
              Sokuon (促音) — Small っ & Double Consonants
            </h3>
            <p className="text-xs text-stone-500">
              The little stop that creates double consonants
            </p>
          </div>
        </div>

        <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          The small <strong className="text-red-600 font-serif">っ</strong> (notice it is about half the size of normal つ) creates a glottal pause. It doubles the consonant of the sound that comes right after it.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {[
            { word: 'がっこう', romaji: 'gakkou', meaning: 'school', breakdown: 'ga + (pause) + kou' },
            { word: 'きっぷ', romaji: 'kippu', meaning: 'ticket', breakdown: 'ki + (pause) + pu' },
            { word: 'ざっし', romaji: 'zasshi', meaning: 'magazine', breakdown: 'za + (pause) + shi' },
            { word: 'きって', romaji: 'kitte', meaning: 'postage stamp', breakdown: 'ki + (pause) + te' }
          ].map((ex) => (
            <div
              key={ex.word}
              className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/80 flex items-center justify-between"
            >
              <div>
                <div className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  {ex.word}
                </div>
                <div className="text-xs text-stone-500 font-mono">
                  {ex.romaji} ({ex.breakdown})
                </div>
              </div>
              <div className="text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-2.5 py-1 rounded-lg">
                {ex.meaning}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Long Vowels Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-base">
            ー
          </div>
          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">
              Chōon (長音) — Long Vowels in Hiragana
            </h3>
            <p className="text-xs text-stone-500">
              Holding a vowel sound for two beats changes the word's meaning
            </p>
          </div>
        </div>

        <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          In Japanese, vowel length is critical: <span className="italic">ojisan</span> (uncle) vs <span className="italic">ojiisan</span> (grandfather). Here are the standard spelling rules:
        </p>

        <div className="space-y-2.5 text-xs text-stone-700 dark:text-stone-300">
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/80">
            <strong className="text-stone-900 dark:text-stone-100">A sound:</strong> Add <span className="font-bold text-red-600">あ</span> (e.g. おかあさん = okaasan = mother)
          </div>

          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/80">
            <strong className="text-stone-900 dark:text-stone-100">I sound:</strong> Add <span className="font-bold text-red-600">い</span> (e.g. おにいさん = oniisan = older brother)
          </div>

          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/80">
            <strong className="text-stone-900 dark:text-stone-100">U sound:</strong> Add <span className="font-bold text-red-600">う</span> (e.g. くうき = kuuki = air / atmosphere)
          </div>

          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/80">
            <strong className="text-stone-900 dark:text-stone-100">E sound:</strong> Usually add <span className="font-bold text-red-600">い</span> (せんせい = sensei); rarely <span className="font-bold text-red-600">え</span> (おねえさん = oneesan = older sister)
          </div>

          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/80">
            <strong className="text-stone-900 dark:text-stone-100">O sound:</strong> Usually add <span className="font-bold text-red-600">う</span> (とうきょう = toukyou, おとうさん = otousan); rarely <span className="font-bold text-red-600">お</span> (こおり = koori = ice)
          </div>
        </div>
      </div>
    </div>
  );
};

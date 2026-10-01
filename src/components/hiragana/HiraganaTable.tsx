import React, { useState } from 'react';
import type { LearningItem, CharacterGroup } from '../../types/learning';
import {
  HIRAGANA_BASIC,
  HIRAGANA_DAKUTEN,
  HIRAGANA_HANDAKUTEN,
  HIRAGANA_YOON,
  ALL_HIRAGANA
} from '../../data/hiraganaMaster';
import { computeItemMastery } from '../../services/scoring';
import { loadAllSRSData } from '../../services/storage';
import { Search, Info } from 'lucide-react';

interface HiraganaTableProps {
  onSelectCharacter: (item: LearningItem) => void;
}

export const HiraganaTable: React.FC<HiraganaTableProps> = ({ onSelectCharacter }) => {
  const [activeGroup, setActiveGroup] = useState<CharacterGroup | 'reference'>('basic');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const srsStore = loadAllSRSData();

  const getMasteryColor = (itemId: string): { dot: string; label: string } => {
    const srs = srsStore[itemId];
    const mastery = computeItemMastery(srs);
    if (mastery.status === 'mastered') return { dot: 'bg-emerald-500 shadow-emerald-500/50', label: 'Mastered' };
    if (mastery.status === 'familiar') return { dot: 'bg-blue-500 shadow-blue-500/50', label: 'Familiar' };
    if (mastery.status === 'learning') return { dot: 'bg-amber-500 shadow-amber-500/50', label: 'Learning' };
    return { dot: 'bg-stone-300 dark:bg-stone-600', label: 'New' };
  };

  const filteredItems = searchQuery.trim()
    ? ALL_HIRAGANA.filter((item) => {
        const q = searchQuery.toLowerCase().trim();
        return (
          item.character.includes(q) ||
          item.romaji.toLowerCase().includes(q) ||
          item.row.toLowerCase().includes(q) ||
          item.pronunciation.toLowerCase().includes(q)
        );
      })
    : null;

  return (
    <div className="w-full space-y-5">
      {/* Category Tabs & Quick Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Tabs (Scrollable on small mobile) */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 dark:bg-stone-800/80 rounded-2xl overflow-x-auto no-scrollbar border border-stone-300/40 dark:border-stone-700/50">
          {[
            { id: 'basic', label: 'Basic (46)' },
            { id: 'dakuten', label: 'Voiced / Dakuten (20)' },
            { id: 'handakuten', label: 'Semi-Voiced / P (5)' },
            { id: 'yoon', label: 'Contracted / Yōon (33)' },
            { id: 'reference', label: 'Sokuon & Vowels' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveGroup(tab.id as any);
                setSearchQuery('');
              }}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeGroup === tab.id && !searchQuery
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs scale-[1.02]'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Quick Search */}
        <div className="relative min-w-[180px] sm:w-56">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search kana or romaji..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800/90 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-red-500 shadow-xs"
          />
        </div>
      </div>

      {/* If Searching, show search results grid */}
      {filteredItems !== null ? (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 sm:p-6 border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span>Search Results for "{searchQuery}" ({filteredItems.length})</span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-red-600 dark:text-red-400 font-bold hover:underline"
            >
              Clear Search
            </button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5">
            {filteredItems.map((item) => (
              <CharacterTile
                key={item.id}
                item={item}
                mastery={getMasteryColor(item.id)}
                onClick={() => onSelectCharacter(item)}
              />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-10 text-stone-400 text-xs">
              No character matches "{searchQuery}". Try "ka", "shi", or "あ".
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Basic 50-Sound Grid */}
          {activeGroup === 'basic' && (
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-4 sm:p-6 border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100 dark:border-stone-800 text-xs font-semibold text-stone-500 dark:text-stone-400">
                <span className="font-bold text-stone-800 dark:text-stone-200">
                  Gojūon Table (五十音) — 46 Basic Hiragana
                </span>
                <span className="flex items-center gap-1 text-[11px] text-stone-400">
                  <Info className="w-3.5 h-3.5" />
                  Tap any card for mnemonics & dakuten variants
                </span>
              </div>

              {/* Scrollable table container for mobile */}
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[440px] space-y-2">
                  {/* Column Headers */}
                  <div className="grid grid-cols-6 gap-2 text-center text-xs font-extrabold uppercase tracking-wider text-stone-400 dark:text-stone-500 py-1">
                    <div className="text-left pl-2">Row</div>
                    <div>A (あ)</div>
                    <div>I (い)</div>
                    <div>U (う)</div>
                    <div>E (え)</div>
                    <div>O (お)</div>
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
                      <div key={rowDef.row} className="grid grid-cols-6 gap-2 items-center">
                        <div className="text-xs font-extrabold text-stone-700 dark:text-stone-300 pl-2">
                          {rowDef.row}
                        </div>

                        {cols.map((col) => {
                          const item = rowItems.find((i: LearningItem) => i.column === col);
                          if (!item) {
                            return (
                              <div
                                key={col}
                                className="aspect-square rounded-2xl bg-stone-100/50 dark:bg-stone-800/30 border border-dashed border-stone-200 dark:border-stone-800 flex items-center justify-center text-stone-300 dark:text-stone-700 text-xs"
                              >
                                —
                              </div>
                            );
                          }

                          return (
                            <CharacterTile
                              key={item.id}
                              item={item}
                              mastery={getMasteryColor(item.id)}
                              onClick={() => onSelectCharacter(item)}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Dakuten Grid */}
          {activeGroup === 'dakuten' && (
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-4 sm:p-6 border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100 dark:border-stone-800 text-xs font-semibold text-stone-500 dark:text-stone-400">
                <span className="font-bold text-stone-800 dark:text-stone-200">
                  Dakuten (濁音) — Voiced Sounds (Tenten ゛)
                </span>
                <span className="text-[11px] text-stone-400">
                  Adds two dots to soften consonants (k→g, s→z, t→d, h→b)
                </span>
              </div>

              <div className="overflow-x-auto pb-2">
                <div className="min-w-[440px] space-y-2">
                  <div className="grid grid-cols-6 gap-2 text-center text-xs font-extrabold uppercase tracking-wider text-stone-400 dark:text-stone-500 py-1">
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
                      <div key={rowDef.row} className="grid grid-cols-6 gap-2 items-center">
                        <div className="text-xs font-extrabold text-stone-700 dark:text-stone-300 pl-2">
                          {rowDef.label}
                        </div>

                        {cols.map((col) => {
                          const item = rowItems.find((i: LearningItem) => i.column === col);
                          if (!item) return <div key={col} className="aspect-square" />;

                          return (
                            <CharacterTile
                              key={item.id}
                              item={item}
                              mastery={getMasteryColor(item.id)}
                              onClick={() => onSelectCharacter(item)}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Handakuten Grid */}
          {activeGroup === 'handakuten' && (
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-4 sm:p-6 border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100 dark:border-stone-800 text-xs font-semibold text-stone-500 dark:text-stone-400">
                <span className="font-bold text-stone-800 dark:text-stone-200">
                  Handakuten (半濁音) — Semi-Voiced P-sounds (Maru ゜)
                </span>
                <span className="text-[11px] text-stone-400">
                  Adds small circle to H-row making P sounds
                </span>
              </div>

              <div className="overflow-x-auto pb-2">
                <div className="min-w-[440px] space-y-2">
                  <div className="grid grid-cols-6 gap-2 text-center text-xs font-extrabold uppercase tracking-wider text-stone-400 dark:text-stone-500 py-1">
                    <div className="text-left pl-2">Row</div>
                    <div>A</div>
                    <div>I</div>
                    <div>U</div>
                    <div>E</div>
                    <div>O</div>
                  </div>

                  <div className="grid grid-cols-6 gap-2 items-center">
                    <div className="text-xs font-extrabold text-stone-700 dark:text-stone-300 pl-2">
                      P (は゜)
                    </div>
                    {HIRAGANA_HANDAKUTEN.map((item: LearningItem) => (
                      <CharacterTile
                        key={item.id}
                        item={item}
                        mastery={getMasteryColor(item.id)}
                        onClick={() => onSelectCharacter(item)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Yoon Grid */}
          {activeGroup === 'yoon' && (
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-4 sm:p-6 border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100 dark:border-stone-800 text-xs font-semibold text-stone-500 dark:text-stone-400">
                <span className="font-bold text-stone-800 dark:text-stone-200">
                  Yōon (拗音) — Contracted Sounds with Small ゃ, ゅ, ょ
                </span>
                <span className="text-[11px] text-stone-400">
                  Combines i-vowel consonant with small ya/yu/yo
                </span>
              </div>

              <div className="overflow-x-auto pb-2">
                <div className="min-w-[400px] space-y-2">
                  <div className="grid grid-cols-4 gap-2 text-center text-xs font-extrabold uppercase tracking-wider text-stone-400 dark:text-stone-500 py-1">
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
                      <div key={groupDef.row} className="grid grid-cols-4 gap-2 items-center">
                        <div className="text-xs font-extrabold text-stone-700 dark:text-stone-300 pl-2">
                          {groupDef.label}
                        </div>

                        {groupItems.map((item: LearningItem) => (
                          <CharacterTile
                            key={item.id}
                            item={item}
                            mastery={getMasteryColor(item.id)}
                            onClick={() => onSelectCharacter(item)}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Sokuon & Long Vowels Reference */}
          {activeGroup === 'reference' && <ReferenceView />}
        </>
      )}

      {/* Legend Bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-500 dark:text-stone-400 py-2 border-t border-stone-200/60 dark:border-stone-800">
        <span className="font-semibold text-stone-700 dark:text-stone-300">Mastery Status:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Mastered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span>Familiar</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span>Learning</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-600" />
          <span>New</span>
        </div>
      </div>
    </div>
  );
};

interface CharacterTileProps {
  item: LearningItem;
  mastery: { dot: string; label: string };
  onClick: () => void;
}

const CharacterTile: React.FC<CharacterTileProps> = ({ item, mastery, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative aspect-square rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200/90 dark:border-stone-700/80 hover:border-red-500 dark:hover:border-red-500 hover:shadow-md hover:bg-white dark:hover:bg-stone-750 transition-all flex flex-col items-center justify-center p-1.5 focus:outline-hidden focus:ring-2 focus:ring-red-500/50 cursor-pointer"
    >
      {/* Small mastery status dot at top right */}
      <div
        className={`absolute top-2 right-2 w-2 h-2 rounded-full ${mastery.dot}`}
        title={`Status: ${mastery.label}`}
      />

      <span className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:scale-110 transition-all">
        {item.character}
      </span>
      <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 font-mono mt-0.5">
        {item.romaji}
      </span>
    </button>
  );
};

const ReferenceView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Sokuon Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-xl shadow-xs">
            っ
          </div>
          <div>
            <h3 className="font-extrabold text-stone-900 dark:text-stone-100 text-base sm:text-lg">
              Sokuon (促音) — Small っ & Double Consonants
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              The little stop that creates double consonants in pronunciation
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          The small <strong className="text-red-600 dark:text-red-400 font-serif text-base">っ</strong> (notice it is about half the size of normal つ) represents a glottal pause. It doubles the consonant that follows immediately after it.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {[
            { word: 'がっこう', romaji: 'gakkou', meaning: 'School', breakdown: 'ga + (pause) + kou' },
            { word: 'きっぷ', romaji: 'kippu', meaning: 'Ticket', breakdown: 'ki + (pause) + pu' },
            { word: 'ざっし', romaji: 'zasshi', meaning: 'Magazine', breakdown: 'za + (pause) + shi' },
            { word: 'きって', romaji: 'kitte', meaning: 'Postage Stamp', breakdown: 'ki + (pause) + te' }
          ].map((ex) => (
            <div
              key={ex.word}
              className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 flex items-center justify-between"
            >
              <div>
                <div className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">
                  {ex.word}
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                  {ex.romaji} <span className="text-[11px] opacity-75">({ex.breakdown})</span>
                </div>
              </div>
              <div className="text-xs font-bold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-950/60 px-3 py-1 rounded-xl border border-red-200 dark:border-red-900/50">
                {ex.meaning}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Long Vowels Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xl shadow-xs">
            ー
          </div>
          <div>
            <h3 className="font-extrabold text-stone-900 dark:text-stone-100 text-base sm:text-lg">
              Chōon (長音) — Long Vowels in Hiragana
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Holding a vowel sound for two beats changes the word's meaning
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          In Japanese, vowel length is critical: <span className="italic">ojisan</span> (uncle) vs <span className="italic">ojiisan</span> (grandfather). Follow these standard Hiragana spelling rules:
        </p>

        <div className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80">
            <strong className="text-stone-900 dark:text-stone-100">A sound:</strong> Add <span className="font-bold text-red-600 dark:text-red-400">あ</span> (e.g. おかあさん = <span className="font-mono">okaasan</span> = mother)
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80">
            <strong className="text-stone-900 dark:text-stone-100">I sound:</strong> Add <span className="font-bold text-red-600 dark:text-red-400">い</span> (e.g. おにいさん = <span className="font-mono">oniisan</span> = older brother)
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80">
            <strong className="text-stone-900 dark:text-stone-100">U sound:</strong> Add <span className="font-bold text-red-600 dark:text-red-400">う</span> (e.g. くうき = <span className="font-mono">kuuki</span> = air / atmosphere)
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80">
            <strong className="text-stone-900 dark:text-stone-100">E sound:</strong> Usually add <span className="font-bold text-red-600 dark:text-red-400">い</span> (せんせい = <span className="font-mono">sensei</span>); rarely <span className="font-bold text-red-600 dark:text-red-400">え</span> (おねえさん = <span className="font-mono">oneesan</span>)
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80">
            <strong className="text-stone-900 dark:text-stone-100">O sound:</strong> Usually add <span className="font-bold text-red-600 dark:text-red-400">う</span> (とうきょう = <span className="font-mono">toukyou</span>, おとうさん = <span className="font-mono">otousan</span>); rarely <span className="font-bold text-red-600 dark:text-red-400">お</span> (こおり = <span className="font-mono">koori</span> = ice)
          </div>
        </div>
      </div>
    </div>
  );
};

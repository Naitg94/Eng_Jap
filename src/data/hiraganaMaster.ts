import type { LearningItem, CharacterGroup } from '../types/learning';
export { HIRAGANA_BASIC } from './hiragana-basic';
export { HIRAGANA_DAKUTEN } from './hiragana-dakuten';
export { HIRAGANA_HANDAKUTEN } from './hiragana-handakuten';
export { HIRAGANA_YOON } from './hiragana-yoon';
import { HIRAGANA_BASIC } from './hiragana-basic';
import { HIRAGANA_DAKUTEN } from './hiragana-dakuten';
import { HIRAGANA_HANDAKUTEN } from './hiragana-handakuten';
import { HIRAGANA_YOON } from './hiragana-yoon';

export const ALL_HIRAGANA: LearningItem[] = [
  ...HIRAGANA_BASIC,
  ...HIRAGANA_DAKUTEN,
  ...HIRAGANA_HANDAKUTEN,
  ...HIRAGANA_YOON
];

export const HIRAGANA_BY_ID: Map<string, LearningItem> = new Map(
  ALL_HIRAGANA.map((item) => [item.id, item])
);

export const HIRAGANA_BY_CHAR: Map<string, LearningItem> = new Map(
  ALL_HIRAGANA.map((item) => [item.character, item])
);

export interface HiraganaGroupMeta {
  id: string;
  name: string;
  category: CharacterGroup;
  items: LearningItem[];
}

export const BASIC_ROWS: HiraganaGroupMeta[] = [
  { id: 'row-A', name: 'A row (あ い う え お)', category: 'basic', items: HIRAGANA_BASIC.filter(i => i.row === 'A') },
  { id: 'row-K', name: 'K row (か き く け こ)', category: 'basic', items: HIRAGANA_BASIC.filter(i => i.row === 'K') },
  { id: 'row-S', name: 'S row (さ し す せ そ)', category: 'basic', items: HIRAGANA_BASIC.filter(i => i.row === 'S') },
  { id: 'row-T', name: 'T row (た ち つ て と)', category: 'basic', items: HIRAGANA_BASIC.filter(i => i.row === 'T') },
  { id: 'row-N', name: 'N row (な に ぬ ね の)', category: 'basic', items: HIRAGANA_BASIC.filter(i => i.row === 'N') },
  { id: 'row-H', name: 'H row (は ひ ふ へ ほ)', category: 'basic', items: HIRAGANA_BASIC.filter(i => i.row === 'H') },
  { id: 'row-M', name: 'M row (ま み む め も)', category: 'basic', items: HIRAGANA_BASIC.filter(i => i.row === 'M') },
  { id: 'row-Y', name: 'Y row (や ゆ よ)', category: 'basic', items: HIRAGANA_BASIC.filter(i => i.row === 'Y') },
  { id: 'row-R', name: 'R row (ら り る れ ろ)', category: 'basic', items: HIRAGANA_BASIC.filter(i => i.row === 'R') },
  { id: 'row-W', name: 'W row (わ を)', category: 'basic', items: HIRAGANA_BASIC.filter(i => i.row === 'W') },
  { id: 'row-N-solo', name: 'N (ん)', category: 'basic', items: HIRAGANA_BASIC.filter(i => i.row === 'N (ん)') }
];

export const DAKUTEN_ROWS: HiraganaGroupMeta[] = [
  { id: 'row-G', name: 'G row (が ぎ ぐ げ ご)', category: 'dakuten', items: HIRAGANA_DAKUTEN.filter(i => i.row === 'G') },
  { id: 'row-Z', name: 'Z row (ざ じ ず ぜ ぞ)', category: 'dakuten', items: HIRAGANA_DAKUTEN.filter(i => i.row === 'Z') },
  { id: 'row-D', name: 'D row (だ ぢ づ で ど)', category: 'dakuten', items: HIRAGANA_DAKUTEN.filter(i => i.row === 'D') },
  { id: 'row-B', name: 'B row (ば び ぶ べ ぼ)', category: 'dakuten', items: HIRAGANA_DAKUTEN.filter(i => i.row === 'B') }
];

export const HANDAKUTEN_ROWS: HiraganaGroupMeta[] = [
  { id: 'row-P', name: 'P row (ぱ ぴ ぷ ぺ ぽ)', category: 'handakuten', items: HIRAGANA_HANDAKUTEN.filter(i => i.row === 'P') }
];

export const YOON_GROUPS: HiraganaGroupMeta[] = [
  { id: 'yoon-kya', name: 'きゃ group (kya, kyu, kyo)', category: 'yoon', items: HIRAGANA_YOON.filter(i => i.row === 'きゃ group') },
  { id: 'yoon-sha', name: 'しゃ group (sha, shu, sho)', category: 'yoon', items: HIRAGANA_YOON.filter(i => i.row === 'しゃ group') },
  { id: 'yoon-cha', name: 'ちゃ group (cha, chu, cho)', category: 'yoon', items: HIRAGANA_YOON.filter(i => i.row === 'ちゃ group') },
  { id: 'yoon-nya', name: 'にゃ group (nya, nyu, nyo)', category: 'yoon', items: HIRAGANA_YOON.filter(i => i.row === 'にゃ group') },
  { id: 'yoon-hya', name: 'ひゃ group (hya, hyu, hyo)', category: 'yoon', items: HIRAGANA_YOON.filter(i => i.row === 'ひゃ group') },
  { id: 'yoon-mya', name: 'みゃ group (mya, myu, myo)', category: 'yoon', items: HIRAGANA_YOON.filter(i => i.row === 'みゃ group') },
  { id: 'yoon-rya', name: 'りゃ group (rya, ryu, ryo)', category: 'yoon', items: HIRAGANA_YOON.filter(i => i.row === 'りゃ group') },
  { id: 'yoon-gya', name: 'ぎゃ group (gya, gyu, gyo)', category: 'yoon', items: HIRAGANA_YOON.filter(i => i.row === 'ぎゃ group') },
  { id: 'yoon-ja', name: 'じゃ group (ja, ju, jo)', category: 'yoon', items: HIRAGANA_YOON.filter(i => i.row === 'じゃ group') },
  { id: 'yoon-bya', name: 'びゃ group (bya, byu, byo)', category: 'yoon', items: HIRAGANA_YOON.filter(i => i.row === 'びゃ group') },
  { id: 'yoon-pya', name: 'ぴゃ group (pya, pyu, pyo)', category: 'yoon', items: HIRAGANA_YOON.filter(i => i.row === 'ぴゃ group') }
];

export const ALL_GROUPS: HiraganaGroupMeta[] = [
  ...BASIC_ROWS,
  ...DAKUTEN_ROWS,
  ...HANDAKUTEN_ROWS,
  ...YOON_GROUPS
];

export const REFERENCE_RULES = {
  sokuon: {
    title: 'Sokuon (促音) — Small っ',
    summary: 'The small っ (tsu) creates a brief glottal stop / pause, which doubles the consonant sound that immediately follows it.',
    examples: [
      { kana: 'がっこう', romaji: 'gakkou', english: 'school', breakdown: 'ga + (pause) + kou' },
      { kana: 'きっぷ', romaji: 'kippu', english: 'ticket', breakdown: 'ki + (pause) + pu' },
      { kana: 'ざっし', romaji: 'zasshi', english: 'magazine', breakdown: 'za + (pause) + shi' },
      { kana: 'きって', romaji: 'kitte', english: 'postage stamp', breakdown: 'ki + (pause) + te' }
    ],
    rules: [
      'Visual Size: Notice the small size difference: つ (full size) vs っ (small sokuon).',
      'Sound: You do not pronounce "tsu". Instead, you hold your breath or tongue for a fraction of a beat before the next consonant.',
      'Romanization: Double the consonant of the syllable that comes after: k, s, t, p (e.g. kk, ss, tt, pp, or ssh / tch depending on system).'
    ]
  },
  longVowels: {
    title: 'Chōon (長音) — Long Vowels',
    summary: 'In Japanese, vowel length changes the meaning of words. A long vowel is held for two beats instead of one.',
    rules: [
      {
        vowel: 'A sound (あ column)',
        explanation: 'Add あ (a) after the kana.',
        example: 'おかあさん (okaasan = mother)'
      },
      {
        vowel: 'I sound (い column)',
        explanation: 'Add い (i) after the kana.',
        example: 'おにいさん (oniisan = older brother)'
      },
      {
        vowel: 'U sound (う column)',
        explanation: 'Add う (u) after the kana.',
        example: 'くうき (kuuki = air / atmosphere)'
      },
      {
        vowel: 'E sound (え column)',
        explanation: 'Usually add い (i); occasionally add え (e) in native Japanese words.',
        example: 'せんせい (sensei = teacher) / おねえさん (oneesan = older sister)'
      },
      {
        vowel: 'O sound (お column)',
        explanation: 'Usually add う (u); occasionally add お (o) in a small set of traditional words.',
        example: 'とうきょう (toukyou = Tokyo) / おとうさん (otousan = father) / こおり (koori = ice)'
      }
    ]
  }
};

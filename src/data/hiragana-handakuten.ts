import type { LearningItem } from '../types/learning';

export const HIRAGANA_HANDAKUTEN: LearningItem[] = [
  // P Row (from H + Handakuten circle / maru)
  {
    id: 'hiragana-pa',
    script: 'hiragana',
    character: 'ぱ',
    romaji: 'pa',
    pronunciation: 'pah',
    group: 'handakuten',
    row: 'P',
    column: 'A',
    mnemonic: 'A laughing person (は) blowing a giant round pink bubblegum bubble (maru circle) — "Pop goes the bubble!"',
    strokeSteps: [
      { step: 1, instruction: 'Vertical stroke on left with upward hook', points: [[26, 24], [24, 76], [30, 70]] },
      { step: 2, instruction: 'Horizontal bar at middle right', points: [[42, 44], [68, 44]] },
      { step: 3, instruction: 'Vertical stroke down on right, twisting into inner loop', points: [[56, 26], [56, 68], [66, 72], [58, 82], [48, 72]] },
      { step: 4, instruction: 'Handakuten circle (maru) drawn clockwise at top right', points: [[76, 20], [86, 20], [86, 32], [76, 32], [76, 20]] }
    ],
    confusedWith: ['は', 'ば'],
    example: { word: 'パン', romaji: 'pan', meaning: 'bread' }
  },
  {
    id: 'hiragana-pi',
    script: 'hiragana',
    character: 'ぴ',
    romaji: 'pi',
    pronunciation: 'pee',
    group: 'handakuten',
    row: 'P',
    column: 'I',
    mnemonic: 'The wide grinning mouth (ひ) eating a round pepperoni pizza piece — "Pizza!"',
    strokeSteps: [
      { step: 1, instruction: 'Horizontal, drops into wide deep U-curve, sweeps up-right', points: [[24, 40], [36, 40], [30, 72], [56, 72], [66, 42], [60, 56]] },
      { step: 2, instruction: 'Handakuten circle (maru) drawn clockwise at top right', points: [[76, 20], [86, 20], [86, 32], [76, 32], [76, 20]] }
    ],
    confusedWith: ['ひ', 'び'],
    example: { word: 'ぴかぴか', romaji: 'pikapika', meaning: 'sparkling / shiny' }
  },
  {
    id: 'hiragana-pu',
    script: 'hiragana',
    character: 'ぷ',
    romaji: 'pu',
    pronunciation: 'poo',
    group: 'handakuten',
    row: 'P',
    column: 'U',
    mnemonic: 'Mount Fuji (ふ) with a round fluffy cloud puff hovering at the peak — "Puff of smoke!"',
    strokeSteps: [
      { step: 1, instruction: 'Top tick mark centered', points: [[44, 20], [52, 28]] },
      { step: 2, instruction: 'Center curving vertical swoop tapering down', points: [[46, 36], [36, 68], [38, 80]] },
      { step: 3, instruction: 'Left side dot / hook', points: [[24, 50], [22, 62]] },
      { step: 4, instruction: 'Right side downward curved dot', points: [[64, 48], [68, 62]] },
      { step: 5, instruction: 'Handakuten circle (maru) drawn clockwise at top right', points: [[76, 20], [86, 20], [86, 32], [76, 32], [76, 20]] }
    ],
    confusedWith: ['ふ', 'ぶ'],
    example: { word: 'ぷりん', romaji: 'purin', meaning: 'pudding / flan' }
  },
  {
    id: 'hiragana-pe',
    script: 'hiragana',
    character: 'ぺ',
    romaji: 'pe',
    pronunciation: 'peh',
    group: 'handakuten',
    row: 'P',
    column: 'E',
    mnemonic: 'The mountain peak (へ) with a round signpost marking the top — "Penny at the peak!"',
    strokeSteps: [
      { step: 1, instruction: 'Single mountain peak stroke: diagonal up-right, then longer down-right', points: [[20, 62], [44, 35], [70, 65]] },
      { step: 2, instruction: 'Handakuten circle (maru) drawn clockwise at top right', points: [[76, 20], [86, 20], [86, 32], [76, 32], [76, 20]] }
    ],
    confusedWith: ['へ', 'べ'],
    example: { word: 'ぺこぺこ', romaji: 'pekopeko', meaning: 'hungry / ravenous' }
  },
  {
    id: 'hiragana-po',
    script: 'hiragana',
    character: 'ぽ',
    romaji: 'po',
    pronunciation: 'poh',
    group: 'handakuten',
    row: 'P',
    column: 'O',
    mnemonic: 'Santa Claus (ほ) popping round popcorn kernels — "Popcorn!"',
    strokeSteps: [
      { step: 1, instruction: 'Vertical stroke on left with upward hook', points: [[26, 24], [24, 76], [30, 70]] },
      { step: 2, instruction: 'Top horizontal bar on right', points: [[42, 34], [68, 34]] },
      { step: 3, instruction: 'Bottom horizontal bar on right', points: [[42, 48], [68, 48]] },
      { step: 4, instruction: 'Vertical stroke down into bottom loop', points: [[56, 38], [56, 68], [66, 72], [58, 82], [48, 72]] },
      { step: 5, instruction: 'Handakuten circle (maru) drawn clockwise at top right', points: [[76, 20], [86, 20], [86, 32], [76, 32], [76, 20]] }
    ],
    confusedWith: ['ほ', 'ぼ'],
    example: { word: 'ぽけっと', romaji: 'poketto', meaning: 'pocket' }
  }
];

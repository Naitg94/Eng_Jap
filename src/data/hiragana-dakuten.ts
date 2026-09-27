import type { LearningItem } from '../types/learning';

export const HIRAGANA_DAKUTEN: LearningItem[] = [
  // G Row (from K + Dakuten)
  {
    id: 'hiragana-ga',
    script: 'hiragana',
    character: 'が',
    romaji: 'ga',
    pronunciation: 'gah',
    group: 'dakuten',
    row: 'G',
    column: 'A',
    mnemonic: 'A kite (か) flying in a sudden strong gust of wind with two little leaves fluttering by — "Gah, the wind!"',
    strokeSteps: [
      { step: 1, instruction: 'Curved downward stroke with an inward hook', points: [[26, 32], [50, 32], [46, 75], [38, 70]] },
      { step: 2, instruction: 'Slanted curved vertical stroke piercing through top left', points: [[34, 22], [22, 75]] },
      { step: 3, instruction: 'Accent stroke on upper right', points: [[60, 36], [70, 48]] },
      { step: 4, instruction: 'First dakuten mark (tenten) at top right', points: [[72, 22], [80, 28]] },
      { step: 5, instruction: 'Second parallel dakuten mark at top right', points: [[78, 28], [86, 34]] }
    ],
    confusedWith: ['か', 'ぎ'],
    example: { word: 'がくせい', romaji: 'gakusei', meaning: 'student' }
  },
  {
    id: 'hiragana-gi',
    script: 'hiragana',
    character: 'ぎ',
    romaji: 'gi',
    pronunciation: 'gee',
    group: 'dakuten',
    row: 'G',
    column: 'I',
    mnemonic: 'The antique key (き) unlocking a treasure chest filled with gold and gifts — "Gifts in the chest!"',
    strokeSteps: [
      { step: 1, instruction: 'Upper horizontal bar', points: [[24, 34], [65, 32]] },
      { step: 2, instruction: 'Lower parallel horizontal bar', points: [[22, 48], [68, 46]] },
      { step: 3, instruction: 'Diagonal stroke crossing through both with a hook', points: [[50, 20], [38, 65], [44, 65]] },
      { step: 4, instruction: 'Bottom curved smile arc', points: [[28, 78], [58, 78]] },
      { step: 5, instruction: 'First dakuten mark at top right', points: [[74, 22], [82, 28]] },
      { step: 6, instruction: 'Second dakuten mark at top right', points: [[80, 28], [88, 34]] }
    ],
    confusedWith: ['き', 'ざ'],
    example: { word: 'ぎんこう', romaji: 'ginkou', meaning: 'bank' }
  },
  {
    id: 'hiragana-gu',
    script: 'hiragana',
    character: 'ぐ',
    romaji: 'gu',
    pronunciation: 'goo',
    group: 'dakuten',
    row: 'G',
    column: 'U',
    mnemonic: 'A bird beak (く) snapping up delicious gooey bugs — "Gooey treats!"',
    strokeSteps: [
      { step: 1, instruction: 'Single chevron angle: diagonal down-left then down-right', points: [[58, 28], [26, 52], [62, 78]] },
      { step: 2, instruction: 'First dakuten mark at top right', points: [[68, 22], [76, 28]] },
      { step: 3, instruction: 'Second dakuten mark at top right', points: [[74, 28], [82, 34]] }
    ],
    confusedWith: ['く'],
    example: { word: 'ぐあい', romaji: 'guai', meaning: 'condition / health' }
  },
  {
    id: 'hiragana-ge',
    script: 'hiragana',
    character: 'げ',
    romaji: 'ge',
    pronunciation: 'geh',
    group: 'dakuten',
    row: 'G',
    column: 'E',
    mnemonic: 'A root beer keg (け) with drops of geyser foam shooting out — "Geyser foam!"',
    strokeSteps: [
      { step: 1, instruction: 'Vertical stroke on left with upward flick', points: [[26, 24], [24, 75], [30, 70]] },
      { step: 2, instruction: 'Horizontal bar on right', points: [[44, 40], [70, 40]] },
      { step: 3, instruction: 'Vertical curving stroke cutting right bar', points: [[58, 26], [55, 80]] },
      { step: 4, instruction: 'First dakuten mark at top right', points: [[74, 22], [82, 28]] },
      { step: 5, instruction: 'Second dakuten mark at top right', points: [[80, 28], [88, 34]] }
    ],
    confusedWith: ['け'],
    example: { word: 'げんき', romaji: 'genki', meaning: 'healthy / energetic' }
  },
  {
    id: 'hiragana-go',
    script: 'hiragana',
    character: 'ご',
    romaji: 'go',
    pronunciation: 'goh',
    group: 'dakuten',
    row: 'G',
    column: 'O',
    mnemonic: 'Two worms (こ) wearing racing goggles ready to go — "Ready, set, GO!"',
    strokeSteps: [
      { step: 1, instruction: 'Top horizontal stroke with end hook', points: [[26, 36], [62, 36], [58, 42]] },
      { step: 2, instruction: 'Bottom curved horizontal stroke', points: [[26, 72], [64, 72]] },
      { step: 3, instruction: 'First dakuten mark at top right', points: [[72, 22], [80, 28]] },
      { step: 4, instruction: 'Second dakuten mark at top right', points: [[78, 28], [86, 34]] }
    ],
    confusedWith: ['こ', 'ぞ'],
    example: { word: 'ごはん', romaji: 'gohan', meaning: 'rice / meal' }
  },

  // Z Row (from S + Dakuten)
  {
    id: 'hiragana-za',
    script: 'hiragana',
    character: 'ざ',
    romaji: 'za',
    pronunciation: 'zah',
    group: 'dakuten',
    row: 'Z',
    column: 'A',
    mnemonic: 'Smiling sunglasses face (さ) getting zapped by laser beams — "Zap!"',
    strokeSteps: [
      { step: 1, instruction: 'Horizontal stroke slanting slightly up', points: [[26, 38], [62, 36]] },
      { step: 2, instruction: 'Slanted stroke cutting through with bottom hook', points: [[48, 22], [38, 60], [44, 62]] },
      { step: 3, instruction: 'Bottom smile arc', points: [[28, 75], [54, 75]] },
      { step: 4, instruction: 'First dakuten mark at top right', points: [[72, 22], [80, 28]] },
      { step: 5, instruction: 'Second dakuten mark at top right', points: [[78, 28], [86, 34]] }
    ],
    confusedWith: ['さ', 'ぎ'],
    example: { word: 'ざっし', romaji: 'zasshi', meaning: 'magazine' }
  },
  {
    id: 'hiragana-ji-z',
    script: 'hiragana',
    character: 'じ',
    romaji: 'ji',
    pronunciation: 'jee',
    group: 'dakuten',
    row: 'Z',
    column: 'I',
    mnemonic: 'The giant fishing hook (し) catching a sparkling piece of jewelry — "Jewelry!"',
    strokeSteps: [
      { step: 1, instruction: 'Smooth vertical drop into sweeping right hook', points: [[36, 20], [36, 70], [64, 72]] },
      { step: 2, instruction: 'First dakuten mark at top right', points: [[68, 22], [76, 28]] },
      { step: 3, instruction: 'Second dakuten mark at top right', points: [[74, 28], [82, 34]] }
    ],
    confusedWith: ['し', 'ぢ'],
    example: { word: 'じてんしゃ', romaji: 'jitensha', meaning: 'bicycle' },
    notes: 'Standard Hepburn: "ji". This is the common "ji" used in the vast majority of Japanese words.'
  },
  {
    id: 'hiragana-zu-z',
    script: 'hiragana',
    character: 'ず',
    romaji: 'zu',
    pronunciation: 'zoo',
    group: 'dakuten',
    row: 'Z',
    column: 'U',
    mnemonic: 'The acrobatic swinger (す) performing for the animals at the zoo — "Zoo animals!"',
    strokeSteps: [
      { step: 1, instruction: 'Horizontal bar across top', points: [[22, 36], [65, 36]] },
      { step: 2, instruction: 'Vertical stroke dropping into a teardrop loop', points: [[48, 20], [48, 52], [60, 56], [50, 68], [42, 56], [42, 88]] },
      { step: 3, instruction: 'First dakuten mark at top right', points: [[72, 22], [80, 28]] },
      { step: 4, instruction: 'Second dakuten mark at top right', points: [[78, 28], [86, 34]] }
    ],
    confusedWith: ['す', 'づ'],
    example: { word: 'ちず', romaji: 'chizu', meaning: 'map' },
    notes: 'Standard Hepburn: "zu". This is the standard "zu" used in almost all Japanese words.'
  },
  {
    id: 'hiragana-ze',
    script: 'hiragana',
    character: 'ぜ',
    romaji: 'ze',
    pronunciation: 'zeh',
    group: 'dakuten',
    row: 'Z',
    column: 'E',
    mnemonic: 'Two people on the bench (せ) feeling a cool, breezy zephyr — "Zephyr breeze!"',
    strokeSteps: [
      { step: 1, instruction: 'Horizontal line from left to right', points: [[22, 42], [65, 42]] },
      { step: 2, instruction: 'Right vertical line turning left at bottom', points: [[56, 28], [56, 72], [26, 72]] },
      { step: 3, instruction: 'Left vertical line crossing down', points: [[36, 28], [36, 60]] },
      { step: 4, instruction: 'First dakuten mark at top right', points: [[74, 22], [82, 28]] },
      { step: 5, instruction: 'Second dakuten mark at top right', points: [[80, 28], [88, 34]] }
    ],
    confusedWith: ['せ'],
    example: { word: 'ぜんぶ', romaji: 'zenbu', meaning: 'all / everything' }
  },
  {
    id: 'hiragana-zo',
    script: 'hiragana',
    character: 'ぞ',
    romaji: 'zo',
    pronunciation: 'zoh',
    group: 'dakuten',
    row: 'Z',
    column: 'O',
    mnemonic: 'The zigzag sewing pattern (そ) outlining a massive zoo elephant (zou) — "Zou means elephant!"',
    strokeSteps: [
      { step: 1, instruction: 'Continuous zigzag line down into a rounded bottom', points: [[28, 28], [58, 28], [28, 52], [58, 52], [60, 76], [28, 78]] },
      { step: 2, instruction: 'First dakuten mark at top right', points: [[68, 20], [76, 26]] },
      { step: 3, instruction: 'Second dakuten mark at top right', points: [[74, 26], [82, 32]] }
    ],
    confusedWith: ['そ', 'ろ'],
    example: { word: 'ぞう', romaji: 'zou', meaning: 'elephant' }
  },

  // D Row (from T + Dakuten)
  {
    id: 'hiragana-da',
    script: 'hiragana',
    character: 'だ',
    romaji: 'da',
    pronunciation: 'dah',
    group: 'dakuten',
    row: 'D',
    column: 'A',
    mnemonic: '"Ta" (た) with dakuten drops becomes dad singing "Da-da-da!"',
    strokeSteps: [
      { step: 1, instruction: 'Horizontal stroke on upper-left', points: [[22, 38], [46, 38]] },
      { step: 2, instruction: 'Slanted down stroke cutting through', points: [[36, 22], [26, 75]] },
      { step: 3, instruction: 'Top stroke of right "ko" shape', points: [[48, 45], [68, 45]] },
      { step: 4, instruction: 'Bottom curved stroke of "ko" shape', points: [[46, 68], [66, 68]] },
      { step: 5, instruction: 'First dakuten mark at top right', points: [[74, 22], [82, 28]] },
      { step: 6, instruction: 'Second dakuten mark at top right', points: [[80, 28], [88, 34]] }
    ],
    confusedWith: ['た', 'な'],
    example: { word: 'だいがく', romaji: 'daigaku', meaning: 'university' }
  },
  {
    id: 'hiragana-ji-d',
    script: 'hiragana',
    character: 'ぢ',
    romaji: 'ji',
    pronunciation: 'jee',
    group: 'dakuten',
    row: 'D',
    column: 'I',
    mnemonic: 'Cheerleader (ち) dancing with sparkling jingle bells — "Jingle bells!"',
    strokeSteps: [
      { step: 1, instruction: 'Horizontal bar slanting slightly upward', points: [[26, 36], [62, 32]] },
      { step: 2, instruction: 'Slanted down stroke curving into round belly loop', points: [[45, 18], [36, 50], [62, 52], [60, 78], [30, 78]] },
      { step: 3, instruction: 'First dakuten mark at top right', points: [[72, 20], [80, 26]] },
      { step: 4, instruction: 'Second dakuten mark at top right', points: [[78, 26], [86, 32]] }
    ],
    confusedWith: ['ち', 'じ'],
    example: { word: 'はなぢ', romaji: 'hanaji', meaning: 'nosebleed' },
    notes: 'Pronounced "ji" in modern standard Japanese. Rare; used primarily when a "chi" (ち) sound becomes voiced due to compound words (rendaku), such as はな + ち = はなぢ (nosebleed).'
  },
  {
    id: 'hiragana-zu-d',
    script: 'hiragana',
    character: 'づ',
    romaji: 'zu',
    pronunciation: 'zoo',
    group: 'dakuten',
    row: 'D',
    column: 'U',
    mnemonic: 'The tidal wave (つ) splashing over a zoo dolphin — "Zoo dolphin splash!"',
    strokeSteps: [
      { step: 1, instruction: 'Smooth single wave stroke arching up and sweeping down-left', points: [[26, 40], [62, 36], [62, 65], [28, 80]] },
      { step: 2, instruction: 'First dakuten mark at top right', points: [[70, 20], [78, 26]] },
      { step: 3, instruction: 'Second dakuten mark at top right', points: [[76, 26], [84, 32]] }
    ],
    confusedWith: ['つ', 'ず'],
    example: { word: 'つづく', romaji: 'tsuzuku', meaning: 'to continue' },
    notes: 'Pronounced "zu" in modern standard Japanese. Rare; used primarily when "tsu" (つ) becomes voiced in compound words or doubled kana, such as つづく (tsuzuku - to continue).'
  },
  {
    id: 'hiragana-de',
    script: 'hiragana',
    character: 'で',
    romaji: 'de',
    pronunciation: 'deh',
    group: 'dakuten',
    row: 'D',
    column: 'E',
    mnemonic: 'A tennis racket (て) bouncing delicious deli snacks — "Deli snacks!"',
    strokeSteps: [
      { step: 1, instruction: 'Horizontal stroke from left, curving down into backward crescent', points: [[24, 38], [64, 38], [36, 78]] },
      { step: 2, instruction: 'First dakuten mark at top right', points: [[72, 22], [80, 28]] },
      { step: 3, instruction: 'Second dakuten mark at top right', points: [[78, 28], [86, 34]] }
    ],
    confusedWith: ['て'],
    example: { word: 'でんしゃ', romaji: 'densha', meaning: 'electric train' }
  },
  {
    id: 'hiragana-do',
    script: 'hiragana',
    character: 'ど',
    romaji: 'do',
    pronunciation: 'doh',
    group: 'dakuten',
    row: 'D',
    column: 'O',
    mnemonic: 'A toe with a splinter (と) knocking on a heavy wooden door — "Door!"',
    strokeSteps: [
      { step: 1, instruction: 'Short downward slanted tick', points: [[34, 26], [42, 48]] },
      { step: 2, instruction: 'Large open crescent "C" shape hugging the tick', points: [[40, 46], [62, 55], [58, 80], [30, 80]] },
      { step: 3, instruction: 'First dakuten mark at top right', points: [[70, 22], [78, 28]] },
      { step: 4, instruction: 'Second dakuten mark at top right', points: [[76, 28], [84, 34]] }
    ],
    confusedWith: ['と'],
    example: { word: 'どこ', romaji: 'doko', meaning: 'where' }
  },

  // B Row (from H + Dakuten)
  {
    id: 'hiragana-ba',
    script: 'hiragana',
    character: 'ば',
    romaji: 'ba',
    pronunciation: 'bah',
    group: 'dakuten',
    row: 'B',
    column: 'A',
    mnemonic: 'A laughing person (は) bouncing a round basketball — "Basketball!"',
    strokeSteps: [
      { step: 1, instruction: 'Vertical stroke on left with upward hook', points: [[26, 24], [24, 76], [30, 70]] },
      { step: 2, instruction: 'Horizontal bar at middle right', points: [[42, 44], [68, 44]] },
      { step: 3, instruction: 'Vertical stroke down on right, twisting into inner loop', points: [[56, 26], [56, 68], [66, 72], [58, 82], [48, 72]] },
      { step: 4, instruction: 'First dakuten mark at top right', points: [[72, 22], [80, 28]] },
      { step: 5, instruction: 'Second dakuten mark at top right', points: [[78, 28], [86, 34]] }
    ],
    confusedWith: ['は', 'ぱ', 'ぼ'],
    example: { word: 'ばしょ', romaji: 'basho', meaning: 'place' }
  },
  {
    id: 'hiragana-bi',
    script: 'hiragana',
    character: 'び',
    romaji: 'bi',
    pronunciation: 'bee',
    group: 'dakuten',
    row: 'B',
    column: 'I',
    mnemonic: 'The wide grinning mouth (ひ) holding a big juicy piece of beef — "Beef burger!"',
    strokeSteps: [
      { step: 1, instruction: 'Horizontal, drops into wide deep U-curve, sweeps up-right', points: [[24, 40], [36, 40], [30, 72], [56, 72], [66, 42], [60, 56]] },
      { step: 2, instruction: 'First dakuten mark at top right', points: [[74, 22], [82, 28]] },
      { step: 3, instruction: 'Second dakuten mark at top right', points: [[80, 28], [88, 34]] }
    ],
    confusedWith: ['ひ', 'ぴ'],
    example: { word: 'びょういん', romaji: 'byouin', meaning: 'hospital' }
  },
  {
    id: 'hiragana-bu',
    script: 'hiragana',
    character: 'ぶ',
    romaji: 'bu',
    pronunciation: 'boo',
    group: 'dakuten',
    row: 'B',
    column: 'U',
    mnemonic: 'Mount Fuji (ふ) covered with buzzing bumblebees — "Buzzing bumblebees!"',
    strokeSteps: [
      { step: 1, instruction: 'Top tick mark centered', points: [[44, 20], [52, 28]] },
      { step: 2, instruction: 'Center curving vertical swoop tapering down', points: [[46, 36], [36, 68], [38, 80]] },
      { step: 3, instruction: 'Left side dot / hook', points: [[24, 50], [22, 62]] },
      { step: 4, instruction: 'Right side downward curved dot', points: [[64, 48], [68, 62]] },
      { step: 5, instruction: 'First dakuten mark at top right', points: [[76, 22], [84, 28]] },
      { step: 6, instruction: 'Second dakuten mark at top right', points: [[82, 28], [90, 34]] }
    ],
    confusedWith: ['ふ', 'ぷ'],
    example: { word: 'ぶんか', romaji: 'bunka', meaning: 'culture' }
  },
  {
    id: 'hiragana-be',
    script: 'hiragana',
    character: 'べ',
    romaji: 'be',
    pronunciation: 'beh',
    group: 'dakuten',
    row: 'B',
    column: 'E',
    mnemonic: 'The mountain peak (へ) with two campers climbing up to their bedroom basecamp — "Basecamp beds!"',
    strokeSteps: [
      { step: 1, instruction: 'Single mountain peak stroke: diagonal up-right, then longer down-right', points: [[20, 62], [44, 35], [70, 65]] },
      { step: 2, instruction: 'First dakuten mark at top right', points: [[76, 22], [84, 28]] },
      { step: 3, instruction: 'Second dakuten mark at top right', points: [[82, 28], [90, 34]] }
    ],
    confusedWith: ['へ', 'ぺ'],
    example: { word: 'べんきょう', romaji: 'benkyou', meaning: 'study' }
  },
  {
    id: 'hiragana-bo',
    script: 'hiragana',
    character: 'ぼ',
    romaji: 'bo',
    pronunciation: 'boh',
    group: 'dakuten',
    row: 'B',
    column: 'O',
    mnemonic: 'Santa Claus (ほ) sailing on a sturdy wooden boat — "Boat!"',
    strokeSteps: [
      { step: 1, instruction: 'Vertical stroke on left with upward hook', points: [[26, 24], [24, 76], [30, 70]] },
      { step: 2, instruction: 'Top horizontal bar on right', points: [[42, 34], [68, 34]] },
      { step: 3, instruction: 'Bottom horizontal bar on right', points: [[42, 48], [68, 48]] },
      { step: 4, instruction: 'Vertical stroke down into bottom loop', points: [[56, 38], [56, 68], [66, 72], [58, 82], [48, 72]] },
      { step: 5, instruction: 'First dakuten mark at top right', points: [[74, 20], [82, 26]] },
      { step: 6, instruction: 'Second dakuten mark at top right', points: [[80, 26], [88, 32]] }
    ],
    confusedWith: ['ほ', 'ぽ', 'ば'],
    example: { word: 'ぼうし', romaji: 'boushi', meaning: 'hat' }
  }
];

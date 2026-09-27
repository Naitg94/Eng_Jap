import type { LearningItem } from '../types/learning';

export const HIRAGANA_YOON: LearningItem[] = [
  // Kya group
  {
    id: 'hiragana-kya',
    script: 'hiragana',
    character: 'きゃ',
    romaji: 'kya',
    pronunciation: 'k-yah',
    group: 'yoon',
    row: 'きゃ group',
    mnemonic: 'A key (き) unlocking a tiny yak (ゃ) that squeaks "Kyaa!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana き: bars and looped diagonal', points: [[20, 30], [50, 30], [20, 45], [52, 45], [38, 18], [28, 65], [20, 78], [42, 78]] },
      { step: 2, instruction: 'Small ゃ: miniature arch and crossing slants', points: [[62, 55], [82, 52], [74, 40], [64, 80]] }
    ],
    confusedWith: ['ぎゃ', 'しゃ'],
    example: { word: 'きゃく', romaji: 'kyaku', meaning: 'guest / customer' }
  },
  {
    id: 'hiragana-kyu',
    script: 'hiragana',
    character: 'きゅ',
    romaji: 'kyu',
    pronunciation: 'k-yoo',
    group: 'yoon',
    row: 'きゃ group',
    mnemonic: 'A key (き) attached to a cute little goldfish (ゅ) — "Kyu-te!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana き', points: [[20, 30], [50, 30], [20, 45], [52, 45], [38, 18], [28, 65], [20, 78], [42, 78]] },
      { step: 2, instruction: 'Small ゅ: miniature fish shape and vertical needle', points: [[62, 48], [62, 78], [76, 72], [72, 45], [70, 84]] }
    ],
    confusedWith: ['きょ', 'ぎゅ'],
    example: { word: 'きゅう', romaji: 'kyuu', meaning: 'nine (9)' }
  },
  {
    id: 'hiragana-kyo',
    script: 'hiragana',
    character: 'きょ',
    romaji: 'kyo',
    pronunciation: 'k-yoh',
    group: 'yoon',
    row: 'きゃ group',
    mnemonic: 'A key (き) spinning a tiny yo-yo (ょ) — "Kyo-to city key!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana き', points: [[20, 30], [50, 30], [20, 45], [52, 45], [38, 18], [28, 65], [20, 78], [42, 78]] },
      { step: 2, instruction: 'Small ょ: horizontal dash and looping vertical', points: [[60, 52], [78, 52], [72, 42], [72, 76], [64, 82], [64, 72], [82, 72]] }
    ],
    confusedWith: ['きゅ', 'ぎょ'],
    example: { word: 'きょう', romaji: 'kyou', meaning: 'today' }
  },

  // Sha group
  {
    id: 'hiragana-sha',
    script: 'hiragana',
    character: 'しゃ',
    romaji: 'sha',
    pronunciation: 'shah',
    group: 'yoon',
    row: 'しゃ group',
    mnemonic: 'A fishing hook (し) catching a tiny yak (ゃ) taking a shower — "Sha-wer!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana し: drop into sweeping hook', points: [[30, 22], [30, 68], [48, 72]] },
      { step: 2, instruction: 'Small ゃ: miniature arch and cross', points: [[62, 55], [82, 52], [74, 40], [64, 80]] }
    ],
    confusedWith: ['じゃ', 'ちゃ'],
    example: { word: 'しゃしん', romaji: 'shashin', meaning: 'photograph' }
  },
  {
    id: 'hiragana-shu',
    script: 'hiragana',
    character: 'しゅ',
    romaji: 'shu',
    pronunciation: 'shoo',
    group: 'yoon',
    row: 'しゃ group',
    mnemonic: 'A fishing hook (し) pulling up a shiny new shoe (ゅ) — "Shu-e / shoe!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana し: drop into sweeping hook', points: [[30, 22], [30, 68], [48, 72]] },
      { step: 2, instruction: 'Small ゅ: miniature fish shape and vertical', points: [[62, 48], [62, 78], [76, 72], [72, 45], [70, 84]] }
    ],
    confusedWith: ['じゅ', 'しょ'],
    example: { word: 'しゅみ', romaji: 'shumi', meaning: 'hobby' }
  },
  {
    id: 'hiragana-sho',
    script: 'hiragana',
    character: 'しょ',
    romaji: 'sho',
    pronunciation: 'shoh',
    group: 'yoon',
    row: 'しゃ group',
    mnemonic: 'A fishing hook (し) holding a tiny yo-yo (ょ) for a grand show — "Show!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana し: drop into sweeping hook', points: [[30, 22], [30, 68], [48, 72]] },
      { step: 2, instruction: 'Small ょ: horizontal dash and looping vertical', points: [[60, 52], [78, 52], [72, 42], [72, 76], [64, 82], [64, 72], [82, 72]] }
    ],
    confusedWith: ['じょ', 'しゅ'],
    example: { word: 'しょくどう', romaji: 'shokudou', meaning: 'cafeteria / dining hall' }
  },

  // Cha group
  {
    id: 'hiragana-cha',
    script: 'hiragana',
    character: 'ちゃ',
    romaji: 'cha',
    pronunciation: 'chah',
    group: 'yoon',
    row: 'ちゃ group',
    mnemonic: 'Cheerleader (ち) inviting a tiny yak (ゃ) for a cup of hot green tea (o-cha) — "Cha!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana ち: horizontal bar and belly loop', points: [[20, 36], [50, 32], [38, 18], [30, 50], [50, 52], [48, 78], [24, 78]] },
      { step: 2, instruction: 'Small ゃ: miniature arch and cross', points: [[62, 55], [82, 52], [74, 40], [64, 80]] }
    ],
    confusedWith: ['しゃ', 'じゃ'],
    example: { word: 'おちゃ', romaji: 'ocha', meaning: 'green tea' }
  },
  {
    id: 'hiragana-chu',
    script: 'hiragana',
    character: 'ちゅ',
    romaji: 'chu',
    pronunciation: 'choo',
    group: 'yoon',
    row: 'ちゃ group',
    mnemonic: 'Cheerleader (ち) boarding a tiny choo-choo train (ゅ) — "Choo-choo train!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana ち', points: [[20, 36], [50, 32], [38, 18], [30, 50], [50, 52], [48, 78], [24, 78]] },
      { step: 2, instruction: 'Small ゅ: miniature fish shape and vertical', points: [[62, 48], [62, 78], [76, 72], [72, 45], [70, 84]] }
    ],
    confusedWith: ['ちょ', 'しゅ'],
    example: { word: 'ちゅうごく', romaji: 'chuugoku', meaning: 'China' }
  },
  {
    id: 'hiragana-cho',
    script: 'hiragana',
    character: 'ちょ',
    romaji: 'cho',
    pronunciation: 'choh',
    group: 'yoon',
    row: 'ちゃ group',
    mnemonic: 'Cheerleader (ち) playing with a miniature chocolate yo-yo (ょ) — "Chocolate cho!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana ち', points: [[20, 36], [50, 32], [38, 18], [30, 50], [50, 52], [48, 78], [24, 78]] },
      { step: 2, instruction: 'Small ょ: horizontal dash and looping vertical', points: [[60, 52], [78, 52], [72, 42], [72, 76], [64, 82], [64, 72], [82, 72]] }
    ],
    confusedWith: ['ちゅ', 'しょ'],
    example: { word: 'ちょっと', romaji: 'chotto', meaning: 'a little / a moment' }
  },

  // Nya group
  {
    id: 'hiragana-nya',
    script: 'hiragana',
    character: 'にゃ',
    romaji: 'nya',
    pronunciation: 'n-yah',
    group: 'yoon',
    row: 'にゃ group',
    mnemonic: 'Needle and thread (に) sewing a tiny kitten yak (ゃ) that meows "Nyaa~!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana に: vertical and two horizontal dashes', points: [[20, 24], [20, 74], [35, 42], [50, 42], [35, 68], [52, 68]] },
      { step: 2, instruction: 'Small ゃ: miniature arch and cross', points: [[62, 55], [82, 52], [74, 40], [64, 80]] }
    ],
    confusedWith: ['にゅ', 'みゃ'],
    example: { word: 'にゃんこ', romaji: 'nyanko', meaning: 'kitty cat' }
  },
  {
    id: 'hiragana-nyu',
    script: 'hiragana',
    character: 'にゅ',
    romaji: 'nyu',
    pronunciation: 'n-yoo',
    group: 'yoon',
    row: 'にゃ group',
    mnemonic: 'Needle and thread (に) stitching a brand new (ゅ) coat — "New nyu!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana に', points: [[20, 24], [20, 74], [35, 42], [50, 42], [35, 68], [52, 68]] },
      { step: 2, instruction: 'Small ゅ: miniature fish shape and vertical', points: [[62, 48], [62, 78], [76, 72], [72, 45], [70, 84]] }
    ],
    confusedWith: ['にょ', 'みゅ'],
    example: { word: 'ぎゅうにゅう', romaji: 'gyuunyuu', meaning: 'milk' }
  },
  {
    id: 'hiragana-nyo',
    script: 'hiragana',
    character: 'にょ',
    romaji: 'nyo',
    pronunciation: 'n-yoh',
    group: 'yoon',
    row: 'にゃ group',
    mnemonic: 'Needle and thread (に) dangling a tiny yo-yo (ょ) — "Nyo!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana に', points: [[20, 24], [20, 74], [35, 42], [50, 42], [35, 68], [52, 68]] },
      { step: 2, instruction: 'Small ょ: horizontal dash and looping vertical', points: [[60, 52], [78, 52], [72, 42], [72, 76], [64, 82], [64, 72], [82, 72]] }
    ],
    confusedWith: ['にゅ', 'みょ'],
    example: { word: 'にょうぼう', romaji: 'nyoubou', meaning: 'wife' }
  },

  // Hya group
  {
    id: 'hiragana-hya',
    script: 'hiragana',
    character: 'ひゃ',
    romaji: 'hya',
    pronunciation: 'h-yah',
    group: 'yoon',
    row: 'ひゃ group',
    mnemonic: 'Grinning face (ひ) laughing out loud at a tiny dancing yak (ゃ) — "Hyaha!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana ひ: deep U-curve', points: [[18, 40], [28, 40], [22, 72], [42, 72], [50, 42], [45, 56]] },
      { step: 2, instruction: 'Small ゃ: miniature arch and cross', points: [[62, 55], [82, 52], [74, 40], [64, 80]] }
    ],
    confusedWith: ['びゃ', 'ぴゃ'],
    example: { word: 'ひゃく', romaji: 'hyaku', meaning: 'hundred (100)' }
  },
  {
    id: 'hiragana-hyu',
    script: 'hiragana',
    character: 'ひゅ',
    romaji: 'hyu',
    pronunciation: 'h-yoo',
    group: 'yoon',
    row: 'ひゃ group',
    mnemonic: 'Grinning face (ひ) whistling like a swift gust of wind (ゅ) — "Hyuuu!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana ひ', points: [[18, 40], [28, 40], [22, 72], [42, 72], [50, 42], [45, 56]] },
      { step: 2, instruction: 'Small ゅ: miniature fish shape and vertical', points: [[62, 48], [62, 78], [76, 72], [72, 45], [70, 84]] }
    ],
    confusedWith: ['ひょ', 'びゅ'],
    example: { word: 'ひゅーひゅー', romaji: 'hyuuhyuu', meaning: 'howling wind' }
  },
  {
    id: 'hiragana-hyo',
    script: 'hiragana',
    character: 'ひょ',
    romaji: 'hyo',
    pronunciation: 'h-yoh',
    group: 'yoon',
    row: 'ひゃ group',
    mnemonic: 'Grinning face (ひ) staring at hail falling like tiny yo-yos (ょ) — "Hyo-hyo!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana ひ', points: [[18, 40], [28, 40], [22, 72], [42, 72], [50, 42], [45, 56]] },
      { step: 2, instruction: 'Small ょ: horizontal dash and looping vertical', points: [[60, 52], [78, 52], [72, 42], [72, 76], [64, 82], [64, 72], [82, 72]] }
    ],
    confusedWith: ['ひゅ', 'びょ'],
    example: { word: 'ひょう', romaji: 'hyou', meaning: 'table / chart / hail' }
  },

  // Mya group
  {
    id: 'hiragana-mya',
    script: 'hiragana',
    character: 'みゃ',
    romaji: 'mya',
    pronunciation: 'm-yah',
    group: 'yoon',
    row: 'みゃ group',
    mnemonic: 'The number 21 (み) riding a tiny yak (ゃ) meowing "Mya!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana み: looping horizontal and cutting diagonal', points: [[18, 38], [38, 38], [24, 68], [36, 60], [52, 60], [42, 42], [36, 82]] },
      { step: 2, instruction: 'Small ゃ: miniature arch and cross', points: [[62, 55], [82, 52], [74, 40], [64, 80]] }
    ],
    confusedWith: ['みゅ', 'にゃ'],
    example: { word: 'みゃく', romaji: 'myaku', meaning: 'pulse' }
  },
  {
    id: 'hiragana-myu',
    script: 'hiragana',
    character: 'みゅ',
    romaji: 'myu',
    pronunciation: 'm-yoo',
    group: 'yoon',
    row: 'みゃ group',
    mnemonic: 'The number 21 (み) listening to musical notes from a tiny flute (ゅ) — "Music myu!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana み', points: [[18, 38], [38, 38], [24, 68], [36, 60], [52, 60], [42, 42], [36, 82]] },
      { step: 2, instruction: 'Small ゅ: miniature fish shape and vertical', points: [[62, 48], [62, 78], [76, 72], [72, 45], [70, 84]] }
    ],
    confusedWith: ['みょ', 'にゅ'],
    example: { word: 'みゅーじっく', romaji: 'myuujikku', meaning: 'music' }
  },
  {
    id: 'hiragana-myo',
    script: 'hiragana',
    character: 'みょ',
    romaji: 'myo',
    pronunciation: 'm-yoh',
    group: 'yoon',
    row: 'みゃ group',
    mnemonic: 'The number 21 (み) playing with a mysterious yo-yo (ょ) — "Myou (strange/mysterious)!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana み', points: [[18, 38], [38, 38], [24, 68], [36, 60], [52, 60], [42, 42], [36, 82]] },
      { step: 2, instruction: 'Small ょ: horizontal dash and looping vertical', points: [[60, 52], [78, 52], [72, 42], [72, 76], [64, 82], [64, 72], [82, 72]] }
    ],
    confusedWith: ['みゅ', 'にょ'],
    example: { word: 'みょうじ', romaji: 'myouji', meaning: 'family name / surname' }
  },

  // Rya group
  {
    id: 'hiragana-rya',
    script: 'hiragana',
    character: 'りゃ',
    romaji: 'rya',
    pronunciation: 'r-yah',
    group: 'yoon',
    row: 'りゃ group',
    mnemonic: 'River reeds (り) tickling a tiny yak (ゃ) drinking from the river — "Rya!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana り: two strokes', points: [[20, 28], [20, 65], [24, 60], [40, 20], [40, 75], [32, 85]] },
      { step: 2, instruction: 'Small ゃ: miniature arch and cross', points: [[62, 55], [82, 52], [74, 40], [64, 80]] }
    ],
    confusedWith: ['りゅ', 'りょ'],
    example: { word: 'りゃく', romaji: 'ryaku', meaning: 'abbreviation' }
  },
  {
    id: 'hiragana-ryu',
    script: 'hiragana',
    character: 'りゅ',
    romaji: 'ryu',
    pronunciation: 'r-yoo',
    group: 'yoon',
    row: 'りゃ group',
    mnemonic: 'River reeds (り) flowing around a mighty mythical dragon (ryuu) (ゅ) — "Ryuu means dragon!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana り', points: [[20, 28], [20, 65], [24, 60], [40, 20], [40, 75], [32, 85]] },
      { step: 2, instruction: 'Small ゅ: miniature fish shape and vertical', points: [[62, 48], [62, 78], [76, 72], [72, 45], [70, 84]] }
    ],
    confusedWith: ['りょ', 'きゅ'],
    example: { word: 'りゅうがく', romaji: 'ryuugaku', meaning: 'study abroad' }
  },
  {
    id: 'hiragana-ryo',
    script: 'hiragana',
    character: 'りょ',
    romaji: 'ryo',
    pronunciation: 'r-yoh',
    group: 'yoon',
    row: 'りゃ group',
    mnemonic: 'River reeds (り) waving at a traveler embarking on a journey (ryokou) with a yo-yo (ょ) — "Ryo!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana り', points: [[20, 28], [20, 65], [24, 60], [40, 20], [40, 75], [32, 85]] },
      { step: 2, instruction: 'Small ょ: horizontal dash and looping vertical', points: [[60, 52], [78, 52], [72, 42], [72, 76], [64, 82], [64, 72], [82, 72]] }
    ],
    confusedWith: ['りゅ', 'きょ'],
    example: { word: 'りょこう', romaji: 'ryokou', meaning: 'travel / trip' }
  },

  // Gya group
  {
    id: 'hiragana-gya',
    script: 'hiragana',
    character: 'ぎゃ',
    romaji: 'gya',
    pronunciation: 'g-yah',
    group: 'yoon',
    row: 'ぎゃ group',
    mnemonic: 'Unlocking key with dakuten (ぎ) opening a gate for a noisy yak (ゃ) — "Gyaaa!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana ぎ: bars, looped stroke, and dakuten', points: [[18, 32], [46, 30], [16, 46], [48, 44], [34, 18], [26, 65], [20, 78], [42, 78], [48, 20], [54, 26], [54, 26], [60, 32]] },
      { step: 2, instruction: 'Small ゃ: miniature arch and cross', points: [[64, 55], [84, 52], [76, 40], [66, 80]] }
    ],
    confusedWith: ['きゃ', 'じゃ'],
    example: { word: 'ぎゃく', romaji: 'gyaku', meaning: 'reverse / opposite' }
  },
  {
    id: 'hiragana-gyu',
    script: 'hiragana',
    character: 'ぎゅ',
    romaji: 'gyu',
    pronunciation: 'g-yoo',
    group: 'yoon',
    row: 'ぎゃ group',
    mnemonic: 'A voiced key (ぎ) unlocking a refreshing bottle of cow milk (gyuunyuu) (ゅ) — "Gyuu!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana ぎ', points: [[18, 32], [46, 30], [16, 46], [48, 44], [34, 18], [26, 65], [20, 78], [42, 78], [48, 20], [54, 26], [54, 26], [60, 32]] },
      { step: 2, instruction: 'Small ゅ: miniature fish shape and vertical', points: [[62, 48], [62, 78], [76, 72], [72, 45], [70, 84]] }
    ],
    confusedWith: ['きゅ', 'ぎょ'],
    example: { word: 'ぎゅうにく', romaji: 'gyuuniku', meaning: 'beef' }
  },
  {
    id: 'hiragana-gyo',
    script: 'hiragana',
    character: 'ぎょ',
    romaji: 'gyo',
    pronunciation: 'g-yoh',
    group: 'yoon',
    row: 'ぎゃ group',
    mnemonic: 'A voiced key (ぎ) unlocking tasty dumplings (gyouza) (ょ) — "Gyo-uza!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana ぎ', points: [[18, 32], [46, 30], [16, 46], [48, 44], [34, 18], [26, 65], [20, 78], [42, 78], [48, 20], [54, 26], [54, 26], [60, 32]] },
      { step: 2, instruction: 'Small ょ: horizontal dash and looping vertical', points: [[60, 52], [78, 52], [72, 42], [72, 76], [64, 82], [64, 72], [82, 72]] }
    ],
    confusedWith: ['きょ', 'ぎゅ'],
    example: { word: 'ぎょうざ', romaji: 'gyouza', meaning: 'gyoza dumplings' }
  },

  // Ja group (from じ + ゃ, ゅ, ょ)
  {
    id: 'hiragana-ja',
    script: 'hiragana',
    character: 'じゃ',
    romaji: 'ja',
    pronunciation: 'jah',
    group: 'yoon',
    row: 'じゃ group',
    mnemonic: 'Fishing hook with dakuten (じ) catching a jar of sweet jam (ゃ) — "Jam in a jar, ja!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana じ: hook with dakuten marks', points: [[24, 22], [24, 68], [42, 72], [42, 20], [48, 26], [48, 26], [54, 32]] },
      { step: 2, instruction: 'Small ゃ: miniature arch and cross', points: [[62, 55], [82, 52], [74, 40], [64, 80]] }
    ],
    confusedWith: ['しゃ', 'ちゃ'],
    example: { word: 'じゃあね', romaji: 'jaane', meaning: 'see you later / bye' }
  },
  {
    id: 'hiragana-ju',
    script: 'hiragana',
    character: 'じゅ',
    romaji: 'ju',
    pronunciation: 'joo',
    group: 'yoon',
    row: 'じゃ group',
    mnemonic: 'Fishing hook with dakuten (じ) drinking sweet cold fruit juice (ゅ) — "Juice!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana じ: hook with dakuten marks', points: [[24, 22], [24, 68], [42, 72], [42, 20], [48, 26], [48, 26], [54, 32]] },
      { step: 2, instruction: 'Small ゅ: miniature fish shape and vertical', points: [[62, 48], [62, 78], [76, 72], [72, 45], [70, 84]] }
    ],
    confusedWith: ['しゅ', 'じょ'],
    example: { word: 'じゅぎょう', romaji: 'jugyou', meaning: 'class / lesson' }
  },
  {
    id: 'hiragana-jo',
    script: 'hiragana',
    character: 'じょ',
    romaji: 'jo',
    pronunciation: 'joh',
    group: 'yoon',
    row: 'じゃ group',
    mnemonic: 'Fishing hook with dakuten (じ) jogging with a yo-yo (ょ) — "Jogging jo!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana じ: hook with dakuten marks', points: [[24, 22], [24, 68], [42, 72], [42, 20], [48, 26], [48, 26], [54, 32]] },
      { step: 2, instruction: 'Small ょ: horizontal dash and looping vertical', points: [[60, 52], [78, 52], [72, 42], [72, 76], [64, 82], [64, 72], [82, 72]] }
    ],
    confusedWith: ['しょ', 'じゅ'],
    example: { word: 'じょせい', romaji: 'josei', meaning: 'woman / female' }
  },

  // Bya group
  {
    id: 'hiragana-bya',
    script: 'hiragana',
    character: 'びゃ',
    romaji: 'bya',
    pronunciation: 'b-yah',
    group: 'yoon',
    row: 'びゃ group',
    mnemonic: 'Grinning face with dakuten (び) admiring a bright white yak (ゃ) — "Bya!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana び: curve with dakuten marks', points: [[16, 40], [26, 40], [20, 72], [40, 72], [48, 42], [44, 56], [46, 20], [52, 26], [52, 26], [58, 32]] },
      { step: 2, instruction: 'Small ゃ: miniature arch and cross', points: [[64, 55], [84, 52], [76, 40], [66, 80]] }
    ],
    confusedWith: ['ぴゃ', 'ひゃ'],
    example: { word: 'びゃくだん', romaji: 'byakudan', meaning: 'sandalwood' }
  },
  {
    id: 'hiragana-byu',
    script: 'hiragana',
    character: 'びゅ',
    romaji: 'byu',
    pronunciation: 'b-yoo',
    group: 'yoon',
    row: 'びゃ group',
    mnemonic: 'Grinning face with dakuten (び) looking at a beautiful view (ゅ) — "Beautiful byu!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana び', points: [[16, 40], [26, 40], [20, 72], [40, 72], [48, 42], [44, 56], [46, 20], [52, 26], [52, 26], [58, 32]] },
      { step: 2, instruction: 'Small ゅ: miniature fish shape and vertical', points: [[62, 48], [62, 78], [76, 72], [72, 45], [70, 84]] }
    ],
    confusedWith: ['ぴゅ', 'びょ'],
    example: { word: 'びゅーてぃー', romaji: 'byuutii', meaning: 'beauty' }
  },
  {
    id: 'hiragana-byo',
    script: 'hiragana',
    character: 'びょ',
    romaji: 'byo',
    pronunciation: 'b-yoh',
    group: 'yoon',
    row: 'びゃ group',
    mnemonic: 'Grinning face with dakuten (び) resting at a hospital (byouin) with a yo-yo (ょ) — "Byouin hospital!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana び', points: [[16, 40], [26, 40], [20, 72], [40, 72], [48, 42], [44, 56], [46, 20], [52, 26], [52, 26], [58, 32]] },
      { step: 2, instruction: 'Small ょ: horizontal dash and looping vertical', points: [[60, 52], [78, 52], [72, 42], [72, 76], [64, 82], [64, 72], [82, 72]] }
    ],
    confusedWith: ['ぴょ', 'びゅ'],
    example: { word: 'びょういん', romaji: 'byouin', meaning: 'hospital' }
  },

  // Pya group
  {
    id: 'hiragana-pya',
    script: 'hiragana',
    character: 'ぴゃ',
    romaji: 'pya',
    pronunciation: 'p-yah',
    group: 'yoon',
    row: 'ぴゃ group',
    mnemonic: 'Grinning face with maru circle (ぴ) eating sweet candy with a tiny yak (ゃ) — "Pya!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana ぴ: curve with handakuten circle', points: [[16, 40], [26, 40], [20, 72], [40, 72], [48, 42], [44, 56], [48, 20], [56, 20], [56, 28], [48, 28], [48, 20]] },
      { step: 2, instruction: 'Small ゃ: miniature arch and cross', points: [[64, 55], [84, 52], [76, 40], [66, 80]] }
    ],
    confusedWith: ['びゃ', 'ひゃ'],
    example: { word: 'ろっぴゃく', romaji: 'roppyaku', meaning: 'six hundred (600)' }
  },
  {
    id: 'hiragana-pyu',
    script: 'hiragana',
    character: 'ぴゅ',
    romaji: 'pyu',
    pronunciation: 'p-yoo',
    group: 'yoon',
    row: 'ぴゃ group',
    mnemonic: 'Grinning face with maru circle (ぴ) shooting pure water from a squirt gun (ゅ) — "Pyuu!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana ぴ', points: [[16, 40], [26, 40], [20, 72], [40, 72], [48, 42], [44, 56], [48, 20], [56, 20], [56, 28], [48, 28], [48, 20]] },
      { step: 2, instruction: 'Small ゅ: miniature fish shape and vertical', points: [[62, 48], [62, 78], [76, 72], [72, 45], [70, 84]] }
    ],
    confusedWith: ['びゅ', 'ぴょ'],
    example: { word: 'ぴゅあ', romaji: 'pyua', meaning: 'pure' }
  },
  {
    id: 'hiragana-pyo',
    script: 'hiragana',
    character: 'ぴょ',
    romaji: 'pyo',
    pronunciation: 'p-yoh',
    group: 'yoon',
    row: 'ぴゃ group',
    mnemonic: 'Grinning face with maru circle (ぴ) watching a rabbit hop (pyon-pyon) with a yo-yo (ょ) — "Pyon-pyon hopping!"',
    strokeSteps: [
      { step: 1, instruction: 'Base kana ぴ', points: [[16, 40], [26, 40], [20, 72], [40, 72], [48, 42], [44, 56], [48, 20], [56, 20], [56, 28], [48, 28], [48, 20]] },
      { step: 2, instruction: 'Small ょ: horizontal dash and looping vertical', points: [[60, 52], [78, 52], [72, 42], [72, 76], [64, 82], [64, 72], [82, 72]] }
    ],
    confusedWith: ['びょ', 'ぴゅ'],
    example: { word: 'ぴょんぴょん', romaji: 'pyonpyon', meaning: 'hopping / skipping' }
  }
];

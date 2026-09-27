import type { LearningItem } from '../types/learning';

export const HIRAGANA_BASIC: LearningItem[] = [
  // A Row (Vowels)
  {
    id: 'hiragana-a',
    script: 'hiragana',
    character: 'あ',
    romaji: 'a',
    pronunciation: 'ah',
    group: 'basic',
    row: 'A',
    column: 'A',
    mnemonic: 'Looks like an antenna on top of an "a" shape — think "Ah, I see the antenna!"',
    strokeSteps: [
      { step: 1, instruction: 'Horizontal bar across from left to right', points: [[25, 30], [75, 30]] },
      { step: 2, instruction: 'Vertical curved stroke cutting through the middle', points: [[50, 18], [48, 82]] },
      { step: 3, instruction: 'Loop starting from upper-left, rounding down and looping back up to a tail', points: [[35, 45], [78, 55], [68, 85], [30, 75], [28, 52], [70, 78]] }
    ],
    confusedWith: ['お', 'め', 'ぬ'],
    example: { word: 'あさ', romaji: 'asa', meaning: 'morning' }
  },
  {
    id: 'hiragana-i',
    script: 'hiragana',
    character: 'い',
    romaji: 'i',
    pronunciation: 'ee',
    group: 'basic',
    row: 'A',
    column: 'I',
    mnemonic: 'Two vertical strokes that look like two eels swimming together — think "ee" for eels!',
    strokeSteps: [
      { step: 1, instruction: 'Left curved vertical stroke with an upward hook at bottom', points: [[32, 25], [28, 75], [36, 70]] },
      { step: 2, instruction: 'Right shorter curved stroke curving gently inward', points: [[68, 35], [72, 68]] }
    ],
    confusedWith: ['り', 'こ'],
    example: { word: 'いえ', romaji: 'ie', meaning: 'house' }
  },
  {
    id: 'hiragana-u',
    script: 'hiragana',
    character: 'う',
    romaji: 'u',
    pronunciation: 'oo',
    group: 'basic',
    row: 'A',
    column: 'U',
    mnemonic: 'A side-view of a person bending over doubled in pain — "Oof, that hurts!"',
    strokeSteps: [
      { step: 1, instruction: 'Short diagonal dash at top right', points: [[45, 20], [60, 26]] },
      { step: 2, instruction: 'Large curved ear-like arch sweeping down and left', points: [[38, 40], [68, 48], [65, 78], [35, 82]] }
    ],
    confusedWith: ['つ', 'ら'],
    example: { word: 'うみ', romaji: 'umi', meaning: 'sea / ocean' }
  },
  {
    id: 'hiragana-e',
    script: 'hiragana',
    character: 'え',
    romaji: 'e',
    pronunciation: 'eh',
    group: 'basic',
    row: 'A',
    column: 'E',
    mnemonic: 'Looks like an energetic exotic bird running fast — "Eh, watch out!"',
    strokeSteps: [
      { step: 1, instruction: 'Short diagonal downward tick at the top', points: [[45, 20], [58, 25]] },
      { step: 2, instruction: 'Continuous zigzag: down-left, sharp diagonal up-right, down-left, and a wave to the right', points: [[32, 42], [72, 42], [35, 75], [78, 75], [82, 85]] }
    ],
    confusedWith: ['ん', 'そ'],
    example: { word: 'えき', romaji: 'eki', meaning: 'train station' }
  },
  {
    id: 'hiragana-o',
    script: 'hiragana',
    character: 'お',
    romaji: 'o',
    pronunciation: 'oh',
    group: 'basic',
    row: 'A',
    column: 'O',
    mnemonic: 'A figure hitting an obstacle while saying "Oh no!", with a flying drop of sweat.',
    strokeSteps: [
      { step: 1, instruction: 'Short horizontal stroke on the left', points: [[22, 35], [52, 35]] },
      { step: 2, instruction: 'Vertical stroke dropping down, looping up and around to form an open oval', points: [[42, 20], [42, 80], [30, 80], [28, 55], [68, 55], [62, 80]] },
      { step: 3, instruction: 'Short diagonal accent dot at top right', points: [[70, 30], [80, 40]] }
    ],
    confusedWith: ['あ', 'む'],
    example: { word: 'おちゃ', romaji: 'ocha', meaning: 'tea' }
  },

  // K Row
  {
    id: 'hiragana-ka',
    script: 'hiragana',
    character: 'か',
    romaji: 'ka',
    pronunciation: 'kah',
    group: 'basic',
    row: 'K',
    column: 'A',
    mnemonic: 'A kite flying high with a loose string and a loose tail piece — "Ka-boom goes the wind!"',
    strokeSteps: [
      { step: 1, instruction: 'Curved downward stroke with an inward hook', points: [[30, 30], [55, 30], [50, 75], [42, 70]] },
      { step: 2, instruction: 'Slanted curved vertical stroke piercing through the top left', points: [[38, 20], [25, 75]] },
      { step: 3, instruction: 'Short accent stroke on the upper right side', points: [[70, 30], [80, 45]] }
    ],
    confusedWith: ['が', 'わ'],
    example: { word: 'かわ', romaji: 'kawa', meaning: 'river' }
  },
  {
    id: 'hiragana-ki',
    script: 'hiragana',
    character: 'き',
    romaji: 'ki',
    pronunciation: 'kee',
    group: 'basic',
    row: 'K',
    column: 'I',
    mnemonic: 'Looks like an antique key with two notches and an arch handle — think "Key"!',
    strokeSteps: [
      { step: 1, instruction: 'Upper horizontal bar slanted slightly up', points: [[28, 32], [72, 30]] },
      { step: 2, instruction: 'Lower parallel horizontal bar', points: [[24, 48], [76, 46]] },
      { step: 3, instruction: 'Diagonal stroke crossing through both bars with a hook', points: [[55, 18], [42, 65], [48, 65]] },
      { step: 4, instruction: 'Curved smile-like arc at the bottom', points: [[32, 78], [62, 78]] }
    ],
    confusedWith: ['さ', 'ぎ'],
    example: { word: 'きって', romaji: 'kitte', meaning: 'postage stamp' }
  },
  {
    id: 'hiragana-ku',
    script: 'hiragana',
    character: 'く',
    romaji: 'ku',
    pronunciation: 'koo',
    group: 'basic',
    row: 'K',
    column: 'U',
    mnemonic: 'The open beak of a cuckoo bird — "Cuckoo, cuckoo!"',
    strokeSteps: [
      { step: 1, instruction: 'Single chevron angle: diagonal down-left then diagonal down-right', points: [[65, 25], [30, 50], [68, 78]] }
    ],
    confusedWith: ['へ', 'ぐ'],
    example: { word: 'くるま', romaji: 'kuruma', meaning: 'car' }
  },
  {
    id: 'hiragana-ke',
    script: 'hiragana',
    character: 'け',
    romaji: 'ke',
    pronunciation: 'keh',
    group: 'basic',
    row: 'K',
    column: 'E',
    mnemonic: 'A keg of root beer with a spout on the left — "Ke" for keg!',
    strokeSteps: [
      { step: 1, instruction: 'Vertical stroke on left with upward flick', points: [[30, 22], [28, 75], [34, 70]] },
      { step: 2, instruction: 'Horizontal bar on the right', points: [[48, 40], [78, 40]] },
      { step: 3, instruction: 'Vertical curving stroke cutting through the right bar', points: [[65, 25], [62, 80]] }
    ],
    confusedWith: ['は', 'に', 'ほ'],
    example: { word: 'けさ', romaji: 'kesa', meaning: 'this morning' }
  },
  {
    id: 'hiragana-ko',
    script: 'hiragana',
    character: 'こ',
    romaji: 'ko',
    pronunciation: 'koh',
    group: 'basic',
    row: 'K',
    column: 'O',
    mnemonic: 'Two parallel worms singing in harmony — "Co-existing peacefully!"',
    strokeSteps: [
      { step: 1, instruction: 'Top horizontal stroke with slight hook at end', points: [[30, 35], [70, 35], [65, 42]] },
      { step: 2, instruction: 'Bottom curved horizontal stroke smiling upward', points: [[30, 72], [70, 72]] }
    ],
    confusedWith: ['い', 'に'],
    example: { word: 'こども', romaji: 'kodomo', meaning: 'child' }
  },

  // S Row
  {
    id: 'hiragana-sa',
    script: 'hiragana',
    character: 'さ',
    romaji: 'sa',
    pronunciation: 'sah',
    group: 'basic',
    row: 'S',
    column: 'A',
    mnemonic: 'Looks like a smiling face wearing a cool pair of sunglasses — "Sa-tisfied!"',
    strokeSteps: [
      { step: 1, instruction: 'Horizontal stroke slanting slightly up', points: [[30, 38], [72, 35]] },
      { step: 2, instruction: 'Slanted stroke crossing through with bottom hook', points: [[54, 22], [42, 60], [48, 62]] },
      { step: 3, instruction: 'Curved bottom stroke smiling upward', points: [[32, 75], [62, 75]] }
    ],
    confusedWith: ['き', 'ち'],
    example: { word: 'さかな', romaji: 'sakana', meaning: 'fish' }
  },
  {
    id: 'hiragana-shi',
    script: 'hiragana',
    character: 'し',
    romaji: 'shi',
    pronunciation: 'shee',
    group: 'basic',
    row: 'S',
    column: 'I',
    mnemonic: 'A giant fishing hook pulled up from the sea — "She caught a huge fish!"',
    strokeSteps: [
      { step: 1, instruction: 'Smooth vertical drop curving into a sweeping right hook', points: [[40, 20], [40, 70], [70, 72]] }
    ],
    confusedWith: ['つ', 'じ'],
    example: { word: 'しろ', romaji: 'shiro', meaning: 'white' }
  },
  {
    id: 'hiragana-su',
    script: 'hiragana',
    character: 'す',
    romaji: 'su',
    pronunciation: 'soo',
    group: 'basic',
    row: 'S',
    column: 'U',
    mnemonic: 'A figure doing an acrobatic loop-the-loop on a swing — "Super acrobatic!"',
    strokeSteps: [
      { step: 1, instruction: 'Horizontal bar across top', points: [[25, 35], [75, 35]] },
      { step: 2, instruction: 'Vertical stroke cutting down, forming a teardrop loop, then tailing down-left', points: [[55, 20], [55, 52], [68, 56], [58, 68], [48, 56], [48, 88]] }
    ],
    confusedWith: ['む', 'ず'],
    example: { word: 'すし', romaji: 'sushi', meaning: 'sushi' }
  },
  {
    id: 'hiragana-se',
    script: 'hiragana',
    character: 'せ',
    romaji: 'se',
    pronunciation: 'seh',
    group: 'basic',
    row: 'S',
    column: 'E',
    mnemonic: 'Two people sitting comfortably side by side on a park bench — "Say hello!"',
    strokeSteps: [
      { step: 1, instruction: 'Horizontal line from left to right', points: [[25, 42], [75, 42]] },
      { step: 2, instruction: 'Right vertical line with an angle going left at bottom', points: [[65, 28], [65, 72], [30, 72]] },
      { step: 3, instruction: 'Left vertical line crossing down', points: [[42, 28], [42, 60]] }
    ],
    confusedWith: ['や', 'ぜ'],
    example: { word: 'せんせい', romaji: 'sensei', meaning: 'teacher' }
  },
  {
    id: 'hiragana-so',
    script: 'hiragana',
    character: 'そ',
    romaji: 'so',
    pronunciation: 'soh',
    group: 'basic',
    row: 'S',
    column: 'O',
    mnemonic: 'A zigzag stitching pattern — "Sewing with needle and thread, sew it up!"',
    strokeSteps: [
      { step: 1, instruction: 'Continuous zigzag line: short right, diagonal down-left, right again, and curve down into a round tail', points: [[34, 28], [65, 28], [34, 52], [68, 52], [68, 76], [32, 78]] }
    ],
    confusedWith: ['て', 'ろ', 'ぞ'],
    example: { word: 'そら', romaji: 'sora', meaning: 'sky' }
  },

  // T Row
  {
    id: 'hiragana-ta',
    script: 'hiragana',
    character: 'た',
    romaji: 'ta',
    pronunciation: 'tah',
    group: 'basic',
    row: 'T',
    column: 'A',
    mnemonic: 'Spells out the letters "t" and "a" side by side — literally "ta"!',
    strokeSteps: [
      { step: 1, instruction: 'Horizontal stroke on upper-left', points: [[24, 38], [52, 38]] },
      { step: 2, instruction: 'Slanted down stroke cutting the horizontal', points: [[40, 22], [30, 75]] },
      { step: 3, instruction: 'Top stroke of the right "ko" shape', points: [[54, 45], [78, 45]] },
      { step: 4, instruction: 'Bottom curved stroke of the "ko" shape', points: [[52, 68], [76, 68]] }
    ],
    confusedWith: ['な', 'に', 'だ'],
    example: { word: 'たまご', romaji: 'tamago', meaning: 'egg' }
  },
  {
    id: 'hiragana-chi',
    script: 'hiragana',
    character: 'ち',
    romaji: 'chi',
    pronunciation: 'chee',
    group: 'basic',
    row: 'T',
    column: 'I',
    mnemonic: 'A cheerleader waving her pom-pom in the air — "Cheer!"',
    strokeSteps: [
      { step: 1, instruction: 'Horizontal bar slanting slightly upward', points: [[30, 35], [72, 32]] },
      { step: 2, instruction: 'Slanted down stroke that curves into a round belly loop to the right', points: [[52, 18], [42, 50], [70, 52], [68, 78], [35, 78]] }
    ],
    confusedWith: ['さ', 'ら', 'ぢ'],
    example: { word: 'ちず', romaji: 'chizu', meaning: 'map' }
  },
  {
    id: 'hiragana-tsu',
    script: 'hiragana',
    character: 'つ',
    romaji: 'tsu',
    pronunciation: 'tsoo',
    group: 'basic',
    row: 'T',
    column: 'U',
    mnemonic: 'A giant ocean tidal wave curling over — a "Tsu-nami"!',
    strokeSteps: [
      { step: 1, instruction: 'Smooth single wave stroke arching up and sweeping down to the left', points: [[30, 38], [72, 35], [72, 65], [32, 80]] }
    ],
    confusedWith: ['し', 'う', 'づ'],
    example: { word: 'つき', romaji: 'tsuki', meaning: 'moon' }
  },
  {
    id: 'hiragana-te',
    script: 'hiragana',
    character: 'て',
    romaji: 'te',
    pronunciation: 'teh',
    group: 'basic',
    row: 'T',
    column: 'E',
    mnemonic: 'A dog wagging its tail, or a bent tennis racket — "Tennis racket!"',
    strokeSteps: [
      { step: 1, instruction: 'Horizontal stroke from left to right, then curved backward crescent down', points: [[28, 35], [72, 35], [40, 78]] }
    ],
    confusedWith: ['そ', 'で'],
    example: { word: 'て', romaji: 'te', meaning: 'hand' }
  },
  {
    id: 'hiragana-to',
    script: 'hiragana',
    character: 'と',
    romaji: 'to',
    pronunciation: 'toh',
    group: 'basic',
    row: 'T',
    column: 'O',
    mnemonic: 'A tiny splinter stuck in a big toe — "Ouch, my Toe!"',
    strokeSteps: [
      { step: 1, instruction: 'Short downward slanted tick', points: [[38, 25], [48, 48]] },
      { step: 2, instruction: 'Large open crescent "C" shape hugging the tick', points: [[45, 45], [70, 55], [65, 80], [35, 80]] }
    ],
    confusedWith: ['て', 'ど'],
    example: { word: 'とり', romaji: 'tori', meaning: 'bird' }
  },

  // N Row
  {
    id: 'hiragana-na',
    script: 'hiragana',
    character: 'な',
    romaji: 'na',
    pronunciation: 'nah',
    group: 'basic',
    row: 'N',
    column: 'A',
    mnemonic: 'A nun kneeling in prayer before a crucifix altar — "Nun praying!"',
    strokeSteps: [
      { step: 1, instruction: 'Horizontal dash on upper-left', points: [[26, 38], [48, 38]] },
      { step: 2, instruction: 'Slanted down stroke cutting through', points: [[38, 24], [30, 70]] },
      { step: 3, instruction: 'Small short tick mark on top right', points: [[62, 32], [70, 42]] },
      { step: 4, instruction: 'Loop stroke on lower right twisting down into a loop', points: [[60, 48], [60, 70], [70, 74], [62, 82], [52, 72]] }
    ],
    confusedWith: ['た', 'に', 'ね'],
    example: { word: 'なつ', romaji: 'natsu', meaning: 'summer' }
  },
  {
    id: 'hiragana-ni',
    script: 'hiragana',
    character: 'に',
    romaji: 'ni',
    pronunciation: 'nee',
    group: 'basic',
    row: 'N',
    column: 'I',
    mnemonic: 'A needle on the left with two pieces of thread on the right — "Needle and thread!"',
    strokeSteps: [
      { step: 1, instruction: 'Vertical stroke on left with upward hook', points: [[32, 22], [30, 75], [36, 70]] },
      { step: 2, instruction: 'Upper horizontal bar on right', points: [[52, 42], [75, 42]] },
      { step: 3, instruction: 'Lower curved horizontal bar on right', points: [[50, 68], [76, 68]] }
    ],
    confusedWith: ['こ', 'け', 'は'],
    example: { word: 'にほん', romaji: 'nihon', meaning: 'Japan' }
  },
  {
    id: 'hiragana-nu',
    script: 'hiragana',
    character: 'ぬ',
    romaji: 'nu',
    pronunciation: 'noo',
    group: 'basic',
    row: 'N',
    column: 'U',
    mnemonic: 'A bowl of chopsticks stirring noodles with a little noodle loop at the end — "Noodles!"',
    strokeSteps: [
      { step: 1, instruction: 'Slanted stroke curving down-right', points: [[35, 25], [28, 75]] },
      { step: 2, instruction: 'Sweeping curve going down, looping up around, and ending in a tight tail loop', points: [[28, 42], [65, 30], [75, 60], [35, 80], [32, 55], [68, 70], [72, 82], [65, 82]] }
    ],
    confusedWith: ['め', 'ね', 'あ'],
    example: { word: 'いぬ', romaji: 'inu', meaning: 'dog' }
  },
  {
    id: 'hiragana-ne',
    script: 'hiragana',
    character: 'ね',
    romaji: 'ne',
    pronunciation: 'neh',
    group: 'basic',
    row: 'N',
    column: 'E',
    mnemonic: 'A cat nesting curled up with its curled tail at the end — "Neko with a tail loop!"',
    strokeSteps: [
      { step: 1, instruction: 'Straight vertical stroke on left', points: [[32, 20], [32, 80]] },
      { step: 2, instruction: 'Zigzag stroke from left, across, down-left, rounding up, and ending in a small loop', points: [[24, 38], [62, 38], [28, 68], [65, 45], [72, 68], [65, 80], [55, 75]] }
    ],
    confusedWith: ['わ', 'れ', 'ぬ'],
    example: { word: 'ねこ', romaji: 'neko', meaning: 'cat' }
  },
  {
    id: 'hiragana-no',
    script: 'hiragana',
    character: 'の',
    romaji: 'no',
    pronunciation: 'noh',
    group: 'basic',
    row: 'N',
    column: 'O',
    mnemonic: 'A red circle with a slash — a "NO smoking / NO entry" sign!',
    strokeSteps: [
      { step: 1, instruction: 'Diagonal stroke down-right, then looping smoothly up and around in a large circle', points: [[48, 30], [32, 60], [58, 25], [78, 52], [65, 80], [35, 78]] }
    ],
    confusedWith: ['め', 'お'],
    example: { word: 'のみもの', romaji: 'nomimono', meaning: 'beverage / drink' }
  },

  // H Row
  {
    id: 'hiragana-ha',
    script: 'hiragana',
    character: 'は',
    romaji: 'ha',
    pronunciation: 'hah',
    group: 'basic',
    row: 'H',
    column: 'A',
    mnemonic: 'Looks like the letter "H" standing next to a person laughing "Ha-ha!"',
    strokeSteps: [
      { step: 1, instruction: 'Vertical stroke on left with upward hook', points: [[30, 22], [28, 76], [34, 70]] },
      { step: 2, instruction: 'Horizontal bar at middle right', points: [[48, 42], [76, 42]] },
      { step: 3, instruction: 'Vertical stroke down on right, twisting into an inner loop', points: [[64, 25], [64, 68], [74, 72], [65, 82], [55, 72]] }
    ],
    confusedWith: ['ほ', 'け', 'ば', 'ぱ'],
    example: { word: 'はな', romaji: 'hana', meaning: 'flower / nose' }
  },
  {
    id: 'hiragana-hi',
    script: 'hiragana',
    character: 'ひ',
    romaji: 'hi',
    pronunciation: 'hee',
    group: 'basic',
    row: 'H',
    column: 'I',
    mnemonic: 'A person with a wide mischievous grin laughing "He-he-he!"',
    strokeSteps: [
      { step: 1, instruction: 'Starts with short horizontal, drops into a deep wide U-curve, and sweeps up-right', points: [[28, 38], [42, 38], [35, 72], [65, 72], [75, 40], [68, 55]] }
    ],
    confusedWith: ['て', 'び', 'ぴ'],
    example: { word: 'ひと', romaji: 'hito', meaning: 'person' }
  },
  {
    id: 'hiragana-fu',
    script: 'hiragana',
    character: 'ふ',
    romaji: 'fu',
    pronunciation: 'foo',
    group: 'basic',
    row: 'H',
    column: 'U',
    mnemonic: 'Mount Fuji standing gracefully with wisps of breeze blowing around it — "Mt. Fuji!"',
    strokeSteps: [
      { step: 1, instruction: 'Top tick mark centered', points: [[48, 20], [56, 28]] },
      { step: 2, instruction: 'Center curving vertical swoop tapering down', points: [[50, 36], [40, 68], [42, 80]] },
      { step: 3, instruction: 'Left side dot / hook', points: [[28, 50], [25, 62]] },
      { step: 4, instruction: 'Right side downward curved dot', points: [[72, 48], [76, 62]] }
    ],
    confusedWith: ['ぶ', 'ぷ'],
    example: { word: 'ふゆ', romaji: 'fuyu', meaning: 'winter' }
  },
  {
    id: 'hiragana-he',
    script: 'hiragana',
    character: 'へ',
    romaji: 'he',
    pronunciation: 'heh',
    group: 'basic',
    row: 'H',
    column: 'E',
    mnemonic: 'The summit of Mount Everest — "Head up to the peak of the mountain!"',
    strokeSteps: [
      { step: 1, instruction: 'Single mountain peak stroke: diagonal up-right, then longer diagonal down-right', points: [[24, 62], [48, 35], [78, 65]] }
    ],
    confusedWith: ['く', 'べ', 'ぺ'],
    example: { word: 'へや', romaji: 'heya', meaning: 'room' }
  },
  {
    id: 'hiragana-ho',
    script: 'hiragana',
    character: 'ほ',
    romaji: 'ho',
    pronunciation: 'hoh',
    group: 'basic',
    row: 'H',
    column: 'O',
    mnemonic: 'Santa Claus wearing a hat with his belt buckle — "Ho ho ho!"',
    strokeSteps: [
      { step: 1, instruction: 'Vertical stroke on left with upward hook', points: [[30, 22], [28, 76], [34, 70]] },
      { step: 2, instruction: 'Top horizontal bar on right', points: [[48, 34], [76, 34]] },
      { step: 3, instruction: 'Bottom horizontal bar on right', points: [[48, 48], [76, 48]] },
      { step: 4, instruction: 'Vertical stroke cutting from the second bar down into a bottom loop', points: [[64, 38], [64, 68], [74, 72], [65, 82], [55, 72]] }
    ],
    confusedWith: ['は', 'ま', 'ぼ', 'ぽ'],
    example: { word: 'ほん', romaji: 'hon', meaning: 'book' }
  },

  // M Row
  {
    id: 'hiragana-ma',
    script: 'hiragana',
    character: 'ま',
    romaji: 'ma',
    pronunciation: 'mah',
    group: 'basic',
    row: 'M',
    column: 'A',
    mnemonic: 'A mask with two eye slits and a chin loop — "Wear a Mask, mama!"',
    strokeSteps: [
      { step: 1, instruction: 'Upper horizontal bar', points: [[30, 34], [72, 34]] },
      { step: 2, instruction: 'Lower parallel horizontal bar', points: [[34, 48], [68, 48]] },
      { step: 3, instruction: 'Vertical line cutting down through both bars, ending in a loop', points: [[52, 20], [52, 68], [62, 72], [54, 82], [44, 72]] }
    ],
    confusedWith: ['ほ', 'も'],
    example: { word: 'まち', romaji: 'machi', meaning: 'town / city' }
  },
  {
    id: 'hiragana-mi',
    script: 'hiragana',
    character: 'み',
    romaji: 'mi',
    pronunciation: 'mee',
    group: 'basic',
    row: 'M',
    column: 'I',
    mnemonic: 'Lucky number 21 — "Me, I am turning 21 today!"',
    strokeSteps: [
      { step: 1, instruction: 'Horizontal dash turning down, looping up-right and continuing across horizontally', points: [[28, 38], [55, 38], [35, 68], [52, 60], [75, 60]] },
      { step: 2, instruction: 'Slanted stroke crossing down through the horizontal extension', points: [[62, 42], [52, 82]] }
    ],
    confusedWith: ['よ', 'ぬ'],
    example: { word: 'みず', romaji: 'mizu', meaning: 'water' }
  },
  {
    id: 'hiragana-mu',
    script: 'hiragana',
    character: 'む',
    romaji: 'mu',
    pronunciation: 'moo',
    group: 'basic',
    row: 'M',
    column: 'U',
    mnemonic: 'A cow with horns and an open mouth chewing grass — "Moo!"',
    strokeSteps: [
      { step: 1, instruction: 'Short horizontal bar on left', points: [[25, 38], [55, 38]] },
      { step: 2, instruction: 'Vertical line dropping down, looping left and around, then sweeping up to the right', points: [[45, 24], [45, 65], [35, 75], [52, 75], [72, 55]] },
      { step: 3, instruction: 'Short diagonal dot on the top right', points: [[68, 30], [78, 40]] }
    ],
    confusedWith: ['す', 'お'],
    example: { word: 'むし', romaji: 'mushi', meaning: 'insect / bug' }
  },
  {
    id: 'hiragana-me',
    script: 'hiragana',
    character: 'め',
    romaji: 'me',
    pronunciation: 'meh',
    group: 'basic',
    row: 'M',
    column: 'E',
    mnemonic: 'An eye (Japanese "me") with eyebrow and eyelid — note: NO loop at the end like ぬ!',
    strokeSteps: [
      { step: 1, instruction: 'Curving diagonal stroke from top left down to bottom center', points: [[36, 26], [28, 75]] },
      { step: 2, instruction: 'Large sweeping arch curving over and around to the right with no tail loop', points: [[28, 42], [65, 30], [75, 60], [35, 80], [32, 55], [72, 72]] }
    ],
    confusedWith: ['ぬ', 'あ', 'ね'],
    example: { word: 'め', romaji: 'me', meaning: 'eye' }
  },
  {
    id: 'hiragana-mo',
    script: 'hiragana',
    character: 'も',
    romaji: 'mo',
    pronunciation: 'moh',
    group: 'basic',
    row: 'M',
    column: 'O',
    mnemonic: 'A big fish hook catching two juicy worms — "Catching more and more fish!"',
    strokeSteps: [
      { step: 1, instruction: 'Vertical line with a big curved hook at the bottom', points: [[48, 20], [48, 75], [72, 72]] },
      { step: 2, instruction: 'Upper horizontal bar crossing the hook', points: [[30, 42], [68, 42]] },
      { step: 3, instruction: 'Lower horizontal bar crossing the hook', points: [[28, 56], [70, 56]] }
    ],
    confusedWith: ['ま', 'し'],
    example: { word: 'もり', romaji: 'mori', meaning: 'forest' }
  },

  // Y Row
  {
    id: 'hiragana-ya',
    script: 'hiragana',
    character: 'や',
    romaji: 'ya',
    pronunciation: 'yah',
    group: 'basic',
    row: 'Y',
    column: 'A',
    mnemonic: 'A yak with horns climbing up a steep hill — "Yak climbing up!"',
    strokeSteps: [
      { step: 1, instruction: 'Curving stroke from left up and over to a hook on the right', points: [[30, 50], [42, 35], [68, 40], [62, 52]] },
      { step: 2, instruction: 'Short accent stroke on top', points: [[54, 24], [58, 34]] },
      { step: 3, instruction: 'Slanted line cutting through the left side down to bottom', points: [[36, 32], [28, 78]] }
    ],
    confusedWith: ['せ', 'か'],
    example: { word: 'やま', romaji: 'yama', meaning: 'mountain' }
  },
  {
    id: 'hiragana-yu',
    script: 'hiragana',
    character: 'ゆ',
    romaji: 'yu',
    pronunciation: 'yoo',
    group: 'basic',
    row: 'Y',
    column: 'U',
    mnemonic: 'A unique goldfish swimming in a bowl, shaped like the number 1 — "You unique fish!"',
    strokeSteps: [
      { step: 1, instruction: 'Vertical stroke dropping, looping up-right, then sweeping down-right', points: [[38, 25], [38, 75], [60, 68], [68, 48]] },
      { step: 2, instruction: 'Long vertical stroke piercing through the center from top to bottom', points: [[58, 22], [54, 82]] }
    ],
    confusedWith: ['み', 'わ'],
    example: { word: 'ゆき', romaji: 'yuki', meaning: 'snow' }
  },
  {
    id: 'hiragana-yo',
    script: 'hiragana',
    character: 'よ',
    romaji: 'yo',
    pronunciation: 'yoh',
    group: 'basic',
    row: 'Y',
    column: 'O',
    mnemonic: 'A toy yo-yo hanging on a string — "Yo-yo spinning around!"',
    strokeSteps: [
      { step: 1, instruction: 'Short horizontal bar on top left', points: [[30, 36], [58, 36]] },
      { step: 2, instruction: 'Vertical line dropping down and looping back to a right tail', points: [[55, 20], [55, 68], [42, 75], [42, 62], [72, 62]] }
    ],
    confusedWith: ['ま', 'は'],
    example: { word: 'よる', romaji: 'yoru', meaning: 'night' }
  },

  // R Row
  {
    id: 'hiragana-ra',
    script: 'hiragana',
    character: 'ら',
    romaji: 'ra',
    pronunciation: 'rah',
    group: 'basic',
    row: 'R',
    column: 'A',
    mnemonic: 'A rapper sitting down rapping with a microphone — "Ra-pper rapping!"',
    strokeSteps: [
      { step: 1, instruction: 'Short diagonal dash at top', points: [[45, 22], [56, 28]] },
      { step: 2, instruction: 'Curved backwards "5" shape sweeping down and right', points: [[40, 42], [65, 45], [62, 75], [35, 78]] }
    ],
    confusedWith: ['ろ', 'ち', 'う'],
    example: { word: 'らいしゅう', romaji: 'raishuu', meaning: 'next week' }
  },
  {
    id: 'hiragana-ri',
    script: 'hiragana',
    character: 'り',
    romaji: 'ri',
    pronunciation: 'ree',
    group: 'basic',
    row: 'R',
    column: 'I',
    mnemonic: 'A river with two reeds flowing in the stream — "River reeds!"',
    strokeSteps: [
      { step: 1, instruction: 'Shorter left curved stroke with small hook at bottom', points: [[35, 28], [35, 65], [40, 60]] },
      { step: 2, instruction: 'Longer right stroke curving gently down past the bottom', points: [[65, 20], [65, 75], [52, 85]] }
    ],
    confusedWith: ['い', 'け'],
    example: { word: 'りんご', romaji: 'ringo', meaning: 'apple' }
  },
  {
    id: 'hiragana-ru',
    script: 'hiragana',
    character: 'る',
    romaji: 'ru',
    pronunciation: 'roo',
    group: 'basic',
    row: 'R',
    column: 'U',
    mnemonic: 'Looks like number 3 with a ruby ring loop at the end — "Ru-by ring on the three!"',
    strokeSteps: [
      { step: 1, instruction: 'Single continuous 3-like stroke ending in a tight closed loop at the bottom', points: [[34, 30], [68, 30], [35, 52], [68, 52], [72, 70], [60, 82], [50, 75], [60, 68]] }
    ],
    confusedWith: ['ろ', 'そ', 'う'],
    example: { word: 'くるま', romaji: 'kuruma', meaning: 'car' }
  },
  {
    id: 'hiragana-re',
    script: 'hiragana',
    character: 'れ',
    romaji: 're',
    pronunciation: 'reh',
    group: 'basic',
    row: 'R',
    column: 'E',
    mnemonic: 'A person resting with legs curled up and reaching outwards — "Resting relaxedly!"',
    strokeSteps: [
      { step: 1, instruction: 'Straight vertical stroke on left', points: [[32, 20], [32, 80]] },
      { step: 2, instruction: 'Zigzag stroke from left, curving over and sweeping out to the right like a curling slide', points: [[24, 38], [62, 38], [28, 68], [62, 48], [60, 72], [78, 70]] }
    ],
    confusedWith: ['わ', 'ね'],
    example: { word: 'れきし', romaji: 'rekishi', meaning: 'history' }
  },
  {
    id: 'hiragana-ro',
    script: 'hiragana',
    character: 'ろ',
    romaji: 'ro',
    pronunciation: 'roh',
    group: 'basic',
    row: 'R',
    column: 'O',
    mnemonic: 'Looks like number 3 with NO loop at the bottom — a robber stole the ruby ring!',
    strokeSteps: [
      { step: 1, instruction: 'Single continuous 3-like stroke with an open round bottom (no loop)', points: [[34, 30], [68, 30], [35, 52], [68, 52], [70, 74], [35, 78]] }
    ],
    confusedWith: ['る', 'そ', 'ら'],
    example: { word: 'ろうそく', romaji: 'rousoku', meaning: 'candle' }
  },

  // W Row & N
  {
    id: 'hiragana-wa',
    script: 'hiragana',
    character: 'わ',
    romaji: 'wa',
    pronunciation: 'wah',
    group: 'basic',
    row: 'W',
    column: 'A',
    mnemonic: 'A white swan with a smooth round back — "Wa-ter swan!"',
    strokeSteps: [
      { step: 1, instruction: 'Straight vertical stroke on left', points: [[32, 20], [32, 80]] },
      { step: 2, instruction: 'Zigzag stroke looping into a smooth round open back with no hook', points: [[24, 38], [62, 38], [28, 68], [62, 48], [72, 68], [45, 80]] }
    ],
    confusedWith: ['れ', 'ね', 'ぬ'],
    example: { word: 'わたし', romaji: 'watashi', meaning: 'I / me' }
  },
  {
    id: 'hiragana-wo',
    script: 'hiragana',
    character: 'を',
    romaji: 'wo',
    pronunciation: 'oh',
    group: 'basic',
    row: 'W',
    column: 'O',
    mnemonic: 'A cheerleader in motion jumping over a hoop — "Whoa, look at that move!"',
    strokeSteps: [
      { step: 1, instruction: 'Horizontal bar on top', points: [[26, 30], [68, 30]] },
      { step: 2, instruction: 'Slanted stroke curving down and left, ending with a small hook', points: [[50, 18], [35, 58], [42, 58]] },
      { step: 3, instruction: 'Open crescent "C" shape hugging beneath the first stroke', points: [[35, 52], [70, 52], [65, 80], [32, 75]] }
    ],
    confusedWith: ['ち', 'と'],
    example: { word: 'ほんをよむ', romaji: 'hon o yomu', meaning: 'read a book (grammatical particle)' },
    notes: 'Pronounced the same as "o" (お) in modern Japanese. Used almost exclusively as the direct object grammatical particle.'
  },
  {
    id: 'hiragana-n',
    script: 'hiragana',
    character: 'ん',
    romaji: 'n',
    pronunciation: 'nn',
    group: 'basic',
    row: 'N (ん)',
    column: 'N',
    mnemonic: 'Looks like a lowercase cursive letter "n" — think "n" sound!',
    strokeSteps: [
      { step: 1, instruction: 'Slanted stroke dropping down-left, curving up-right, then sweeping down-right with a final flick up', points: [[35, 25], [26, 75], [52, 45], [72, 75], [82, 65]] }
    ],
    confusedWith: ['え', 'そ'],
    example: { word: 'にほん', romaji: 'nihon', meaning: 'Japan' },
    notes: 'The only Japanese kana consonant that is never followed by a vowel sound.'
  }
];

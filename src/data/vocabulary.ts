export interface CuratedWord {
  id: string;
  word: string; // Hiragana spelling
  romaji: string; // Standard Hepburn romanization
  meaning: string;
  requiredCharacters: string[]; // kana characters required to spell this word (including compounds like きゃ, small っ)
  hasSokuon?: boolean;
  hasLongVowel?: boolean;
  hasDakuten?: boolean;
  hasHandakuten?: boolean;
  hasYoon?: boolean;
}

export const CURATED_VOCABULARY: CuratedWord[] = [
  // Basic 2-letter words
  {
    id: 'word-asa',
    word: 'あさ',
    romaji: 'asa',
    meaning: 'morning',
    requiredCharacters: ['あ', 'さ']
  },
  {
    id: 'word-ie',
    word: 'いえ',
    romaji: 'ie',
    meaning: 'house / home',
    requiredCharacters: ['い', 'え']
  },
  {
    id: 'word-sushi',
    word: 'すし',
    romaji: 'sushi',
    meaning: 'sushi',
    requiredCharacters: ['す', 'し']
  },
  {
    id: 'word-neko',
    word: 'ねこ',
    romaji: 'neko',
    meaning: 'cat',
    requiredCharacters: ['ね', 'こ']
  },
  {
    id: 'word-inu',
    word: 'いぬ',
    romaji: 'inu',
    meaning: 'dog',
    requiredCharacters: ['い', 'ぬ']
  },
  {
    id: 'word-te',
    word: 'て',
    romaji: 'te',
    meaning: 'hand',
    requiredCharacters: ['て']
  },
  {
    id: 'word-me',
    word: 'め',
    romaji: 'me',
    meaning: 'eye',
    requiredCharacters: ['め']
  },
  {
    id: 'word-hana',
    word: 'はな',
    romaji: 'hana',
    meaning: 'flower / nose',
    requiredCharacters: ['は', 'な']
  },
  {
    id: 'word-mizu',
    word: 'みず',
    romaji: 'mizu',
    meaning: 'water',
    requiredCharacters: ['み', 'ず'],
    hasDakuten: true
  },
  {
    id: 'word-yama',
    word: 'やま',
    romaji: 'yama',
    meaning: 'mountain',
    requiredCharacters: ['や', 'ま']
  },
  {
    id: 'word-kawa',
    word: 'かわ',
    romaji: 'kawa',
    meaning: 'river',
    requiredCharacters: ['か', 'わ']
  },
  {
    id: 'word-sora',
    word: 'そら',
    romaji: 'sora',
    meaning: 'sky',
    requiredCharacters: ['そ', 'ら']
  },
  {
    id: 'word-tsuki',
    word: 'つき',
    romaji: 'tsuki',
    meaning: 'moon',
    requiredCharacters: ['つ', 'き']
  },
  {
    id: 'word-tori',
    word: 'とり',
    romaji: 'tori',
    meaning: 'bird',
    requiredCharacters: ['と', 'り']
  },
  {
    id: 'word-sakana',
    word: 'さかな',
    romaji: 'sakana',
    meaning: 'fish',
    requiredCharacters: ['さ', 'か', 'な']
  },
  {
    id: 'word-kuruma',
    word: 'くるま',
    romaji: 'kuruma',
    meaning: 'car',
    requiredCharacters: ['く', 'る', 'ま']
  },
  {
    id: 'word-hon',
    word: 'ほん',
    romaji: 'hon',
    meaning: 'book',
    requiredCharacters: ['ほ', 'ん']
  },
  {
    id: 'word-natsu',
    word: 'なつ',
    romaji: 'natsu',
    meaning: 'summer',
    requiredCharacters: ['な', 'つ']
  },
  {
    id: 'word-haru',
    word: 'はる',
    romaji: 'haru',
    meaning: 'spring',
    requiredCharacters: ['は', 'る']
  },
  {
    id: 'word-aki',
    word: 'あき',
    romaji: 'aki',
    meaning: 'autumn / fall',
    requiredCharacters: ['あ', 'き']
  },
  {
    id: 'word-fuyu',
    word: 'ふゆ',
    romaji: 'fuyu',
    meaning: 'winter',
    requiredCharacters: ['ふ', 'ゆ']
  },
  {
    id: 'word-umi',
    word: 'うみ',
    romaji: 'umi',
    meaning: 'ocean / sea',
    requiredCharacters: ['う', 'み']
  },
  {
    id: 'word-eki',
    word: 'えき',
    romaji: 'eki',
    meaning: 'train station',
    requiredCharacters: ['え', 'き']
  },

  // Dakuten / Handakuten vocabulary
  {
    id: 'word-chizu',
    word: 'ちず',
    romaji: 'chizu',
    meaning: 'map',
    requiredCharacters: ['ち', 'ず'],
    hasDakuten: true
  },
  {
    id: 'word-tamago',
    word: 'たまご',
    romaji: 'tamago',
    meaning: 'egg',
    requiredCharacters: ['た', 'ま', 'ご'],
    hasDakuten: true
  },
  {
    id: 'word-gohan',
    word: 'ごはん',
    romaji: 'gohan',
    meaning: 'cooked rice / meal',
    requiredCharacters: ['ご', 'は', 'ん'],
    hasDakuten: true
  },
  {
    id: 'word-ringo',
    word: 'りんご',
    romaji: 'ringo',
    meaning: 'apple',
    requiredCharacters: ['り', 'ん', 'ご'],
    hasDakuten: true
  },
  {
    id: 'word-enpitsu',
    word: 'えんぴつ',
    romaji: 'enpitsu',
    meaning: 'pencil',
    requiredCharacters: ['え', 'ん', 'ぴ', 'つ'],
    hasHandakuten: true
  },
  {
    id: 'word-tomodachi',
    word: 'ともだち',
    romaji: 'tomodachi',
    meaning: 'friend',
    requiredCharacters: ['と', 'も', 'だ', 'ち'],
    hasDakuten: true
  },

  // Sokuon (small っ) vocabulary
  {
    id: 'word-kitte',
    word: 'きって',
    romaji: 'kitte',
    meaning: 'postage stamp',
    requiredCharacters: ['き', 'て'],
    hasSokuon: true
  },
  {
    id: 'word-kippu',
    word: 'きっぷ',
    romaji: 'kippu',
    meaning: 'ticket',
    requiredCharacters: ['き', 'ぷ'],
    hasSokuon: true,
    hasHandakuten: true
  },
  {
    id: 'word-zasshi',
    word: 'ざっし',
    romaji: 'zasshi',
    meaning: 'magazine',
    requiredCharacters: ['ざ', 'し'],
    hasSokuon: true,
    hasDakuten: true
  },
  {
    id: 'word-gakkou',
    word: 'がっこう',
    romaji: 'gakkou',
    meaning: 'school',
    requiredCharacters: ['が', 'こ', 'う'],
    hasSokuon: true,
    hasDakuten: true,
    hasLongVowel: true
  },

  // Yoon (Contracted sounds) vocabulary
  {
    id: 'word-ocha',
    word: 'おちゃ',
    romaji: 'ocha',
    meaning: 'green tea',
    requiredCharacters: ['お', 'ちゃ'],
    hasYoon: true
  },
  {
    id: 'word-jitensha',
    word: 'じてんしゃ',
    romaji: 'jitensha',
    meaning: 'bicycle',
    requiredCharacters: ['じ', 'て', 'ん', 'しゃ'],
    hasDakuten: true,
    hasYoon: true
  },
  {
    id: 'word-byouin',
    word: 'びょういん',
    romaji: 'byouin',
    meaning: 'hospital',
    requiredCharacters: ['びょ', 'う', 'い', 'ん'],
    hasDakuten: true,
    hasYoon: true,
    hasLongVowel: true
  },
  {
    id: 'word-gyuunyuu',
    word: 'ぎゅうにゅう',
    romaji: 'gyuunyuu',
    meaning: 'cow milk',
    requiredCharacters: ['ぎゅ', 'う', 'にゅ', 'う'],
    hasDakuten: true,
    hasYoon: true,
    hasLongVowel: true
  },
  {
    id: 'word-densha',
    word: 'でんしゃ',
    romaji: 'densha',
    meaning: 'electric train',
    requiredCharacters: ['で', 'ん', 'しゃ'],
    hasDakuten: true,
    hasYoon: true
  },
  {
    id: 'word-hikouki',
    word: 'ひこうき',
    romaji: 'hikouki',
    meaning: 'airplane',
    requiredCharacters: ['ひ', 'こ', 'う', 'き'],
    hasLongVowel: true
  }
];

/**
 * Filter words whose required characters are entirely contained within the user's selected characters.
 */
export function getAvailableWords(selectedCharacters: Set<string>): CuratedWord[] {
  return CURATED_VOCABULARY.filter((vocab) => {
    return vocab.requiredCharacters.every((char) => selectedCharacters.has(char));
  });
}

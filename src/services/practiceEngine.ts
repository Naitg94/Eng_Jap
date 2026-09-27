import type {
  PracticeConfig,
  PracticeQuestion,
  PracticeContentType,
  LearningItem
} from '../types/learning';
import { HIRAGANA_BY_ID } from '../data/hiraganaMaster';
import { type CuratedWord, getAvailableWords } from '../data/vocabulary';
import { CONFUSABLE_PAIRS, type ConfusablePairDefinition } from '../data/confusablePairs';
import { loadAllSRSData } from './storage';
import { isItemDueForReview } from './spacedRepetition';
import { computeItemMastery } from './scoring';

/**
 * Clean and normalize Romaji user input
 */
export function normalizeRomajiInput(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s\-_]+/g, '');
}

/**
 * Validate an answer against expected and acceptable alternatives
 */
export function validateAnswer(userInput: string, question: PracticeQuestion): boolean {
  if (question.direction === 'romaji-to-hiragana') {
    // Hiragana expected
    const trimmedInput = userInput.trim();
    if (trimmedInput === question.expectedAnswer) return true;
    return question.acceptableAnswers.some((ans) => ans.trim() === trimmedInput);
  }

  // Romaji expected
  const cleanInput = normalizeRomajiInput(userInput);
  const cleanExpected = normalizeRomajiInput(question.expectedAnswer);
  if (cleanInput === cleanExpected) return true;

  return question.acceptableAnswers.some(
    (ans) => normalizeRomajiInput(ans) === cleanInput
  );
}

/**
 * Generate a complete practice session based on the user's configuration
 */
export function generatePracticeQuestions(config: PracticeConfig): PracticeQuestion[] {
  // 1. Resolve selected learning items
  const selectedItems: LearningItem[] = config.selectedItemIds
    .map((id) => HIRAGANA_BY_ID.get(id))
    .filter((item): item is LearningItem => !!item);

  if (selectedItems.length === 0) {
    throw new Error('Select at least one Hiragana group or character to continue.');
  }

  const selectedCharsSet = new Set(selectedItems.map((i) => i.character));

  // 2. Order items based on sessionSource
  const orderedItems = orderItemsBySource(selectedItems, config.sessionSource);

  // 3. Resolve active question types
  let types = config.questionTypes.length > 0 ? config.questionTypes : (['characters'] as PracticeContentType[]);
  if (types.includes('mixed')) {
    types = ['characters', 'combinations', 'writing', 'confusable', 'words'];
  }

  // Filter available words strictly matching the pool
  const availableWords = getAvailableWords(selectedCharsSet);

  // Available confusable pairs strictly within the pool (or where at least one character is in the pool)
  const availableConfusables = CONFUSABLE_PAIRS.filter(
    (pair) => selectedCharsSet.has(pair.char1) || selectedCharsSet.has(pair.char2)
  );

  const questions: PracticeQuestion[] = [];
  const targetCount = config.questionCount > 0 ? config.questionCount : 10;

  for (let i = 0; i < targetCount; i++) {
    // Determine type for this question
    const currentType = pickQuestionType(types, i, config.difficulty, availableWords, availableConfusables);
    const direction = pickDirection(config.directions, config.difficulty);

    const question = buildQuestion(
      currentType,
      direction,
      orderedItems,
      selectedItems,
      config.combinationLength,
      availableWords,
      availableConfusables,
      i
    );

    if (question) {
      questions.push(question);
    }
  }

  if (questions.length === 0) {
    throw new Error('Could not generate any questions from your selection. Please adjust settings.');
  }

  return questions;
}

function orderItemsBySource(
  items: LearningItem[],
  source: PracticeConfig['sessionSource']
): LearningItem[] {
  const srsStore = loadAllSRSData();

  switch (source) {
    case 'sequential':
      return [...items]; // Preserves original kana order

    case 'weak': {
      // Prioritize items with low overall mastery
      const withScore = items.map((item) => {
        const srs = srsStore[item.id];
        const mastery = computeItemMastery(srs);
        return { item, score: mastery.overallMastery, attempts: srs?.recognitionAttempts || 0 };
      });

      // If user has no attempts on any, fall back to random shuffle
      const hasAnyHistory = withScore.some((x) => x.attempts > 0);
      if (!hasAnyHistory) {
        return shuffleArray([...items]);
      }

      // Sort lowest score first
      withScore.sort((a, b) => a.score - b.score);
      return withScore.map((x) => x.item);
    }

    case 'due': {
      // Prioritize items that are due for review
      const dueItems: LearningItem[] = [];
      const nonDueItems: LearningItem[] = [];

      items.forEach((item) => {
        const srs = srsStore[item.id];
        if (isItemDueForReview(srs)) {
          dueItems.push(item);
        } else {
          nonDueItems.push(item);
        }
      });

      // If no items are due, fall back to random shuffle of all items
      if (dueItems.length === 0) {
        return shuffleArray([...items]);
      }

      return [...shuffleArray(dueItems), ...shuffleArray(nonDueItems)];
    }

    case 'random':
    default:
      return shuffleArray([...items]);
  }
}

function pickQuestionType(
  types: PracticeContentType[],
  index: number,
  difficulty: PracticeConfig['difficulty'],
  availableWords: CuratedWord[],
  availableConfusables: ConfusablePairDefinition[]
): PracticeContentType {
  // Filter types based on availability
  const viable = types.filter((t) => {
    if (t === 'words' && availableWords.length === 0) return false;
    if (t === 'confusable' && availableConfusables.length === 0) return false;
    return true;
  });

  if (viable.length === 0) return 'characters';

  if (difficulty === 'easy') {
    // Easy mode leans 80% to characters
    if (Math.random() < 0.8 && viable.includes('characters')) {
      return 'characters';
    }
  } else if (difficulty === 'hard') {
    // Hard mode leans more to combinations, confusables, or reverse
    const weighted = viable.filter((t) => t !== 'characters');
    if (weighted.length > 0 && Math.random() < 0.6) {
      return weighted[Math.floor(Math.random() * weighted.length)];
    }
  }

  return viable[index % viable.length];
}

function pickDirection(
  directions: PracticeConfig['directions'],
  difficulty: PracticeConfig['difficulty']
): 'hiragana-to-romaji' | 'romaji-to-hiragana' {
  if (directions.length === 1 && directions[0] !== 'mixed') {
    return directions[0] as 'hiragana-to-romaji' | 'romaji-to-hiragana';
  }

  if (difficulty === 'hard') {
    // More reverse direction on hard
    return Math.random() < 0.6 ? 'romaji-to-hiragana' : 'hiragana-to-romaji';
  }

  // 50/50 for mixed
  return Math.random() < 0.5 ? 'hiragana-to-romaji' : 'romaji-to-hiragana';
}

function buildQuestion(
  type: PracticeContentType,
  direction: 'hiragana-to-romaji' | 'romaji-to-hiragana',
  orderedItems: LearningItem[],
  allItems: LearningItem[],
  combLength: PracticeConfig['combinationLength'],
  availableWords: CuratedWord[],
  availableConfusables: ConfusablePairDefinition[],
  index: number
): PracticeQuestion {
  const baseItem = orderedItems[index % orderedItems.length];

  if (type === 'characters') {
    return buildCharacterQuestion(baseItem, direction, index);
  }

  if (type === 'writing') {
    // Writing is always romaji -> drawn hiragana
    return {
      id: `q-writing-${index}-${baseItem.id}`,
      type: 'writing',
      direction: 'romaji-to-hiragana',
      prompt: baseItem.romaji,
      promptSubtext: `Pronunciation: "${baseItem.pronunciation}"`,
      targetItem: baseItem,
      expectedAnswer: baseItem.character,
      acceptableAnswers: [baseItem.character]
    };
  }

  if (type === 'combinations') {
    return buildCombinationQuestion(allItems, combLength, direction, index);
  }

  if (type === 'words') {
    if (availableWords.length > 0) {
      const word = availableWords[Math.floor(Math.random() * availableWords.length)];
      return {
        id: `q-word-${index}-${word.id}`,
        type: 'words',
        direction,
        prompt: direction === 'hiragana-to-romaji' ? word.word : word.romaji,
        promptSubtext: `Meaning: "${word.meaning}"`,
        expectedAnswer: direction === 'hiragana-to-romaji' ? word.romaji : word.word,
        acceptableAnswers: direction === 'hiragana-to-romaji' ? [word.romaji] : [word.word]
      };
    }
    // Fall back to characters if not enough words
    return buildCharacterQuestion(baseItem, direction, index);
  }

  if (type === 'confusable') {
    if (availableConfusables.length > 0) {
      const pair = availableConfusables[Math.floor(Math.random() * availableConfusables.length)];
      // Randomly pick which character is target
      const pickFirst = Math.random() < 0.5;
      const targetChar = pickFirst ? pair.char1 : pair.char2;
      const targetRomaji = pickFirst ? pair.romaji1 : pair.romaji2;
      const otherChar = pickFirst ? pair.char2 : pair.char1;

      const targetItem = allItems.find((i) => i.character === targetChar) || baseItem;

      return {
        id: `q-confusable-${index}-${pair.pairKey}`,
        type: 'confusable',
        direction: 'romaji-to-hiragana',
        prompt: `Which character is "${targetRomaji}"?`,
        promptSubtext: pair.hint,
        targetItem,
        expectedAnswer: targetChar,
        acceptableAnswers: [targetChar],
        options: shuffleArray([targetChar, otherChar]),
        confusablePair: [pair.char1, pair.char2]
      };
    }
    return buildCharacterQuestion(baseItem, direction, index);
  }

  return buildCharacterQuestion(baseItem, direction, index);
}

function buildCharacterQuestion(
  item: LearningItem,
  direction: 'hiragana-to-romaji' | 'romaji-to-hiragana',
  index: number
): PracticeQuestion {
  const acceptable = [item.romaji];

  // Specific acceptable variations
  if (item.character === 'を') {
    acceptable.push('o'); // commonly romanized as 'o' in grammar particles
  }

  return {
    id: `q-char-${index}-${item.id}`,
    type: 'characters',
    direction,
    prompt: direction === 'hiragana-to-romaji' ? item.character : item.romaji,
    promptSubtext:
      direction === 'hiragana-to-romaji'
        ? `What is the Romaji for this character?`
        : `What is the Hiragana character for "${item.romaji}"?`,
    targetItem: item,
    expectedAnswer: direction === 'hiragana-to-romaji' ? item.romaji : item.character,
    acceptableAnswers: direction === 'hiragana-to-romaji' ? acceptable : [item.character]
  };
}

function buildCombinationQuestion(
  pool: LearningItem[],
  combLengthConfig: PracticeConfig['combinationLength'],
  direction: 'hiragana-to-romaji' | 'romaji-to-hiragana',
  index: number
): PracticeQuestion {
  let length = 2;
  if (combLengthConfig === '3') length = 3;
  else if (combLengthConfig === '4') length = 4;
  else if (combLengthConfig === 'mixed') length = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4

  // Pick random characters strictly from the pool
  const chosenItems: LearningItem[] = [];
  for (let k = 0; k < length; k++) {
    chosenItems.push(pool[Math.floor(Math.random() * pool.length)]);
  }

  const combinationKana = chosenItems.map((i) => i.character).join('');
  const combinationRomaji = chosenItems.map((i) => i.romaji).join('');

  return {
    id: `q-comb-${index}-${combinationKana}`,
    type: 'combinations',
    direction,
    prompt: direction === 'hiragana-to-romaji' ? combinationKana : combinationRomaji,
    promptSubtext:
      direction === 'hiragana-to-romaji'
        ? `What is the Romaji for this ${length}-character combination?`
        : `Type the Hiragana for this combination`,
    targetItems: chosenItems,
    expectedAnswer: direction === 'hiragana-to-romaji' ? combinationRomaji : combinationKana,
    acceptableAnswers: [
      direction === 'hiragana-to-romaji' ? combinationRomaji : combinationKana
    ]
  };
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

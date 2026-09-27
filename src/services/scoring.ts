import type {
  ItemSRSData,
  QuestionResult
} from '../types/learning';
import {
  loadAllSRSData,
  saveAllSRSData,
  getOrCreateItemSRS,
  loadConfusableStats,
  saveConfusableStats,
  recordActivityForStreak
} from './storage';
export { recordActivityForStreak } from './storage';
import { calculateNextSRS } from './spacedRepetition';
import { ALL_HIRAGANA } from '../data/hiraganaMaster';

export interface CharacterMasteryInfo {
  itemId: string;
  character: string;
  romaji: string;
  group: string;
  totalAttempts: number;
  totalCorrect: number;
  recognitionAccuracy: number; // 0 - 100
  writingAccuracy: number; // 0 - 100
  overallMastery: number; // 0 - 100
  status: 'new' | 'learning' | 'familiar' | 'mastered';
  repetitions: number;
  intervalDays: number;
  nextReviewDate: string;
  isDue: boolean;
}

export function computeItemMastery(srs?: ItemSRSData): {
  recognitionAccuracy: number;
  writingAccuracy: number;
  overallMastery: number;
  status: 'new' | 'learning' | 'familiar' | 'mastered';
} {
  if (!srs || (!srs.recognitionAttempts && !srs.writingAttempts)) {
    return {
      recognitionAccuracy: 0,
      writingAccuracy: 0,
      overallMastery: 0,
      status: 'new'
    };
  }

  const recAcc = srs.recognitionAttempts > 0
    ? Math.round((srs.recognitionCorrect / srs.recognitionAttempts) * 100)
    : 0;

  const wrtAcc = srs.writingAttempts > 0
    ? Math.round((srs.writingCorrect / srs.writingAttempts) * 100)
    : 0;

  // Weight recent history if available
  let recentScore = 0;
  if (srs.recentHistory && srs.recentHistory.length > 0) {
    const recentCorrect = srs.recentHistory.filter(Boolean).length;
    recentScore = (recentCorrect / srs.recentHistory.length) * 100;
  }

  // Calculate overall mastery
  // Combines accuracy, SRS interval advancement, and recent streak
  const totalAttempts = srs.recognitionAttempts + srs.writingAttempts;
  const baseAccuracy = srs.writingAttempts > 0
    ? recAcc * 0.6 + wrtAcc * 0.4
    : recAcc;

  // Weighted with recent attempts
  const weightedAccuracy = srs.recentHistory.length >= 3
    ? baseAccuracy * 0.4 + recentScore * 0.6
    : baseAccuracy;

  // SRS interval factor (capped at 1.0 when interval is >= 14 days)
  const srsBonus = Math.min(1, srs.intervalDays / 14);

  let overall = Math.round(weightedAccuracy * 0.8 + srsBonus * 20);
  overall = Math.max(0, Math.min(100, overall));

  let status: 'new' | 'learning' | 'familiar' | 'mastered' = 'learning';
  if (totalAttempts === 0) {
    status = 'new';
  } else if (overall >= 85 && srs.repetitions >= 3 && srs.intervalDays >= 6) {
    status = 'mastered';
  } else if (overall >= 60 && totalAttempts >= 2) {
    status = 'familiar';
  }

  return {
    recognitionAccuracy: recAcc,
    writingAccuracy: wrtAcc,
    overallMastery: overall,
    status
  };
}

export function getAllCharacterMasteries(): CharacterMasteryInfo[] {
  const srsStore = loadAllSRSData();
  const now = Date.now();

  return ALL_HIRAGANA.map((item) => {
    const srs = srsStore[item.id];
    const mastery = computeItemMastery(srs);
    const totalAttempts = (srs?.recognitionAttempts || 0) + (srs?.writingAttempts || 0);
    const totalCorrect = (srs?.recognitionCorrect || 0) + (srs?.writingCorrect || 0);
    const isDue = srs?.lastReviewedDate
      ? new Date(srs.nextReviewDate).getTime() <= now
      : false;

    return {
      itemId: item.id,
      character: item.character,
      romaji: item.romaji,
      group: item.group,
      totalAttempts,
      totalCorrect,
      recognitionAccuracy: mastery.recognitionAccuracy,
      writingAccuracy: mastery.writingAccuracy,
      overallMastery: mastery.overallMastery,
      status: mastery.status,
      repetitions: srs?.repetitions || 0,
      intervalDays: srs?.intervalDays || 0,
      nextReviewDate: srs?.nextReviewDate || new Date().toISOString(),
      isDue
    };
  });
}

/**
 * Update SRS and progress data for a question result.
 */
export function recordQuestionResult(result: QuestionResult): void {
  if (!result.itemId) return;

  const srsStore = loadAllSRSData();
  const itemSRS = getOrCreateItemSRS(srsStore, result.itemId);

  const isWriting = result.type === 'writing';

  if (isWriting) {
    itemSRS.writingAttempts += 1;
    if (result.isCorrect) {
      itemSRS.writingCorrect += 1;
    }
  } else {
    itemSRS.recognitionAttempts += 1;
    if (result.isCorrect) {
      itemSRS.recognitionCorrect += 1;
    }
  }

  // Determine quality rating for SM-2
  let quality = 1;
  if (result.isCorrect) {
    quality = isWriting && result.drawingRating === 'poor' ? 3 : 5;
  } else {
    quality = 1;
  }

  const updatedSRS = calculateNextSRS(itemSRS, quality);
  srsStore[result.itemId] = updatedSRS;
  saveAllSRSData(srsStore);

  // If this was a confusable pair question, update pair stats
  if (result.type === 'confusable' && result.prompt) {
    recordConfusablePairResult(result);
  }
}

/**
 * Handle flashcard review rating
 */
export function recordFlashcardRating(itemId: string, remembered: boolean): void {
  const srsStore = loadAllSRSData();
  const itemSRS = getOrCreateItemSRS(srsStore, itemId);

  itemSRS.recognitionAttempts += 1;
  if (remembered) {
    itemSRS.recognitionCorrect += 1;
  }

  const quality = remembered ? 4 : 2;
  const updatedSRS = calculateNextSRS(itemSRS, quality);
  srsStore[itemId] = updatedSRS;
  saveAllSRSData(srsStore);

  recordActivityForStreak();
}

function recordConfusablePairResult(result: QuestionResult): void {
  const stats = loadConfusableStats();
  // Expect result prompt or expected answer to indicate the pair
  const char = result.itemCharacter;
  if (!char) return;

  // Find confusable pair key if known
  const item = ALL_HIRAGANA.find((i) => i.character === char);
  if (!item || !item.confusedWith.length) return;

  const otherChar = item.confusedWith[0];
  const pairKey = [char, otherChar].sort().join('-');

  const current = stats[pairKey] || {
    pairKey,
    char1: char,
    char2: otherChar,
    totalAttempts: 0,
    correctAttempts: 0,
    accuracy: 100,
    lastAttemptTime: Date.now()
  };

  current.totalAttempts += 1;
  if (result.isCorrect) {
    current.correctAttempts += 1;
  }
  current.accuracy = Math.round((current.correctAttempts / current.totalAttempts) * 100);
  current.lastAttemptTime = Date.now();

  stats[pairKey] = current;
  saveConfusableStats(stats);
}

/**
 * Get the user's weakest characters (items with lowest accuracy or highest mistake count)
 */
export function getWeakCharacters(limit = 10): CharacterMasteryInfo[] {
  const masteries = getAllCharacterMasteries();
  // Filter items that have at least 1 attempt and accuracy < 80%
  const practiced = masteries.filter((m) => m.totalAttempts > 0);
  if (practiced.length === 0) {
    return [];
  }

  return practiced
    .sort((a, b) => {
      // Sort primarily by accuracy ascending (lower first)
      if (a.overallMastery !== b.overallMastery) {
        return a.overallMastery - b.overallMastery;
      }
      return (b.totalAttempts - b.totalCorrect) - (a.totalAttempts - a.totalCorrect);
    })
    .slice(0, limit);
}

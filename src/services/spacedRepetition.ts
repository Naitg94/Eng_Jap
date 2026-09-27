import type { ItemSRSData } from '../types/learning';

/**
 * SM-2 Spaced Repetition Algorithm
 *
 * Ratings:
 * 5 - perfect recall
 * 4 - correct recall with slight hesitation / good flashcard
 * 3 - correct recall with effort
 * 2 - incorrect / flashcard "still learning"
 * 1 - wrong response
 * 0 - complete blackout
 */
export function calculateNextSRS(current: ItemSRSData, quality: number): ItemSRSData {
  const boundedQuality = Math.max(0, Math.min(5, Math.round(quality)));
  const isSuccess = boundedQuality >= 3;

  let newRepetitions = current.repetitions;
  let newIntervalDays = current.intervalDays;
  let newEaseFactor = current.easeFactor;

  if (isSuccess) {
    if (newRepetitions === 0) {
      newIntervalDays = 1;
    } else if (newRepetitions === 1) {
      newIntervalDays = 6;
    } else {
      newIntervalDays = Math.round(newIntervalDays * newEaseFactor);
    }
    newRepetitions += 1;
  } else {
    newRepetitions = 0;
    newIntervalDays = 1;
  }

  // Ease factor update formula: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  newEaseFactor = newEaseFactor + (0.1 - (5 - boundedQuality) * (0.08 + (5 - boundedQuality) * 0.02));
  if (newEaseFactor < 1.3) {
    newEaseFactor = 1.3;
  }

  const now = new Date();
  const nextDate = new Date(now.getTime() + newIntervalDays * 24 * 60 * 60 * 1000);

  const updatedHistory = [...(current.recentHistory || []), isSuccess].slice(-10);

  return {
    ...current,
    repetitions: newRepetitions,
    intervalDays: newIntervalDays,
    easeFactor: Math.round(newEaseFactor * 100) / 100,
    lastReviewedDate: now.toISOString(),
    nextReviewDate: nextDate.toISOString(),
    recentHistory: updatedHistory
  };
}

export function isItemDueForReview(item?: ItemSRSData): boolean {
  if (!item) return false;
  // If never reviewed, or nextReviewDate <= now
  if (!item.lastReviewedDate) return true;
  return new Date(item.nextReviewDate).getTime() <= Date.now();
}

export function getDueItemsCount(srsStore: Record<string, ItemSRSData>): number {
  const now = Date.now();
  let count = 0;
  for (const key in srsStore) {
    const item = srsStore[key];
    if (item && item.lastReviewedDate && new Date(item.nextReviewDate).getTime() <= now) {
      count++;
    }
  }
  return count;
}

export function getDueItemIds(srsStore: Record<string, ItemSRSData>): string[] {
  const now = Date.now();
  const due: string[] = [];
  for (const key in srsStore) {
    const item = srsStore[key];
    if (item && item.lastReviewedDate && new Date(item.nextReviewDate).getTime() <= now) {
      due.push(item.itemId);
    }
  }
  return due;
}

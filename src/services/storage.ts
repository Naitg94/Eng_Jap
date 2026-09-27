import type {
  ItemSRSData,
  StreakData,
  ConfusablePairStats,
  PracticeSessionSummary,
  UserSettings,
  AppProgressBackup
} from '../types/learning';

class MemoryStorage {
  private store: Record<string, string> = {};
  getItem(key: string): string | null {
    return this.store[key] ?? null;
  }
  setItem(key: string, value: string): void {
    this.store[key] = value;
  }
  removeItem(key: string): void {
    delete this.store[key];
  }
  clear(): void {
    this.store = {};
  }
}

const safeStorage: Storage =
  typeof window !== 'undefined' && window.localStorage
    ? window.localStorage
    : (new MemoryStorage() as unknown as Storage);

const STORAGE_KEYS = {
  SRS_DATA: 'hiragana_mastery_srs_data',
  STREAK_DATA: 'hiragana_mastery_streak_data',
  CONFUSABLE_STATS: 'hiragana_mastery_confusable_stats',
  SESSION_HISTORY: 'hiragana_mastery_session_history',
  SETTINGS: 'hiragana_mastery_settings'
};

const DEFAULT_SETTINGS: UserSettings = {
  language: 'en',
  theme: 'system'
};

function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function loadSettings(): UserSettings {
  try {
    const raw = safeStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed to load settings:', e);
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: UserSettings): void {
  try {
    safeStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

export function loadAllSRSData(): Record<string, ItemSRSData> {
  try {
    const raw = safeStorage.getItem(STORAGE_KEYS.SRS_DATA);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch (e) {
    console.error('Failed to load SRS data:', e);
    return {};
  }
}

export function saveAllSRSData(data: Record<string, ItemSRSData>): void {
  try {
    safeStorage.setItem(STORAGE_KEYS.SRS_DATA, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save SRS data:', e);
  }
}

export function getOrCreateItemSRS(
  srsStore: Record<string, ItemSRSData>,
  itemId: string
): ItemSRSData {
  if (srsStore[itemId]) {
    return srsStore[itemId];
  }
  const initial: ItemSRSData = {
    itemId,
    repetitions: 0,
    intervalDays: 0,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString(),
    recognitionAttempts: 0,
    recognitionCorrect: 0,
    writingAttempts: 0,
    writingCorrect: 0,
    recentHistory: []
  };
  srsStore[itemId] = initial;
  return initial;
}

export function loadStreakData(): StreakData {
  const defaultStreak: StreakData = {
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    totalDaysActive: 0
  };

  try {
    const raw = safeStorage.getItem(STORAGE_KEYS.STREAK_DATA);
    if (!raw) return defaultStreak;
    const parsed: StreakData = JSON.parse(raw);
    
    // Check if streak was broken (missed yesterday)
    const today = getTodayString();
    if (parsed.lastActiveDate && parsed.lastActiveDate !== today) {
      const lastActive = new Date(parsed.lastActiveDate + 'T00:00:00');
      const current = new Date(today + 'T00:00:00');
      const diffDays = Math.round((current.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays > 1) {
        // Missed at least one full day, reset current streak to 0
        parsed.currentStreak = 0;
      }
    }
    return parsed;
  } catch (e) {
    console.error('Failed to load streak data:', e);
    return defaultStreak;
  }
}

export function recordActivityForStreak(): StreakData {
  const streak = loadStreakData();
  const today = getTodayString();

  if (streak.lastActiveDate === today) {
    // Already counted today
    return streak;
  }

  if (!streak.lastActiveDate) {
    // First time activity
    streak.currentStreak = 1;
    streak.longestStreak = 1;
    streak.totalDaysActive = 1;
  } else {
    const lastActive = new Date(streak.lastActiveDate + 'T00:00:00');
    const current = new Date(today + 'T00:00:00');
    const diffDays = Math.round((current.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Consecutive day!
      streak.currentStreak += 1;
    } else {
      // Broke streak
      streak.currentStreak = 1;
    }
    streak.totalDaysActive += 1;
    if (streak.currentStreak > streak.longestStreak) {
      streak.longestStreak = streak.currentStreak;
    }
  }

  streak.lastActiveDate = today;

  try {
    safeStorage.setItem(STORAGE_KEYS.STREAK_DATA, JSON.stringify(streak));
  } catch (e) {
    console.error('Failed to save streak data:', e);
  }

  return streak;
}

export function loadConfusableStats(): Record<string, ConfusablePairStats> {
  try {
    const raw = safeStorage.getItem(STORAGE_KEYS.CONFUSABLE_STATS);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch (e) {
    console.error('Failed to load confusable stats:', e);
    return {};
  }
}

export function saveConfusableStats(stats: Record<string, ConfusablePairStats>): void {
  try {
    safeStorage.setItem(STORAGE_KEYS.CONFUSABLE_STATS, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save confusable stats:', e);
  }
}

export function loadSessionHistory(): PracticeSessionSummary[] {
  try {
    const raw = safeStorage.getItem(STORAGE_KEYS.SESSION_HISTORY);
    if (!raw) return [];
    return JSON.parse(raw) || [];
  } catch (e) {
    console.error('Failed to load session history:', e);
    return [];
  }
}

export function saveSessionSummary(summary: PracticeSessionSummary): void {
  try {
    const history = loadSessionHistory();
    // Keep up to 100 recent sessions
    const updated = [summary, ...history].slice(0, 100);
    safeStorage.setItem(STORAGE_KEYS.SESSION_HISTORY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save session summary:', e);
  }
}

export function buildProgressBackup(): AppProgressBackup {
  return {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    srsData: loadAllSRSData(),
    streak: loadStreakData(),
    confusableStats: loadConfusableStats(),
    history: loadSessionHistory(),
    settings: loadSettings()
  };
}

export function restoreProgressBackup(backup: AppProgressBackup): void {
  saveAllSRSData(backup.srsData || {});
  try {
    safeStorage.setItem(STORAGE_KEYS.STREAK_DATA, JSON.stringify(backup.streak || {}));
    safeStorage.setItem(STORAGE_KEYS.CONFUSABLE_STATS, JSON.stringify(backup.confusableStats || {}));
    safeStorage.setItem(STORAGE_KEYS.SESSION_HISTORY, JSON.stringify(backup.history || []));
  } catch (e) {
    console.error('Error writing restored backup:', e);
  }
  if (backup.settings) {
    saveSettings(backup.settings);
  }
}

export function clearAllProgress(): void {
  Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
}

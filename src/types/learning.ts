export type ScriptType = 'hiragana' | 'katakana' | 'kanji';

export type CharacterGroup = 'basic' | 'dakuten' | 'handakuten' | 'yoon';

export type PracticeContentType =
  | 'characters'
  | 'combinations'
  | 'words'
  | 'writing'
  | 'confusable'
  | 'mixed';

export type QuestionDirection =
  | 'hiragana-to-romaji'
  | 'romaji-to-hiragana'
  | 'mixed';

export type DifficultyLevel = 'easy' | 'normal' | 'hard' | 'custom';

export type SessionSource = 'sequential' | 'random' | 'weak' | 'due';

export interface StrokeStep {
  step: number;
  instruction: string;
  // Canvas path commands for drawing reference stroke
  points: [number, number][]; // normalized [0-100, 0-100] coordinates
  controlPoints?: [number, number][];
}

export interface ExampleWord {
  word: string;
  romaji: string;
  meaning: string;
}

export interface LearningItem {
  id: string;
  script: ScriptType;
  character: string;
  romaji: string;
  pronunciation: string;
  group: CharacterGroup;
  row: string;
  column?: string;
  mnemonic: string;
  strokeSteps: StrokeStep[];
  confusedWith: string[]; // characters this is commonly confused with
  example: ExampleWord;
  notes?: string;
}

export interface PracticeConfig {
  selectedItemIds: string[];
  questionTypes: PracticeContentType[];
  directions: QuestionDirection[];
  combinationLength: '2' | '3' | '4' | 'mixed';
  questionCount: number;
  difficulty: DifficultyLevel;
  sessionSource: SessionSource;
}

export interface PracticeQuestion {
  id: string;
  type: PracticeContentType;
  direction: 'hiragana-to-romaji' | 'romaji-to-hiragana';
  prompt: string;
  promptSubtext?: string;
  targetItem?: LearningItem;
  targetItems?: LearningItem[];
  expectedAnswer: string;
  acceptableAnswers: string[];
  options?: string[]; // for multiple choice / confusable pairs
  confusablePair?: [string, string];
}

export interface QuestionResult {
  questionId: string;
  itemId?: string;
  itemCharacter?: string;
  type: PracticeContentType;
  direction: 'hiragana-to-romaji' | 'romaji-to-hiragana';
  prompt: string;
  userAnswer: string;
  expectedAnswer: string;
  isCorrect: boolean;
  timestamp: number;
  drawingRating?: 'good' | 'poor';
}

export interface PracticeSessionSummary {
  id: string;
  startTime: number;
  endTime: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  accuracy: number;
  durationSeconds: number;
  results: QuestionResult[];
  mistakes: QuestionResult[];
}

export interface ItemSRSData {
  itemId: string;
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  lastReviewedDate?: string; // ISO string
  nextReviewDate: string; // ISO string
  recognitionAttempts: number;
  recognitionCorrect: number;
  writingAttempts: number;
  writingCorrect: number;
  recentHistory: boolean[]; // last 10 attempts
}

export interface ConfusablePairStats {
  pairKey: string; // e.g. "ぬ-め" (sorted order)
  char1: string;
  char2: string;
  totalAttempts: number;
  correctAttempts: number;
  accuracy: number;
  lastAttemptTime: number;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalDaysActive: number;
}

export interface UserSettings {
  language: 'en' | 'ja';
  theme: 'light' | 'dark' | 'system';
}

export interface AppProgressBackup {
  version: string;
  exportDate: string;
  srsData: Record<string, ItemSRSData>;
  streak: StreakData;
  confusableStats: Record<string, ConfusablePairStats>;
  history: PracticeSessionSummary[];
  settings: UserSettings;
}

import { describe, it, expect } from 'vitest';
import {
  ALL_HIRAGANA,
  BASIC_ROWS,
  DAKUTEN_ROWS,
  HANDAKUTEN_ROWS,
  YOON_GROUPS,
  HIRAGANA_BY_ID,
  HIRAGANA_BY_CHAR
} from '../data/hiraganaMaster';
import { getCharacterDakutenInfo } from '../data/dakutenRelationships';
import {
  generatePracticeQuestions,
  validateAnswer,
  normalizeRomajiInput
} from '../services/practiceEngine';
import { calculateNextSRS, isItemDueForReview } from '../services/spacedRepetition';
import { computeItemMastery } from '../services/scoring';
import { validateAndRestoreBackup } from '../services/backup';
import type { PracticeConfig, ItemSRSData, PracticeQuestion } from '../types/learning';

describe('Hiragana Dataset Integrity', () => {
  it('contains exactly 104 complete Hiragana items (46 basic + 20 dakuten + 5 handakuten + 33 yoon)', () => {
    expect(ALL_HIRAGANA.length).toBe(104);

    const basic = ALL_HIRAGANA.filter((i) => i.group === 'basic');
    const dakuten = ALL_HIRAGANA.filter((i) => i.group === 'dakuten');
    const handakuten = ALL_HIRAGANA.filter((i) => i.group === 'handakuten');
    const yoon = ALL_HIRAGANA.filter((i) => i.group === 'yoon');

    expect(basic.length).toBe(46);
    expect(dakuten.length).toBe(20);
    expect(handakuten.length).toBe(5);
    expect(yoon.length).toBe(33);
  });

  it('maps standard Hepburn romanization for edge cases', () => {
    const shi = ALL_HIRAGANA.find((i) => i.character === 'し');
    const chi = ALL_HIRAGANA.find((i) => i.character === 'ち');
    const tsu = ALL_HIRAGANA.find((i) => i.character === 'つ');
    const fu = ALL_HIRAGANA.find((i) => i.character === 'ふ');
    const wo = ALL_HIRAGANA.find((i) => i.character === 'を');
    const n = ALL_HIRAGANA.find((i) => i.character === 'ん');
    const ji_z = ALL_HIRAGANA.find((i) => i.id === 'hiragana-ji-z');
    const ji_d = ALL_HIRAGANA.find((i) => i.id === 'hiragana-ji-d');
    const zu_z = ALL_HIRAGANA.find((i) => i.id === 'hiragana-zu-z');
    const zu_d = ALL_HIRAGANA.find((i) => i.id === 'hiragana-zu-d');

    expect(shi?.romaji).toBe('shi');
    expect(chi?.romaji).toBe('chi');
    expect(tsu?.romaji).toBe('tsu');
    expect(fu?.romaji).toBe('fu');
    expect(wo?.romaji).toBe('wo');
    expect(n?.romaji).toBe('n');
    expect(ji_z?.romaji).toBe('ji');
    expect(ji_d?.romaji).toBe('ji');
    expect(zu_z?.romaji).toBe('zu');
    expect(zu_d?.romaji).toBe('zu');
  });

  it('provides mnemonics and stroke steps for every character', () => {
    ALL_HIRAGANA.forEach((item) => {
      expect(item.mnemonic).toBeTruthy();
      expect(item.mnemonic.length).toBeGreaterThan(5);
      expect(item.strokeSteps.length).toBeGreaterThan(0);
      expect(item.example.word).toBeTruthy();
      expect(item.example.meaning).toBeTruthy();
    });
  });
});

describe('Practice Engine - Example Configurations (§44)', () => {
  // Config A: Basic row only (A-row)
  it('Config A: Generates questions strictly from A-row', () => {
    const aRow = BASIC_ROWS.find((r) => r.id === 'row-A')!;
    const aRowIds = aRow.items.map((i) => i.id);

    const config: PracticeConfig = {
      selectedItemIds: aRowIds,
      questionTypes: ['characters'],
      directions: ['hiragana-to-romaji'],
      combinationLength: '2',
      questionCount: 10,
      difficulty: 'normal',
      sessionSource: 'random'
    };

    const questions = generatePracticeQuestions(config);
    expect(questions.length).toBe(10);

    const allowedChars = new Set(['あ', 'い', 'う', 'え', 'お']);
    questions.forEach((q) => {
      expect(allowedChars.has(q.prompt)).toBe(true);
    });
  });

  // Config B: Multi-row mixed direction (K + S)
  it('Config B: Generates questions from K and S rows in mixed direction', () => {
    const kRow = BASIC_ROWS.find((r) => r.id === 'row-K')!;
    const sRow = BASIC_ROWS.find((r) => r.id === 'row-S')!;
    const ksIds = [...kRow.items, ...sRow.items].map((i) => i.id);

    const config: PracticeConfig = {
      selectedItemIds: ksIds,
      questionTypes: ['characters'],
      directions: ['mixed'],
      combinationLength: '2',
      questionCount: 20,
      difficulty: 'normal',
      sessionSource: 'random'
    };

    const questions = generatePracticeQuestions(config);
    expect(questions.length).toBe(20);

    const allowedChars = new Set([...kRow.items, ...sRow.items].map((i) => i.character));
    const allowedRomaji = new Set([...kRow.items, ...sRow.items].map((i) => i.romaji));

    questions.forEach((q) => {
      if (q.direction === 'hiragana-to-romaji') {
        expect(allowedChars.has(q.prompt)).toBe(true);
      } else {
        expect(allowedRomaji.has(q.prompt)).toBe(true);
      }
    });
  });

  // Config C: Combinations from a pool (K + S, length 2)
  it('Config C: Generates 2-character combinations strictly from K + S pool', () => {
    const kRow = BASIC_ROWS.find((r) => r.id === 'row-K')!;
    const sRow = BASIC_ROWS.find((r) => r.id === 'row-S')!;
    const ksIds = [...kRow.items, ...sRow.items].map((i) => i.id);

    const config: PracticeConfig = {
      selectedItemIds: ksIds,
      questionTypes: ['combinations'],
      directions: ['hiragana-to-romaji'],
      combinationLength: '2',
      questionCount: 15,
      difficulty: 'normal',
      sessionSource: 'random'
    };

    const questions = generatePracticeQuestions(config);
    expect(questions.length).toBe(15);

    const allowedChars = new Set([...kRow.items, ...sRow.items].map((i) => i.character));

    questions.forEach((q) => {
      expect(q.type).toBe('combinations');
      const chars = Array.from(q.prompt);
      expect(chars.length).toBe(2);
      chars.forEach((c) => expect(allowedChars.has(c)).toBe(true));
    });
  });

  // Config D: Individual characters only (か き さ し)
  it('Config D: Restricts combinations strictly to the 4 individual characters', () => {
    const targetChars = ['か', 'き', 'さ', 'し'];
    const targetItems = targetChars.map((c) => ALL_HIRAGANA.find((i) => i.character === c)!);

    const config: PracticeConfig = {
      selectedItemIds: targetItems.map((i) => i.id),
      questionTypes: ['characters', 'combinations'],
      directions: ['mixed'],
      combinationLength: '2',
      questionCount: 15,
      difficulty: 'normal',
      sessionSource: 'random'
    };

    const questions = generatePracticeQuestions(config);
    const allowedSet = new Set(targetChars);

    questions.forEach((q) => {
      if (q.type === 'characters' && q.direction === 'hiragana-to-romaji') {
        expect(allowedSet.has(q.prompt)).toBe(true);
      } else if (q.type === 'combinations' && q.direction === 'hiragana-to-romaji') {
        const chars = Array.from(q.prompt);
        chars.forEach((c) => expect(allowedSet.has(c)).toBe(true));
      }
    });
  });

  // Config F: Dakuten & Handakuten only (G, Z, D, B, P)
  it('Config F: Generates questions exclusively from voiced and semi-voiced groups', () => {
    const dakutenHandakutenIds = [
      ...DAKUTEN_ROWS.flatMap((r) => r.items.map((i) => i.id)),
      ...HANDAKUTEN_ROWS.flatMap((r) => r.items.map((i) => i.id))
    ];

    const config: PracticeConfig = {
      selectedItemIds: dakutenHandakutenIds,
      questionTypes: ['characters'],
      directions: ['mixed'],
      combinationLength: '2',
      questionCount: 20,
      difficulty: 'normal',
      sessionSource: 'random'
    };

    const questions = generatePracticeQuestions(config);
    expect(questions.length).toBe(20);

    const allowedItems = new Set(dakutenHandakutenIds.map((id) => HIRAGANA_BY_ID.get(id)!.character));

    questions.forEach((q) => {
      if (q.direction === 'hiragana-to-romaji') {
        expect(allowedItems.has(q.prompt)).toBe(true);
      }
    });
  });

  // Config G: Yoon only (きゃ, しゃ, じゃ groups)
  it('Config G: Generates questions strictly from selected Yoon groups', () => {
    const yoonGroups = YOON_GROUPS.filter((g) =>
      ['yoon-kya', 'yoon-sha', 'yoon-ja'].includes(g.id)
    );
    const yoonIds = yoonGroups.flatMap((g) => g.items.map((i) => i.id));

    const config: PracticeConfig = {
      selectedItemIds: yoonIds,
      questionTypes: ['characters'],
      directions: ['hiragana-to-romaji'],
      combinationLength: '2',
      questionCount: 9,
      difficulty: 'normal',
      sessionSource: 'random'
    };

    const questions = generatePracticeQuestions(config);
    expect(questions.length).toBe(9);

    const allowedYoon = new Set(yoonIds.map((id) => HIRAGANA_BY_ID.get(id)!.character));
    questions.forEach((q) => {
      expect(allowedYoon.has(q.prompt)).toBe(true);
    });
  });

  // Config H: Writing Practice mode
  it('Config H: Writing practice generates canvas drawing prompts with expected character', () => {
    const aRowIds = BASIC_ROWS.find((r) => r.id === 'row-A')!.items.map((i) => i.id);

    const config: PracticeConfig = {
      selectedItemIds: aRowIds,
      questionTypes: ['writing'],
      directions: ['romaji-to-hiragana'],
      combinationLength: '2',
      questionCount: 5,
      difficulty: 'normal',
      sessionSource: 'random'
    };

    const questions = generatePracticeQuestions(config);
    questions.forEach((q) => {
      expect(q.type).toBe('writing');
      expect(q.targetItem).toBeDefined();
      expect(q.expectedAnswer).toBe(q.targetItem!.character);
    });
  });

  // Config I: Confusable Pairs mode
  it('Config I: Generates confusable pair drill with two similar options', () => {
    const allIds = ALL_HIRAGANA.map((i) => i.id);

    const config: PracticeConfig = {
      selectedItemIds: allIds,
      questionTypes: ['confusable'],
      directions: ['romaji-to-hiragana'],
      combinationLength: '2',
      questionCount: 10,
      difficulty: 'normal',
      sessionSource: 'random'
    };

    const questions = generatePracticeQuestions(config);
    questions.forEach((q) => {
      expect(q.type).toBe('confusable');
      expect(q.options).toBeDefined();
      expect(q.options!.length).toBe(2);
      expect(q.options!.includes(q.expectedAnswer)).toBe(true);
    });
  });
});

describe('Answer Validation (§22)', () => {
  const dummyQuestion = (
    expected: string,
    acceptable: string[],
    dir: 'hiragana-to-romaji' | 'romaji-to-hiragana' = 'hiragana-to-romaji'
  ): PracticeQuestion => ({
    id: 'test-q',
    type: 'characters',
    direction: dir,
    prompt: 'dummy',
    expectedAnswer: expected,
    acceptableAnswers: acceptable
  });

  it('normalizes case and whitespace', () => {
    const q = dummyQuestion('sa', ['sa']);
    expect(validateAnswer('SA', q)).toBe(true);
    expect(validateAnswer('Sa', q)).toBe(true);
    expect(validateAnswer('  sa  ', q)).toBe(true);
    expect(validateAnswer('so', q)).toBe(false);
  });

  it('validates Hepburn romanization correctly (shi, chi, tsu, fu, wo, n)', () => {
    expect(validateAnswer('shi', dummyQuestion('shi', ['shi']))).toBe(true);
    expect(validateAnswer('chi', dummyQuestion('chi', ['chi']))).toBe(true);
    expect(validateAnswer('tsu', dummyQuestion('tsu', ['tsu']))).toBe(true);
    expect(validateAnswer('fu', dummyQuestion('fu', ['fu']))).toBe(true);
    expect(validateAnswer('wo', dummyQuestion('wo', ['wo', 'o']))).toBe(true);
    expect(validateAnswer('o', dummyQuestion('wo', ['wo', 'o']))).toBe(true);
    expect(validateAnswer('n', dummyQuestion('n', ['n']))).toBe(true);
  });

  it('validates double consonants (sokuon) and long vowels in vocabulary', () => {
    const gakkouQ = dummyQuestion('gakkou', ['gakkou']);
    expect(validateAnswer('gakkou', gakkouQ)).toBe(true);
    expect(validateAnswer('GAKKOU', gakkouQ)).toBe(true);
    expect(validateAnswer('gakko', gakkouQ)).toBe(false);

    const kitteQ = dummyQuestion('kitte', ['kitte']);
    expect(validateAnswer('kitte', kitteQ)).toBe(true);
    expect(validateAnswer('kite', kitteQ)).toBe(false);

    expect(normalizeRomajiInput('  SHI  ')).toBe('shi');
  });
});

describe('Spaced Repetition Algorithm SM-2 (§28a)', () => {
  const createInitialSRS = (id: string): ItemSRSData => ({
    itemId: id,
    repetitions: 0,
    intervalDays: 0,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString(),
    recognitionAttempts: 0,
    recognitionCorrect: 0,
    writingAttempts: 0,
    writingCorrect: 0,
    recentHistory: []
  });

  it('increments repetitions and advances interval upon correct answer', () => {
    let srs = createInitialSRS('test-item');
    expect(isItemDueForReview(srs)).toBe(true);

    // First successful review (quality 5)
    srs = calculateNextSRS(srs, 5);
    expect(srs.repetitions).toBe(1);
    expect(srs.intervalDays).toBe(1);

    // Second successful review
    srs = calculateNextSRS(srs, 5);
    expect(srs.repetitions).toBe(2);
    expect(srs.intervalDays).toBe(6);

    // Third successful review: interval = 6 * 2.6 = ~16 days
    srs = calculateNextSRS(srs, 5);
    expect(srs.repetitions).toBe(3);
    expect(srs.intervalDays).toBeGreaterThanOrEqual(15);

    const mastery = computeItemMastery(srs);
    expect(mastery.overallMastery).toBeGreaterThanOrEqual(0);
  });

  it('resets interval to 1 day and repetitions to 0 upon failure', () => {
    let srs = createInitialSRS('test-item');
    srs = calculateNextSRS(srs, 5);
    srs = calculateNextSRS(srs, 5);
    expect(srs.repetitions).toBe(2);

    // Incorrect answer (quality 1)
    srs = calculateNextSRS(srs, 1);
    expect(srs.repetitions).toBe(0);
    expect(srs.intervalDays).toBe(1);
  });
});

describe('Backup and Restore (§31)', () => {
  it('validates and accepts well-formed backup JSON', () => {
    const validJson = JSON.stringify({
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      srsData: {
        'hiragana-a': {
          itemId: 'hiragana-a',
          repetitions: 3,
          intervalDays: 6,
          easeFactor: 2.5,
          nextReviewDate: new Date().toISOString(),
          recognitionAttempts: 5,
          recognitionCorrect: 5,
          writingAttempts: 1,
          writingCorrect: 1,
          recentHistory: [true, true, true]
        }
      },
      streak: {
        currentStreak: 4,
        longestStreak: 10,
        lastActiveDate: '2026-09-27',
        totalDaysActive: 12
      },
      confusableStats: {},
      history: [],
      settings: { language: 'en', theme: 'dark' }
    });

    const res = validateAndRestoreBackup(validJson);
    expect(res.success).toBe(true);
    expect(res.itemCount).toBe(1);
  });

  it('rejects malformed or invalid backup files with friendly error', () => {
    const invalidJson1 = '{"corrupted": true}';
    const res1 = validateAndRestoreBackup(invalidJson1);
    expect(res1.success).toBe(false);

    const invalidJson2 = 'not even json';
    const res2 = validateAndRestoreBackup(invalidJson2);
    expect(res2.success).toBe(false);
  });
});

describe('Dakuten Relationships Engine', () => {
  it('returns null for vowels and characters that have no dakuten', () => {
    ['あ', 'い', 'う', 'え', 'お', 'な', 'ま', 'や', 'ら', 'わ', 'ん'].forEach((char) => {
      const item = HIRAGANA_BY_CHAR.get(char);
      expect(item).toBeDefined();
      const info = getCharacterDakutenInfo(item);
      expect(info).toBeNull();
    });
  });

  it('correctly maps K-row character (か) to its voiced dakuten (が)', () => {
    const ka = HIRAGANA_BY_CHAR.get('か');
    const info = getCharacterDakutenInfo(ka);
    expect(info).not.toBeNull();
    expect(info?.category).toBe('base-with-dakuten');
    expect(info?.variants.length).toBe(1);
    expect(info?.variants[0].item.character).toBe('が');
    expect(info?.variants[0].type).toBe('dakuten');
    expect(info?.variants[0].formula).toContain('か (ka) + ゛');
  });

  it('correctly maps H-row character (は) to both dakuten (ば) and handakuten (ぱ)', () => {
    const ha = HIRAGANA_BY_CHAR.get('は');
    const info = getCharacterDakutenInfo(ha);
    expect(info).not.toBeNull();
    expect(info?.category).toBe('base-with-dakuten');
    expect(info?.variants.length).toBe(2);

    const dakutenVar = info?.variants.find((v) => v.type === 'dakuten');
    const handakutenVar = info?.variants.find((v) => v.type === 'handakuten');

    expect(dakutenVar?.item.character).toBe('ば');
    expect(handakutenVar?.item.character).toBe('ぱ');
  });

  it('correctly maps dakuten character (が) back to base (か)', () => {
    const ga = HIRAGANA_BY_CHAR.get('が');
    const info = getCharacterDakutenInfo(ga);
    expect(info).not.toBeNull();
    expect(info?.category).toBe('dakuten-character');
    expect(info?.variants[0].item.character).toBe('か');
    expect(info?.variants[0].type).toBe('base');
  });

  it('correctly maps handakuten character (ぱ) back to base (は) and related dakuten (ば)', () => {
    const pa = HIRAGANA_BY_CHAR.get('ぱ');
    const info = getCharacterDakutenInfo(pa);
    expect(info).not.toBeNull();
    expect(info?.category).toBe('handakuten-character');

    const baseVar = info?.variants.find((v) => v.type === 'base');
    const dakutenVar = info?.variants.find((v) => v.type === 'dakuten');

    expect(baseVar?.item.character).toBe('は');
    expect(dakutenVar?.item.character).toBe('ば');
  });

  it('correctly maps contracted yoon characters (きゃ -> ぎゃ, and ぎゃ -> きゃ)', () => {
    const kya = HIRAGANA_BY_CHAR.get('きゃ');
    const kyaInfo = getCharacterDakutenInfo(kya);
    expect(kyaInfo).not.toBeNull();
    expect(kyaInfo?.variants[0].item.character).toBe('ぎゃ');

    const gya = HIRAGANA_BY_CHAR.get('ぎゃ');
    const gyaInfo = getCharacterDakutenInfo(gya);
    expect(gyaInfo).not.toBeNull();
    expect(gyaInfo?.variants[0].item.character).toBe('きゃ');
  });
});


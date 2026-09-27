import React, { useState, useEffect } from 'react';
import type {
  PracticeConfig,
  PracticeContentType,
  QuestionDirection,
  DifficultyLevel,
  SessionSource,
  PracticeQuestion,
  QuestionResult,
  PracticeSessionSummary
} from '../types/learning';
import { BASIC_ROWS } from '../data/hiraganaMaster';
import { GroupSelector } from '../components/practice/GroupSelector';
import { IndividualSelectorModal } from '../components/practice/IndividualSelectorModal';
import { QuestionView } from '../components/practice/QuestionView';
import { PracticeResults } from './PracticeResults';
import { generatePracticeQuestions } from '../services/practiceEngine';
import {
  recordQuestionResult,
  recordActivityForStreak
} from '../services/scoring';
import { saveSessionSummary } from '../services/storage';
import { useApp } from '../context/AppContext';
import { Play, AlertTriangle } from 'lucide-react';

export const Practice: React.FC = () => {
  const { quickPracticeConfig, setQuickPracticeConfig, dueCount, refreshStats } = useApp();

  // Practice Configuration State
  const defaultSelectedIds = BASIC_ROWS.flatMap((r) => r.items.map((i) => i.id));

  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(defaultSelectedIds);
  const [questionTypes, setQuestionTypes] = useState<PracticeContentType[]>(['characters']);
  const [directions, setDirections] = useState<QuestionDirection[]>(['hiragana-to-romaji']);
  const [combinationLength, setCombinationLength] = useState<'2' | '3' | '4' | 'mixed'>('2');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('normal');
  const [sessionSource, setSessionSource] = useState<SessionSource>('random');

  // Session Flow State
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [sessionResults, setSessionResults] = useState<QuestionResult[]>([]);
  const [sessionStartTime, setSessionStartTime] = useState<number>(0);
  const [completedSummary, setCompletedSummary] = useState<PracticeSessionSummary | null>(null);

  // Modals & Errors
  const [isIndividualSelectorOpen, setIsIndividualSelectorOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Listen for quick practice config passed from other pages (e.g. "Practice Weak Characters")
  useEffect(() => {
    if (quickPracticeConfig) {
      if (quickPracticeConfig.selectedItemIds) {
        setSelectedItemIds(quickPracticeConfig.selectedItemIds);
      }
      if (quickPracticeConfig.questionTypes) {
        setQuestionTypes(quickPracticeConfig.questionTypes);
      }
      if (quickPracticeConfig.directions) {
        setDirections(quickPracticeConfig.directions);
      }
      if (quickPracticeConfig.sessionSource) {
        setSessionSource(quickPracticeConfig.sessionSource);
      }
      if (quickPracticeConfig.questionCount) {
        setQuestionCount(quickPracticeConfig.questionCount);
      }
      setQuickPracticeConfig(null);
    }
  }, [quickPracticeConfig, setQuickPracticeConfig]);

  const toggleContentType = (type: PracticeContentType) => {
    if (questionTypes.includes(type)) {
      if (questionTypes.length === 1) return; // Keep at least one
      setQuestionTypes(questionTypes.filter((t) => t !== type));
    } else {
      setQuestionTypes([...questionTypes, type]);
    }
  };

  const handleStartPractice = () => {
    setErrorMessage(null);
    if (selectedItemIds.length === 0) {
      setErrorMessage('Select at least one Hiragana group or character to begin practice.');
      return;
    }

    try {
      const config: PracticeConfig = {
        selectedItemIds,
        questionTypes,
        directions,
        combinationLength,
        questionCount,
        difficulty,
        sessionSource
      };

      const generated = generatePracticeQuestions(config);
      setQuestions(generated);
      setCurrentQuestionIndex(0);
      setSessionResults([]);
      setSessionStartTime(Date.now());
      setCompletedSummary(null);
      setSessionActive(true);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to start practice session.');
    }
  };

  const handleRecordResult = (result: QuestionResult) => {
    // Record into SRS, streak, mistakes immediately
    recordQuestionResult(result);
    recordActivityForStreak();
    refreshStats();

    const updatedResults = [...sessionResults, result];
    setSessionResults(updatedResults);

    // Advance to next question or complete session
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishSession(updatedResults);
    }
  };

  const finishSession = (finalResults: QuestionResult[]) => {
    const endTime = Date.now();
    const correctCount = finalResults.filter((r) => r.isCorrect).length;
    const incorrectCount = finalResults.length - correctCount;
    const accuracy = Math.round((correctCount / finalResults.length) * 100);
    const durationSeconds = Math.max(1, Math.round((endTime - sessionStartTime) / 1000));
    const mistakes = finalResults.filter((r) => !r.isCorrect);

    const summary: PracticeSessionSummary = {
      id: `session-${endTime}`,
      startTime: sessionStartTime,
      endTime,
      totalQuestions: finalResults.length,
      correctCount,
      incorrectCount,
      accuracy,
      durationSeconds,
      results: finalResults,
      mistakes
    };

    saveSessionSummary(summary);
    setCompletedSummary(summary);
    setSessionActive(false);
  };

  const handleExitSession = () => {
    if (window.confirm('Are you sure you want to exit? Current session progress will be lost.')) {
      setSessionActive(false);
      setQuestions([]);
    }
  };

  const handleReviewMistakes = () => {
    if (!completedSummary || completedSummary.mistakes.length === 0) return;
    const mistakeItemIds = Array.from(
      new Set(
        completedSummary.mistakes
          .map((m) => m.itemId)
          .filter((id): id is string => !!id)
      )
    );

    if (mistakeItemIds.length === 0) return;

    setSelectedItemIds(mistakeItemIds);
    setQuestionCount(Math.min(20, mistakeItemIds.length * 2));
    setSessionSource('random');
    setCompletedSummary(null);

    // Launch immediately
    try {
      const config: PracticeConfig = {
        selectedItemIds: mistakeItemIds,
        questionTypes: ['characters'],
        directions,
        combinationLength: '2',
        questionCount: Math.min(20, mistakeItemIds.length * 2),
        difficulty: 'normal',
        sessionSource: 'random'
      };
      const generated = generatePracticeQuestions(config);
      setQuestions(generated);
      setCurrentQuestionIndex(0);
      setSessionResults([]);
      setSessionStartTime(Date.now());
      setSessionActive(true);
    } catch (e) {
      setSessionActive(false);
    }
  };

  // If results screen should be shown
  if (completedSummary) {
    return (
      <PracticeResults
        summary={completedSummary}
        onPracticeAgain={handleStartPractice}
        onReviewMistakes={handleReviewMistakes}
        onBackToPractice={() => setCompletedSummary(null)}
      />
    );
  }

  // If practice question session is active
  if (sessionActive && questions[currentQuestionIndex]) {
    return (
      <QuestionView
        question={questions[currentQuestionIndex]}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onRecordResult={handleRecordResult}
        onExitSession={handleExitSession}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
      />
    );
  }

  // Otherwise, render Practice Setup Configurator
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div>
        <h2 className="text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Create Practice Session
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
          Customize every aspect of your practice: choose groups, question types, direction, and difficulty.
        </p>
      </div>

      {/* Error Alert if any */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900/60 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1. Group Selection */}
      <section className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
            1. Select Hiragana Pool
          </h3>
          <span className="text-xs text-stone-400">
            Choose whole rows or individual characters
          </span>
        </div>

        <GroupSelector
          selectedItemIds={selectedItemIds}
          onChangeSelection={setSelectedItemIds}
          onOpenIndividualSelector={() => setIsIndividualSelectorOpen(true)}
        />
      </section>

      {/* 2. Content Type */}
      <section className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
          2. Practice Content Type
        </h3>
        <p className="text-xs text-stone-500">
          Select one or combine multiple formats to test reading, writing, and discrimination
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {[
            {
              id: 'characters',
              title: 'Characters',
              desc: 'Single Hiragana sound prompt'
            },
            {
              id: 'writing',
              title: 'Writing Practice',
              desc: 'Draw / trace on interactive canvas'
            },
            {
              id: 'combinations',
              title: 'Combinations',
              desc: 'Multi-character strings from pool'
            },
            {
              id: 'confusable',
              title: 'Confusable Pairs',
              desc: 'Drill visually similar characters'
            },
            {
              id: 'words',
              title: 'Words (Vocabulary)',
              desc: 'Real words matching your selected pool'
            },
            {
              id: 'mixed',
              title: 'Mixed Mode',
              desc: 'Combines all question formats'
            }
          ].map((type) => {
            const isSelected = questionTypes.includes(type.id as PracticeContentType);
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => toggleContentType(type.id as PracticeContentType)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-red-50 dark:bg-red-950/40 border-red-500 text-red-700 dark:text-red-300 shadow-xs'
                    : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  {type.title}
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                  {type.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Combination Length Option */}
        {questionTypes.includes('combinations') && (
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">
              Combination Length:
            </span>
            {(['2', '3', '4', 'mixed'] as const).map((len) => (
              <button
                key={len}
                type="button"
                onClick={() => setCombinationLength(len)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  combinationLength === len
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {len === 'mixed' ? 'Mixed Length' : `${len} characters`}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 3. Direction & Difficulty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Direction */}
        <section className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-xs space-y-3">
          <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
            3. Question Direction
          </h3>

          <div className="space-y-2">
            {[
              { id: 'hiragana-to-romaji', label: 'Hiragana → Romaji', desc: 'See kana, identify sound' },
              { id: 'romaji-to-hiragana', label: 'Romaji → Hiragana', desc: 'See sound, write / pick kana' },
              { id: 'mixed', label: 'Mixed Direction', desc: 'Randomly alternates both directions' }
            ].map((dir) => (
              <button
                key={dir.id}
                type="button"
                onClick={() => setDirections([dir.id as QuestionDirection])}
                className={`w-full p-3 rounded-2xl border text-left transition-all ${
                  directions[0] === dir.id
                    ? 'bg-red-50 dark:bg-red-950/40 border-red-500 text-red-700 dark:text-red-300 shadow-xs'
                    : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  {dir.label}
                </div>
                <div className="text-[11px] text-stone-500">{dir.desc}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Difficulty */}
        <section className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-xs space-y-3">
          <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
            4. Difficulty Level
          </h3>

          <div className="space-y-2">
            {[
              { id: 'easy', label: 'Easy', desc: 'Mostly individual characters, familiar items' },
              { id: 'normal', label: 'Normal', desc: 'Balanced mix of characters and combinations' },
              { id: 'hard', label: 'Hard', desc: 'More reverse questions, confusables, and weak items' }
            ].map((diff) => (
              <button
                key={diff.id}
                type="button"
                onClick={() => setDifficulty(diff.id as DifficultyLevel)}
                className={`w-full p-3 rounded-2xl border text-left transition-all ${
                  difficulty === diff.id
                    ? 'bg-red-50 dark:bg-red-950/40 border-red-500 text-red-700 dark:text-red-300 shadow-xs'
                    : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  {diff.label}
                </div>
                <div className="text-[11px] text-stone-500">{diff.desc}</div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* 4. Question Count & Session Source */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Question Count */}
        <section className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-xs space-y-3">
          <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
            5. Number of Questions
          </h3>

          <div className="flex flex-wrap gap-2">
            {[5, 10, 15, 20, 30, 50].map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => setQuestionCount(cnt)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  questionCount === cnt
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {cnt}
              </button>
            ))}
          </div>
        </section>

        {/* Session Source */}
        <section className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-xs space-y-3">
          <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
            6. Question Order / Source
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'random', label: 'Random', desc: 'Randomly chosen from pool' },
              { id: 'sequential', label: 'Sequential', desc: 'Follows kana table order' },
              { id: 'weak', label: 'Weak Characters', desc: 'Prioritizes characters you miss' },
              {
                id: 'due',
                label: 'Due for Review',
                desc: `${dueCount} due today (SRS schedule)`
              }
            ].map((src) => (
              <button
                key={src.id}
                type="button"
                onClick={() => setSessionSource(src.id as SessionSource)}
                className={`p-2.5 rounded-2xl border text-left transition-all ${
                  sessionSource === src.id
                    ? 'bg-red-50 dark:bg-red-950/40 border-red-500 text-red-700 dark:text-red-300 shadow-xs'
                    : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  {src.label}
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5 leading-tight">
                  {src.desc}
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Start Practice Session Big CTA */}
      <div className="pt-4">
        <button
          onClick={handleStartPractice}
          disabled={selectedItemIds.length === 0}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-base shadow-lg shadow-red-600/25 flex items-center justify-center gap-2.5 disabled:opacity-40 hover:scale-[1.005] active:scale-[0.995] transition-all"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Start Practice Session ({questionCount} Questions)</span>
        </button>
      </div>

      {/* Individual Character Selector Modal */}
      <IndividualSelectorModal
        isOpen={isIndividualSelectorOpen}
        onClose={() => setIsIndividualSelectorOpen(false)}
        selectedItemIds={selectedItemIds}
        onChangeSelection={setSelectedItemIds}
      />
    </div>
  );
};

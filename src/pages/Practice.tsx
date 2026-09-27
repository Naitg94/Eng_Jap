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
import { Play, AlertTriangle, Dumbbell } from 'lucide-react';

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

  // Listen for quick practice config passed from other pages
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
    recordQuestionResult(result);
    recordActivityForStreak();
    refreshStats();

    const updatedResults = [...sessionResults, result];
    setSessionResults(updatedResults);

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
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-8 px-3 sm:px-6 space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60">
            <Dumbbell className="w-3 h-3" />
            Custom Quiz Drill
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Create Practice Session
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
          Customize every parameter: choose groups, question types, direction, and difficulty.
        </p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-900/80 text-rose-800 dark:text-rose-300 text-xs sm:text-sm flex items-center gap-2.5 shadow-xs">
          <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1. Group Selection */}
      <section className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center">
              1
            </span>
            <h3 className="text-base font-black text-stone-900 dark:text-stone-100">
              Select Hiragana Pool
            </h3>
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400">
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
      <section className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-stone-800">
          <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center">
            2
          </span>
          <div>
            <h3 className="text-base font-black text-stone-900 dark:text-stone-100">
              Practice Question Types
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Select one or combine multiple formats to drill reading, writing, and recognition
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              id: 'characters',
              title: 'Single Characters',
              desc: 'Recognize single kana sounds'
            },
            {
              id: 'writing',
              title: 'Writing Practice',
              desc: 'Draw & trace kana on interactive canvas'
            },
            {
              id: 'combinations',
              title: 'Sound Combinations',
              desc: 'Multi-character strings from pool'
            },
            {
              id: 'confusable',
              title: 'Confusable Pairs',
              desc: 'Drill visually similar characters (e.g. さ/ち, は/ほ)'
            },
            {
              id: 'words',
              title: 'Vocabulary Words',
              desc: 'Real words matching selected pool'
            },
            {
              id: 'mixed',
              title: 'Mixed Mode',
              desc: 'Combines all quiz formats randomly'
            }
          ].map((type) => {
            const isSelected = questionTypes.includes(type.id as PracticeContentType);
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => toggleContentType(type.id as PracticeContentType)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-2 ${
                  isSelected
                    ? 'bg-red-50/90 dark:bg-red-950/40 border-red-500 text-red-900 dark:text-red-200 shadow-xs scale-[1.01]'
                    : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700/80 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-stone-100">
                    {type.title}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                    {type.desc}
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-red-600 text-white'
                      : 'border border-stone-300 dark:border-stone-600 text-transparent'
                  }`}
                >
                  ✓
                </div>
              </button>
            );
          })}
        </div>

        {/* Combination Length Option */}
        {questionTypes.includes('combinations') && (
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
              Combination Length:
            </span>
            {(['2', '3', '4', 'mixed'] as const).map((len) => (
              <button
                key={len}
                type="button"
                onClick={() => setCombinationLength(len)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  combinationLength === len
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {len === 'mixed' ? 'Mixed Length' : `${len} characters`}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 3. Direction & Difficulty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Direction */}
        <section className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-stone-800">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center">
              3
            </span>
            <h3 className="text-base font-black text-stone-900 dark:text-stone-100">
              Question Direction
            </h3>
          </div>

          <div className="space-y-2">
            {[
              { id: 'hiragana-to-romaji', label: 'Hiragana → Romaji', desc: 'See kana glyph, identify reading' },
              { id: 'romaji-to-hiragana', label: 'Romaji → Hiragana', desc: 'See reading, pick or write kana' },
              { id: 'mixed', label: 'Mixed Direction', desc: 'Randomly alternates both directions' }
            ].map((dir) => (
              <button
                key={dir.id}
                type="button"
                onClick={() => setDirections([dir.id as QuestionDirection])}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  directions[0] === dir.id
                    ? 'bg-red-50/90 dark:bg-red-950/40 border-red-500 text-red-900 dark:text-red-200 shadow-xs'
                    : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700/80 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-stone-100">
                    {dir.label}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">{dir.desc}</div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    directions[0] === dir.id ? 'border-red-600 bg-red-600' : 'border-stone-300 dark:border-stone-600'
                  }`}
                >
                  {directions[0] === dir.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Difficulty */}
        <section className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-stone-800">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center">
              4
            </span>
            <h3 className="text-base font-black text-stone-900 dark:text-stone-100">
              Difficulty Level
            </h3>
          </div>

          <div className="space-y-2">
            {[
              { id: 'easy', label: 'Easy', desc: 'Single characters & familiar sounds' },
              { id: 'normal', label: 'Normal', desc: 'Balanced combination & random pool' },
              { id: 'hard', label: 'Hard', desc: 'Reverse questions, confusables & weak items' }
            ].map((diff) => (
              <button
                key={diff.id}
                type="button"
                onClick={() => setDifficulty(diff.id as DifficultyLevel)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  difficulty === diff.id
                    ? 'bg-red-50/90 dark:bg-red-950/40 border-red-500 text-red-900 dark:text-red-200 shadow-xs'
                    : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700/80 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-stone-100">
                    {diff.label}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">{diff.desc}</div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    difficulty === diff.id ? 'border-red-600 bg-red-600' : 'border-stone-300 dark:border-stone-600'
                  }`}
                >
                  {difficulty === diff.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* 4. Question Count & Session Source */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Question Count */}
        <section className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-stone-800">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center">
              5
            </span>
            <h3 className="text-base font-black text-stone-900 dark:text-stone-100">
              Number of Questions
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {[5, 10, 15, 20, 30, 50].map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => setQuestionCount(cnt)}
                className={`flex-1 min-w-[50px] py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  questionCount === cnt
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20 scale-[1.02]'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200/60 dark:border-stone-700'
                }`}
              >
                {cnt}
              </button>
            ))}
          </div>
        </section>

        {/* Session Source */}
        <section className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-stone-800">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center">
              6
            </span>
            <h3 className="text-base font-black text-stone-900 dark:text-stone-100">
              Question Order / Source
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {[
              { id: 'random', label: 'Random', desc: 'Uniform random selection' },
              { id: 'sequential', label: 'Sequential', desc: 'Table kana order' },
              { id: 'weak', label: 'Weak Kana', desc: 'Prioritizes missed items' },
              {
                id: 'due',
                label: 'Due for Review',
                desc: `${dueCount} due today (SRS)`
              }
            ].map((src) => (
              <button
                key={src.id}
                type="button"
                onClick={() => setSessionSource(src.id as SessionSource)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  sessionSource === src.id
                    ? 'bg-red-50/90 dark:bg-red-950/40 border-red-500 text-red-900 dark:text-red-200 shadow-xs'
                    : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700/80 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-extrabold text-stone-900 dark:text-stone-100">
                  {src.label}
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 leading-tight">
                  {src.desc}
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Start Practice Session Big CTA */}
      <div className="pt-2">
        <button
          onClick={handleStartPractice}
          disabled={selectedItemIds.length === 0}
          className="w-full py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-base sm:text-lg shadow-xl shadow-red-600/30 flex items-center justify-center gap-3 disabled:opacity-40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
        >
          <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
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

import React, { useState, useEffect, useRef } from 'react';
import type { PracticeQuestion, QuestionResult } from '../../types/learning';
import { validateAnswer } from '../../services/practiceEngine';
import { WritingCanvas } from '../writing/WritingCanvas';
import { PracticeFeedback } from './PracticeFeedback';
import { SkipForward, X } from 'lucide-react';

interface QuestionViewProps {
  question: PracticeQuestion;
  questionNumber: number;
  totalQuestions: number;
  onRecordResult: (result: QuestionResult) => void;
  onExitSession: () => void;
  isLastQuestion: boolean;
}

export const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onRecordResult,
  onExitSession,
  isLastQuestion
}) => {
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Reset state on each new question
  useEffect(() => {
    setUserAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);

    // Auto focus text input if available
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, [question.id]);

  const handleSubmitTextAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isAnswered) return;

    const trimmed = userAnswer.trim();
    if (!trimmed) return;

    const correct = validateAnswer(trimmed, question);
    setIsCorrect(correct);
    setIsAnswered(true);

    const result: QuestionResult = {
      questionId: question.id,
      itemId: question.targetItem?.id,
      itemCharacter: question.targetItem?.character,
      type: question.type,
      direction: question.direction,
      prompt: question.prompt,
      userAnswer: trimmed,
      expectedAnswer: question.expectedAnswer,
      isCorrect: correct,
      timestamp: Date.now()
    };

    onRecordResult(result);
  };

  const handleConfusableChoice = (chosenChar: string) => {
    if (isAnswered) return;
    const correct = chosenChar === question.expectedAnswer;
    setUserAnswer(chosenChar);
    setIsCorrect(correct);
    setIsAnswered(true);

    const result: QuestionResult = {
      questionId: question.id,
      itemId: question.targetItem?.id,
      itemCharacter: question.targetItem?.character,
      type: 'confusable',
      direction: question.direction,
      prompt: question.prompt,
      userAnswer: chosenChar,
      expectedAnswer: question.expectedAnswer,
      isCorrect: correct,
      timestamp: Date.now()
    };

    onRecordResult(result);
  };

  const handleWritingDrawingSubmit = (rating: 'good' | 'poor') => {
    if (isAnswered) return;
    const correct = rating === 'good';
    setUserAnswer(correct ? question.expectedAnswer : '(attempted drawing)');
    setIsCorrect(correct);
    setIsAnswered(true);

    const result: QuestionResult = {
      questionId: question.id,
      itemId: question.targetItem?.id,
      itemCharacter: question.targetItem?.character,
      type: 'writing',
      direction: 'romaji-to-hiragana',
      prompt: question.prompt,
      userAnswer: correct ? question.expectedAnswer : 'imperfect drawing',
      expectedAnswer: question.expectedAnswer,
      isCorrect: correct,
      timestamp: Date.now(),
      drawingRating: rating
    };

    onRecordResult(result);
  };

  const handleSkip = () => {
    if (isAnswered) return;
    setUserAnswer('(skipped)');
    setIsCorrect(false);
    setIsAnswered(true);

    const result: QuestionResult = {
      questionId: question.id,
      itemId: question.targetItem?.id,
      itemCharacter: question.targetItem?.character,
      type: question.type,
      direction: question.direction,
      prompt: question.prompt,
      userAnswer: '(skipped)',
      expectedAnswer: question.expectedAnswer,
      isCorrect: false,
      timestamp: Date.now()
    };

    onRecordResult(result);
  };

  const progressPercent = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <div className="w-full max-w-xl mx-auto py-6 px-4">
      {/* Top Header & Progress */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <button
          onClick={onExitSession}
          className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          title="Exit Practice"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress bar and counter */}
        <div className="flex-1 max-w-xs space-y-1 text-center">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
            <span>
              Question {questionNumber} of {totalQuestions}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
            <div
              className="h-full bg-red-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          disabled={isAnswered}
          className="flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 disabled:opacity-40 px-2 py-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <span>Skip</span>
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm p-6 sm:p-8 flex flex-col items-center text-center">
        {/* Type Badge */}
        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 mb-4 border border-stone-200/80 dark:border-stone-700/80">
          {question.type === 'confusable'
            ? 'Confusable Pairs Drill'
            : question.type === 'writing'
            ? 'Writing Practice'
            : question.type === 'combinations'
            ? 'Combination Drill'
            : question.type === 'words'
            ? 'Beginner Vocabulary'
            : 'Hiragana Recognition'}
        </span>

        {/* Prompt Subtext */}
        {question.promptSubtext && (
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-3 font-medium">
            {question.promptSubtext}
          </p>
        )}

        {/* Target Character / Word Prompt */}
        {question.type !== 'confusable' && (
          <div className="my-2 select-none">
            {question.direction === 'hiragana-to-romaji' ? (
              <span className="text-6xl sm:text-7xl font-bold font-serif text-stone-900 dark:text-stone-100">
                {question.prompt}
              </span>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl font-black font-sans text-red-600 dark:text-red-400">
                  {question.prompt}
                </span>
                {question.type === 'writing' && (
                  <span className="text-xs text-stone-400 font-medium mt-1">
                    Draw this character below
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Input Modes */}

        {/* 1. Writing Mode Canvas */}
        {question.type === 'writing' && question.targetItem && (
          <div className="w-full mt-4">
            <WritingCanvas
              character={question.targetItem.character}
              romaji={question.targetItem.romaji}
              strokeSteps={question.targetItem.strokeSteps}
              onSubmitDrawing={handleWritingDrawingSubmit}
              disabled={isAnswered}
            />
          </div>
        )}

        {/* 2. Confusable Pair Multiple Choice */}
        {question.type === 'confusable' && question.options && (
          <div className="w-full mt-4 space-y-4">
            <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">
              {question.prompt}
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              {question.options.map((optChar) => {
                const isSelected = userAnswer === optChar;
                return (
                  <button
                    key={optChar}
                    type="button"
                    onClick={() => handleConfusableChoice(optChar)}
                    disabled={isAnswered}
                    className={`aspect-square rounded-3xl border-2 text-6xl font-bold font-serif transition-all flex items-center justify-center p-4 ${
                      isSelected
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                          : 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
                        : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 hover:border-red-500 hover:scale-105 active:scale-95'
                    }`}
                  >
                    {optChar}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Text Input Mode (Characters, Combinations, Words, Reverse direction) */}
        {question.type !== 'writing' && question.type !== 'confusable' && (
          <form onSubmit={handleSubmitTextAnswer} className="w-full max-w-xs mt-6 space-y-3">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={isAnswered}
                placeholder={
                  question.direction === 'hiragana-to-romaji'
                    ? 'Type romaji (e.g. sa)...'
                    : 'Type hiragana character...'
                }
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                className="w-full px-4 py-3 rounded-2xl border-2 border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-center font-bold text-lg focus:outline-hidden focus:border-red-500 focus:bg-white dark:focus:bg-stone-900 transition-all disabled:opacity-60"
              />
            </div>

            {!isAnswered && (
              <button
                type="submit"
                disabled={!userAnswer.trim()}
                className="w-full py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/20 disabled:opacity-40 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                Submit Answer
              </button>
            )}
          </form>
        )}
      </div>

      {/* Immediate Feedback Card */}
      {isAnswered && (
        <PracticeFeedback
          question={question}
          userAnswer={userAnswer}
          isCorrect={isCorrect}
          onNextQuestion={() => {
            // Handled in parent
          }}
          isLastQuestion={isLastQuestion}
        />
      )}
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import type { PracticeQuestion, QuestionResult } from '../../types/learning';
import { validateAnswer } from '../../services/practiceEngine';
import { WritingCanvas } from '../writing/WritingCanvas';
import { PracticeFeedback } from './PracticeFeedback';
import { SkipForward, X, Sparkles, Send } from 'lucide-react';

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
  const [pendingResult, setPendingResult] = useState<QuestionResult | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Reset state on each new question
  useEffect(() => {
    setUserAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setPendingResult(null);

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

    setPendingResult(result);
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

    setPendingResult(result);
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

    setPendingResult(result);
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

    // Skip immediately
    onRecordResult(result);
  };

  const handleNextQuestion = () => {
    if (pendingResult) {
      onRecordResult(pendingResult);
    }
  };

  const progressPercent = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <div className="w-full max-w-xl mx-auto py-6 sm:py-8 px-3 sm:px-4 animate-fadeIn">
      {/* Top Header & Progress HUD */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <button
          onClick={onExitSession}
          className="text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 p-2 rounded-xl hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          title="Exit Practice"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress bar and counter */}
        <div className="flex-1 max-w-xs space-y-1.5 text-center">
          <div className="flex items-center justify-between text-xs font-black text-stone-600 dark:text-stone-400">
            <span>
              Question <span className="text-red-600 dark:text-red-400">{questionNumber}</span> of {totalQuestions}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-rose-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          disabled={isAnswered}
          className="flex items-center gap-1 text-xs font-bold text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 disabled:opacity-30 p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <span className="hidden sm:inline">Skip</span>
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-xl shadow-stone-900/5 dark:shadow-stone-950/40 p-6 sm:p-8 space-y-6">
        {/* Question Type Pill */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200/80 dark:border-stone-700">
            <Sparkles className="w-3 h-3 text-red-600 dark:text-red-400" />
            {question.type === 'characters'
              ? 'Single Kana Drill'
              : question.type === 'writing'
              ? 'Stroke Order & Writing'
              : question.type === 'confusable'
              ? 'Confusable Pairs Test'
              : question.type === 'combinations'
              ? 'Sound Combination'
              : 'Vocabulary Word'}
          </span>

          <span className="text-[11px] font-bold text-stone-400 dark:text-stone-500">
            {question.direction === 'hiragana-to-romaji'
              ? 'Hiragana → Romaji'
              : 'Romaji → Hiragana'}
          </span>
        </div>

        {/* Prompt Header */}
        <div className="text-center space-y-2">
          <p className="text-xs sm:text-sm font-bold text-stone-500 dark:text-stone-400">
            {question.direction === 'hiragana-to-romaji'
              ? 'What is the romaji reading for:'
              : 'Identify or write the hiragana for:'}
          </p>

          {/* Big Visual Prompt */}
          <div className="text-6xl sm:text-7xl md:text-8xl font-black font-serif text-stone-900 dark:text-stone-100 py-2 select-none drop-shadow-sm">
            {question.prompt}
          </div>
        </div>

        {/* Question Body Depending on Type */}
        {question.type === 'writing' ? (
          /* Interactive Drawing Canvas */
          <WritingCanvas
            character={question.expectedAnswer}
            romaji={question.prompt}
            strokeSteps={question.targetItem?.strokeSteps || []}
            onSubmitDrawing={handleWritingDrawingSubmit}
            disabled={isAnswered}
          />
        ) : question.type === 'confusable' && question.options ? (
          /* Confusable Multiple Choice Buttons */
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              {question.options.map((optionChar) => (
                <button
                  key={optionChar}
                  onClick={() => handleConfusableChoice(optionChar)}
                  disabled={isAnswered}
                  className={`p-5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    isAnswered && optionChar === question.expectedAnswer
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                      : isAnswered && optionChar === userAnswer && !isCorrect
                      ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-300'
                      : 'bg-stone-50 dark:bg-stone-800/80 border-stone-200 dark:border-stone-700 hover:border-red-500 dark:hover:border-red-500 hover:bg-white dark:hover:bg-stone-800 text-stone-900 dark:text-stone-100 hover:scale-[1.02]'
                  }`}
                >
                  <span className="text-4xl sm:text-5xl font-bold font-serif">
                    {optionChar}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-center text-stone-400">
              Pick the correct character matching the sound "{question.prompt}"
            </p>
          </div>
        ) : (
          /* Standard Romaji / Word Text Input */
          <form onSubmit={handleSubmitTextAnswer} className="space-y-3 pt-2">
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={isAnswered}
                placeholder="Type reading in romaji (e.g. ka)..."
                autoComplete="off"
                autoCapitalize="none"
                spellCheck="false"
                className="w-full px-5 py-4 rounded-2xl border-2 border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-lg font-mono font-bold text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-red-600 focus:ring-4 focus:ring-red-600/15 transition-all shadow-inner"
              />

              <button
                type="submit"
                disabled={!userAnswer.trim() || isAnswered}
                className="absolute right-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs flex items-center gap-1.5 disabled:opacity-40 transition-all cursor-pointer shadow-xs"
              >
                <span>Submit</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Immediate Instant Feedback Banner */}
      {isAnswered && (
        <PracticeFeedback
          question={question}
          userAnswer={userAnswer}
          isCorrect={isCorrect}
          onNextQuestion={handleNextQuestion}
          isLastQuestion={isLastQuestion}
        />
      )}
    </div>
  );
};

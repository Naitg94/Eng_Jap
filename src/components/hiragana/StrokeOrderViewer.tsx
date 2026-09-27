import React, { useState, useEffect } from 'react';
import type { StrokeStep } from '../../types/learning';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface StrokeOrderViewerProps {
  character: string;
  strokeSteps: StrokeStep[];
  size?: number;
}

export const StrokeOrderViewer: React.FC<StrokeOrderViewerProps> = ({
  character,
  strokeSteps,
  size = 220
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [character]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentStepIndex < strokeSteps.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 1200);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, strokeSteps.length]);

  const handlePlayToggle = () => {
    if (currentStepIndex >= strokeSteps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const activeStep = strokeSteps[currentStepIndex] || strokeSteps[0];

  return (
    <div className="flex flex-col items-center">
      {/* SVG Canvas Box with Japanese 4-Quadrant Guidelines */}
      <div
        className="relative bg-stone-50 dark:bg-stone-900 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center select-none"
        style={{ width: size, height: size }}
      >
        {/* Subtle 4-quadrant guideline cross */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 right-0 border-t border-red-300/40 dark:border-red-900/40" />
          <div className="absolute left-1/2 top-0 bottom-0 border-l border-red-300/40 dark:border-red-900/40" />
          <div className="absolute inset-2 border border-stone-200/60 dark:border-stone-800/60 rounded-xl" />
        </div>

        {/* Faint watermark of full character */}
        <div className="absolute inset-0 flex items-center justify-center text-stone-200/70 dark:text-stone-800/80 font-serif select-none pointer-events-none text-8xl">
          {character}
        </div>

        {/* SVG Stroke Rendering */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full relative z-10 p-2"
          style={{ width: size, height: size }}
        >
          {strokeSteps.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isFuture = idx > currentStepIndex;

            if (isFuture) return null;

            // Generate SVG path from normalized points
            const d = step.points.reduce((acc, pt, pIdx) => {
              return pIdx === 0 ? `M ${pt[0]} ${pt[1]}` : `${acc} L ${pt[0]} ${pt[1]}`;
            }, '');

            return (
              <g key={step.step}>
                {/* Stroke line */}
                <path
                  d={d}
                  fill="none"
                  stroke={isCurrent ? '#dc2626' : '#292524'}
                  className={!isCurrent ? 'dark:stroke-stone-300' : ''}
                  strokeWidth={isCurrent ? 6 : 5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* For current stroke, highlight starting dot & step number */}
                {isCurrent && step.points[0] && (
                  <>
                    <circle
                      cx={step.points[0][0]}
                      cy={step.points[0][1]}
                      r={4.5}
                      fill="#ef4444"
                      className="animate-ping opacity-75"
                    />
                    <circle
                      cx={step.points[0][0]}
                      cy={step.points[0][1]}
                      r={3.5}
                      fill="#b91c1c"
                    />
                    <rect
                      x={step.points[0][0] - 6}
                      y={step.points[0][1] - 14}
                      width={12}
                      height={10}
                      rx={3}
                      fill="#dc2626"
                    />
                    <text
                      x={step.points[0][0]}
                      y={step.points[0][1] - 7}
                      fontSize={7}
                      fontWeight="bold"
                      fill="#ffffff"
                      textAnchor="middle"
                    >
                      {step.step}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Step Instruction & Controls */}
      <div className="w-full mt-3 text-center">
        <div className="text-xs font-semibold text-red-600 dark:text-red-400 mb-0.5">
          Stroke {currentStepIndex + 1} of {strokeSteps.length}
        </div>
        <p className="text-xs text-stone-600 dark:text-stone-300 min-h-[32px] px-2 flex items-center justify-center">
          {activeStep?.instruction || 'Follow stroke direction from red dot.'}
        </p>

        {/* Step buttons */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {strokeSteps.map((step, idx) => (
            <button
              key={step.step}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(idx);
              }}
              className={`w-6 h-6 rounded-full text-xs font-bold transition-all ${
                idx === currentStepIndex
                  ? 'bg-red-600 text-white shadow-xs scale-110'
                  : idx < currentStepIndex
                  ? 'bg-stone-300 dark:bg-stone-700 text-stone-800 dark:text-stone-200'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-600'
              }`}
            >
              {step.step}
            </button>
          ))}

          <div className="w-px h-4 bg-stone-300 dark:bg-stone-700 mx-1" />

          {/* Play/Pause */}
          <button
            onClick={handlePlayToggle}
            className="p-1 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
            title={isPlaying ? 'Pause' : 'Play animation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="p-1 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
            title="Reset to step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

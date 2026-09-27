import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Trash2, Eye, EyeOff, Check, X } from 'lucide-react';
import type { StrokeStep } from '../../types/learning';

interface WritingCanvasProps {
  character: string;
  romaji: string;
  strokeSteps: StrokeStep[];
  onSubmitDrawing: (rating: 'good' | 'poor') => void;
  disabled?: boolean;
}

interface Point {
  x: number;
  y: number;
}

export const WritingCanvas: React.FC<WritingCanvasProps> = ({
  character,
  romaji,
  strokeSteps,
  onSubmitDrawing,
  disabled = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [showGhostGuide, setShowGhostGuide] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Redraw canvas whenever strokes or guide changes
  const redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Draw grid guidelines
    ctx.strokeStyle = '#e7e5e4'; // light gray
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);

    // Horizontal center
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Vertical center
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // Diagonal guidelines
    ctx.strokeStyle = '#f5f5f4';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, height);
    ctx.moveTo(width, 0);
    ctx.lineTo(0, height);
    ctx.stroke();

    ctx.setLineDash([]); // Reset dash

    // Draw ghost guide if enabled
    if (showGhostGuide) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.18)'; // faint crimson
      ctx.font = `bold ${Math.round(width * 0.65)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(character, width / 2, height / 2 + 5);
    }

    // Draw completed strokes
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = Math.max(6, Math.round(width / 35));
    ctx.strokeStyle = '#1c1917'; // sumi ink dark

    // In dark mode we use lighter stroke
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      ctx.strokeStyle = '#f5f5f4';
    }

    const allStrokes = [...strokes, currentStroke];

    allStrokes.forEach((stroke) => {
      if (stroke.length < 1) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      ctx.stroke();
    });
  };

  useEffect(() => {
    redraw();
  }, [strokes, currentStroke, showGhostGuide]);

  // Adjust canvas pixel resolution for sharp retina rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    redraw();
  }, []);

  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (disabled || submitted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    const pt = getCanvasCoords(e);
    setCurrentStroke([pt]);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || disabled || submitted) return;
    const pt = getCanvasCoords(e);
    setCurrentStroke((prev) => [...prev, pt]);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
    setIsDrawing(false);
    if (currentStroke.length > 0) {
      setStrokes((prev) => [...prev, currentStroke]);
      setCurrentStroke([]);
    }
  };

  const handleClear = () => {
    setStrokes([]);
    setCurrentStroke([]);
    setSubmitted(false);
  };

  const handleUndo = () => {
    if (strokes.length > 0) {
      setStrokes((prev) => prev.slice(0, -1));
    }
  };

  const handleProceedToReview = () => {
    if (strokes.length === 0) return;
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      {/* Canvas Area */}
      <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] bg-white dark:bg-stone-900 border-2 border-stone-300 dark:border-stone-700 rounded-2xl shadow-sm overflow-hidden touch-none select-none">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="w-full h-full cursor-crosshair"
          style={{ touchAction: 'none' }}
        />

        {/* Empty state hint */}
        {strokes.length === 0 && !isDrawing && !submitted && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-stone-400 dark:text-stone-500 text-xs text-center p-4">
            <span className="font-medium">Draw character here</span>
            <span className="text-[11px] opacity-75">Touch, pen, or mouse</span>
          </div>
        )}
      </div>

      {/* Canvas Toolbar Controls */}
      <div className="flex items-center justify-between w-full max-w-[280px] sm:max-w-[320px] mt-3 px-1 text-xs">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleUndo}
            disabled={strokes.length === 0 || submitted}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 transition-colors"
            title="Undo last stroke"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Undo</span>
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={strokes.length === 0}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 transition-colors"
            title="Clear canvas"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowGhostGuide(!showGhostGuide)}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border transition-colors ${
            showGhostGuide
              ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50'
              : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
          title="Toggle trace guide"
        >
          {showGhostGuide ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showGhostGuide ? 'Hide Guide' : 'Trace Guide'}</span>
        </button>
      </div>

      {/* Submission & Self-Evaluation Step */}
      {!submitted ? (
        <button
          type="button"
          onClick={handleProceedToReview}
          disabled={strokes.length === 0}
          className="w-full max-w-[280px] sm:max-w-[320px] mt-4 py-2.5 rounded-xl font-semibold text-sm bg-red-600 hover:bg-red-700 text-white shadow-sm disabled:opacity-50 transition-all"
        >
          Submit Drawing & Compare
        </button>
      ) : (
        <div className="w-full max-w-[280px] sm:max-w-[320px] mt-4 p-3.5 bg-stone-100 dark:bg-stone-800/80 rounded-2xl border border-stone-200 dark:border-stone-700 text-center animate-fadeIn">
          <p className="text-xs font-semibold text-stone-700 dark:text-stone-200 mb-2">
            Compare your drawing with canonical shape:
          </p>

          <div className="flex items-center justify-center gap-6 my-2">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase text-stone-400 font-semibold mb-1">Your Drawing</span>
              <div className="w-14 h-14 bg-white dark:bg-stone-900 border rounded-xl flex items-center justify-center text-xs text-stone-400">
                {strokes.length} strokes
              </div>
            </div>

            <div className="text-stone-300 dark:text-stone-600 text-lg">vs</div>

            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase text-red-600 font-semibold mb-1">Target</span>
              <div className="w-14 h-14 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl flex items-center justify-center text-3xl font-bold text-red-600 dark:text-red-400">
                {character}
              </div>
            </div>
          </div>

          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 mb-3">
            Expected: {strokeSteps.length} stroke{strokeSteps.length === 1 ? '' : 's'} • Romaji: "{romaji}"
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onSubmitDrawing('poor')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 text-xs font-semibold transition-colors"
            >
              <X className="w-3.5 h-3.5 text-rose-500" />
              Needs Work
            </button>

            <button
              type="button"
              onClick={() => onSubmitDrawing('good')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              Accurate ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import { ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-stone-200/90 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70 backdrop-blur-xs py-6 px-4 sm:px-6 lg:px-8 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-red-600/10 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-xs">
            あ
          </div>
          <span className="font-extrabold text-stone-800 dark:text-stone-200">
            Japanese Mastery System
          </span>
          <span>•</span>
          <span>Hiragana (ひらがな)</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-stone-500 dark:text-stone-400 font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            100% Offline & Free
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            SM-2 Spaced Repetition
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            Reading & Handwriting Canvas
          </span>
        </div>
      </div>
    </footer>
  );
};

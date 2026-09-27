import React from 'react';
import { ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-stone-200 bg-stone-50 py-6 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-red-600/10 text-red-600 flex items-center justify-center font-bold text-xs">
            あ
          </div>
          <span className="font-semibold text-stone-700">
            Japanese Learning App
          </span>
          <span>•</span>
          <span>Hiragana Mastery</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-stone-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            100% Offline & Free
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Spaced Repetition
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            Reading & Writing
          </span>
        </div>
      </div>
    </footer>
  );
};

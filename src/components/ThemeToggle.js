// src/components/ThemeToggle.js
'use client';

import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ isDark, toggle }) {
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full hover:bg-slate-700/50 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun size={22} className="text-amber-300" />
      ) : (
        <Moon size={22} className="text-amber-300" />
      )}
    </button>
  );
}
"use client";

import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="w-10 h-10 rounded-xl bg-elevated border border-border flex items-center justify-center text-text-secondary hover:text-yellow hover:border-yellow/50 transition-all"
      aria-label={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

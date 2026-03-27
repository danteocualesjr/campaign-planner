"use client";

import { Sun, Moon } from "lucide-react";

interface Props { isDark: boolean; onToggle: () => void; }

export default function ThemeToggle({ isDark, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-primary hover:bg-card transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
    </button>
  );
}

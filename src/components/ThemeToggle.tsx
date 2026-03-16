"use client";

import { Sun, Moon } from "lucide-react";

interface Props { isDark: boolean; onToggle: () => void; }

export default function ThemeToggle({ isDark, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted hover:text-primary transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

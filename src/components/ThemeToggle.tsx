"use client";

import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="w-8 h-8 rounded-lg flex items-center justify-center text-text-subtle hover:text-text hover:bg-muted transition-colors"
      aria-label={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

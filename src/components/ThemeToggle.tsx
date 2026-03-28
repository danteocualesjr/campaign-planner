"use client";

import { Sun, Moon } from "lucide-react";

interface Props {
  isDark: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDark, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full hover:bg-sl200/50 transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-sl600" />
      ) : (
        <Moon className="w-5 h-5 text-sl600" />
      )}
    </button>
  );
}

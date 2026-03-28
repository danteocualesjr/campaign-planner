"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, Plus } from "lucide-react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const dark = stored ? stored === "dark" : true;
    setIsDark(dark);
    document.documentElement.classList.toggle("light", !dark);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("light", !next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 z-30 bg-bg-secondary border-b border-border-primary flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 rounded-xl bg-bg-tertiary flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-sm">🍋</span>
            </div>
            <span className="font-semibold text-text-primary">Lemon Co.</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          <Link href="/campaigns/new" className="btn btn-primary btn-sm">
            <Plus className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <main className="lg:pl-72 min-h-screen pt-16 lg:pt-0 bg-bg-primary">
        {children}
      </main>
    </>
  );
}

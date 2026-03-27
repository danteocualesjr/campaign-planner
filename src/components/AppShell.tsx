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

  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} isDark={isDark} onToggleTheme={toggleTheme} />
      
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 z-30 bg-base border-b border-border-subtle flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 -ml-1.5 rounded-md text-text-muted hover:text-text">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-lemon flex items-center justify-center text-xs">🍋</div>
            <span className="font-semibold text-[14px]">Lemon Co.</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          <Link href="/campaigns/new" className="w-8 h-8 rounded-lg btn-primary flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <main className="lg:pl-56 min-h-screen pt-14 lg:pt-0">
        {children}
      </main>
    </>
  );
}

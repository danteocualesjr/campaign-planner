"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const dark = stored ? stored === "dark" : true;
    setIsDark(dark);
    document.documentElement.classList.toggle("light", !dark);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      <header className={`lg:hidden fixed top-0 left-0 right-0 h-16 z-30 flex items-center justify-between px-4 transition-all ${
        scrolled 
          ? "bg-card/95 backdrop-blur-xl border-b border-border shadow-lg shadow-black/10" 
          : "bg-transparent"
      }`}>
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 rounded-xl bg-elevated border border-border text-text-secondary hover:text-text transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-bright via-yellow to-yellow-dim flex items-center justify-center shadow-lg shadow-yellow/20">
              <span className="text-sm font-bold text-black">L</span>
            </div>
            <span className="font-bold text-text">Lemon Co.</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          <Link href="/campaigns/new" className="h-10 px-4 btn-primary flex items-center gap-2 text-sm font-semibold">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New</span>
          </Link>
        </div>
      </header>

      <main className="lg:pl-64 min-h-screen pt-16 lg:pt-0 bg-bg">
        {children}
      </main>
    </>
  );
}

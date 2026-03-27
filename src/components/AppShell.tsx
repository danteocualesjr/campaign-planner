"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, Plus } from "lucide-react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} isDark={isDark} onToggleTheme={toggleTheme} />

      <header className={`lg:hidden fixed top-0 left-0 right-0 h-13 z-30 transition-all duration-200 ${
        scrolled ? "bg-bg/90 backdrop-blur-xl border-b border-border" : ""
      }`}>
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-2">
            <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-1 rounded-lg text-muted hover:text-primary" aria-label="Menu">
              <Menu className="w-5 h-5" />
            </button>
            <img src="/logo.png" alt="" width={28} height={28} className="rounded-full" />
            <span className="font-semibold text-primary text-[14px]">The Lemon Co.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <Link
              href="/campaigns/new"
              className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-[#09090B]"
              aria-label="New campaign"
            >
              <Plus className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      <main className="lg:ml-[240px] min-h-screen pt-13 lg:pt-0">
        {children}
      </main>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell, Moon, Sun } from "lucide-react";
import Link from "next/link";
import Sidebar from "./Sidebar";

const topTabs = [
  { label: "Analytics", href: "#" },
  { label: "Reports", href: "#" },
  { label: "Team", href: "#" },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const dark = stored === "dark";
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
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Top Nav Bar */}
      <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 z-40 bg-white/80 backdrop-blur-xl flex items-center justify-between px-6 lg:px-8 text-sm font-medium">
        {/* Left: Mobile menu + Search */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-full hover:bg-sl100 transition-colors"
          >
            <Menu className="w-5 h-5 text-sl600" />
          </button>
          <div className="relative w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sl400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              className="input pl-10 h-10 text-sm"
            />
          </div>
        </div>

        {/* Right: Tabs + Actions */}
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-6">
            {topTabs.map((tab, i) => (
              <a
                key={tab.label}
                href={tab.href}
                className={`transition-all ${
                  i === 0
                    ? "text-yellow-700 font-bold border-b-2 border-yellow-500 pb-1"
                    : "text-sl500 hover:text-sl900"
                }`}
              >
                {tab.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1 border-l border-sl200 pl-6">
            <button className="p-2 rounded-full hover:bg-sl100 transition-colors">
              <Bell className="w-5 h-5 text-sl600" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-sl100 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-sl600" />
              ) : (
                <Moon className="w-5 h-5 text-sl600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 pt-24 pb-12 px-6 lg:px-12 min-h-screen bg-surface">
        {children}
      </main>
    </>
  );
}

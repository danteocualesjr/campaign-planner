"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, Plus } from "lucide-react";
import Link from "next/link";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile header */}
      <header className={`lg:hidden fixed top-0 left-0 right-0 h-14 z-30 transition-all duration-200 ${
        scrolled ? "glass shadow-lg shadow-black/10" : "bg-transparent"
      }`}>
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="p-2 -ml-1 rounded-lg text-muted hover:text-primary hover:bg-card transition-colors"
              aria-label="Open menu"
              aria-expanded={sidebarOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5 ml-2">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-accent/30 blur-md" />
                <img src="/logo.png" alt="The Lemon Co." width={32} height={32} className="relative rounded-full ring-1 ring-white/10" />
              </div>
              <span className="font-semibold text-primary text-sm">The Lemon Co.</span>
            </div>
          </div>
          
          <Link 
            href="/campaigns/new"
            className="w-9 h-9 rounded-lg bg-gradient-to-r from-accent to-orange flex items-center justify-center text-bg shadow-lg shadow-accent/20"
            aria-label="Create new campaign"
          >
            <Plus className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <main className="lg:ml-[260px] min-h-screen pt-14 lg:pt-0">
        {children}
      </main>
    </>
  );
}

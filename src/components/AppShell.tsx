"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 z-30 glass">
        <div className="flex items-center h-full px-4">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-1 rounded-lg text-muted hover:text-primary hover:bg-card transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5 ml-2">
            <img src="/logo.png" alt="The Lemon Co." width={32} height={32} className="rounded-full" />
            <span className="font-semibold text-primary text-sm">The Lemon Co.</span>
          </div>
        </div>
      </header>

      <main className="lg:ml-[260px] min-h-screen pt-14 lg:pt-0">
        {children}
      </main>
    </>
  );
}

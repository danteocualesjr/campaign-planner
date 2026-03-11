"use client";

import { useState } from "react";
import { Menu, Citrus } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center px-4 z-30">
        <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-1 rounded-lg text-gray-500 hover:bg-gray-100">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 ml-2">
          <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
            <Citrus className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-navy-900 text-sm">The Lemon Co.</span>
        </div>
      </header>

      <main className="lg:ml-[260px] min-h-screen bg-background pt-14 lg:pt-0">
        {children}
      </main>
    </>
  );
}

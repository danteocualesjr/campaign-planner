"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Megaphone, Calendar, CreditCard, Plus, X, Zap } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { href: "/", label: "Overview", icon: LayoutGrid },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
];

interface Props { open: boolean; onClose: () => void; isDark: boolean; onToggleTheme: () => void; }

export default function Sidebar({ open, onClose, isDark, onToggleTheme }: Props) {
  const pathname = usePathname();

  return (
    <>
      {open && <div className="fixed inset-0 bg-bg/90 backdrop-blur-xl z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 w-64 z-50 flex flex-col bg-card border-r border-border transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* Logo */}
        <div className="h-16 px-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" onClick={onClose}>
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-bright via-yellow to-yellow-dim flex items-center justify-center shadow-lg shadow-yellow/20 group-hover:shadow-yellow/40 transition-shadow">
                <span className="text-lg font-bold text-black">L</span>
              </div>
              <div className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-green border-2 border-card" />
            </div>
            <div>
              <span className="font-bold text-text tracking-tight">Lemon Co.</span>
              <span className="block text-[10px] text-text-tertiary tracking-wide uppercase">Campaign Planner</span>
            </div>
          </Link>
          <button onClick={onClose} className="lg:hidden p-2 rounded-lg bg-elevated text-text-secondary hover:text-text transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* New Campaign button */}
        <div className="px-4 mb-4">
          <Link
            href="/campaigns/new"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full h-11 rounded-xl btn-primary text-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            New Campaign
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3">
          <span className="block px-3 mb-2 text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">Menu</span>
          <div className="space-y-1">
            {nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-yellow-bg text-yellow shadow-sm"
                      : "text-text-secondary hover:text-text hover:bg-elevated"
                  }`}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-yellow" />
                  )}
                  <item.icon className={`w-5 h-5 ${active ? "text-yellow" : ""}`} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          {/* Pro badge */}
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-purple-bg to-blue-bg mb-4">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple to-blue flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-text">Upgrade to Pro</p>
              <p className="text-[10px] text-text-tertiary">Unlock all features</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] text-text-tertiary font-medium">v1.0.0</span>
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          </div>
        </div>
      </aside>
    </>
  );
}

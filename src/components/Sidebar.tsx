"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Megaphone, CalendarDays, CreditCard, Plus, X, Sparkles, ChevronRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, description: "Overview & stats" },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone, description: "Manage all campaigns" },
  { href: "/calendar", label: "Calendar", icon: CalendarDays, description: "Schedule view" },
  { href: "/pricing", label: "Pricing", icon: CreditCard, description: "Plans & billing" },
];

interface SidebarProps { open: boolean; onClose: () => void; isDark: boolean; onToggleTheme: () => void; }

export default function Sidebar({ open, onClose, isDark, onToggleTheme }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden modal-backdrop" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside 
        className={`fixed left-0 top-0 bottom-0 w-[260px] z-50 flex flex-col transition-transform duration-300 ease-out lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Glass background */}
        <div className="absolute inset-0 glass" />
        <div className="absolute inset-0 bg-gradient-to-b from-accent-soft to-transparent opacity-20" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg/50 to-transparent" />
        
        <div className="relative flex flex-col h-full">
          {/* Logo */}
          <div className="px-5 pt-6 pb-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group" onClick={onClose}>
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-accent blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                <img src="/logo.png" alt="The Lemon Co." width={44} height={44} className="relative rounded-full ring-2 ring-white/10 group-hover:ring-accent/30 transition-all duration-300" />
              </div>
              <div>
                <span className="block text-[15px] font-bold text-primary leading-tight group-hover:text-accent transition-colors">The Lemon Co.</span>
                <span className="block text-[11px] text-muted font-medium">Campaign Planner</span>
              </div>
            </Link>
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-card lg:hidden transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 space-y-1">
            {navItems.map((item, i) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  onClick={onClose}
                  className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                    active ? "text-bg" : "text-secondary hover:text-primary"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {active && (
                    <>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent to-orange" />
                      <div className="absolute inset-0 rounded-xl bg-accent/30 blur-xl" />
                    </>
                  )}
                  {!active && <div className="absolute inset-0 rounded-xl bg-card opacity-0 group-hover:opacity-100 transition-opacity" />}
                  <div className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    active ? "bg-white/20" : "bg-card group-hover:bg-elevated"
                  }`}>
                    <item.icon className={`w-[18px] h-[18px] ${active ? "text-bg" : "text-muted group-hover:text-primary"}`} />
                  </div>
                  <div className="relative flex-1">
                    <span className="block">{item.label}</span>
                    {!active && (
                      <span className="block text-[10px] text-muted font-normal opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.description}
                      </span>
                    )}
                  </div>
                  {!active && (
                    <ChevronRight className="relative w-4 h-4 text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Action Card */}
          <div className="px-3 pb-4">
            <div className="relative overflow-hidden rounded-xl p-4 group/card hover:scale-[1.02] transition-transform duration-200">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/15 to-purple/10" />
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-full blur-2xl group-hover/card:bg-accent/30 transition-colors" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple/15 rounded-full blur-xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Quick Start</span>
                </div>
                <p className="text-[12px] text-secondary mb-3 leading-relaxed">Launch campaigns faster with templates</p>
                <Link 
                  href="/campaigns/new" 
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full h-9 rounded-lg btn-primary text-[12px] group/btn"
                >
                  <Plus className="w-3.5 h-3.5 group-hover/btn:rotate-90 transition-transform duration-200" /> 
                  New Campaign
                </Link>
              </div>
            </div>
            
            {/* Version + Theme toggle */}
            <div className="flex items-center justify-between mt-3 px-1">
              <p className="text-[10px] text-muted/50">v1.0.0</p>
              <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

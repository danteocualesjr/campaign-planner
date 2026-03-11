"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Megaphone, CalendarDays, Plus, X, Sparkles } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
];

interface SidebarProps { open: boolean; onClose: () => void; }

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed left-0 top-0 bottom-0 w-[260px] z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Glass background */}
        <div className="absolute inset-0 glass" />
        <div className="absolute inset-0 bg-gradient-to-b from-accent-soft to-transparent opacity-30" />
        
        <div className="relative flex flex-col h-full">
          {/* Logo */}
          <div className="px-5 pt-6 pb-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group" onClick={onClose}>
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-accent blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                <img src="/logo.png" alt="The Lemon Co." width={44} height={44} className="relative rounded-full" />
              </div>
              <div>
                <span className="block text-[15px] font-bold text-primary leading-tight">The Lemon Co.</span>
                <span className="block text-[11px] text-muted font-medium">Campaign Planner</span>
              </div>
            </Link>
            <button onClick={onClose} className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-card lg:hidden transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 space-y-1">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} onClick={onClose}
                  className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                    active ? "text-bg" : "text-secondary hover:text-primary"
                  }`}>
                  {active && (
                    <>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent to-orange opacity-90" />
                      <div className="absolute inset-0 rounded-xl bg-accent/30 blur-xl" />
                    </>
                  )}
                  {!active && <div className="absolute inset-0 rounded-xl bg-card opacity-0 group-hover:opacity-100 transition-opacity" />}
                  <item.icon className={`relative w-[18px] h-[18px] ${active ? "" : "text-muted group-hover:text-secondary"}`} />
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Action Card */}
          <div className="px-3 pb-4">
            <div className="relative overflow-hidden rounded-xl p-4">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-purple/10" />
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent/20 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-[11px] font-semibold text-accent uppercase tracking-wider">Quick Start</span>
                </div>
                <p className="text-[12px] text-secondary mb-3 leading-relaxed">Create campaigns from templates</p>
                <Link href="/campaigns/new" onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full h-9 rounded-lg btn-primary text-[12px]">
                  <Plus className="w-3.5 h-3.5" /> New Campaign
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

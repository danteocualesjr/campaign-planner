"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Megaphone, CalendarDays, CreditCard, Plus, X, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
];

interface SidebarProps { open: boolean; onClose: () => void; isDark: boolean; onToggleTheme: () => void; }

export default function Sidebar({ open, onClose, isDark, onToggleTheme }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden modal-backdrop" onClick={onClose} />
      )}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-[240px] z-50 flex flex-col transition-transform duration-300 ease-out lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        role="navigation"
      >
        <div className="absolute inset-0 bg-bg border-r border-border" />

        <div className="relative flex flex-col h-full">
          {/* Logo */}
          <div className="px-5 pt-5 pb-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group" onClick={onClose}>
              <img
                src="/logo.png"
                alt="The Lemon Co."
                width={36}
                height={36}
                className="rounded-full ring-1 ring-border group-hover:ring-accent/40 transition-all"
              />
              <div className="leading-tight">
                <span className="block text-[14px] font-semibold text-primary">The Lemon Co.</span>
                <span className="block text-[10px] text-muted font-medium tracking-wide">CAMPAIGN PLANNER</span>
              </div>
            </Link>
            <button onClick={onClose} className="p-1.5 rounded-lg text-muted hover:text-primary lg:hidden" aria-label="Close">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 space-y-0.5">
            <p className="px-3 mb-2 text-[10px] font-semibold text-muted uppercase tracking-widest">Menu</p>
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`group relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                    active
                      ? "bg-accent text-[#09090B]"
                      : "text-secondary hover:text-primary hover:bg-card"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <item.icon className={`w-4 h-4 ${active ? "" : "text-muted group-hover:text-secondary"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom area */}
          <div className="px-3 pb-4 space-y-3">
            {/* Quick action */}
            <div className="rounded-xl bg-elevated/80 p-3.5">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Quick Start</span>
              </div>
              <p className="text-[11px] text-muted mb-2.5 leading-relaxed">Create from templates</p>
              <Link
                href="/campaigns/new"
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 w-full h-8 rounded-lg btn-primary text-[11px]"
              >
                <Plus className="w-3.5 h-3.5" /> New Campaign
              </Link>
            </div>

            <div className="flex items-center justify-between px-1">
              <p className="text-[10px] text-muted/50">v1.0.0</p>
              <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

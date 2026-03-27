"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Megaphone, Calendar, CreditCard, Plus, X } from "lucide-react";
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
      {open && <div className="fixed inset-0 bg-base/80 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 w-56 z-50 flex flex-col bg-base border-r border-border-subtle transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* Header */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-border-subtle">
          <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
            <div className="w-7 h-7 rounded-lg bg-lemon flex items-center justify-center">
              <span className="text-sm font-bold text-base">🍋</span>
            </div>
            <span className="font-semibold text-[14px] text-text">Lemon Co.</span>
          </Link>
          <button onClick={onClose} className="lg:hidden p-1 rounded-md text-text-subtle hover:text-text">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                  active
                    ? "bg-lemon-muted text-lemon"
                    : "text-text-muted hover:text-text hover:bg-muted"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border-subtle">
          <Link
            href="/campaigns/new"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full h-9 rounded-lg btn-primary text-[13px] font-semibold mb-3"
          >
            <Plus className="w-4 h-4" />
            New Campaign
          </Link>
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] text-text-subtle">v1.0</span>
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          </div>
        </div>
      </aside>
    </>
  );
}

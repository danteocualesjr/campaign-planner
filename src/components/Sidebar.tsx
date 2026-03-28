"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Megaphone, Calendar, CreditCard, Plus, X, Settings } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { href: "/", label: "Overview", icon: LayoutGrid },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
];

interface Props {
  open: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Sidebar({ open, onClose, isDark, onToggleTheme }: Props) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-72 z-50 flex flex-col bg-bg-secondary border-r border-border-primary transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-border-primary">
          <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <span className="text-xl">🍋</span>
            </div>
            <div>
              <h1 className="font-semibold text-text-primary tracking-tight">Lemon Co.</h1>
              <p className="text-xs text-text-muted">Campaign Planner</p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden w-9 h-9 rounded-lg bg-bg-tertiary flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action */}
        <div className="p-4">
          <Link
            href="/campaigns/new"
            onClick={onClose}
            className="btn btn-primary btn-lg w-full"
          >
            <Plus className="w-5 h-5" />
            New Campaign
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2">
          <p className="overline px-3 mb-3">Menu</p>
          <ul className="space-y-1">
            {nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                      active
                        ? "bg-accent text-black font-medium"
                        : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border-primary">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center">
                <Settings className="w-4 h-4 text-text-muted" />
              </div>
              <span className="text-sm text-text-muted">v1.0</span>
            </div>
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          </div>
        </div>
      </aside>
    </>
  );
}

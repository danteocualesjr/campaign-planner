"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  CalendarDays,
  CreditCard,
  Plus,
  X,
  Settings,
  HelpCircle,
} from "lucide-react";

const nav = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
];

const footerNav = [
  { href: "#", label: "Settings", icon: Settings },
  { href: "#", label: "Support", icon: HelpCircle },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: Props) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-64 z-50 flex flex-col p-6 justify-between bg-sl100 overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8">
          {/* Brand */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
                <span className="text-on-primary-container text-sm font-bold">🍋</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-sl900">
                Lemon Co.
              </span>
              <button
                onClick={onClose}
                className="lg:hidden ml-auto p-1 rounded-lg text-sl400 hover:text-sl900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-sl400 pl-1">
              Marketing Editorial
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/campaigns/new"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 btn-cta py-3 px-4 rounded-xl text-sm"
          >
            <Plus className="w-5 h-5" />
            New Campaign
          </Link>

          {/* Main Nav */}
          <nav className="flex flex-col gap-1">
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-95 ${
                    active
                      ? "bg-yellow-400/20 text-yellow-800"
                      : "text-sl500 hover:text-sl900 hover:bg-sl200/50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-1 pt-6 border-t border-sl200">
          {footerNav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-sl500 hover:text-sl900 hover:bg-sl200/50 rounded-full transition-all active:scale-95"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </a>
          ))}

          {/* User */}
          <div className="mt-4 px-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sl200 flex items-center justify-center text-xs font-bold text-sl600">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-sl900">Alex Rivera</span>
              <span className="text-[10px] text-sl500 uppercase">Pro Plan</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  CalendarDays,
  Plus,
  Citrus,
  X,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-[260px] bg-navy-900 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="px-5 pt-6 pb-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center">
              <Citrus className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="block text-[15px] font-bold text-white leading-tight">The Lemon Co.</span>
              <span className="block text-[11px] text-navy-400 font-medium">Campaign Planner</span>
            </div>
          </Link>
          <button onClick={onClose} className="p-1 rounded-lg text-navy-500 hover:text-navy-300 lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 mt-2 space-y-1">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-navy-400 hover:text-navy-200 hover:bg-white/5"
                }`}
              >
                <item.icon className={`w-[18px] h-[18px] ${active ? "text-brand-400" : ""}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="px-3 pb-5">
          <Link
            href="/campaigns/new"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-[13px] font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Campaign
          </Link>
        </div>
      </aside>
    </>
  );
}

"use client";

import { useMemo } from "react";
import Link from "next/link";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, isWithinInterval, parseISO } from "date-fns";
import { Campaign } from "@/lib/types";
import { CAMPAIGN_TYPE_COLORS, CAMPAIGN_TYPE_LABELS } from "@/lib/constants";

interface CalendarGridProps { currentDate: Date; campaigns: Campaign[]; onDayClick: (d: Date) => void; }
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function CalendarGrid({ currentDate, campaigns, onDayClick }: CalendarGridProps) {
  const days = useMemo(() => {
    const s = startOfWeek(startOfMonth(currentDate));
    const e = endOfWeek(endOfMonth(currentDate));
    return eachDayOfInterval({ start: s, end: e });
  }, [currentDate]);

  const today = new Date();
  const forDay = (d: Date) => campaigns.filter((c) => { try { return isWithinInterval(d, { start: parseISO(c.startDate), end: parseISO(c.endDate) }); } catch { return false; } });

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="grid grid-cols-7 border-b border-border">
        {DAYS.map((d) => (
          <div key={d} className="py-3 text-center text-[11px] font-semibold text-muted uppercase tracking-wider">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, i) => {
          const inM = isSameMonth(day, currentDate);
          const isT = isSameDay(day, today);
          const dc = forDay(day);
          return (
            <div key={i} onClick={() => onDayClick(day)}
              className={`relative min-h-[110px] p-2 border-b border-r border-border cursor-pointer transition-all hover:bg-card-hover ${!inM ? "opacity-40" : ""}`}>
              {isT && <div className="absolute inset-1 rounded-xl bg-accent/5 pointer-events-none" />}
              <div className="relative mb-1.5">
                <span className={`text-[12px] font-medium inline-flex items-center justify-center ${
                  isT ? "w-7 h-7 rounded-full bg-gradient-to-br from-accent to-orange text-bg font-bold" : "text-secondary px-1"
                }`}>{format(day, "d")}</span>
              </div>
              <div className="relative space-y-0.5">
                {dc.slice(0, 3).map((c) => {
                  const tc = CAMPAIGN_TYPE_COLORS[c.type];
                  return (
                    <Link key={c.id} href={`/campaigns/${c.id}`} onClick={(e) => e.stopPropagation()}
                      className={`block text-[10px] px-1.5 py-0.5 rounded-md truncate font-medium transition-all hover:scale-[1.02] ${tc.bg} text-bg`}
                      title={`${c.name} (${CAMPAIGN_TYPE_LABELS[c.type]})`}>{c.name}</Link>
                  );
                })}
                {dc.length > 3 && <span className="text-[10px] text-muted pl-1">+{dc.length - 3} more</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

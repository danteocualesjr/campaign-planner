"use client";

import { useMemo } from "react";
import Link from "next/link";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, isWithinInterval, parseISO, isWeekend } from "date-fns";
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
  const forDay = (d: Date) => campaigns.filter((c) => {
    try { return isWithinInterval(d, { start: parseISO(c.startDate), end: parseISO(c.endDate) }); }
    catch { return false; }
  });

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="grid grid-cols-7 border-b border-border">
        {DAYS.map((d, i) => (
          <div key={d} className={`py-2.5 text-center text-[10px] font-semibold uppercase tracking-wider ${
            i === 0 || i === 6 ? "text-muted/50" : "text-muted"
          }`}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, i) => {
          const inM = isSameMonth(day, currentDate);
          const isT = isSameDay(day, today);
          const dc = forDay(day);
          const isLast = i >= days.length - 7;
          const isLastCol = (i + 1) % 7 === 0;

          return (
            <div
              key={i}
              onClick={() => onDayClick(day)}
              className={`relative min-h-[96px] p-1.5 cursor-pointer transition-colors hover:bg-card-hover ${
                !isLast ? "border-b" : ""
              } ${!isLastCol ? "border-r" : ""} border-border/50 ${
                !inM ? "opacity-25" : ""
              }`}
            >
              {isT && <div className="absolute inset-1 rounded-lg bg-accent/[0.06] pointer-events-none" />}
              <div className="relative mb-1">
                <span className={`text-[11px] font-medium inline-flex items-center justify-center ${
                  isT
                    ? "w-6 h-6 rounded-full bg-accent text-[#09090B] font-bold text-[10px]"
                    : "text-secondary px-0.5"
                }`}>{format(day, "d")}</span>
              </div>
              <div className="relative space-y-0.5">
                {dc.slice(0, 3).map((c) => {
                  const tc = CAMPAIGN_TYPE_COLORS[c.type];
                  return (
                    <Link key={c.id} href={`/campaigns/${c.id}`} onClick={(e) => e.stopPropagation()}
                      className={`block text-[9px] px-1 py-0.5 rounded truncate font-medium ${tc.bg} text-white hover:opacity-80 transition-opacity`}
                      title={`${c.name} (${CAMPAIGN_TYPE_LABELS[c.type]})`}>{c.name}</Link>
                  );
                })}
                {dc.length > 3 && <span className="text-[9px] text-accent font-medium pl-0.5">+{dc.length - 3}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

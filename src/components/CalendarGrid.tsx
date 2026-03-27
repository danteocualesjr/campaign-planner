"use client";

import { useMemo } from "react";
import Link from "next/link";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, isWithinInterval, parseISO, isWeekend } from "date-fns";
import { Campaign } from "@/lib/types";
import { CAMPAIGN_TYPE_COLORS, CAMPAIGN_TYPE_LABELS } from "@/lib/constants";

interface Props { currentDate: Date; campaigns: Campaign[]; onDayClick: (d: Date) => void; }
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarGrid({ currentDate, campaigns, onDayClick }: Props) {
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
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-7 border-b border-border-subtle">
        {DAYS.map((d, i) => (
          <div key={d} className={`py-3 text-center text-[11px] font-semibold uppercase tracking-wide ${
            i === 0 || i === 6 ? "text-text-subtle" : "text-text-muted"
          }`}>{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7">
        {days.map((day, i) => {
          const inMonth = isSameMonth(day, currentDate);
          const isToday = isSameDay(day, today);
          const dc = forDay(day);
          const weekend = isWeekend(day);

          return (
            <div
              key={i}
              onClick={() => onDayClick(day)}
              className={`relative min-h-[100px] p-2 border-b border-r border-border-subtle cursor-pointer transition-colors hover:bg-muted ${
                !inMonth ? "opacity-30" : ""
              } ${weekend && inMonth ? "bg-subtle/50" : ""}`}
            >
              {isToday && <div className="absolute inset-1 rounded-lg bg-lemon/[0.06] pointer-events-none ring-1 ring-lemon/20" />}
              
              <div className="relative mb-1.5">
                <span className={`text-[12px] font-medium inline-flex items-center justify-center ${
                  isToday
                    ? "w-6 h-6 rounded-full bg-lemon text-base font-bold"
                    : "text-text-muted"
                }`}>{format(day, "d")}</span>
              </div>

              <div className="space-y-0.5">
                {dc.slice(0, 3).map((c) => {
                  const tc = CAMPAIGN_TYPE_COLORS[c.type];
                  return (
                    <Link
                      key={c.id}
                      href={`/campaigns/${c.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className={`block text-[10px] px-1.5 py-0.5 rounded truncate font-medium ${tc.bg} text-white/90 hover:text-white transition-colors`}
                      title={`${c.name} (${CAMPAIGN_TYPE_LABELS[c.type]})`}
                    >{c.name}</Link>
                  );
                })}
                {dc.length > 3 && (
                  <span className="text-[10px] text-lemon font-medium pl-1">+{dc.length - 3}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useMemo } from "react";
import Link from "next/link";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, isWithinInterval, parseISO, isWeekend } from "date-fns";
import { Campaign } from "@/lib/types";
import { CAMPAIGN_TYPE_COLORS, CAMPAIGN_TYPE_LABELS } from "@/lib/constants";
import { Plus } from "lucide-react";

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
    <div className="glass rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-7 bg-elevated border-b border-border">
        {DAYS.map((d, i) => (
          <div key={d} className={`py-4 text-center text-xs font-semibold uppercase tracking-wider ${
            i === 0 || i === 6 ? "text-text-tertiary" : "text-text-secondary"
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
          const isFirst = i % 7 === 0;
          const isLast = i % 7 === 6;

          return (
            <div
              key={i}
              onClick={() => onDayClick(day)}
              className={`group relative min-h-[110px] lg:min-h-[120px] p-2.5 border-b border-r border-border cursor-pointer transition-all hover:bg-hover ${
                !inMonth ? "opacity-25" : ""
              } ${weekend && inMonth ? "bg-elevated/50" : ""} ${isLast ? "border-r-0" : ""}`}
            >
              {/* Today highlight */}
              {isToday && (
                <>
                  <div className="absolute inset-1 rounded-xl bg-yellow/5 pointer-events-none" />
                  <div className="absolute inset-1 rounded-xl ring-1 ring-yellow/30 pointer-events-none" />
                </>
              )}
              
              {/* Day number */}
              <div className="relative flex items-center justify-between mb-2">
                <span className={`text-sm font-medium inline-flex items-center justify-center ${
                  isToday
                    ? "w-7 h-7 rounded-lg bg-gradient-to-br from-yellow-bright to-yellow text-black font-bold shadow-lg shadow-yellow/30"
                    : "text-text-secondary"
                }`}>{format(day, "d")}</span>
                
                {/* Add button on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-6 h-6 rounded-lg bg-yellow-bg border border-yellow/20 flex items-center justify-center text-yellow">
                    <Plus className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Campaign chips */}
              <div className="space-y-1">
                {dc.slice(0, 3).map((c) => {
                  const tc = CAMPAIGN_TYPE_COLORS[c.type];
                  return (
                    <Link
                      key={c.id}
                      href={`/campaigns/${c.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className={`block text-[10px] px-2 py-1 rounded-md truncate font-medium ${tc.bg} text-white/95 hover:opacity-80 transition-opacity shadow-sm`}
                      title={`${c.name} (${CAMPAIGN_TYPE_LABELS[c.type]})`}
                    >{c.name}</Link>
                  );
                })}
                {dc.length > 3 && (
                  <span className="block text-[10px] text-yellow font-semibold pl-1">+{dc.length - 3} more</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

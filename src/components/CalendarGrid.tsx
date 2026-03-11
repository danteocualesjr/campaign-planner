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
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
        {DAYS.map((d) => <div key={d} className="py-2.5 text-center text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{d}</div>)}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, i) => {
          const inM = isSameMonth(day, currentDate);
          const isT = isSameDay(day, today);
          const dc = forDay(day);
          return (
            <div key={i} onClick={() => onDayClick(day)}
              className={`min-h-[100px] p-1.5 border-b border-r border-gray-100 cursor-pointer transition-colors hover:bg-brand-50/40 ${!inM ? "bg-gray-50/40" : ""}`}>
              <div className="mb-1">
                <span className={`text-[12px] font-medium inline-flex items-center justify-center ${
                  isT ? "w-6 h-6 rounded-full bg-brand-500 text-white" : inM ? "text-navy-800 px-1" : "text-gray-300 px-1"
                }`}>{format(day, "d")}</span>
              </div>
              <div className="space-y-0.5">
                {dc.slice(0, 3).map((c) => (
                  <Link key={c.id} href={`/campaigns/${c.id}`} onClick={(e) => e.stopPropagation()}
                    className={`block text-[10px] text-white px-1 py-px rounded truncate font-medium ${CAMPAIGN_TYPE_COLORS[c.type]} hover:opacity-80 transition-opacity`}
                    title={`${c.name} (${CAMPAIGN_TYPE_LABELS[c.type]})`}>{c.name}</Link>
                ))}
                {dc.length > 3 && <span className="text-[10px] text-gray-400 pl-1">+{dc.length - 3}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

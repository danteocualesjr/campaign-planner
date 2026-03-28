"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  parseISO,
  isWeekend,
} from "date-fns";
import { Plus } from "lucide-react";
import { Campaign } from "@/lib/types";
import { CAMPAIGN_TYPE_COLORS, CAMPAIGN_TYPE_LABELS } from "@/lib/constants";

interface Props {
  currentDate: Date;
  campaigns: Campaign[];
  onDayClick: (d: Date) => void;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarGrid({ currentDate, campaigns, onDayClick }: Props) {
  const days = useMemo(() => {
    const s = startOfWeek(startOfMonth(currentDate));
    const e = endOfWeek(endOfMonth(currentDate));
    return eachDayOfInterval({ start: s, end: e });
  }, [currentDate]);

  const today = new Date();

  const forDay = (d: Date) =>
    campaigns.filter((c) => {
      try {
        return isWithinInterval(d, { start: parseISO(c.startDate), end: parseISO(c.endDate) });
      } catch {
        return false;
      }
    });

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-7 bg-bg-tertiary border-b border-border-primary">
        {DAYS.map((d, i) => (
          <div
            key={d}
            className={`py-3 text-center overline ${
              i === 0 || i === 6 ? "text-text-muted" : "text-text-secondary"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
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
              className={`group relative min-h-[120px] p-2 border-b border-r border-border-primary cursor-pointer transition-colors hover:bg-bg-tertiary ${
                !inMonth ? "opacity-30" : ""
              } ${weekend && inMonth ? "bg-bg-secondary/50" : ""} ${
                i % 7 === 6 ? "border-r-0" : ""
              }`}
            >
              {/* Today highlight */}
              {isToday && (
                <div className="absolute inset-1 rounded-lg ring-2 ring-accent/30 bg-accent/5 pointer-events-none" />
              )}

              {/* Day number */}
              <div className="relative flex items-center justify-between mb-2">
                <span
                  className={`w-7 h-7 flex items-center justify-center text-sm font-medium rounded-lg ${
                    isToday
                      ? "bg-accent text-black font-bold"
                      : "text-text-secondary"
                  }`}
                >
                  {format(day, "d")}
                </span>

                {/* Add button on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-accent">
                    <Plus className="w-3.5 h-3.5" />
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
                      className={`block text-xs px-2 py-1 rounded truncate font-medium ${tc.bg} text-white hover:opacity-80 transition-opacity`}
                      title={`${c.name} (${CAMPAIGN_TYPE_LABELS[c.type]})`}
                    >
                      {c.name}
                    </Link>
                  );
                })}
                {dc.length > 3 && (
                  <span className="block text-xs text-accent font-medium pl-1">
                    +{dc.length - 3} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

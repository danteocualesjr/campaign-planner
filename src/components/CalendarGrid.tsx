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
import { CAMPAIGN_TYPE_LABELS } from "@/lib/constants";

interface Props {
  currentDate: Date;
  campaigns: Campaign[];
  onDayClick: (d: Date) => void;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TYPE_BG: Record<string, string> = {
  social_media: "bg-blue-500",
  email: "bg-purple-500",
  in_store_promo: "bg-yellow-500",
  franchise_event: "bg-green-500",
  product_launch: "bg-orange-500",
};

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
        return isWithinInterval(d, {
          start: parseISO(c.startDate),
          end: parseISO(c.endDate),
        });
      } catch {
        return false;
      }
    });

  return (
    <div className="card-surface overflow-hidden">
      {/* Day names */}
      <div className="grid grid-cols-7 bg-surface-container">
        {DAYS.map((d, i) => (
          <div
            key={d}
            className={`py-3 text-center text-[11px] font-bold uppercase tracking-widest ${
              i === 0 || i === 6 ? "text-sl400" : "text-on-surface-variant"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
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
              className={`group relative min-h-[120px] p-2.5 border-b border-r border-outline-variant/15 cursor-pointer transition-colors hover:bg-surface-low ${
                !inMonth ? "opacity-25" : ""
              } ${weekend && inMonth ? "bg-surface-container/30" : ""} ${
                i % 7 === 6 ? "border-r-0" : ""
              }`}
            >
              {/* Today highlight */}
              {isToday && (
                <div className="absolute inset-1 rounded-xl bg-primary-container/10 ring-2 ring-primary-container/40 pointer-events-none" />
              )}

              {/* Day number */}
              <div className="relative flex items-center justify-between mb-2">
                <span
                  className={`w-7 h-7 flex items-center justify-center text-sm font-semibold rounded-full ${
                    isToday
                      ? "bg-primary-container text-on-primary-container font-bold"
                      : "text-on-surface-variant"
                  }`}
                >
                  {format(day, "d")}
                </span>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-5 h-5 rounded-full bg-primary-container/20 flex items-center justify-center text-md-primary">
                    <Plus className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Campaigns */}
              <div className="space-y-1">
                {dc.slice(0, 3).map((c) => (
                  <Link
                    key={c.id}
                    href={`/campaigns/${c.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className={`block text-[10px] px-2 py-1 rounded-lg truncate font-medium text-white ${
                      TYPE_BG[c.type] || "bg-sl500"
                    } hover:opacity-80 transition-opacity`}
                    title={`${c.name} (${CAMPAIGN_TYPE_LABELS[c.type]})`}
                  >
                    {c.name}
                  </Link>
                ))}
                {dc.length > 3 && (
                  <span className="block text-[10px] text-md-primary font-bold pl-1">
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

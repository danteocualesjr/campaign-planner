"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, isWithinInterval, parseISO, isWeekend } from "date-fns";
import { X, ExternalLink } from "lucide-react";
import { Campaign } from "@/lib/types";
import { CAMPAIGN_TYPE_COLORS, CAMPAIGN_TYPE_LABELS } from "@/lib/constants";

interface CalendarGridProps { currentDate: Date; campaigns: Campaign[]; onDayClick: (d: Date) => void; }
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function CalendarGrid({ currentDate, campaigns, onDayClick }: CalendarGridProps) {
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);
  
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
    <div className="glass rounded-2xl overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 bg-elevated/50">
        {DAYS.map((d, i) => (
          <div 
            key={d} 
            className={`py-3 text-center text-[11px] font-semibold uppercase tracking-wider border-b border-border ${
              i === 0 || i === 6 ? "text-muted/60" : "text-muted"
            }`}
          >
            {d}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {days.map((day, i) => {
          const inM = isSameMonth(day, currentDate);
          const isT = isSameDay(day, today);
          const weekend = isWeekend(day);
          const dc = forDay(day);
          const isHovered = hoveredDay && isSameDay(hoveredDay, day);
          const showTooltip = isHovered && dc.length > 3;
          const isLastRow = i >= days.length - 7;
          const isLastCol = (i + 1) % 7 === 0;
          
          return (
            <div 
              key={i} 
              onClick={() => onDayClick(day)}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
              className={`
                relative min-h-[100px] sm:min-h-[110px] p-1.5 sm:p-2 cursor-pointer transition-all duration-200
                ${!isLastRow ? "border-b" : ""} ${!isLastCol ? "border-r" : ""} border-border/50
                ${!inM ? "opacity-30 bg-bg/30" : ""}
                ${weekend && inM ? "bg-card/30" : ""}
                hover:bg-card-hover hover:z-10
              `}
            >
              {/* Today highlight */}
              {isT && (
                <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 pointer-events-none ring-1 ring-accent/20" />
              )}
              
              {/* Day number */}
              <div className="relative mb-1.5 flex items-center justify-between">
                <span className={`text-[12px] font-medium inline-flex items-center justify-center transition-all ${
                  isT 
                    ? "w-7 h-7 rounded-full bg-gradient-to-br from-accent to-orange text-bg font-bold shadow-lg shadow-accent/25" 
                    : weekend 
                      ? "text-muted px-1" 
                      : "text-secondary px-1"
                }`}>
                  {format(day, "d")}
                </span>
                {dc.length > 0 && (
                  <span className="text-[9px] font-semibold text-accent/70 pr-1 hidden sm:block">
                    {dc.length}
                  </span>
                )}
              </div>
              
              {/* Campaign chips */}
              <div className="relative space-y-0.5">
                {dc.slice(0, 3).map((c) => {
                  const tc = CAMPAIGN_TYPE_COLORS[c.type];
                  return (
                    <Link 
                      key={c.id} 
                      href={`/campaigns/${c.id}`} 
                      onClick={(e) => e.stopPropagation()}
                      className={`
                        group/chip block text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md truncate font-medium 
                        transition-all duration-200 hover:scale-[1.02] hover:shadow-md
                        ${tc.bg} text-bg
                      `}
                      title={`${c.name} (${CAMPAIGN_TYPE_LABELS[c.type]})`}
                    >
                      {c.name}
                    </Link>
                  );
                })}
                {dc.length > 3 && (
                  <span className="text-[9px] sm:text-[10px] text-accent font-medium pl-1 cursor-pointer hover:underline">
                    +{dc.length - 3} more
                  </span>
                )}
              </div>
              
              {/* Hover tooltip for overflow campaigns */}
              {showTooltip && (
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-50 w-48 glass rounded-xl p-3 shadow-xl anim-scale"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-primary">
                      {format(day, "MMM d")} · {dc.length} campaigns
                    </span>
                  </div>
                  <div className="space-y-1 max-h-32 overflow-y-auto scroll-subtle">
                    {dc.map((c) => {
                      const tc = CAMPAIGN_TYPE_COLORS[c.type];
                      return (
                        <Link 
                          key={c.id} 
                          href={`/campaigns/${c.id}`}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-card transition-colors group/item"
                        >
                          <div className={`w-2 h-2 rounded-full ${tc.bg}`} />
                          <span className="text-[11px] text-secondary group-hover/item:text-primary truncate flex-1">
                            {c.name}
                          </span>
                          <ExternalLink className="w-3 h-3 text-muted opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

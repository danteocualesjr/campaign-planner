"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addMonths, subMonths, format } from "date-fns";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { Campaign } from "@/lib/types";
import { getCampaigns } from "@/lib/storage";
import { CAMPAIGN_TYPE_COLORS, CAMPAIGN_TYPE_LABELS } from "@/lib/constants";

import CalendarGrid from "@/components/CalendarGrid";

export default function CalendarPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [cur, setCur] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setCampaigns(getCampaigns()); setMounted(true); }, []);

  if (!mounted) return (
    <div className="p-6 lg:p-8">
      <div className="animate-pulse">
        <div className="h-10 bg-card rounded-xl w-64 mb-6" />
        <div className="h-[550px] bg-card rounded-2xl" />
      </div>
    </div>
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1100px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 anim-fade">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h1 className="text-[24px] font-bold text-primary tracking-tight">Calendar</h1>
            <p className="text-[13px] text-muted">Visual overview of campaign schedules</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={() => setCur(subMonths(cur, 1))} 
            className="w-9 h-9 rounded-xl glass flex items-center justify-center text-muted hover:text-primary transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="min-w-[160px] text-center text-[15px] font-semibold text-primary">{format(cur, "MMMM yyyy")}</span>
          <button onClick={() => setCur(addMonths(cur, 1))} 
            className="w-9 h-9 rounded-xl glass flex items-center justify-center text-muted hover:text-primary transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button onClick={() => setCur(new Date())} 
            className="ml-1 h-9 px-4 rounded-xl btn-ghost text-[12px] font-medium">Today</button>
        </div>
      </div>

      {/* Calendar */}
      <div className="anim-fade delay-1">
        <CalendarGrid currentDate={cur} campaigns={campaigns} onDayClick={(d) => router.push(`/campaigns/new?date=${format(d, "yyyy-MM-dd")}`)} />
      </div>

      {/* Legend */}
      <div className="mt-5 flex items-center gap-5 text-[11px] text-muted anim-fade delay-2">
        <span className="font-semibold text-secondary">Legend:</span>
        {Object.entries(CAMPAIGN_TYPE_LABELS).slice(0, 5).map(([k, v]) => {
          const c = CAMPAIGN_TYPE_COLORS[k as keyof typeof CAMPAIGN_TYPE_COLORS];
          return (
            <span key={k} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-sm ${c.bg}`} />
              {v}
            </span>
          );
        })}
      </div>
    </div>
  );
}


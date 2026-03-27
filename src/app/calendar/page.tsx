"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addMonths, subMonths, format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      <div className="h-10 w-48 bg-subtle rounded-lg animate-pulse mb-6" />
      <div className="h-[500px] bg-subtle rounded-xl animate-pulse" />
    </div>
  );

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 animate-in">
        <div>
          <h1 className="text-xl font-bold text-text">Calendar</h1>
          <p className="text-[13px] text-text-muted mt-0.5">Visual schedule overview</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={() => setCur(subMonths(cur, 1))} className="w-9 h-9 btn btn-secondary">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="min-w-[140px] text-center text-[14px] font-semibold text-text">
            {format(cur, "MMMM yyyy")}
          </span>
          <button onClick={() => setCur(addMonths(cur, 1))} className="w-9 h-9 btn btn-secondary">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button onClick={() => setCur(new Date())} className="h-9 px-3 btn btn-ghost text-[13px]">
            Today
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="animate-in delay-1">
        <CalendarGrid 
          currentDate={cur} 
          campaigns={campaigns} 
          onDayClick={(d) => router.push(`/campaigns/new?date=${format(d, "yyyy-MM-dd")}`)} 
        />
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-text-muted animate-in delay-2">
        {Object.entries(CAMPAIGN_TYPE_LABELS).map(([k, v]) => {
          const c = CAMPAIGN_TYPE_COLORS[k as keyof typeof CAMPAIGN_TYPE_COLORS];
          return (
            <span key={k} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded ${c.bg}`} />
              {v}
            </span>
          );
        })}
      </div>
    </div>
  );
}

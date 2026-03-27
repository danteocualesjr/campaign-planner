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
      <div className="h-9 bg-card rounded-lg w-48 mb-5 animate-pulse" />
      <div className="h-[500px] bg-card rounded-xl animate-pulse" />
    </div>
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1060px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 anim-fade">
        <div>
          <h1 className="text-[22px] font-bold text-primary tracking-tight">Calendar</h1>
          <p className="text-[12px] text-muted mt-0.5">Visual schedule overview</p>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setCur(subMonths(cur, 1))} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-muted hover:text-primary">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="min-w-[140px] text-center text-[14px] font-semibold text-primary">{format(cur, "MMMM yyyy")}</span>
          <button onClick={() => setCur(addMonths(cur, 1))} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-muted hover:text-primary">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button onClick={() => setCur(new Date())} className="ml-1 h-8 px-3 rounded-lg btn-ghost text-[11px] font-medium">Today</button>
        </div>
      </div>

      <div className="anim-fade delay-1">
        <CalendarGrid currentDate={cur} campaigns={campaigns} onDayClick={(d) => router.push(`/campaigns/new?date=${format(d, "yyyy-MM-dd")}`)} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-[10px] text-muted anim-fade delay-2">
        {Object.entries(CAMPAIGN_TYPE_LABELS).map(([k, v]) => {
          const c = CAMPAIGN_TYPE_COLORS[k as keyof typeof CAMPAIGN_TYPE_COLORS];
          return (
            <span key={k} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-sm ${c.bg}`} />
              {v}
            </span>
          );
        })}
      </div>
    </div>
  );
}

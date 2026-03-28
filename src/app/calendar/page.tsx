"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addMonths, subMonths, format } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
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
    <div className="p-4 lg:p-8">
      <div className="h-32 bg-card rounded-3xl animate-pulse mb-6" />
      <div className="h-[600px] bg-card rounded-3xl animate-pulse" />
    </div>
  );

  const thisMonth = campaigns.filter(c => {
    const start = new Date(c.startDate);
    const end = new Date(c.endDate);
    const monthStart = new Date(cur.getFullYear(), cur.getMonth(), 1);
    const monthEnd = new Date(cur.getFullYear(), cur.getMonth() + 1, 0);
    return (start <= monthEnd && end >= monthStart);
  });

  return (
    <div className="p-4 lg:p-8 max-w-6xl">
      {/* Hero header */}
      <div className="relative overflow-hidden rounded-3xl glass mb-8 animate-in">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-blue/15 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative px-6 py-8 lg:px-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue to-purple flex items-center justify-center shadow-lg shadow-blue/20">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-text mb-1">Calendar</h1>
                <p className="text-text-secondary">
                  <span className="text-yellow font-semibold">{thisMonth.length} campaigns</span> in {format(cur, "MMMM")}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-elevated border border-border">
                <button onClick={() => setCur(subMonths(cur, 1))} className="w-10 h-10 rounded-lg flex items-center justify-center text-text-secondary hover:text-text hover:bg-hover transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="min-w-[140px] text-center font-semibold text-text">
                  {format(cur, "MMMM yyyy")}
                </span>
                <button onClick={() => setCur(addMonths(cur, 1))} className="w-10 h-10 rounded-lg flex items-center justify-center text-text-secondary hover:text-text hover:bg-hover transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <button 
                onClick={() => setCur(new Date())} 
                className="h-10 px-5 rounded-xl bg-yellow-bg text-yellow border border-yellow/20 text-sm font-semibold hover:bg-yellow/20 transition-colors"
              >
                Today
              </button>
            </div>
          </div>
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
      <div className="glass rounded-2xl p-4 mt-6 animate-in delay-2">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          {Object.entries(CAMPAIGN_TYPE_LABELS).map(([k, v]) => {
            const c = CAMPAIGN_TYPE_COLORS[k as keyof typeof CAMPAIGN_TYPE_COLORS];
            return (
              <span key={k} className="flex items-center gap-2 text-text-secondary">
                <span className={`w-3 h-3 rounded-md ${c.bg}`} />
                {v}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

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

  useEffect(() => {
    setCampaigns(getCampaigns());
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-6 lg:p-10">
        <div className="h-12 skeleton w-48 mb-8" />
        <div className="h-[600px] skeleton" />
      </div>
    );
  }

  const thisMonth = campaigns.filter((c) => {
    const start = new Date(c.startDate);
    const end = new Date(c.endDate);
    const monthStart = new Date(cur.getFullYear(), cur.getMonth(), 1);
    const monthEnd = new Date(cur.getFullYear(), cur.getMonth() + 1, 0);
    return start <= monthEnd && end >= monthStart;
  });

  return (
    <div className="p-6 lg:p-10 max-w-6xl">
      {/* Header */}
      <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 animate-enter">
        <div>
          <p className="overline mb-2">Schedule</p>
          <h1 className="display text-text-primary">Calendar</h1>
          <p className="body text-text-secondary mt-2">
            {thisMonth.length} campaigns in {format(cur, "MMMM yyyy")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCur(subMonths(cur, 1))}
              className="btn btn-secondary btn-sm w-10 h-10 p-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="min-w-[160px] text-center">
              <span className="title text-text-primary">{format(cur, "MMMM yyyy")}</span>
            </div>
            <button
              onClick={() => setCur(addMonths(cur, 1))}
              className="btn btn-secondary btn-sm w-10 h-10 p-0"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button onClick={() => setCur(new Date())} className="btn btn-primary btn-sm">
            Today
          </button>
        </div>
      </section>

      {/* Calendar */}
      <section className="animate-enter delay-1">
        <CalendarGrid
          currentDate={cur}
          campaigns={campaigns}
          onDayClick={(d) => router.push(`/campaigns/new?date=${format(d, "yyyy-MM-dd")}`)}
        />
      </section>

      {/* Legend */}
      <section className="card p-4 mt-6 animate-enter delay-2">
        <div className="flex flex-wrap items-center justify-center gap-6">
          {Object.entries(CAMPAIGN_TYPE_LABELS).map(([k, v]) => {
            const color = CAMPAIGN_TYPE_COLORS[k as keyof typeof CAMPAIGN_TYPE_COLORS];
            return (
              <div key={k} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded ${color.bg}`} />
                <span className="caption">{v}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

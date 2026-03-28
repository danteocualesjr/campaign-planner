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
      <div>
        <div className="h-20 skeleton mb-12" />
        <div className="h-[600px] skeleton" style={{ borderRadius: "2rem" }} />
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
    <>
      {/* Header */}
      <header className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 animate-enter">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-sl400 mb-2">
            Schedule
          </p>
          <h1 className="text-[3.5rem] font-bold tracking-tight text-on-bg leading-none">
            Calendar
          </h1>
          <p className="text-lg text-on-surface-variant font-medium mt-3">
            {thisMonth.length} campaigns in {format(cur, "MMMM yyyy")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-surface-lowest rounded-full border border-outline-variant/20">
            <button
              onClick={() => setCur(subMonths(cur, 1))}
              className="w-10 h-10 flex items-center justify-center text-sl500 hover:text-sl900 transition-colors rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="min-w-[160px] text-center text-sm font-bold text-on-bg">
              {format(cur, "MMMM yyyy")}
            </span>
            <button
              onClick={() => setCur(addMonths(cur, 1))}
              className="w-10 h-10 flex items-center justify-center text-sl500 hover:text-sl900 transition-colors rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => setCur(new Date())}
            className="btn-cta px-5 py-2.5 rounded-full text-sm"
          >
            Today
          </button>
        </div>
      </header>

      {/* Calendar Grid */}
      <section className="animate-enter delay-1">
        <CalendarGrid
          currentDate={cur}
          campaigns={campaigns}
          onDayClick={(d) =>
            router.push(`/campaigns/new?date=${format(d, "yyyy-MM-dd")}`)
          }
        />
      </section>

      {/* Legend */}
      <div className="card-surface p-5 mt-6 animate-enter delay-2">
        <div className="flex flex-wrap items-center justify-center gap-6">
          {Object.entries(CAMPAIGN_TYPE_LABELS).map(([k, v]) => {
            const tagStyle = {
              social_media: "type-social",
              email: "type-email",
              in_store_promo: "type-promo",
              franchise_event: "type-event",
              product_launch: "type-launch",
            }[k] || "";
            return (
              <div key={k} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${tagStyle}`} style={{ background: "currentColor" }} />
                <span className="text-sm text-on-surface-variant">{v}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

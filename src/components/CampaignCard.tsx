"use client";

import Link from "next/link";
import { format } from "date-fns";
import { CalendarRange, MapPin, ArrowUpRight, TrendingUp } from "lucide-react";
import { Campaign } from "@/lib/types";
import { CAMPAIGN_TYPE_LABELS, CAMPAIGN_TYPE_COLORS, PRODUCT_LINE_LABELS, REGION_LABELS } from "@/lib/constants";
import StatusBadge from "./StatusBadge";

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const typeColor = CAMPAIGN_TYPE_COLORS[campaign.type];
  
  return (
    <Link href={`/campaigns/${campaign.id}`}
      className="group relative block glass rounded-2xl overflow-hidden glass-hover transition-all duration-300 hover:scale-[1.01]">
      {/* Top gradient accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${typeColor.bg}`} />
      <div className={`absolute top-0 left-0 w-32 h-32 ${typeColor.bg} opacity-10 blur-3xl`} />
      
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5 flex-wrap mb-1">
              <h3 className="text-[15px] font-semibold text-primary truncate group-hover:text-accent transition-colors">
                {campaign.name}
              </h3>
              <StatusBadge status={campaign.status} />
            </div>
            <p className={`text-[12px] font-medium ${typeColor.text}`}>
              {CAMPAIGN_TYPE_LABELS[campaign.type]}
            </p>
          </div>
          {campaign.budget > 0 && (
            <div className="text-right shrink-0">
              <p className="text-[18px] font-bold text-primary tabular-nums">₱{campaign.budget.toLocaleString()}</p>
              <p className="text-[11px] text-muted">Budget</p>
            </div>
          )}
        </div>

        {campaign.description && (
          <p className="text-[13px] text-secondary leading-relaxed line-clamp-2 mb-4">{campaign.description}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-[12px] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <CalendarRange className="w-3.5 h-3.5" />
              {format(new Date(campaign.startDate), "MMM d")} – {format(new Date(campaign.endDate), "MMM d")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {REGION_LABELS[campaign.region]}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {campaign.productLines.length > 0 && (
              <span className="text-[11px] font-medium text-accent bg-accent-soft px-2 py-0.5 rounded-full">
                {PRODUCT_LINE_LABELS[campaign.productLines[0]]}
                {campaign.productLines.length > 1 && ` +${campaign.productLines.length - 1}`}
              </span>
            )}
            <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center text-muted group-hover:text-accent group-hover:bg-accent-soft transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

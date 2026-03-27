"use client";

import Link from "next/link";
import { format, differenceInDays, isFuture } from "date-fns";
import { CalendarRange, MapPin, ArrowUpRight, Clock, Zap } from "lucide-react";
import { Campaign } from "@/lib/types";
import { CAMPAIGN_TYPE_LABELS, CAMPAIGN_TYPE_COLORS, PRODUCT_LINE_LABELS, REGION_LABELS } from "@/lib/constants";
import StatusBadge from "./StatusBadge";

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const typeColor = CAMPAIGN_TYPE_COLORS[campaign.type];
  const startDate = new Date(campaign.startDate);
  const endDate = new Date(campaign.endDate);
  const today = new Date();

  const daysUntilStart = differenceInDays(startDate, today);
  const daysUntilEnd = differenceInDays(endDate, today);
  const totalDays = differenceInDays(endDate, startDate);
  const daysElapsed = differenceInDays(today, startDate);
  const progress = campaign.status === "active" ? Math.min(Math.max((daysElapsed / totalDays) * 100, 0), 100) : 0;

  const isUpcoming = isFuture(startDate) && daysUntilStart <= 7;
  const isEnding = campaign.status === "active" && daysUntilEnd <= 3 && daysUntilEnd >= 0;

  return (
    <Link href={`/campaigns/${campaign.id}`}
      className="group relative block glass rounded-xl overflow-hidden transition-all duration-200 hover:border-border-hover card-lift">
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${typeColor.bg}`} />

      <div className="relative pl-5 pr-4 py-4">
        <div className="flex items-start justify-between gap-4 mb-2.5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-[14px] font-semibold text-primary truncate group-hover:text-accent transition-colors">
                {campaign.name}
              </h3>
              <StatusBadge status={campaign.status} />
              {isUpcoming && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-orange bg-orange-soft px-1.5 py-0.5 rounded-md">
                  <Zap className="w-2.5 h-2.5" />
                  {daysUntilStart === 0 ? "Today" : `${daysUntilStart}d`}
                </span>
              )}
              {isEnding && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-red bg-red-soft px-1.5 py-0.5 rounded-md">
                  <Clock className="w-2.5 h-2.5" />
                  {daysUntilEnd === 0 ? "Today" : `${daysUntilEnd}d left`}
                </span>
              )}
            </div>
            <p className={`text-[11px] font-medium ${typeColor.text}`}>
              {CAMPAIGN_TYPE_LABELS[campaign.type]}
            </p>
          </div>
          {campaign.budget > 0 && (
            <div className="text-right shrink-0">
              <p className="text-[16px] font-bold text-primary tabular-nums tracking-tight">₱{campaign.budget.toLocaleString()}</p>
              <p className="text-[10px] text-muted">budget</p>
            </div>
          )}
        </div>

        {campaign.description && (
          <p className="text-[12px] text-secondary leading-relaxed line-clamp-1 mb-3">{campaign.description}</p>
        )}

        {/* Progress bar */}
        {campaign.status === "active" && (
          <div className="h-1 rounded-full bg-border mb-3">
            <div className="h-full rounded-full bg-gradient-to-r from-accent to-orange transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] text-muted">
            <span className="inline-flex items-center gap-1">
              <CalendarRange className="w-3 h-3" />
              {format(startDate, "MMM d")} – {format(endDate, "MMM d")}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="hidden sm:inline">{REGION_LABELS[campaign.region]}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {campaign.productLines.length > 0 && (
              <span className="text-[10px] font-medium text-accent bg-accent-soft px-1.5 py-0.5 rounded-md">
                {PRODUCT_LINE_LABELS[campaign.productLines[0]]}
                {campaign.productLines.length > 1 && ` +${campaign.productLines.length - 1}`}
              </span>
            )}
            <div className="w-7 h-7 rounded-md bg-card flex items-center justify-center text-muted group-hover:text-accent transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

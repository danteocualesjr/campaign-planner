"use client";

import Link from "next/link";
import { format, differenceInDays, isFuture } from "date-fns";
import { ArrowUpRight, Zap, AlertCircle } from "lucide-react";
import { Campaign } from "@/lib/types";
import { CAMPAIGN_TYPE_LABELS, CAMPAIGN_TYPE_COLORS, PRODUCT_LINE_LABELS, REGION_LABELS } from "@/lib/constants";
import StatusBadge from "./StatusBadge";

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const startDate = new Date(campaign.startDate);
  const endDate = new Date(campaign.endDate);
  const today = new Date();
  const typeColor = CAMPAIGN_TYPE_COLORS[campaign.type];

  const daysUntilStart = differenceInDays(startDate, today);
  const daysUntilEnd = differenceInDays(endDate, today);
  const totalDays = differenceInDays(endDate, startDate);
  const daysElapsed = differenceInDays(today, startDate);
  const progress = campaign.status === "active" ? Math.min(Math.max((daysElapsed / totalDays) * 100, 0), 100) : 0;

  const isUpcoming = isFuture(startDate) && daysUntilStart <= 7;
  const isEnding = campaign.status === "active" && daysUntilEnd <= 3 && daysUntilEnd >= 0;

  return (
    <Link
      href={`/campaigns/${campaign.id}`}
      className="group flex items-center gap-4 p-4 card card-interactive"
    >
      {/* Type indicator */}
      <div className={`w-1 self-stretch rounded-full ${typeColor.bg}`} />
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-[14px] font-semibold text-text truncate group-hover:text-lemon transition-colors">
            {campaign.name}
          </h3>
          <StatusBadge status={campaign.status} />
          {isUpcoming && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-warning-muted text-warning text-[10px] font-semibold">
              <Zap className="w-2.5 h-2.5" />
              {daysUntilStart}d
            </span>
          )}
          {isEnding && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-danger-muted text-danger text-[10px] font-semibold">
              <AlertCircle className="w-2.5 h-2.5" />
              {daysUntilEnd}d left
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-3 text-[12px] text-text-muted">
          <span className={typeColor.text}>{CAMPAIGN_TYPE_LABELS[campaign.type]}</span>
          <span>·</span>
          <span>{format(startDate, "MMM d")} – {format(endDate, "MMM d")}</span>
          <span>·</span>
          <span>{REGION_LABELS[campaign.region]}</span>
        </div>

        {/* Progress bar for active */}
        {campaign.status === "active" && (
          <div className="mt-2.5 h-1 rounded-full bg-emphasis overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-lemon to-lemon-dark transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      
      {/* Right side */}
      <div className="flex items-center gap-4 shrink-0">
        {campaign.budget > 0 && (
          <div className="text-right hidden sm:block">
            <p className="text-[15px] font-bold text-text tabular-nums">₱{campaign.budget.toLocaleString()}</p>
            <p className="text-[11px] text-text-subtle">budget</p>
          </div>
        )}
        {campaign.productLines.length > 0 && (
          <span className="hidden lg:inline-flex px-2 py-1 rounded-md bg-lemon-muted text-lemon text-[11px] font-medium">
            {PRODUCT_LINE_LABELS[campaign.productLines[0]]}
            {campaign.productLines.length > 1 && ` +${campaign.productLines.length - 1}`}
          </span>
        )}
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-text-subtle group-hover:text-lemon group-hover:bg-lemon-muted transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}

"use client";

import Link from "next/link";
import { format, differenceInDays, isPast, isFuture } from "date-fns";
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
      className="group relative block glass rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.005] card-lift">
      {/* Top gradient accent */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${typeColor.bg} opacity-80`} />
      <div className={`absolute top-0 left-0 w-40 h-40 ${typeColor.bg} opacity-[0.07] blur-3xl transition-opacity group-hover:opacity-[0.12]`} />
      
      {/* Progress bar for active campaigns */}
      {campaign.status === "active" && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border/50">
          <div 
            className="h-full bg-gradient-to-r from-accent to-orange transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
              <h3 className="text-[15px] font-semibold text-primary truncate group-hover:text-accent transition-colors">
                {campaign.name}
              </h3>
              <StatusBadge status={campaign.status} />
              {isUpcoming && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-orange bg-orange-soft px-1.5 py-0.5 rounded-full animate-pulse">
                  <Zap className="w-2.5 h-2.5" />
                  {daysUntilStart === 0 ? "Starts today" : `${daysUntilStart}d away`}
                </span>
              )}
              {isEnding && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-red bg-red-soft px-1.5 py-0.5 rounded-full">
                  <Clock className="w-2.5 h-2.5" />
                  {daysUntilEnd === 0 ? "Ends today" : `${daysUntilEnd}d left`}
                </span>
              )}
            </div>
            <p className={`text-[12px] font-medium ${typeColor.text}`}>
              {CAMPAIGN_TYPE_LABELS[campaign.type]}
            </p>
          </div>
          {campaign.budget > 0 && (
            <div className="text-right shrink-0">
              <p className="text-[18px] font-bold text-primary tabular-nums tracking-tight">
                ₱{campaign.budget.toLocaleString()}
              </p>
              <p className="text-[10px] text-muted uppercase tracking-wider">Budget</p>
            </div>
          )}
        </div>

        {campaign.description && (
          <p className="text-[13px] text-secondary leading-relaxed line-clamp-2 mb-4">{campaign.description}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-[12px] text-muted">
            <span className="inline-flex items-center gap-1.5 group/date">
              <CalendarRange className="w-3.5 h-3.5 group-hover/date:text-accent transition-colors" />
              <span className="group-hover/date:text-secondary transition-colors">
                {format(startDate, "MMM d")} – {format(endDate, "MMM d")}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 group/region">
              <MapPin className="w-3.5 h-3.5 group-hover/region:text-accent transition-colors" />
              <span className="group-hover/region:text-secondary transition-colors hidden sm:inline">
                {REGION_LABELS[campaign.region]}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            {campaign.productLines.length > 0 && (
              <span className="text-[10px] sm:text-[11px] font-medium text-accent bg-accent-soft px-2 py-0.5 rounded-full truncate max-w-[100px] sm:max-w-none">
                {PRODUCT_LINE_LABELS[campaign.productLines[0]]}
                {campaign.productLines.length > 1 && ` +${campaign.productLines.length - 1}`}
              </span>
            )}
            <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center text-muted group-hover:text-accent group-hover:bg-accent-soft group-hover:scale-110 transition-all duration-200">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

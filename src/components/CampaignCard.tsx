"use client";

import Link from "next/link";
import { format, differenceInDays, isFuture } from "date-fns";
import { ArrowUpRight, Zap, AlertCircle, TrendingUp, Clock, CheckCircle, FileText } from "lucide-react";
import { Campaign } from "@/lib/types";
import { CAMPAIGN_TYPE_LABELS, CAMPAIGN_TYPE_COLORS, PRODUCT_LINE_LABELS, REGION_LABELS } from "@/lib/constants";

const STATUS_CONFIG = {
  active: { label: "Active", icon: TrendingUp, bg: "bg-green-bg", text: "text-green", border: "border-green/20" },
  draft: { label: "Draft", icon: FileText, bg: "bg-blue-bg", text: "text-blue", border: "border-blue/20" },
  completed: { label: "Done", icon: CheckCircle, bg: "bg-text-tertiary/10", text: "text-text-tertiary", border: "border-text-tertiary/20" },
  paused: { label: "Paused", icon: Clock, bg: "bg-orange-bg", text: "text-orange", border: "border-orange/20" },
};

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
  const statusConfig = STATUS_CONFIG[campaign.status];
  const StatusIcon = statusConfig.icon;

  return (
    <Link
      href={`/campaigns/${campaign.id}`}
      className="group relative glass rounded-2xl p-5 hover:border-border-light transition-all block"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow/0 via-yellow/5 to-yellow/0 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative flex items-start gap-4">
        {/* Type indicator - vertical bar */}
        <div className={`w-1 self-stretch rounded-full ${typeColor.bg}`} />
        
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <h3 className="text-base font-semibold text-text group-hover:text-yellow transition-colors truncate">
                  {campaign.name}
                </h3>
                
                {/* Status badge */}
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border} text-xs font-medium`}>
                  <StatusIcon className="w-3 h-3" />
                  {statusConfig.label}
                </span>
                
                {/* Urgency badges */}
                {isUpcoming && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-orange-bg text-orange border border-orange/20 text-xs font-semibold animate-pulse">
                    <Zap className="w-3 h-3" />
                    Starts in {daysUntilStart}d
                  </span>
                )}
                {isEnding && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-red-bg text-red border border-red/20 text-xs font-semibold animate-pulse">
                    <AlertCircle className="w-3 h-3" />
                    {daysUntilEnd}d left
                  </span>
                )}
              </div>
              
              {/* Meta info */}
              <div className="flex items-center gap-2 text-sm text-text-secondary flex-wrap">
                <span className={`${typeColor.text} font-medium`}>{CAMPAIGN_TYPE_LABELS[campaign.type]}</span>
                <span className="text-text-tertiary">•</span>
                <span>{format(startDate, "MMM d")} – {format(endDate, "MMM d")}</span>
                <span className="text-text-tertiary">•</span>
                <span>{REGION_LABELS[campaign.region]}</span>
              </div>
            </div>
            
            {/* Right side */}
            <div className="flex items-center gap-3 shrink-0">
              {campaign.budget > 0 && (
                <div className="text-right hidden sm:block">
                  <p className="text-lg font-bold text-text tabular-nums">₱{campaign.budget.toLocaleString()}</p>
                  <p className="text-xs text-text-tertiary">budget</p>
                </div>
              )}
              
              <div className="w-10 h-10 rounded-xl bg-elevated border border-border flex items-center justify-center text-text-tertiary group-hover:border-yellow group-hover:text-yellow group-hover:bg-yellow-bg transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          {/* Product lines */}
          {campaign.productLines.length > 0 && (
            <div className="flex items-center gap-2 mb-3">
              {campaign.productLines.slice(0, 3).map(pl => (
                <span key={pl} className="px-2 py-0.5 rounded-md bg-yellow-bg text-yellow border border-yellow/20 text-xs font-medium">
                  {PRODUCT_LINE_LABELS[pl]}
                </span>
              ))}
              {campaign.productLines.length > 3 && (
                <span className="text-xs text-text-tertiary">+{campaign.productLines.length - 3} more</span>
              )}
            </div>
          )}
          
          {/* Progress bar for active campaigns */}
          {campaign.status === "active" && (
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full bg-elevated overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-yellow to-green transition-all relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                </div>
              </div>
              <span className="text-xs font-semibold text-text-secondary tabular-nums w-10 text-right">{Math.round(progress)}%</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

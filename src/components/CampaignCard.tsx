"use client";

import Link from "next/link";
import { format, differenceInDays, isFuture } from "date-fns";
import { ArrowUpRight, Zap, AlertTriangle } from "lucide-react";
import { Campaign } from "@/lib/types";
import {
  CAMPAIGN_TYPE_LABELS,
  PRODUCT_LINE_LABELS,
  REGION_LABELS,
} from "@/lib/constants";

const STATUS_STYLES = {
  active: "badge-success",
  draft: "badge-info",
  completed: "badge-neutral",
  paused: "badge-warning",
};

const STATUS_LABELS = {
  active: "Active",
  draft: "Draft",
  completed: "Completed",
  paused: "Paused",
};

const TYPE_TAG_STYLES: Record<string, string> = {
  social_media: "tag-social",
  email: "tag-email",
  in_store_promo: "tag-promo",
  event: "tag-event",
  product_launch: "tag-launch",
};

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const startDate = new Date(campaign.startDate);
  const endDate = new Date(campaign.endDate);
  const today = new Date();

  const daysUntilStart = differenceInDays(startDate, today);
  const daysUntilEnd = differenceInDays(endDate, today);
  const totalDays = differenceInDays(endDate, startDate);
  const daysElapsed = differenceInDays(today, startDate);
  const progress =
    campaign.status === "active"
      ? Math.min(Math.max((daysElapsed / totalDays) * 100, 0), 100)
      : 0;

  const isUpcoming = isFuture(startDate) && daysUntilStart <= 7;
  const isEnding = campaign.status === "active" && daysUntilEnd <= 3 && daysUntilEnd >= 0;

  return (
    <Link
      href={`/campaigns/${campaign.id}`}
      className="card card-hover group flex items-stretch overflow-hidden"
    >
      {/* Left accent */}
      <div
        className={`w-1 ${
          campaign.status === "active"
            ? "bg-success"
            : campaign.status === "draft"
            ? "bg-info"
            : campaign.status === "paused"
            ? "bg-warning"
            : "bg-bg-accent"
        }`}
      />

      <div className="flex-1 p-5 flex items-center gap-6">
        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="title text-text-primary truncate group-hover:text-accent transition-colors">
              {campaign.name}
            </h3>
            <span className={`badge ${STATUS_STYLES[campaign.status]}`}>
              {STATUS_LABELS[campaign.status]}
            </span>
            {isUpcoming && (
              <span className="badge badge-warning">
                <Zap className="w-3 h-3" />
                Starts in {daysUntilStart}d
              </span>
            )}
            {isEnding && (
              <span className="badge badge-danger">
                <AlertTriangle className="w-3 h-3" />
                {daysUntilEnd}d left
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <span
              className={`badge ${TYPE_TAG_STYLES[campaign.type] || "badge-neutral"}`}
            >
              {CAMPAIGN_TYPE_LABELS[campaign.type]}
            </span>
            <span className="caption">
              {format(startDate, "MMM d")} – {format(endDate, "MMM d")}
            </span>
            <span className="caption">{REGION_LABELS[campaign.region]}</span>
          </div>

          {/* Progress */}
          {campaign.status === "active" && (
            <div className="mt-4 flex items-center gap-3">
              <div className="progress-bar flex-1">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-xs font-medium text-text-muted tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="hidden sm:flex items-center gap-6">
          {campaign.budget > 0 && (
            <div className="text-right">
              <p className="text-xl font-bold text-text-primary tabular-nums">
                ₱{campaign.budget.toLocaleString()}
              </p>
              <p className="text-xs text-text-muted">budget</p>
            </div>
          )}

          {campaign.productLines.length > 0 && (
            <div className="hidden lg:block">
              <span className="badge badge-accent">
                {PRODUCT_LINE_LABELS[campaign.productLines[0]]}
                {campaign.productLines.length > 1 && ` +${campaign.productLines.length - 1}`}
              </span>
            </div>
          )}

          <div className="w-10 h-10 rounded-xl bg-bg-tertiary flex items-center justify-center text-text-muted group-hover:bg-accent group-hover:text-black transition-all">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

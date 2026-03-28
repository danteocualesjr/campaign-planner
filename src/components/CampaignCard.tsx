"use client";

import Link from "next/link";
import { format, differenceInDays } from "date-fns";
import { ArrowRight, CalendarDays, Wallet } from "lucide-react";
import { Campaign } from "@/lib/types";
import {
  CAMPAIGN_TYPE_LABELS,
  REGION_LABELS,
} from "@/lib/constants";

const TYPE_STYLES: Record<string, string> = {
  social_media: "type-social",
  email: "type-email",
  in_store_promo: "type-promo",
  franchise_event: "type-event",
  product_launch: "type-launch",
};

const STATUS_DOT: Record<string, string> = {
  active: "status-dot-active",
  draft: "status-dot-draft",
  paused: "status-dot-paused",
  completed: "status-dot-completed",
};

const STATUS_LABELS: Record<string, string> = {
  active: "Active",
  draft: "Draft",
  paused: "Paused",
  completed: "Completed",
};

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const startDate = new Date(campaign.startDate);
  const endDate = new Date(campaign.endDate);

  return (
    <Link
      href={`/campaigns/${campaign.id}`}
      className="card-campaign p-4 flex items-center gap-8 group block"
    >
      {/* Thumbnail placeholder */}
      <div className="w-48 h-32 rounded-[1.5rem] bg-gradient-to-br from-primary-container/30 via-tertiary-fixed/30 to-secondary-container/40 flex-shrink-0 hidden md:flex items-center justify-center">
        <span className="text-4xl">🍋</span>
      </div>

      {/* Campaign Meta Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8">
        {/* Name + Type */}
        <div className="flex flex-col justify-center">
          <span className="meta-label mb-1">Campaign Name</span>
          <h4 className="text-lg font-bold text-on-bg leading-tight group-hover:text-md-primary transition-colors">
            {campaign.name}
          </h4>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`chip ${TYPE_STYLES[campaign.type] || ""}`}
            >
              {CAMPAIGN_TYPE_LABELS[campaign.type]}
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex flex-col justify-center">
          <span className="meta-label mb-1">Timeline</span>
          <div className="flex items-center gap-2 text-on-bg">
            <CalendarDays className="w-4 h-4 text-sl400" />
            <span className="text-sm font-medium">
              {format(startDate, "MMM d")} – {format(endDate, "MMM d")}
            </span>
          </div>
        </div>

        {/* Budget */}
        <div className="flex flex-col justify-center">
          <span className="meta-label mb-1">Investment</span>
          <div className="flex items-center gap-2 text-on-bg">
            <Wallet className="w-4 h-4 text-sl400" />
            <span className="text-sm font-bold">
              ₱{campaign.budget.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center">
          <div className="status-pill">
            <div className={`status-dot ${STATUS_DOT[campaign.status]}`} />
            <span>{STATUS_LABELS[campaign.status]}</span>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="pr-2 hidden sm:block">
        <div className="w-12 h-12 rounded-full bg-surface-low flex items-center justify-center group-hover:bg-primary-container group-hover:text-on-primary-container text-sl500 transition-colors">
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </Link>
  );
}

"use client";

import Link from "next/link";
import { format } from "date-fns";
import { CalendarRange, MapPin, ChevronRight } from "lucide-react";
import { Campaign } from "@/lib/types";
import { CAMPAIGN_TYPE_LABELS, CAMPAIGN_TYPE_COLORS, PRODUCT_LINE_LABELS, REGION_LABELS } from "@/lib/constants";
import StatusBadge from "./StatusBadge";

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const stripe = CAMPAIGN_TYPE_COLORS[campaign.type];
  return (
    <Link
      href={`/campaigns/${campaign.id}`}
      className="group flex bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
    >
      <div className={`w-1 shrink-0 rounded-l-xl ${stripe}`} />
      <div className="flex-1 p-4 sm:p-5 min-w-0">
        <div className="flex items-start gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-[15px] font-semibold text-navy-900 truncate group-hover:text-brand-700 transition-colors">
                {campaign.name}
              </h3>
              <StatusBadge status={campaign.status} />
            </div>
            <p className="text-[12px] text-gray-400 mt-0.5 font-medium">
              {CAMPAIGN_TYPE_LABELS[campaign.type]}
            </p>
          </div>
          {campaign.budget > 0 && (
            <span className="text-[14px] font-bold text-navy-900 tabular-nums shrink-0">
              ₱{campaign.budget.toLocaleString()}
            </span>
          )}
        </div>

        {campaign.description && (
          <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-3">
            {campaign.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-[12px] text-gray-400">
          <span className="inline-flex items-center gap-1">
            <CalendarRange className="w-3.5 h-3.5" />
            {format(new Date(campaign.startDate), "MMM d")} – {format(new Date(campaign.endDate), "MMM d")}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {REGION_LABELS[campaign.region]}
          </span>
          {campaign.productLines.length > 0 && (
            <span className="text-brand-600 font-medium">
              {campaign.productLines.slice(0, 2).map((p) => PRODUCT_LINE_LABELS[p]).join(", ")}
              {campaign.productLines.length > 2 && ` +${campaign.productLines.length - 2}`}
            </span>
          )}
          <ChevronRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </Link>
  );
}

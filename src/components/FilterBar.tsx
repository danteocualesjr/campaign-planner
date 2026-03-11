"use client";

import { Search, X } from "lucide-react";
import { CampaignStatus, CampaignType, ProductLine } from "@/lib/types";
import { CAMPAIGN_STATUS_LABELS, CAMPAIGN_TYPE_LABELS, PRODUCT_LINE_LABELS } from "@/lib/constants";

interface FilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  statusFilter: CampaignStatus | "all";
  onStatusChange: (v: CampaignStatus | "all") => void;
  typeFilter: CampaignType | "all";
  onTypeChange: (v: CampaignType | "all") => void;
  productFilter: ProductLine | "all";
  onProductChange: (v: ProductLine | "all") => void;
}

const sel = "h-9 px-2.5 pr-7 rounded-lg ring-1 ring-gray-200 bg-white text-[13px] text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all appearance-none cursor-pointer";

export default function FilterBar(p: FilterBarProps) {
  const hasFilters = p.statusFilter !== "all" || p.typeFilter !== "all" || p.productFilter !== "all";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text" value={p.search} onChange={(e) => p.onSearchChange(e.target.value)}
          placeholder="Search campaigns..."
          className="w-full h-9 pl-9 pr-3 rounded-lg ring-1 ring-gray-200 bg-white text-[13px] text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all"
        />
      </div>
      <select value={p.statusFilter} onChange={(e) => p.onStatusChange(e.target.value as CampaignStatus | "all")} className={sel}>
        <option value="all">Status</option>
        {Object.entries(CAMPAIGN_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
      </select>
      <select value={p.typeFilter} onChange={(e) => p.onTypeChange(e.target.value as CampaignType | "all")} className={sel}>
        <option value="all">Type</option>
        {Object.entries(CAMPAIGN_TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
      </select>
      <select value={p.productFilter} onChange={(e) => p.onProductChange(e.target.value as ProductLine | "all")} className={sel}>
        <option value="all">Product</option>
        {Object.entries(PRODUCT_LINE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
      </select>
      {hasFilters && (
        <button onClick={() => { p.onStatusChange("all"); p.onTypeChange("all"); p.onProductChange("all"); }}
          className="h-9 px-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

"use client";

import { Search, X, SlidersHorizontal } from "lucide-react";
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

const sel = "h-10 px-3 rounded-xl input-dark text-[13px] cursor-pointer appearance-none pr-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMyA0LjVMNiA3LjVMOSA0LjUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjQpIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-no-repeat bg-[right_12px_center]";

export default function FilterBar(p: FilterBarProps) {
  const hasFilters = p.statusFilter !== "all" || p.typeFilter !== "all" || p.productFilter !== "all";
  
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input type="text" value={p.search} onChange={(e) => p.onSearchChange(e.target.value)}
          placeholder="Search campaigns..."
          className="w-full h-10 pl-10 pr-4 rounded-xl input-dark text-[13px]" />
      </div>
      
      <div className="flex items-center gap-2 bg-card rounded-xl p-1">
        <SlidersHorizontal className="w-4 h-4 text-muted ml-2" />
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
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-red hover:bg-red-soft transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

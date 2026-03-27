"use client";

import { Search, X, Filter } from "lucide-react";
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

const sel = "h-8 px-2.5 rounded-lg input-dark text-[11px] cursor-pointer appearance-none pr-6 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMyA0LjVMNiA3LjVMOSA0LjUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjQpIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-no-repeat bg-[right_8px_center]";

export default function FilterBar(p: FilterBarProps) {
  const hasFilters = p.statusFilter !== "all" || p.typeFilter !== "all" || p.productFilter !== "all";
  const hasSearch = p.search.length > 0;
  const hasAny = hasFilters || hasSearch;

  return (
    <div className="flex flex-col sm:flex-row gap-2.5">
      <div className="relative flex-1 min-w-[200px] group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted group-focus-within:text-accent transition-colors" />
        <input
          type="text"
          value={p.search}
          onChange={(e) => p.onSearchChange(e.target.value)}
          placeholder="Search campaigns..."
          className="w-full h-9 pl-9 pr-9 rounded-lg input-dark text-[12px]"
        />
        {hasSearch && (
          <button onClick={() => p.onSearchChange("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-muted hover:text-primary" aria-label="Clear">
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-1 glass rounded-lg px-1.5 py-1">
          <Filter className="w-3 h-3 text-muted ml-1" />
          <select value={p.statusFilter} onChange={(e) => p.onStatusChange(e.target.value as CampaignStatus | "all")} className={sel} aria-label="Status">
            <option value="all">Status</option>
            {Object.entries(CAMPAIGN_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <select value={p.typeFilter} onChange={(e) => p.onTypeChange(e.target.value as CampaignType | "all")} className={sel} aria-label="Type">
            <option value="all">Type</option>
            {Object.entries(CAMPAIGN_TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <select value={p.productFilter} onChange={(e) => p.onProductChange(e.target.value as ProductLine | "all")} className={sel} aria-label="Product">
            <option value="all">Product</option>
            {Object.entries(PRODUCT_LINE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>

        {hasAny && (
          <button
            onClick={() => { p.onSearchChange(""); p.onStatusChange("all"); p.onTypeChange("all"); p.onProductChange("all"); }}
            className="h-8 px-2.5 rounded-lg text-[11px] font-medium text-muted hover:text-red hover:bg-red-soft transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>
    </div>
  );
}

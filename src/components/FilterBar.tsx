"use client";

import { Search, X, SlidersHorizontal } from "lucide-react";
import { CampaignStatus, CampaignType, ProductLine } from "@/lib/types";
import { CAMPAIGN_STATUS_LABELS, CAMPAIGN_TYPE_LABELS, PRODUCT_LINE_LABELS } from "@/lib/constants";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  statusFilter: CampaignStatus | "all";
  onStatusChange: (v: CampaignStatus | "all") => void;
  typeFilter: CampaignType | "all";
  onTypeChange: (v: CampaignType | "all") => void;
  productFilter: ProductLine | "all";
  onProductChange: (v: ProductLine | "all") => void;
}

export default function FilterBar(p: Props) {
  const hasFilters = p.statusFilter !== "all" || p.typeFilter !== "all" || p.productFilter !== "all" || p.search;
  const sel = "h-9 px-3 rounded-lg input text-[12px] cursor-pointer appearance-none pr-7 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMyA0LjVMNiA3LjVMOSA0LjUiIHN0cm9rZT0icmdiYSgxNjEsMTYxLDE3MCwxKSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-no-repeat bg-[right_10px_center]";

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle" />
        <input
          type="text"
          value={p.search}
          onChange={(e) => p.onSearchChange(e.target.value)}
          placeholder="Search campaigns..."
          className="w-full h-10 pl-10 pr-10 input text-[13px]"
        />
        {p.search && (
          <button onClick={() => p.onSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-subtle hover:text-text">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-muted">
          <SlidersHorizontal className="w-3.5 h-3.5 text-text-subtle ml-1.5" />
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
        </div>
        {hasFilters && (
          <button
            onClick={() => { p.onSearchChange(""); p.onStatusChange("all"); p.onTypeChange("all"); p.onProductChange("all"); }}
            className="h-9 px-3 btn btn-ghost text-[12px] text-danger"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

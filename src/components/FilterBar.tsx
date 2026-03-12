"use client";

import { Search, X, SlidersHorizontal, Filter } from "lucide-react";
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

const sel = "h-9 px-3 rounded-lg input-dark text-[12px] cursor-pointer appearance-none pr-7 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMyA0LjVMNiA3LjVMOSA0LjUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjQpIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-no-repeat bg-[right_10px_center]";

export default function FilterBar(p: FilterBarProps) {
  const hasFilters = p.statusFilter !== "all" || p.typeFilter !== "all" || p.productFilter !== "all";
  const hasSearch = p.search.length > 0;
  const hasAny = hasFilters || hasSearch;
  const activeCount = [p.statusFilter !== "all", p.typeFilter !== "all", p.productFilter !== "all"].filter(Boolean).length;
  
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search input with clear button */}
      <div className="relative flex-1 min-w-[220px] group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-accent transition-colors" />
        <input 
          type="text" 
          value={p.search} 
          onChange={(e) => p.onSearchChange(e.target.value)}
          placeholder="Search campaigns..."
          className="w-full h-10 pl-10 pr-10 rounded-xl input-dark text-[13px]" 
        />
        {hasSearch && (
          <button 
            onClick={() => p.onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted hover:text-primary hover:bg-card transition-colors"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      
      {/* Filter controls */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 glass rounded-xl p-1.5">
          <div className="flex items-center gap-1.5 px-2 text-muted">
            <Filter className="w-3.5 h-3.5" />
            {activeCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-accent text-bg text-[10px] font-bold flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </div>
          
          <select 
            value={p.statusFilter} 
            onChange={(e) => p.onStatusChange(e.target.value as CampaignStatus | "all")} 
            className={`${sel} ${p.statusFilter !== "all" ? "border-accent/50 text-primary" : ""}`}
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            {Object.entries(CAMPAIGN_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          
          <select 
            value={p.typeFilter} 
            onChange={(e) => p.onTypeChange(e.target.value as CampaignType | "all")} 
            className={`${sel} ${p.typeFilter !== "all" ? "border-accent/50 text-primary" : ""}`}
            aria-label="Filter by type"
          >
            <option value="all">All Types</option>
            {Object.entries(CAMPAIGN_TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          
          <select 
            value={p.productFilter} 
            onChange={(e) => p.onProductChange(e.target.value as ProductLine | "all")} 
            className={`${sel} ${p.productFilter !== "all" ? "border-accent/50 text-primary" : ""}`}
            aria-label="Filter by product"
          >
            <option value="all">All Products</option>
            {Object.entries(PRODUCT_LINE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
        
        {/* Clear all button */}
        {hasAny && (
          <button 
            onClick={() => { 
              p.onSearchChange(""); 
              p.onStatusChange("all"); 
              p.onTypeChange("all"); 
              p.onProductChange("all"); 
            }}
            className="h-9 px-3 rounded-lg text-[12px] font-medium text-muted hover:text-red hover:bg-red-soft transition-all flex items-center gap-1.5 whitespace-nowrap"
            aria-label="Clear all filters"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear all</span>
          </button>
        )}
      </div>
    </div>
  );
}

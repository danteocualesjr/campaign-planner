"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, X, Sparkles, SlidersHorizontal, Megaphone, LayoutGrid, List } from "lucide-react";
import { Campaign, CampaignStatus, CampaignType, ProductLine } from "@/lib/types";
import { getCampaigns } from "@/lib/storage";
import { CAMPAIGN_STATUS_LABELS, CAMPAIGN_TYPE_LABELS, PRODUCT_LINE_LABELS } from "@/lib/constants";
import CampaignCard from "@/components/CampaignCard";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [statusF, setStatusF] = useState<CampaignStatus | "all">("all");
  const [typeF, setTypeF] = useState<CampaignType | "all">("all");
  const [prodF, setProdF] = useState<ProductLine | "all">("all");

  useEffect(() => { setCampaigns(getCampaigns()); setMounted(true); }, []);

  if (!mounted) return (
    <div className="p-4 lg:p-8">
      <div className="h-12 w-64 bg-card rounded-xl animate-pulse mb-6" />
      <div className="h-12 bg-card rounded-xl animate-pulse mb-4" />
      <div className="space-y-3">
        {[1,2,3].map(i => <div key={i} className="h-28 bg-card rounded-2xl animate-pulse" />)}
      </div>
    </div>
  );

  const filtered = campaigns.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusF !== "all" && c.status !== statusF) return false;
    if (typeF !== "all" && c.type !== typeF) return false;
    if (prodF !== "all" && !c.productLines.includes(prodF)) return false;
    return true;
  });

  const hasFilters = statusF !== "all" || typeF !== "all" || prodF !== "all" || search;
  const activeCount = campaigns.filter(c => c.status === "active").length;
  const draftCount = campaigns.filter(c => c.status === "draft").length;

  const sel = "h-10 px-3 rounded-xl input text-sm cursor-pointer appearance-none pr-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMyA0LjVMNiA3LjVMOSA0LjUiIHN0cm9rZT0icmdiYSgxNjEsMTYxLDE3MCwxKSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-no-repeat bg-[right_12px_center]";

  return (
    <div className="p-4 lg:p-8 max-w-6xl">
      {/* Hero header */}
      <div className="relative overflow-hidden rounded-3xl glass mb-8 animate-in">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-purple/15 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative px-6 py-8 lg:px-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple to-blue flex items-center justify-center shadow-lg shadow-purple/20">
                <Megaphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-text mb-1">Campaigns</h1>
                <p className="text-text-secondary">
                  <span className="text-green font-semibold">{activeCount} active</span>
                  <span className="text-text-tertiary"> · </span>
                  <span className="text-blue font-semibold">{draftCount} drafts</span>
                  <span className="text-text-tertiary"> · </span>
                  <span>{campaigns.length} total</span>
                </p>
              </div>
            </div>
            
            <Link href="/campaigns/new" className="h-12 px-6 btn-primary flex items-center gap-2 text-sm font-semibold w-fit">
              <Plus className="w-4 h-4" />
              New Campaign
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      {campaigns.length > 0 && (
        <div className="glass rounded-2xl p-4 mb-6 animate-in delay-1">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search campaigns by name or description..."
                className="w-full h-12 pl-12 pr-12 input text-sm"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-elevated flex items-center justify-center text-text-tertiary hover:text-text transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-elevated border border-border">
                <SlidersHorizontal className="w-4 h-4 text-text-tertiary" />
                <span className="text-xs font-medium text-text-secondary hidden sm:inline">Filters:</span>
              </div>
              
              <select value={statusF} onChange={(e) => setStatusF(e.target.value as CampaignStatus | "all")} className={sel}>
                <option value="all">All Status</option>
                {Object.entries(CAMPAIGN_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              
              <select value={typeF} onChange={(e) => setTypeF(e.target.value as CampaignType | "all")} className={sel}>
                <option value="all">All Types</option>
                {Object.entries(CAMPAIGN_TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              
              <select value={prodF} onChange={(e) => setProdF(e.target.value as ProductLine | "all")} className={sel}>
                <option value="all">All Products</option>
                {Object.entries(PRODUCT_LINE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              
              {hasFilters && (
                <button
                  onClick={() => { setSearch(""); setStatusF("all"); setTypeF("all"); setProdF("all"); }}
                  className="h-10 px-4 rounded-xl bg-red-bg text-red border border-red/20 text-sm font-medium flex items-center gap-2 hover:bg-red/20 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Results info */}
      {hasFilters && filtered.length > 0 && (
        <p className="text-sm text-text-secondary mb-4 animate-in">
          Showing <span className="font-semibold text-text">{filtered.length}</span> of {campaigns.length} campaigns
        </p>
      )}

      {/* List */}
      {campaigns.length === 0 ? (
        <div className="glass rounded-3xl p-16 text-center animate-in">
          <div className="w-20 h-20 rounded-2xl bg-yellow-bg border border-yellow/20 flex items-center justify-center mx-auto mb-6 animate-glow">
            <Sparkles className="w-8 h-8 text-yellow" />
          </div>
          <h3 className="text-xl font-bold text-text mb-2">Create Your First Campaign</h3>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Launch your marketing efforts by creating a new campaign. Track progress, manage budgets, and hit your goals.
          </p>
          <Link href="/campaigns/new" className="h-12 px-6 btn-primary inline-flex items-center gap-2 text-sm font-semibold">
            <Plus className="w-4 h-4" />
            Create Campaign
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center animate-in">
          <div className="w-14 h-14 rounded-xl bg-elevated border border-border flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-text-tertiary" />
          </div>
          <h3 className="text-lg font-semibold text-text mb-2">No matches found</h3>
          <p className="text-text-secondary mb-6">Try adjusting your search or filter criteria.</p>
          <button
            onClick={() => { setSearch(""); setStatusF("all"); setTypeF("all"); setProdF("all"); }}
            className="h-10 px-5 btn-secondary text-sm font-medium"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c, i) => (
            <div key={c.id} className="animate-in" style={{ animationDelay: `${Math.min((i + 2) * 50, 300)}ms` }}>
              <CampaignCard campaign={c} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

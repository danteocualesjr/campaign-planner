"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, X, Sparkles, SlidersHorizontal } from "lucide-react";
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
    <div className="p-6 lg:p-8">
      <div className="h-10 w-48 bg-subtle rounded-lg animate-pulse mb-6" />
      <div className="h-10 bg-subtle rounded-lg animate-pulse mb-4" />
      <div className="space-y-2">
        {[1,2,3].map(i => <div key={i} className="h-20 bg-subtle rounded-xl animate-pulse" />)}
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

  const sel = "h-9 px-3 rounded-lg input text-[12px] cursor-pointer appearance-none pr-7 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMyA0LjVMNiA3LjVMOSA0LjUiIHN0cm9rZT0icmdiYSgxNjEsMTYxLDE3MCwxKSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-no-repeat bg-[right_10px_center]";

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 animate-in">
        <div>
          <h1 className="text-xl font-bold text-text">Campaigns</h1>
          <p className="text-[13px] text-text-muted mt-0.5">{campaigns.length} total</p>
        </div>
        <Link href="/campaigns/new" className="h-10 px-4 btn btn-primary w-fit">
          <Plus className="w-4 h-4" />
          New Campaign
        </Link>
      </div>

      {/* Filters */}
      {campaigns.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-in delay-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search campaigns..."
              className="w-full h-10 pl-10 pr-10 input text-[13px]"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-subtle hover:text-text">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-muted">
              <SlidersHorizontal className="w-3.5 h-3.5 text-text-subtle ml-1.5" />
              <select value={statusF} onChange={(e) => setStatusF(e.target.value as CampaignStatus | "all")} className={sel}>
                <option value="all">Status</option>
                {Object.entries(CAMPAIGN_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <select value={typeF} onChange={(e) => setTypeF(e.target.value as CampaignType | "all")} className={sel}>
                <option value="all">Type</option>
                {Object.entries(CAMPAIGN_TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <select value={prodF} onChange={(e) => setProdF(e.target.value as ProductLine | "all")} className={sel}>
                <option value="all">Product</option>
                {Object.entries(PRODUCT_LINE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            {hasFilters && (
              <button
                onClick={() => { setSearch(""); setStatusF("all"); setTypeF("all"); setProdF("all"); }}
                className="h-9 px-3 btn btn-ghost text-[12px] text-danger"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* List */}
      {campaigns.length === 0 ? (
        <div className="card p-12 text-center animate-in">
          <div className="w-14 h-14 rounded-2xl bg-lemon-muted flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-lemon" />
          </div>
          <h3 className="text-[16px] font-semibold text-text mb-1">No campaigns yet</h3>
          <p className="text-[14px] text-text-muted mb-6">Create your first campaign to get started.</p>
          <Link href="/campaigns/new" className="h-10 px-4 btn btn-primary inline-flex">
            <Plus className="w-4 h-4" />
            Create Campaign
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card p-12 text-center animate-in">
          <p className="text-[14px] text-text-muted">No campaigns match your filters.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((c, i) => (
            <div key={c.id} className="animate-in" style={{ animationDelay: `${(i + 2) * 50}ms` }}>
              <CampaignCard campaign={c} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

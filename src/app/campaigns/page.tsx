"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, X, Sparkles, SlidersHorizontal } from "lucide-react";
import { Campaign, CampaignStatus, CampaignType, ProductLine } from "@/lib/types";
import { getCampaigns } from "@/lib/storage";
import {
  CAMPAIGN_STATUS_LABELS,
  CAMPAIGN_TYPE_LABELS,
  PRODUCT_LINE_LABELS,
} from "@/lib/constants";
import CampaignCard from "@/components/CampaignCard";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [statusF, setStatusF] = useState<CampaignStatus | "all">("all");
  const [typeF, setTypeF] = useState<CampaignType | "all">("all");
  const [prodF, setProdF] = useState<ProductLine | "all">("all");

  useEffect(() => {
    setCampaigns(getCampaigns());
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div>
        <div className="h-20 skeleton mb-12" />
        <div className="h-12 skeleton mb-8" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-36 skeleton" style={{ borderRadius: "2.5rem" }} />
          ))}
        </div>
      </div>
    );
  }

  const filtered = campaigns.filter((c) => {
    if (
      search &&
      !c.name.toLowerCase().includes(search.toLowerCase()) &&
      !c.description.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    if (statusF !== "all" && c.status !== statusF) return false;
    if (typeF !== "all" && c.type !== typeF) return false;
    if (prodF !== "all" && !c.productLines.includes(prodF)) return false;
    return true;
  });

  const hasFilters = statusF !== "all" || typeF !== "all" || prodF !== "all" || search;

  const selectClass =
    "input h-10 w-auto px-4 text-sm bg-surface-lowest cursor-pointer border border-outline-variant/20 rounded-full";

  return (
    <>
      {/* Header */}
      <header className="mb-12 flex items-end justify-between animate-enter">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-sl400 mb-2">
            All Campaigns
          </p>
          <h1 className="text-[3.5rem] font-bold tracking-tight text-on-bg leading-none">
            Campaigns
          </h1>
          <p className="text-lg text-on-surface-variant font-medium mt-3">
            {campaigns.length} total ·{" "}
            {campaigns.filter((c) => c.status === "active").length} active
          </p>
        </div>
        <Link href="/campaigns/new" className="btn-cta px-5 py-2.5 rounded-full text-sm">
          <Plus className="w-4 h-4" />
          New Campaign
        </Link>
      </header>

      {/* Filters */}
      {campaigns.length > 0 && (
        <div className="card-surface p-4 mb-8 animate-enter delay-1">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sl400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search campaigns..."
                className="input pl-11 h-12 bg-surface-lowest border border-outline-variant/20 rounded-full"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-sl200 flex items-center justify-center text-sl500 hover:text-sl900"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 px-3 text-sl400">
                <SlidersHorizontal className="w-4 h-4" />
              </div>

              <select
                value={statusF}
                onChange={(e) => setStatusF(e.target.value as CampaignStatus | "all")}
                className={selectClass}
              >
                <option value="all">All Status</option>
                {Object.entries(CAMPAIGN_STATUS_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>

              <select
                value={typeF}
                onChange={(e) => setTypeF(e.target.value as CampaignType | "all")}
                className={selectClass}
              >
                <option value="all">All Types</option>
                {Object.entries(CAMPAIGN_TYPE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>

              <select
                value={prodF}
                onChange={(e) => setProdF(e.target.value as ProductLine | "all")}
                className={selectClass}
              >
                <option value="all">All Products</option>
                {Object.entries(PRODUCT_LINE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>

              {hasFilters && (
                <button
                  onClick={() => {
                    setSearch("");
                    setStatusF("all");
                    setTypeF("all");
                    setProdF("all");
                  }}
                  className="btn-ghost px-4 py-2 text-sm text-md-error"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {hasFilters && filtered.length > 0 && (
        <p className="text-sm text-on-surface-variant mb-4 px-2">
          Showing {filtered.length} of {campaigns.length}
        </p>
      )}

      {/* Campaign List */}
      <section className="space-y-4 animate-enter delay-2">
        {campaigns.length === 0 ? (
          <div className="card-surface p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary-container/30 flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-md-primary" />
            </div>
            <h3 className="text-xl font-bold text-on-bg mb-2">No campaigns yet</h3>
            <p className="text-on-surface-variant mb-8 max-w-sm">
              Create your first campaign to start tracking your marketing initiatives.
            </p>
            <Link href="/campaigns/new" className="btn-cta px-6 py-3 rounded-full text-sm">
              <Plus className="w-4 h-4" />
              Create Campaign
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card-surface p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-sl400" />
            </div>
            <h3 className="text-xl font-bold text-on-bg mb-2">No matches</h3>
            <p className="text-on-surface-variant mb-6">
              No campaigns match your filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setStatusF("all");
                setTypeF("all");
                setProdF("all");
              }}
              className="btn-outline px-6 py-3 text-sm"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          filtered.map((campaign, i) => (
            <div
              key={campaign.id}
              className="animate-enter"
              style={{ animationDelay: `${200 + i * 50}ms` }}
            >
              <CampaignCard campaign={campaign} />
            </div>
          ))
        )}
      </section>
    </>
  );
}

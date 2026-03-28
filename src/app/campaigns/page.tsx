"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, X, Sparkles, Filter } from "lucide-react";
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
      <div className="p-6 lg:p-10">
        <div className="h-12 skeleton w-48 mb-8" />
        <div className="h-12 skeleton mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 skeleton" />
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

  return (
    <div className="p-6 lg:p-10 max-w-6xl">
      {/* Header */}
      <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 animate-enter">
        <div>
          <p className="overline mb-2">All Campaigns</p>
          <h1 className="display text-text-primary">Campaigns</h1>
          <p className="body text-text-secondary mt-2">
            {campaigns.length} total · {campaigns.filter((c) => c.status === "active").length}{" "}
            active
          </p>
        </div>
        <Link href="/campaigns/new" className="btn btn-primary btn-md w-fit">
          <Plus className="w-5 h-5" />
          New Campaign
        </Link>
      </section>

      {/* Filters */}
      {campaigns.length > 0 && (
        <section className="card p-4 mb-8 animate-enter delay-1">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search campaigns..."
                className="input pl-12"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-bg-tertiary flex items-center justify-center text-text-muted hover:text-text-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter dropdowns */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-text-muted">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filters:</span>
              </div>

              <select
                value={statusF}
                onChange={(e) => setStatusF(e.target.value as CampaignStatus | "all")}
                className="input h-10 w-auto px-3 text-sm"
              >
                <option value="all">All Status</option>
                {Object.entries(CAMPAIGN_STATUS_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>

              <select
                value={typeF}
                onChange={(e) => setTypeF(e.target.value as CampaignType | "all")}
                className="input h-10 w-auto px-3 text-sm"
              >
                <option value="all">All Types</option>
                {Object.entries(CAMPAIGN_TYPE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>

              <select
                value={prodF}
                onChange={(e) => setProdF(e.target.value as ProductLine | "all")}
                className="input h-10 w-auto px-3 text-sm"
              >
                <option value="all">All Products</option>
                {Object.entries(PRODUCT_LINE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
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
                  className="btn btn-ghost btn-sm text-danger"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {hasFilters && filtered.length > 0 && (
        <p className="body text-text-secondary mb-4">
          Showing {filtered.length} of {campaigns.length} campaigns
        </p>
      )}

      {/* List */}
      <section className="animate-enter delay-2">
        {campaigns.length === 0 ? (
          <div className="card empty-state">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <h3 className="title text-text-primary mb-2">No campaigns yet</h3>
            <p className="body text-text-secondary mb-8 max-w-sm">
              Create your first campaign to start tracking your marketing initiatives.
            </p>
            <Link href="/campaigns/new" className="btn btn-primary btn-md">
              <Plus className="w-5 h-5" />
              Create Campaign
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card empty-state">
            <div className="w-16 h-16 rounded-2xl bg-bg-tertiary flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="title text-text-primary mb-2">No matches</h3>
            <p className="body text-text-secondary mb-6">
              No campaigns match your current filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setStatusF("all");
                setTypeF("all");
                setProdF("all");
              }}
              className="btn btn-secondary btn-md"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((campaign, i) => (
              <div
                key={campaign.id}
                className="animate-enter"
                style={{ animationDelay: `${200 + i * 40}ms` }}
              >
                <CampaignCard campaign={campaign} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Sparkles, Megaphone } from "lucide-react";
import { Campaign, CampaignStatus, CampaignType, ProductLine } from "@/lib/types";
import { getCampaigns } from "@/lib/storage";
import CampaignCard from "@/components/CampaignCard";
import FilterBar from "@/components/FilterBar";

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
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-card rounded-xl w-64" />
        <div className="h-12 bg-card rounded-xl" />
        {[1,2,3].map(i=><div key={i} className="h-32 bg-card rounded-2xl" />)}
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

  return (
    <div className="p-6 lg:p-8 max-w-[1100px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 anim-fade">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
            <Megaphone className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h1 className="text-[24px] font-bold text-primary tracking-tight">Campaigns</h1>
            <p className="text-[13px] text-muted">{campaigns.length} campaign{campaigns.length !== 1 ? "s" : ""} total</p>
          </div>
        </div>
        <Link href="/campaigns/new" className="h-10 px-5 rounded-xl btn-primary text-[13px] flex items-center gap-2 w-fit">
          <Plus className="w-4 h-4" /> New Campaign
        </Link>
      </div>

      {/* Filters */}
      {campaigns.length > 0 && <div className="mb-6 anim-fade delay-1"><FilterBar search={search} onSearchChange={setSearch} statusFilter={statusF} onStatusChange={setStatusF} typeFilter={typeF} onTypeChange={setTypeF} productFilter={prodF} onProductChange={setProdF} /></div>}

      {/* List */}
      {campaigns.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center anim-fade">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 bg-accent/30 rounded-2xl blur-xl" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-accent" />
            </div>
          </div>
          <h3 className="text-[16px] font-semibold text-primary mb-2">No campaigns yet</h3>
          <p className="text-[13px] text-secondary mb-6">Create your first campaign to get started.</p>
          <Link href="/campaigns/new" className="inline-flex h-10 px-5 rounded-xl btn-primary text-[13px] items-center gap-2">
            <Plus className="w-4 h-4" /> Create Campaign
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center anim-fade">
          <p className="text-[14px] text-secondary">No campaigns match your filters.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c, i) => (
            <div key={c.id} className={`anim-fade delay-${Math.min(i + 2, 5)}`}>
              <CampaignCard campaign={c} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
      <div className="space-y-4">
        <div className="h-9 bg-card rounded-lg w-48 animate-pulse" />
        <div className="h-10 bg-card rounded-lg animate-pulse" />
        {[1,2,3].map(i => <div key={i} className="h-28 bg-card rounded-xl animate-pulse" />)}
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
    <div className="p-6 lg:p-8 max-w-[1060px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 anim-fade">
        <div>
          <h1 className="text-[22px] font-bold text-primary tracking-tight">Campaigns</h1>
          <p className="text-[12px] text-muted mt-0.5">{campaigns.length} total</p>
        </div>
        <Link href="/campaigns/new" className="h-9 px-4 rounded-lg btn-primary text-[12px] flex items-center gap-1.5 w-fit">
          <Plus className="w-3.5 h-3.5" /> New Campaign
        </Link>
      </div>

      {campaigns.length > 0 && (
        <div className="mb-5 anim-fade delay-1">
          <FilterBar search={search} onSearchChange={setSearch} statusFilter={statusF} onStatusChange={setStatusF} typeFilter={typeF} onTypeChange={setTypeF} productFilter={prodF} onProductChange={setProdF} />
        </div>
      )}

      {campaigns.length === 0 ? (
        <div className="glass rounded-xl p-10 text-center anim-fade">
          <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-[15px] font-semibold text-primary mb-1">No campaigns yet</h3>
          <p className="text-[12px] text-muted mb-4">Create your first campaign to get started.</p>
          <Link href="/campaigns/new" className="inline-flex h-9 px-4 rounded-lg btn-primary text-[12px] items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Create Campaign
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass rounded-xl p-10 text-center anim-fade">
          <p className="text-[13px] text-muted">No campaigns match your filters.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((c, i) => (
            <div key={c.id} className="anim-fade" style={{ animationDelay: `${Math.min((i + 2) * 0.05, 0.25)}s` }}>
              <CampaignCard campaign={c} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

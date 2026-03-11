"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Sparkles } from "lucide-react";
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

  if (!mounted) return <div className="p-6 lg:p-8"><div className="animate-pulse space-y-4"><div className="h-8 bg-gray-100 rounded w-48" /><div className="h-10 bg-gray-100 rounded-lg" />{[1,2,3].map(i=><div key={i} className="h-28 bg-gray-100 rounded-xl" />)}</div></div>;

  const filtered = campaigns.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusF !== "all" && c.status !== statusF) return false;
    if (typeF !== "all" && c.type !== typeF) return false;
    if (prodF !== "all" && !c.productLines.includes(prodF)) return false;
    return true;
  });

  return (
    <div className="p-6 lg:p-8 max-w-[1080px]">
      <div className="flex items-end justify-between mb-6 anim-enter">
        <div>
          <h1 className="text-[24px] font-bold text-navy-900 tracking-tight">Campaigns</h1>
          <p className="text-[13px] text-gray-400 mt-0.5">{campaigns.length} campaign{campaigns.length !== 1 ? "s" : ""} total</p>
        </div>
        <Link href="/campaigns/new" className="h-9 px-3.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-[13px] font-semibold transition-colors flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> New Campaign
        </Link>
      </div>

      {campaigns.length > 0 && <div className="mb-5 anim-enter delay-1"><FilterBar search={search} onSearchChange={setSearch} statusFilter={statusF} onStatusChange={setStatusF} typeFilter={typeF} onTypeChange={setTypeF} productFilter={prodF} onProductChange={setProdF} /></div>}

      {campaigns.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center anim-enter">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4"><Sparkles className="w-6 h-6 text-brand-500" /></div>
          <h3 className="text-[15px] font-semibold text-navy-900 mb-1">No campaigns yet</h3>
          <p className="text-[13px] text-gray-400 mb-5">Create your first campaign to get started.</p>
          <Link href="/campaigns/new" className="inline-flex h-9 px-3.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-[13px] font-semibold transition-colors items-center gap-1.5"><Plus className="w-4 h-4" /> Create Campaign</Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center"><p className="text-[13px] text-gray-400">No campaigns match your filters.</p></div>
      ) : (
        <div className="space-y-2">{filtered.map((c) => <CampaignCard key={c.id} campaign={c} />)}</div>
      )}
    </div>
  );
}

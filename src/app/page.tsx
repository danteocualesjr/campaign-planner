"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Megaphone, Rocket, DollarSign, Plus, FileText, Sparkles, ArrowRight } from "lucide-react";
import { Campaign, CampaignTemplate } from "@/lib/types";
import { getCampaigns, createCampaign } from "@/lib/storage";
import StatsCard from "@/components/StatsCard";
import CampaignCard from "@/components/CampaignCard";
import TemplatePickerModal from "@/components/TemplatePickerModal";

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  useEffect(() => { setCampaigns(getCampaigns()); setMounted(true); }, []);

  function handleTemplate(t: CampaignTemplate) {
    const now = new Date(); const later = new Date(Date.now() + 14 * 86400000);
    createCampaign({
      name: t.defaults.name || t.name, description: t.defaults.description || "",
      type: t.defaults.type || "social_media", status: "draft",
      productLines: t.defaults.productLines || [], channels: t.defaults.channels || [],
      region: t.defaults.region || "all_branches",
      startDate: now.toISOString().split("T")[0], endDate: later.toISOString().split("T")[0],
      budget: t.defaults.budget || 0, notes: t.defaults.notes || "",
      checklist: t.defaults.checklist || [],
    });
    setCampaigns(getCampaigns()); setShowTemplates(false);
  }

  if (!mounted) return (
    <div className="p-6 lg:p-8"><div className="animate-pulse space-y-5">
      <div className="h-10 bg-gray-100 rounded-xl w-64" />
      <div className="grid grid-cols-3 gap-4">{[1,2,3].map((i)=><div key={i} className="h-24 bg-gray-100 rounded-xl" />)}</div>
    </div></div>
  );

  const active = campaigns.filter((c) => c.status === "active");
  const upcoming = campaigns.filter((c) => c.status === "draft" && new Date(c.startDate) > new Date());
  const budget = campaigns.filter((c) => c.status === "active" || c.status === "draft").reduce((s, c) => s + c.budget, 0);
  const recent = campaigns.slice(0, 5);

  return (
    <div className="p-6 lg:p-8 max-w-[1080px]">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 anim-enter">
        <div>
          <p className="text-[13px] font-medium text-gray-400 mb-1">Welcome back</p>
          <h1 className="text-[24px] font-bold text-navy-900 tracking-tight">Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowTemplates(true)}
            className="h-9 px-3 rounded-lg ring-1 ring-gray-200 text-[13px] font-medium text-gray-600 hover:bg-white hover:ring-gray-300 transition-all flex items-center gap-1.5">
            <FileText className="w-4 h-4" /> Template
          </button>
          <Link href="/campaigns/new"
            className="h-9 px-3.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-[13px] font-semibold transition-colors flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> New Campaign
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="anim-enter delay-1"><StatsCard label="Active Campaigns" value={active.length} icon={Megaphone} color="green" /></div>
        <div className="anim-enter delay-2"><StatsCard label="Upcoming Launches" value={upcoming.length} icon={Rocket} color="blue" /></div>
        <div className="anim-enter delay-3"><StatsCard label="Allocated Budget" value={`₱${budget.toLocaleString()}`} icon={DollarSign} color="amber" /></div>
      </div>

      {/* Recent */}
      <div className="anim-enter delay-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-bold text-navy-900">Recent Campaigns</h2>
          {campaigns.length > 0 && (
            <Link href="/campaigns" className="text-[13px] font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 group">
              View all <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>

        {recent.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-brand-500" />
            </div>
            <h3 className="text-[15px] font-semibold text-navy-900 mb-1">No campaigns yet</h3>
            <p className="text-[13px] text-gray-400 mb-5 max-w-xs mx-auto">Create your first campaign to start planning The Lemon Co. marketing efforts.</p>
            <div className="flex justify-center gap-2">
              <button onClick={() => setShowTemplates(true)} className="h-9 px-3 rounded-lg ring-1 ring-gray-200 text-[13px] font-medium text-gray-600 hover:bg-white transition-all flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Use Template
              </button>
              <Link href="/campaigns/new" className="h-9 px-3.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-[13px] font-semibold transition-colors flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Create Campaign
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-2">{recent.map((c) => <CampaignCard key={c.id} campaign={c} />)}</div>
        )}
      </div>

      <TemplatePickerModal open={showTemplates} onClose={() => setShowTemplates(false)} onSelect={handleTemplate} />
    </div>
  );
}

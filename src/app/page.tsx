"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Megaphone, Rocket, DollarSign, Plus, FileText, Sparkles, ArrowRight, Zap } from "lucide-react";
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
    <div className="p-6 lg:p-8">
      <div className="animate-pulse space-y-6">
        <div className="h-32 bg-card rounded-2xl" />
        <div className="grid grid-cols-3 gap-4">{[1,2,3].map((i)=><div key={i} className="h-28 bg-card rounded-2xl" />)}</div>
      </div>
    </div>
  );

  const active = campaigns.filter((c) => c.status === "active");
  const upcoming = campaigns.filter((c) => c.status === "draft" && new Date(c.startDate) > new Date());
  const budget = campaigns.filter((c) => c.status === "active" || c.status === "draft").reduce((s, c) => s + c.budget, 0);
  const recent = campaigns.slice(0, 5);

  return (
    <div className="p-6 lg:p-8 max-w-[1100px]">
      {/* Hero */}
      <div className="relative overflow-hidden glass rounded-2xl p-6 sm:p-8 mb-8 anim-fade">
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple/15 rounded-full blur-3xl" />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-[11px] font-semibold text-accent uppercase tracking-wider">Campaign Planner</span>
            </div>
            <h1 className="text-[28px] sm:text-[32px] font-bold text-primary tracking-tight mb-2">
              Welcome to <span className="gradient-text">The Lemon Co.</span>
            </h1>
            <p className="text-[14px] text-secondary max-w-md">Plan, schedule, and track marketing campaigns across your entire franchise network.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setShowTemplates(true)} className="h-10 px-4 rounded-xl btn-ghost text-[13px] flex items-center gap-2">
              <FileText className="w-4 h-4" /> Template
            </button>
            <Link href="/campaigns/new" className="h-10 px-5 rounded-xl btn-primary text-[13px] flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Campaign
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="anim-fade delay-1"><StatsCard label="Active Campaigns" value={active.length} icon={Megaphone} color="green" /></div>
        <div className="anim-fade delay-2"><StatsCard label="Upcoming Launches" value={upcoming.length} icon={Rocket} color="blue" /></div>
        <div className="anim-fade delay-3"><StatsCard label="Allocated Budget" value={`₱${budget.toLocaleString()}`} icon={DollarSign} color="gold" /></div>
      </div>

      {/* Recent */}
      <div className="anim-fade delay-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] font-bold text-primary">Recent Campaigns</h2>
          {campaigns.length > 0 && (
            <Link href="/campaigns" className="text-[13px] font-medium text-accent hover:text-accent/80 flex items-center gap-1 group transition-colors">
              View all <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>

        {recent.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 bg-accent/30 rounded-2xl blur-xl" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-accent" />
              </div>
            </div>
            <h3 className="text-[16px] font-semibold text-primary mb-2">No campaigns yet</h3>
            <p className="text-[13px] text-secondary mb-6 max-w-sm mx-auto">Create your first campaign to start planning The Lemon Co. marketing efforts.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setShowTemplates(true)} className="h-10 px-4 rounded-xl btn-ghost text-[13px] flex items-center gap-2">
                <FileText className="w-4 h-4" /> Use Template
              </button>
              <Link href="/campaigns/new" className="h-10 px-5 rounded-xl btn-primary text-[13px] flex items-center gap-2">
                <Plus className="w-4 h-4" /> Create Campaign
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">{recent.map((c, i) => <div key={c.id} className={`anim-fade delay-${Math.min(i + 1, 5)}`}><CampaignCard campaign={c} /></div>)}</div>
        )}
      </div>

      <TemplatePickerModal open={showTemplates} onClose={() => setShowTemplates(false)} onSelect={handleTemplate} />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Megaphone, Rocket, DollarSign, Plus, FileText, Sparkles, ArrowRight, TrendingUp } from "lucide-react";
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
      <div className="space-y-6">
        <div className="h-40 bg-card rounded-2xl animate-pulse" />
        <div className="grid grid-cols-3 gap-4">
          {[1,2,3].map(i => <div key={i} className="h-28 bg-card rounded-xl animate-pulse" />)}
        </div>
      </div>
    </div>
  );

  const active = campaigns.filter((c) => c.status === "active");
  const upcoming = campaigns.filter((c) => c.status === "draft" && new Date(c.startDate) > new Date());
  const budget = campaigns.filter((c) => c.status === "active" || c.status === "draft").reduce((s, c) => s + c.budget, 0);
  const recent = campaigns.slice(0, 5);

  return (
    <div className="p-6 lg:p-8 max-w-[1060px]">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl mb-8 anim-fade" style={{ background: "var(--gradient-gold)" }}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgwLDAsMCwwLjA1KSIvPjwvc3ZnPg==')] opacity-60" />
        <div className="relative px-7 py-8 sm:py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <p className="text-[11px] font-bold text-black/40 uppercase tracking-widest mb-2">Campaign Planner</p>
            <h1 className="text-[26px] sm:text-[30px] font-bold text-[#09090B] tracking-tight mb-1.5">
              Welcome back
            </h1>
            <p className="text-[14px] text-black/50 max-w-sm">
              Plan, schedule, and track campaigns across your franchise network.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setShowTemplates(true)} className="h-9 px-4 rounded-lg bg-black/10 text-[12px] font-semibold text-[#09090B] hover:bg-black/15 transition-colors flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Template
            </button>
            <Link href="/campaigns/new" className="h-9 px-4 rounded-lg bg-[#09090B] text-[12px] font-semibold text-white hover:bg-[#09090B]/90 transition-colors flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> New Campaign
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="anim-fade delay-1"><StatsCard label="Active" value={active.length} icon={Megaphone} color="green" /></div>
        <div className="anim-fade delay-2"><StatsCard label="Upcoming" value={upcoming.length} icon={Rocket} color="blue" /></div>
        <div className="anim-fade delay-3"><StatsCard label="Budget" value={`₱${budget.toLocaleString()}`} icon={DollarSign} color="gold" /></div>
      </div>

      {/* Recent campaigns */}
      <div className="anim-fade delay-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-semibold text-primary">Recent Campaigns</h2>
          {campaigns.length > 0 && (
            <Link href="/campaigns" className="text-[12px] font-medium text-accent hover:text-accent/80 flex items-center gap-1 group">
              View all <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>

        {recent.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center">
            <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-[15px] font-semibold text-primary mb-1">No campaigns yet</h3>
            <p className="text-[13px] text-muted mb-5 max-w-xs mx-auto">Create your first campaign to start planning.</p>
            <div className="flex justify-center gap-2">
              <button onClick={() => setShowTemplates(true)} className="h-9 px-4 rounded-lg btn-ghost text-[12px] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Template
              </button>
              <Link href="/campaigns/new" className="h-9 px-4 rounded-lg btn-primary text-[12px] flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" /> Create Campaign
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {recent.map((c, i) => (
              <div key={c.id} className="anim-fade" style={{ animationDelay: `${Math.min((i + 1) * 0.06, 0.3)}s` }}>
                <CampaignCard campaign={c} />
              </div>
            ))}
          </div>
        )}
      </div>

      <TemplatePickerModal open={showTemplates} onClose={() => setShowTemplates(false)} onSelect={handleTemplate} />
    </div>
  );
}

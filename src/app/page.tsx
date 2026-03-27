"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, FileText, ArrowRight, Sparkles, TrendingUp, Clock, Target } from "lucide-react";
import { Campaign, CampaignTemplate } from "@/lib/types";
import { getCampaigns, createCampaign } from "@/lib/storage";
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
    <div className="p-6">
      <div className="h-48 rounded-2xl bg-subtle animate-pulse mb-6" />
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[1,2,3].map(i => <div key={i} className="h-24 rounded-xl bg-subtle animate-pulse" />)}
      </div>
    </div>
  );

  const active = campaigns.filter((c) => c.status === "active");
  const drafts = campaigns.filter((c) => c.status === "draft");
  const budget = campaigns.filter((c) => c.status === "active" || c.status === "draft").reduce((s, c) => s + c.budget, 0);
  const recent = campaigns.slice(0, 4);

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-subtle border border-border-subtle mb-8 animate-in">
        <div className="absolute inset-0 dot-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-lemon/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative px-6 py-8 lg:px-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-lemon-muted text-lemon text-[11px] font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3 h-3" />
                Campaign Planner
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-text mb-2">
                Good morning ☀️
              </h1>
              <p className="text-text-muted text-[15px] max-w-md">
                You have <span className="text-lemon font-medium">{active.length} active</span> and{" "}
                <span className="text-text font-medium">{drafts.length} draft</span> campaigns running.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button onClick={() => setShowTemplates(true)} className="h-10 px-4 btn btn-secondary">
                <FileText className="w-4 h-4" />
                <span>Templates</span>
              </button>
              <Link href="/campaigns/new" className="h-10 px-4 btn btn-primary">
                <Plus className="w-4 h-4" />
                <span>New Campaign</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="card p-5 animate-in delay-1">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-success-muted flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-text mb-0.5">{active.length}</p>
          <p className="text-[13px] text-text-muted">Active campaigns</p>
        </div>
        
        <div className="card p-5 animate-in delay-2">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-info-muted flex items-center justify-center">
              <Clock className="w-5 h-5 text-info" />
            </div>
          </div>
          <p className="text-2xl font-bold text-text mb-0.5">{drafts.length}</p>
          <p className="text-[13px] text-text-muted">In draft</p>
        </div>
        
        <div className="card p-5 animate-in delay-3">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-lemon-muted flex items-center justify-center">
              <Target className="w-5 h-5 text-lemon" />
            </div>
          </div>
          <p className="text-2xl font-bold text-text mb-0.5">₱{budget.toLocaleString()}</p>
          <p className="text-[13px] text-text-muted">Total budget</p>
        </div>
      </div>

      {/* Recent campaigns */}
      <div className="animate-in delay-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-semibold text-text">Recent campaigns</h2>
          {campaigns.length > 0 && (
            <Link href="/campaigns" className="text-[13px] font-medium text-text-muted hover:text-lemon flex items-center gap-1 transition-colors">
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {recent.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-lemon-muted flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-lemon" />
            </div>
            <h3 className="text-[16px] font-semibold text-text mb-1">No campaigns yet</h3>
            <p className="text-[14px] text-text-muted mb-6 max-w-sm mx-auto">
              Create your first campaign to start planning your marketing.
            </p>
            <div className="flex justify-center gap-2">
              <button onClick={() => setShowTemplates(true)} className="h-10 px-4 btn btn-secondary">
                <FileText className="w-4 h-4" />
                Templates
              </button>
              <Link href="/campaigns/new" className="h-10 px-4 btn btn-primary">
                <Plus className="w-4 h-4" />
                Create Campaign
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {recent.map((c, i) => (
              <div key={c.id} className="animate-in" style={{ animationDelay: `${(i + 5) * 50}ms` }}>
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

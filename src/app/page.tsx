"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, FileText, ArrowRight, TrendingUp, Clock, DollarSign, ChevronRight, Sparkles } from "lucide-react";
import { Campaign, CampaignTemplate } from "@/lib/types";
import { getCampaigns, createCampaign } from "@/lib/storage";
import CampaignCard from "@/components/CampaignCard";
import TemplatePickerModal from "@/components/TemplatePickerModal";

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  useEffect(() => {
    setCampaigns(getCampaigns());
    setMounted(true);
  }, []);

  function handleTemplate(t: CampaignTemplate) {
    const now = new Date();
    const later = new Date(Date.now() + 14 * 86400000);
    createCampaign({
      name: t.defaults.name || t.name,
      description: t.defaults.description || "",
      type: t.defaults.type || "social_media",
      status: "draft",
      productLines: t.defaults.productLines || [],
      channels: t.defaults.channels || [],
      region: t.defaults.region || "all_branches",
      startDate: now.toISOString().split("T")[0],
      endDate: later.toISOString().split("T")[0],
      budget: t.defaults.budget || 0,
      notes: t.defaults.notes || "",
      checklist: t.defaults.checklist || [],
    });
    setCampaigns(getCampaigns());
    setShowTemplates(false);
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  if (!mounted) {
    return (
      <div className="p-6 lg:p-10">
        <div className="h-40 skeleton mb-8" />
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 skeleton" />
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 skeleton" />
          ))}
        </div>
      </div>
    );
  }

  const active = campaigns.filter((c) => c.status === "active");
  const drafts = campaigns.filter((c) => c.status === "draft");
  const budget = campaigns
    .filter((c) => c.status === "active" || c.status === "draft")
    .reduce((s, c) => s + c.budget, 0);
  const recent = campaigns.slice(0, 5);

  return (
    <div className="p-6 lg:p-10 max-w-6xl">
      {/* Hero */}
      <section className="mb-12 animate-enter">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="overline mb-2">Dashboard</p>
            <h1 className="display text-text-primary mb-3">{greeting}</h1>
            <p className="body text-text-secondary max-w-md">
              You have{" "}
              <span className="text-accent font-semibold">{active.length} active</span> and{" "}
              <span className="text-text-primary font-semibold">{drafts.length} draft</span>{" "}
              campaigns running.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowTemplates(true)} className="btn btn-secondary btn-md">
              <FileText className="w-5 h-5" />
              Templates
            </button>
            <Link href="/campaigns/new" className="btn btn-primary btn-md">
              <Plus className="w-5 h-5" />
              New Campaign
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="card p-6 animate-enter delay-1">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-3xl font-bold text-text-primary">{active.length}</p>
              <p className="caption">Active campaigns</p>
            </div>
          </div>
        </div>

        <div className="card p-6 animate-enter delay-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-info" />
            </div>
            <div>
              <p className="text-3xl font-bold text-text-primary">{drafts.length}</p>
              <p className="caption">In draft</p>
            </div>
          </div>
        </div>

        <div className="card p-6 animate-enter delay-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-3xl font-bold text-text-primary">₱{budget.toLocaleString()}</p>
              <p className="caption">Total budget</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Campaigns */}
      <section className="animate-enter delay-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="headline text-text-primary">Recent Campaigns</h2>
          {campaigns.length > 0 && (
            <Link
              href="/campaigns"
              className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors"
            >
              <span className="body">View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {recent.length === 0 ? (
          <div className="card empty-state">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <h3 className="title text-text-primary mb-2">No campaigns yet</h3>
            <p className="body text-text-secondary mb-8 max-w-sm">
              Create your first campaign to start tracking your marketing initiatives.
            </p>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowTemplates(true)} className="btn btn-secondary btn-md">
                <FileText className="w-5 h-5" />
                Use Template
              </button>
              <Link href="/campaigns/new" className="btn btn-primary btn-md">
                <Plus className="w-5 h-5" />
                Create Campaign
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {recent.map((campaign, i) => (
              <div
                key={campaign.id}
                className="animate-enter"
                style={{ animationDelay: `${300 + i * 50}ms` }}
              >
                <CampaignCard campaign={campaign} />
              </div>
            ))}
          </div>
        )}
      </section>

      <TemplatePickerModal
        open={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelect={handleTemplate}
      />
    </div>
  );
}

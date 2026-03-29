"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, FileText, Rocket, PenLine, Wallet, CirclePlus, Quote } from "lucide-react";

function Sparkline() {
  return (
    <div className="w-36 h-16 overflow-hidden">
      <svg viewBox="0 0 120 48" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#785a00" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#785a00" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 40 Q 15 28, 25 32 T 45 18 T 65 24 T 85 8 T 105 14 L 120 10 L 120 48 L 0 48 Z"
          fill="url(#sparkFill)"
        >
          <animate attributeName="d" dur="4s" repeatCount="indefinite" values="
            M0 40 Q 15 28, 25 32 T 45 18 T 65 24 T 85 8 T 105 14 L 120 10 L 120 48 L 0 48 Z;
            M0 36 Q 15 32, 25 26 T 45 22 T 65 16 T 85 12 T 105 18 L 120 8 L 120 48 L 0 48 Z;
            M0 40 Q 15 28, 25 32 T 45 18 T 65 24 T 85 8 T 105 14 L 120 10 L 120 48 L 0 48 Z
          " />
        </path>
        <path
          d="M0 40 Q 15 28, 25 32 T 45 18 T 65 24 T 85 8 T 105 14 L 120 10"
          stroke="#785a00"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        >
          <animate attributeName="d" dur="4s" repeatCount="indefinite" values="
            M0 40 Q 15 28, 25 32 T 45 18 T 65 24 T 85 8 T 105 14 L 120 10;
            M0 36 Q 15 32, 25 26 T 45 22 T 65 16 T 85 12 T 105 18 L 120 8;
            M0 40 Q 15 28, 25 32 T 45 18 T 65 24 T 85 8 T 105 14 L 120 10
          " />
        </path>
        <circle r="4" fill="#785a00">
          <animate attributeName="cx" dur="4s" repeatCount="indefinite" values="120;120;120" />
          <animate attributeName="cy" dur="4s" repeatCount="indefinite" values="10;8;10" />
        </circle>
      </svg>
    </div>
  );
}
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
      <div>
        <div className="h-40 skeleton mb-12" />
        <div className="grid grid-cols-3 gap-8 mb-16">
          {[1, 2, 3].map((i) => <div key={i} className="h-44 skeleton" />)}
        </div>
        <div className="space-y-4">
          {[1, 2].map((i) => <div key={i} className="h-36 skeleton" style={{ borderRadius: "2.5rem" }} />)}
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
    <>
      {/* Welcome Header */}
      <header className="mb-12 flex items-end justify-between animate-enter">
        <div className="max-w-2xl">
          <h1 className="text-[3.5rem] font-bold tracking-tight text-on-bg leading-none mb-4">
            {greeting},{" "}
            <span className="text-md-primary italic">Alex.</span>
          </h1>
          <p className="text-lg text-on-surface-variant font-medium">
            You have{" "}
            <span className="text-on-bg font-bold">{active.length} active</span> and{" "}
            <span className="text-on-bg font-bold">{drafts.length} draft</span> campaigns
            running. Your editorial queue looks clear for the next 48 hours.
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-3 pb-2">
          <button onClick={() => setShowTemplates(true)} className="btn-outline px-5 py-2.5 text-sm">
            <FileText className="w-4 h-4" />
            Templates
          </button>
          <Link href="/campaigns/new" className="btn-cta px-5 py-2.5 rounded-full text-sm">
            <Plus className="w-4 h-4" />
            New Campaign
          </Link>
        </div>
      </header>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Active */}
        <div className="card-surface p-8 flex flex-col justify-between animate-enter delay-1">
          <div className="flex items-start justify-between mb-8">
            <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-md-tertiary">
              <Rocket className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/60">
              Live Now
            </span>
          </div>
          <div>
            <span className="text-5xl font-black text-on-bg tracking-tighter">
              {active.length}
            </span>
            <h3 className="text-on-surface-variant font-medium mt-1">Active campaigns</h3>
          </div>
        </div>

        {/* Drafts */}
        <div className="card-surface p-8 flex flex-col justify-between animate-enter delay-2">
          <div className="flex items-start justify-between mb-8">
            <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-md-secondary">
              <PenLine className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/60">
              In Progress
            </span>
          </div>
          <div>
            <span className="text-5xl font-black text-on-bg tracking-tighter">
              {drafts.length}
            </span>
            <h3 className="text-on-surface-variant font-medium mt-1">In draft</h3>
          </div>
        </div>

        {/* Budget */}
        <div className="card-surface p-8 flex flex-col justify-between animate-enter delay-3">
          <div className="flex items-start justify-between mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container">
              <Wallet className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/60">
              Allocation
            </span>
          </div>
          <div>
            <span className="text-5xl font-black text-on-bg tracking-tighter">
              ₱{budget.toLocaleString()}
            </span>
            <h3 className="text-on-surface-variant font-medium mt-1">Total budget</h3>
          </div>
        </div>
      </div>

      {/* Recent Campaigns */}
      <section className="space-y-6 animate-enter delay-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-bold tracking-tight text-on-bg">Recent Campaigns</h2>
          {campaigns.length > 0 && (
            <Link
              href="/campaigns"
              className="text-sm font-bold text-md-primary hover:underline"
            >
              View all archive
            </Link>
          )}
        </div>

        <div className="space-y-4">
          {recent.length > 0 ? (
            <>
              {recent.map((campaign, i) => (
                <div
                  key={campaign.id}
                  className="animate-enter"
                  style={{ animationDelay: `${300 + i * 60}ms` }}
                >
                  <CampaignCard campaign={campaign} />
                </div>
              ))}
            </>
          ) : null}

          {/* Empty state / Add more CTA */}
          <button
            onClick={() => setShowTemplates(true)}
            className="empty-dashed w-full p-12 flex flex-col items-center justify-center text-center cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4">
              <CirclePlus className="w-8 h-8 text-outline" />
            </div>
            <p className="font-bold text-on-surface-variant">Plan your next blockbuster</p>
            <p className="text-sm text-on-surface-variant/60">
              {campaigns.length === 0
                ? "Create your first campaign to get started."
                : "The editorial calendar is wide open for the next month."}
            </p>
          </button>
        </div>
      </section>

      {/* Quote + Insight Section */}
      <section className="mt-24 flex flex-col lg:flex-row gap-12 items-start animate-enter delay-5">
        {/* Quote card */}
        <div className="w-full lg:w-1/3 p-10 bg-primary-container rounded-[3rem] relative overflow-hidden">
          <div className="relative z-10">
            <Quote className="w-10 h-10 text-on-primary-container mb-4" />
            <p className="text-2xl font-bold leading-tight text-on-primary-container">
              "Consistency is the currency of premium brands."
            </p>
            <p className="mt-6 text-sm font-bold text-on-primary-container/60 uppercase tracking-widest">
              Lemon Co. Brand Ethos
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/20 blur-3xl rounded-full" />
        </div>

        {/* Insight card */}
        <div className="flex-1 pt-0 lg:pt-6">
          <h3 className="text-on-surface-variant/40 text-[11px] font-black uppercase tracking-[0.3em] mb-4">
            Market Sentiment
          </h3>
          <div className="bg-surface-dim/20 p-8 rounded-[2rem] border border-white/40">
            <div className="flex items-center gap-8 flex-wrap">
              <div>
                <span className="text-3xl font-black text-on-bg">84%</span>
                <p className="text-sm font-medium text-on-surface-variant">Brand Health Index</p>
              </div>
              <div className="hidden sm:block h-12 w-px bg-outline-variant/30" />
              <div>
                <span className="text-3xl font-black text-on-bg">+12.4%</span>
                <p className="text-sm font-medium text-on-surface-variant">
                  Engagement velocity
                </p>
              </div>
              <div className="ml-auto hidden md:block">
                <Sparkline />
              </div>
            </div>
          </div>
        </div>
      </section>

      <TemplatePickerModal
        open={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelect={handleTemplate}
      />
    </>
  );
}

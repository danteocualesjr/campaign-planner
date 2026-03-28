"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, FileText, ArrowRight, Sparkles, TrendingUp, Clock, DollarSign, Megaphone, Calendar, ChevronRight, Rocket } from "lucide-react";
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

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  if (!mounted) return (
    <div className="p-6 lg:p-8">
      <div className="h-64 rounded-3xl bg-card animate-pulse mb-6" />
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[1,2,3,4].map(i => <div key={i} className="h-32 rounded-2xl bg-card animate-pulse" />)}
      </div>
    </div>
  );

  const active = campaigns.filter((c) => c.status === "active");
  const drafts = campaigns.filter((c) => c.status === "draft");
  const completed = campaigns.filter((c) => c.status === "completed");
  const budget = campaigns.filter((c) => c.status === "active" || c.status === "draft").reduce((s, c) => s + c.budget, 0);
  const recent = campaigns.slice(0, 5);

  const stats = [
    { label: "Total Campaigns", value: campaigns.length, icon: Megaphone, color: "purple", glow: "glow-purple" },
    { label: "Active", value: active.length, icon: TrendingUp, color: "green", glow: "glow-green" },
    { label: "In Draft", value: drafts.length, icon: Clock, color: "blue", glow: "glow-blue" },
    { label: "Total Budget", value: `₱${budget.toLocaleString()}`, icon: DollarSign, color: "yellow", glow: "glow-yellow" },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    purple: { bg: "bg-purple-bg", text: "text-purple", border: "border-purple/20" },
    green: { bg: "bg-green-bg", text: "text-green", border: "border-green/20" },
    blue: { bg: "bg-blue-bg", text: "text-blue", border: "border-blue/20" },
    yellow: { bg: "bg-yellow-bg", text: "text-yellow", border: "border-yellow/20" },
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl hero-gradient border border-border mb-8 animate-in">
        {/* Decorative elements */}
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-yellow/20 via-orange/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-purple/15 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        <div className="relative px-6 py-10 lg:px-10 lg:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow/10 border border-yellow/20 text-yellow text-xs font-semibold mb-5 animate-float">
                <Rocket className="w-3.5 h-3.5" />
                Campaign Planner
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-text mb-3 tracking-tight">
                {greeting} <span className="inline-block animate-float">✨</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-lg leading-relaxed">
                You have <span className="text-green font-semibold">{active.length} active</span> and{" "}
                <span className="text-text font-semibold">{drafts.length} draft</span> campaigns. Ready to create something amazing?
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button onClick={() => setShowTemplates(true)} className="h-12 px-5 btn-secondary flex items-center gap-2 text-sm font-semibold">
                <FileText className="w-4 h-4" />
                Templates
              </button>
              <Link href="/campaigns/new" className="h-12 px-6 btn-primary flex items-center gap-2 text-sm font-semibold">
                <Plus className="w-4 h-4" />
                New Campaign
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const colors = colorMap[stat.color];
          return (
            <div
              key={stat.label}
              className={`glass rounded-2xl p-5 ${stat.glow} animate-in`}
              style={{ animationDelay: `${(i + 1) * 80}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${colors.text}`} />
              </div>
              <p className="text-3xl font-bold text-text tracking-tight mb-1">{stat.value}</p>
              <p className="text-sm text-text-secondary">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link href="/campaigns" className="glass rounded-2xl p-5 group hover:border-border-light transition-all animate-in delay-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-purple-bg border border-purple/20 flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-purple" />
              </div>
              <div>
                <p className="font-semibold text-text group-hover:text-yellow transition-colors">All Campaigns</p>
                <p className="text-sm text-text-tertiary">{campaigns.length} total</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-yellow group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
        
        <Link href="/calendar" className="glass rounded-2xl p-5 group hover:border-border-light transition-all animate-in delay-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-bg border border-blue/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue" />
              </div>
              <div>
                <p className="font-semibold text-text group-hover:text-yellow transition-colors">Calendar View</p>
                <p className="text-sm text-text-tertiary">Plan your schedule</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-yellow group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
        
        <button onClick={() => setShowTemplates(true)} className="glass rounded-2xl p-5 group hover:border-border-light transition-all text-left animate-in delay-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-orange-bg border border-orange/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-orange" />
              </div>
              <div>
                <p className="font-semibold text-text group-hover:text-yellow transition-colors">Quick Start</p>
                <p className="text-sm text-text-tertiary">Use templates</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-yellow group-hover:translate-x-1 transition-all" />
          </div>
        </button>
      </div>

      {/* Recent Campaigns */}
      <div className="animate-in" style={{ animationDelay: '400ms' }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-text mb-1">Recent Campaigns</h2>
            <p className="text-sm text-text-secondary">Your latest marketing initiatives</p>
          </div>
          {campaigns.length > 0 && (
            <Link href="/campaigns" className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-yellow transition-colors">
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {recent.length === 0 ? (
          <div className="glass rounded-2xl p-14 text-center">
            <div className="w-20 h-20 rounded-2xl bg-yellow-bg border border-yellow/20 flex items-center justify-center mx-auto mb-6 animate-glow">
              <Sparkles className="w-8 h-8 text-yellow" />
            </div>
            <h3 className="text-xl font-bold text-text mb-2">Start Your First Campaign</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              Create your first marketing campaign to start planning and tracking your initiatives.
            </p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setShowTemplates(true)} className="h-11 px-5 btn-secondary flex items-center gap-2 text-sm font-semibold">
                <FileText className="w-4 h-4" />
                Browse Templates
              </button>
              <Link href="/campaigns/new" className="h-11 px-5 btn-primary flex items-center gap-2 text-sm font-semibold">
                <Plus className="w-4 h-4" />
                Create Campaign
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {recent.map((c, i) => (
              <div key={c.id} className="animate-in" style={{ animationDelay: `${(i + 6) * 60}ms` }}>
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

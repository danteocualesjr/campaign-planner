"use client";

import { useState } from "react";
import { Check, Zap, Sparkles, Building2, Loader2, ArrowRight, Star, Shield } from "lucide-react";
import { PRICING_PLANS } from "@/lib/stripe-config";

const icons = { starter: Zap, pro: Sparkles, enterprise: Building2 };
const colors = {
  starter: { bg: "bg-blue-bg", border: "border-blue/20", text: "text-blue", shadow: "shadow-blue/10" },
  pro: { bg: "bg-yellow-bg", border: "border-yellow/30", text: "text-yellow", shadow: "shadow-yellow/20" },
  enterprise: { bg: "bg-purple-bg", border: "border-purple/20", text: "text-purple", shadow: "shadow-purple/10" },
};

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleCheckout(planId: string) {
    setLoading(planId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      if (data.url) window.location.href = data.url;
    } catch (err) {
      alert(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 animate-in">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow/10 border border-yellow/20 text-yellow text-xs font-semibold mb-6">
          <Star className="w-3.5 h-3.5" />
          Simple, transparent pricing
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-text mb-4 tracking-tight">
          Choose the perfect plan for your team
        </h1>
        <p className="text-lg text-text-secondary max-w-lg mx-auto">
          Start free for 14 days. No credit card required. Cancel anytime.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-12">
        {PRICING_PLANS.map((plan, i) => {
          const Icon = icons[plan.id];
          const color = colors[plan.id];
          const pop = plan.recommended;
          
          return (
            <div
              key={plan.id}
              className={`relative glass rounded-3xl p-6 lg:p-8 animate-in transition-all ${
                pop ? `ring-2 ring-yellow shadow-2xl ${color.shadow} scale-[1.02]` : ""
              }`}
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              {/* Popular badge */}
              {pop && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-bright via-yellow to-yellow-dim text-black text-xs font-bold uppercase shadow-lg shadow-yellow/30">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6 pt-2">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${color.bg} border ${color.border} mb-5`}>
                  <Icon className={`w-6 h-6 ${color.text}`} />
                </div>
                <h3 className="text-xl font-bold text-text mb-1">{plan.name}</h3>
                <p className="text-sm text-text-secondary">{plan.description}</p>
              </div>

              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-text tracking-tight">{plan.price}</span>
                  <span className="text-text-secondary">/month</span>
                </div>
                {plan.id === "pro" && (
                  <p className="text-sm text-green font-medium mt-2">Save ₱3,000/year with annual billing</p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
                    <div className="w-5 h-5 rounded-full bg-green-bg border border-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={!plan.priceId || loading !== null}
                className={`w-full h-12 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                  pop 
                    ? "btn-primary" 
                    : "btn-secondary hover:border-yellow/50"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === plan.id ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Redirecting...</>
                ) : plan.priceId ? (
                  <>Get started <ArrowRight className="w-4 h-4" /></>
                ) : (
                  "Coming soon"
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Trust badges */}
      <div className="glass rounded-2xl p-6 animate-in delay-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-bg border border-green/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-green" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-text">Secure Payments</p>
              <p className="text-xs text-text-tertiary">Powered by Stripe</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-bg border border-blue/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-text">14-Day Free Trial</p>
              <p className="text-xs text-text-tertiary">No credit card required</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-bg border border-purple/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-purple" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-text">Cancel Anytime</p>
              <p className="text-xs text-text-tertiary">No questions asked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <p className="text-center text-sm text-text-tertiary mt-8 animate-in delay-5">
        Have questions?{" "}
        <a href="mailto:hello@thelemonco.com" className="text-yellow font-medium hover:underline">Contact our sales team</a>
      </p>
    </div>
  );
}

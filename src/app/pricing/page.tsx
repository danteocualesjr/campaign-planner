"use client";

import { useState } from "react";
import { Check, CreditCard, Zap, Building2, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { PRICING_PLANS } from "@/lib/stripe-config";

const planIcons = { starter: Zap, pro: Sparkles, enterprise: Building2 } as const;

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  async function handleCheckout(planId: string) {
    setLoadingPlan(planId);
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
      setLoadingPlan(null);
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-[960px] mx-auto">
      <div className="text-center mb-10 anim-fade">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-accent uppercase tracking-widest mb-3">
          <CreditCard className="w-3.5 h-3.5" /> Pricing
        </div>
        <h1 className="text-[26px] sm:text-[32px] font-bold text-primary tracking-tight mb-2">
          Plans for every team
        </h1>
        <p className="text-[14px] text-muted max-w-md mx-auto">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRICING_PLANS.map((plan, i) => {
          const Icon = planIcons[plan.id];
          const rec = plan.recommended;
          return (
            <div
              key={plan.id}
              className={`relative glass rounded-xl overflow-hidden transition-all duration-200 hover:border-border-hover anim-fade ${
                rec ? "ring-1 ring-accent/30" : ""
              }`}
              style={{ animationDelay: `${(i + 1) * 0.06}s` }}
            >
              {rec && <div className="h-0.5 bg-accent" />}
              <div className="p-5">
                {rec && (
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Most Popular</span>
                )}
                <div className="flex items-center gap-2 mt-1 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-bold text-primary">{plan.name}</h2>
                    <p className="text-[11px] text-muted">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-5">
                  <span className="text-[28px] font-bold text-primary tracking-tight">{plan.price}</span>
                  <span className="text-[12px] text-muted">/mo</span>
                </div>

                <ul className="space-y-2.5 mb-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[12px] text-secondary">
                      <Check className="w-3.5 h-3.5 text-green shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleCheckout(plan.id)}
                  disabled={!plan.priceId || loadingPlan !== null}
                  className={`w-full h-10 rounded-lg text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    rec ? "btn-primary" : "btn-ghost"
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  {loadingPlan === plan.id ? (
                    <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Redirecting...</>
                  ) : plan.priceId ? (
                    <>Get Started <ArrowRight className="w-3.5 h-3.5" /></>
                  ) : (
                    "Coming Soon"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center text-[12px] text-muted anim-fade delay-4">
        Secure payments by Stripe &middot; Cancel anytime &middot;{" "}
        <a href="mailto:hello@thelemonco.com" className="text-accent hover:underline">Contact us</a>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Check, CreditCard, Zap, Building2, Sparkles, Loader2 } from "lucide-react";
import { PRICING_PLANS } from "@/lib/stripe-config";

const planIcons = {
  starter: Zap,
  pro: Sparkles,
  enterprise: Building2,
} as const;

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
    <div className="p-6 lg:p-8 max-w-[1100px]">
      {/* Header */}
      <div className="text-center mb-12 anim-fade">
        <div className="inline-flex items-center gap-2 mb-4">
          <CreditCard className="w-4 h-4 text-accent" />
          <span className="text-[11px] font-semibold text-accent uppercase tracking-wider">Pricing</span>
        </div>
        <h1 className="text-[28px] sm:text-[36px] font-bold text-primary tracking-tight mb-3">
          Simple, transparent <span className="gradient-text">pricing</span>
        </h1>
        <p className="text-[15px] text-secondary max-w-2xl mx-auto">
          Choose the plan that fits your franchise. All plans include a 14-day free trial.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRICING_PLANS.map((plan, i) => {
          const Icon = planIcons[plan.id];
          const isRecommended = plan.recommended;
          return (
            <div
              key={plan.id}
              className={`relative glass rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] card-lift anim-fade ${
                isRecommended ? "ring-2 ring-accent/50 shadow-lg shadow-accent/10" : ""
              }`}
              style={{ animationDelay: `${(i + 1) * 0.05}s` }}
            >
              {isRecommended && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-orange" />
              )}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
              <div className="relative p-6">
                {isRecommended && (
                  <span className="inline-block text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
                    Most Popular
                  </span>
                )}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-[18px] font-bold text-primary">{plan.name}</h2>
                    <p className="text-[12px] text-muted">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-[32px] font-bold text-primary tracking-tight">{plan.price}</span>
                  <span className="text-[13px] text-muted">/month</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-[13px] text-secondary">
                      <Check className="w-4 h-4 text-green shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleCheckout(plan.id)}
                  disabled={!plan.priceId || loadingPlan !== null}
                  className={`w-full h-11 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2 transition-all ${
                    isRecommended
                      ? "btn-primary"
                      : "btn-ghost"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loadingPlan === plan.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Redirecting...
                    </>
                  ) : plan.priceId ? (
                    "Get Started"
                  ) : (
                    "Coming Soon"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ / CTA */}
      <div className="mt-12 glass rounded-2xl p-6 sm:p-8 text-center anim-fade">
        <p className="text-[13px] text-secondary mb-4">
          Need a custom plan? Contact us at{" "}
          <a href="mailto:hello@thelemonco.com" className="text-accent hover:underline">
            hello@thelemonco.com
          </a>
        </p>
        <p className="text-[11px] text-muted">
          Secure payments powered by Stripe. Cancel anytime.
        </p>
      </div>
    </div>
  );
}

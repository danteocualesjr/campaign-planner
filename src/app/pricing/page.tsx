"use client";

import { useState } from "react";
import { Check, Zap, Sparkles, Building2, Loader2, ArrowRight } from "lucide-react";
import { PRICING_PLANS } from "@/lib/stripe-config";

const icons = {
  starter: Zap,
  pro: Sparkles,
  enterprise: Building2,
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
    <>
      {/* Header */}
      <header className="text-center mb-16 animate-enter">
        <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-sl400 mb-4">
          Plans & Pricing
        </p>
        <h1 className="text-[3.5rem] font-bold tracking-tight text-on-bg leading-none mb-4">
          Simple, <span className="text-md-primary italic">transparent</span> pricing
        </h1>
        <p className="text-lg text-on-surface-variant font-medium max-w-lg mx-auto">
          Choose the plan that fits your team. All plans include a 14-day free trial.
        </p>
      </header>

      {/* Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
        {PRICING_PLANS.map((plan, i) => {
          const Icon = icons[plan.id];
          const isPopular = plan.recommended;

          return (
            <div
              key={plan.id}
              className={`card-surface relative p-8 lg:p-10 animate-enter ${
                isPopular ? "ring-2 ring-primary-container" : ""
              }`}
              style={{ animationDelay: `${100 + i * 80}ms` }}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="chip bg-primary-container text-on-primary-container px-4 py-1.5 text-xs font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8 pt-2">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    isPopular
                      ? "bg-primary-container text-on-primary-container"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-on-bg mb-2">{plan.name}</h3>
                <p className="text-sm text-on-surface-variant">{plan.description}</p>
              </div>

              <div className="mb-8 pb-8 border-b border-outline-variant/20">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-on-bg tracking-tighter">
                    {plan.price}
                  </span>
                  <span className="text-on-surface-variant font-medium">/mo</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-on-surface-variant">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={!plan.priceId || loading !== null}
                className={`w-full py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  isPopular
                    ? "btn-cta"
                    : "btn-outline"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === plan.id ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : plan.priceId ? (
                  <>
                    Get started
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  "Coming soon"
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-on-surface-variant animate-enter delay-4">
        Secure payments by Stripe · Cancel anytime ·{" "}
        <a href="mailto:hello@thelemonco.com" className="text-md-primary font-bold hover:underline">
          Contact us
        </a>
      </p>
    </>
  );
}

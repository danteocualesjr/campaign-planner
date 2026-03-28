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
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">
      {/* Header */}
      <section className="text-center mb-16 animate-enter">
        <p className="overline mb-3">Pricing</p>
        <h1 className="display text-text-primary mb-4">Simple, transparent pricing</h1>
        <p className="body text-text-secondary max-w-lg mx-auto">
          Choose the plan that fits your team. All plans include a 14-day free trial.
        </p>
      </section>

      {/* Plans */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
        {PRICING_PLANS.map((plan, i) => {
          const Icon = icons[plan.id];
          const isPopular = plan.recommended;

          return (
            <div
              key={plan.id}
              className={`card relative p-8 animate-enter ${
                isPopular ? "ring-2 ring-accent" : ""
              }`}
              style={{ animationDelay: `${100 + i * 80}ms` }}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge badge-accent px-4 py-1.5 text-xs font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    isPopular ? "bg-accent text-black" : "bg-bg-tertiary text-text-secondary"
                  }`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="headline text-text-primary mb-2">{plan.name}</h3>
                <p className="caption">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-text-primary">{plan.price}</span>
                  <span className="text-text-muted">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 body text-text-secondary">
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={!plan.priceId || loading !== null}
                className={`btn btn-lg w-full ${
                  isPopular ? "btn-primary" : "btn-secondary"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === plan.id ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : plan.priceId ? (
                  <>
                    Get started
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  "Coming soon"
                )}
              </button>
            </div>
          );
        })}
      </section>

      {/* Footer */}
      <section className="text-center animate-enter delay-4">
        <p className="caption">
          Secure payments by Stripe · Cancel anytime ·{" "}
          <a href="mailto:hello@thelemonco.com" className="text-accent hover:underline">
            Contact us
          </a>
        </p>
      </section>
    </div>
  );
}

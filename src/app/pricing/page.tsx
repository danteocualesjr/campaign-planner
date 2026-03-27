"use client";

import { useState } from "react";
import { Check, Zap, Sparkles, Building2, Loader2, ArrowRight } from "lucide-react";
import { PRICING_PLANS } from "@/lib/stripe-config";

const icons = { starter: Zap, pro: Sparkles, enterprise: Building2 };

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
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 animate-in">
        <h1 className="text-2xl lg:text-3xl font-bold text-text mb-3">
          Simple pricing for everyone
        </h1>
        <p className="text-[15px] text-text-muted max-w-md mx-auto">
          Choose the plan that fits your team. All plans include a 14-day free trial.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {PRICING_PLANS.map((plan, i) => {
          const Icon = icons[plan.id];
          const pop = plan.recommended;
          return (
            <div
              key={plan.id}
              className={`card p-6 animate-in ${pop ? "ring-1 ring-lemon" : ""}`}
              style={{ animationDelay: `${(i + 1) * 75}ms` }}
            >
              {pop && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-lemon text-base text-[10px] font-bold uppercase mb-3">
                  Popular
                </span>
              )}
              
              <div className="flex items-center gap-2.5 mb-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${pop ? "bg-lemon-muted" : "bg-muted"}`}>
                  <Icon className={`w-4 h-4 ${pop ? "text-lemon" : "text-text-muted"}`} />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-text">{plan.name}</h3>
                  <p className="text-[11px] text-text-subtle">{plan.description}</p>
                </div>
              </div>

              <div className="mb-5">
                <span className="text-3xl font-bold text-text">{plan.price}</span>
                <span className="text-[13px] text-text-muted">/mo</span>
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px] text-text-muted">
                    <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={!plan.priceId || loading !== null}
                className={`w-full h-10 btn ${pop ? "btn-primary" : "btn-secondary"} disabled:opacity-50 disabled:cursor-not-allowed`}
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

      {/* Footer */}
      <p className="text-center text-[13px] text-text-subtle animate-in delay-4">
        Secure payments by Stripe · Cancel anytime ·{" "}
        <a href="mailto:hello@thelemonco.com" className="text-lemon hover:underline">Contact us</a>
      </p>
    </div>
  );
}

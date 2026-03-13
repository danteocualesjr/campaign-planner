"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="p-6 lg:p-8 max-w-[600px] mx-auto">
      <div className="glass rounded-2xl p-8 sm:p-12 text-center anim-fade">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 bg-green/30 rounded-full blur-xl" />
          <div className="relative w-20 h-20 rounded-full bg-green-soft flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green" />
          </div>
        </div>
        <h1 className="text-[24px] font-bold text-primary mb-2">Thank you for subscribing!</h1>
        <p className="text-[14px] text-secondary mb-6">
          Your payment was successful. You now have full access to Campaign Planner.
        </p>
        {sessionId && (
          <p className="text-[11px] text-muted font-mono mb-6 break-all">
            Session: {sessionId}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="h-10 px-6 rounded-xl btn-primary text-[13px] flex items-center justify-center gap-2"
          >
            Go to Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/campaigns"
            className="h-10 px-6 rounded-xl btn-ghost text-[13px] flex items-center justify-center gap-2"
          >
            View Campaigns
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PricingSuccessPage() {
  return (
    <Suspense fallback={
      <div className="p-6 lg:p-8 max-w-[600px] mx-auto">
        <div className="glass rounded-2xl p-12 animate-pulse">
          <div className="h-20 w-20 rounded-full bg-card mx-auto mb-6" />
          <div className="h-6 bg-card rounded w-3/4 mx-auto mb-4" />
          <div className="h-4 bg-card rounded w-1/2 mx-auto" />
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

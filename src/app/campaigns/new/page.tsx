"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import CampaignForm from "@/components/CampaignForm";
import TemplatePickerModal from "@/components/TemplatePickerModal";
import { createCampaign } from "@/lib/storage";
import { Campaign, CampaignTemplate } from "@/lib/types";

function Content() {
  const router = useRouter();
  const sp = useSearchParams();
  const dateP = sp.get("date");
  const [showTpl, setShowTpl] = useState(false);
  const [tplData, setTplData] = useState<Campaign | null>(null);

  function onSave(data: Omit<Campaign, "id" | "createdAt" | "updatedAt">) {
    createCampaign(data);
    router.push("/campaigns");
  }

  function onTpl(t: CampaignTemplate) {
    const sd = dateP || new Date().toISOString().split("T")[0];
    const ed = new Date(new Date(sd).getTime() + 14 * 86400000).toISOString().split("T")[0];
    setTplData({
      id: "",
      createdAt: "",
      updatedAt: "",
      name: t.defaults.name || t.name,
      description: t.defaults.description || "",
      type: t.defaults.type || "social_media",
      status: "draft",
      productLines: t.defaults.productLines || [],
      channels: t.defaults.channels || [],
      region: t.defaults.region || "all_branches",
      startDate: sd,
      endDate: ed,
      budget: t.defaults.budget || 0,
      notes: t.defaults.notes || "",
      checklist: t.defaults.checklist || [],
    } as Campaign);
    setShowTpl(false);
  }

  const init = tplData
    ? tplData
    : dateP
    ? ({
        id: "",
        createdAt: "",
        updatedAt: "",
        name: "",
        description: "",
        type: "social_media" as const,
        status: "draft" as const,
        productLines: [],
        channels: [],
        region: "all_branches" as const,
        startDate: dateP,
        endDate: new Date(new Date(dateP).getTime() + 14 * 86400000)
          .toISOString()
          .split("T")[0],
        budget: 0,
        notes: "",
        checklist: [],
      } as Campaign)
    : undefined;

  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <Link
        href="/campaigns"
        className="inline-flex items-center gap-2 caption hover:text-accent transition-colors mb-8 animate-enter"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to campaigns
      </Link>

      <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 animate-enter delay-1">
        <div>
          <p className="overline mb-2">Create</p>
          <h1 className="display text-text-primary">New Campaign</h1>
        </div>
        <button onClick={() => setShowTpl(true)} className="btn btn-secondary btn-md w-fit">
          <FileText className="w-5 h-5" />
          Use Template
        </button>
      </section>

      <div className="animate-enter delay-2">
        <CampaignForm key={tplData?.name || "new"} initialData={init} onSave={onSave} />
      </div>

      <TemplatePickerModal open={showTpl} onClose={() => setShowTpl(false)} onSelect={onTpl} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="p-6 lg:p-10 max-w-4xl">
          <div className="h-8 skeleton w-32 mb-8" />
          <div className="h-16 skeleton w-64 mb-10" />
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 skeleton" />
            ))}
          </div>
        </div>
      }
    >
      <Content />
    </Suspense>
  );
}

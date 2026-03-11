"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, FileText, PlusCircle } from "lucide-react";
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

  function onSave(data: Omit<Campaign, "id" | "createdAt" | "updatedAt">) { createCampaign(data); router.push("/campaigns"); }

  function onTpl(t: CampaignTemplate) {
    const sd = dateP || new Date().toISOString().split("T")[0];
    const ed = new Date(new Date(sd).getTime() + 14 * 86400000).toISOString().split("T")[0];
    setTplData({ id:"",createdAt:"",updatedAt:"", name:t.defaults.name||t.name, description:t.defaults.description||"", type:t.defaults.type||"social_media", status:"draft", productLines:t.defaults.productLines||[], channels:t.defaults.channels||[], region:t.defaults.region||"all_branches", startDate:sd, endDate:ed, budget:t.defaults.budget||0, notes:t.defaults.notes||"", checklist:t.defaults.checklist||[] } as Campaign);
    setShowTpl(false);
  }

  const init = tplData ? tplData : dateP ? { id:"",createdAt:"",updatedAt:"",name:"",description:"",type:"social_media" as const,status:"draft" as const,productLines:[],channels:[],region:"all_branches" as const,startDate:dateP,endDate:new Date(new Date(dateP).getTime()+14*86400000).toISOString().split("T")[0],budget:0,notes:"",checklist:[] } as Campaign : undefined;

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <Link href="/campaigns" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-primary transition-colors mb-6 group anim-fade">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back to campaigns
      </Link>
      
      <div className="flex items-center justify-between mb-6 anim-fade delay-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
            <PlusCircle className="w-5 h-5 text-accent" />
          </div>
          <h1 className="text-[24px] font-bold text-primary tracking-tight">New Campaign</h1>
        </div>
        <button onClick={() => setShowTpl(true)} className="h-10 px-4 rounded-xl btn-ghost text-[13px] flex items-center gap-2">
          <FileText className="w-4 h-4" /> Template
        </button>
      </div>
      
      <div className="anim-fade delay-2">
        <CampaignForm key={tplData?.name || "new"} initialData={init} onSave={onSave} />
      </div>
      
      <TemplatePickerModal open={showTpl} onClose={() => setShowTpl(false)} onSelect={onTpl} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="p-6 lg:p-8 max-w-3xl">
        <div className="animate-pulse">
          <div className="h-6 bg-card rounded w-32 mb-6" />
          <div className="h-10 bg-card rounded-xl w-48 mb-6" />
          <div className="h-[500px] bg-card rounded-2xl" />
        </div>
      </div>
    }>
      <Content />
    </Suspense>
  );
}

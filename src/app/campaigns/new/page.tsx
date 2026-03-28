"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, FileText, PlusCircle, Sparkles } from "lucide-react";
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
    <div className="p-4 lg:p-8 max-w-4xl">
      <Link href="/campaigns" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-yellow transition-colors mb-6 animate-in">
        <ArrowLeft className="w-4 h-4" /> Back to Campaigns
      </Link>
      
      {/* Hero header */}
      <div className="relative overflow-hidden rounded-3xl glass mb-8 animate-in delay-1">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-yellow/15 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative px-6 py-8 lg:px-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-bright via-yellow to-orange flex items-center justify-center shadow-lg shadow-yellow/20">
                <PlusCircle className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-text mb-1">New Campaign</h1>
                <p className="text-text-secondary">Create a new marketing campaign</p>
              </div>
            </div>
            
            <button onClick={() => setShowTpl(true)} className="h-12 px-6 btn-secondary flex items-center gap-2 text-sm font-semibold w-fit">
              <Sparkles className="w-4 h-4" />
              Use Template
            </button>
          </div>
        </div>
      </div>
      
      <div className="animate-in delay-2">
        <CampaignForm key={tplData?.name || "new"} initialData={init} onSave={onSave} />
      </div>
      
      <TemplatePickerModal open={showTpl} onClose={() => setShowTpl(false)} onSelect={onTpl} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="p-4 lg:p-8 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-card rounded-lg w-32 mb-6" />
          <div className="h-32 bg-card rounded-3xl mb-6" />
          <div className="h-[600px] bg-card rounded-3xl" />
        </div>
      </div>
    }>
      <Content />
    </Suspense>
  );
}

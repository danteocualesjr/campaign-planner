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

  function onSave(data: Omit<Campaign, "id" | "createdAt" | "updatedAt">) { createCampaign(data); router.push("/campaigns"); }

  function onTpl(t: CampaignTemplate) {
    const sd = dateP || new Date().toISOString().split("T")[0];
    const ed = new Date(new Date(sd).getTime() + 14 * 86400000).toISOString().split("T")[0];
    setTplData({ id:"",createdAt:"",updatedAt:"", name:t.defaults.name||t.name, description:t.defaults.description||"", type:t.defaults.type||"social_media", status:"draft", productLines:t.defaults.productLines||[], channels:t.defaults.channels||[], region:t.defaults.region||"all_branches", startDate:sd, endDate:ed, budget:t.defaults.budget||0, notes:t.defaults.notes||"", checklist:t.defaults.checklist||[] } as Campaign);
    setShowTpl(false);
  }

  const init = tplData ? tplData : dateP ? { id:"",createdAt:"",updatedAt:"",name:"",description:"",type:"social_media" as const,status:"draft" as const,productLines:[],channels:[],region:"all_branches" as const,startDate:dateP,endDate:new Date(new Date(dateP).getTime()+14*86400000).toISOString().split("T")[0],budget:0,notes:"",checklist:[] } as Campaign : undefined;

  return (
    <div className="p-6 lg:p-8 max-w-3xl anim-enter">
      <Link href="/campaigns" className="inline-flex items-center gap-1 text-[13px] text-gray-400 hover:text-navy-900 transition-colors mb-5 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back
      </Link>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[24px] font-bold text-navy-900 tracking-tight">New Campaign</h1>
        <button onClick={() => setShowTpl(true)} className="h-9 px-3 rounded-lg ring-1 ring-gray-200 text-[13px] font-medium text-gray-600 hover:ring-gray-300 transition-all flex items-center gap-1.5">
          <FileText className="w-4 h-4" /> Template
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <CampaignForm key={tplData?.name || "new"} initialData={init} onSave={onSave} />
      </div>
      <TemplatePickerModal open={showTpl} onClose={() => setShowTpl(false)} onSelect={onTpl} />
    </div>
  );
}

export default function Page() {
  return <Suspense fallback={<div className="p-6 lg:p-8 max-w-3xl"><div className="animate-pulse"><div className="h-8 bg-gray-100 rounded w-48 mb-4" /><div className="h-[400px] bg-gray-100 rounded-xl" /></div></div>}><Content /></Suspense>;
}

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import CampaignForm from "@/components/CampaignForm";
import { getCampaignById, updateCampaign, deleteCampaign } from "@/lib/storage";
import { Campaign } from "@/lib/types";

export default function Page() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setCampaign(getCampaignById(id) ?? null); setMounted(true); }, [id]);

  if (!mounted) return <div className="p-6 lg:p-8 max-w-3xl"><div className="animate-pulse"><div className="h-4 bg-gray-100 rounded w-20 mb-4" /><div className="h-8 bg-gray-100 rounded w-48 mb-4" /><div className="h-[400px] bg-gray-100 rounded-xl" /></div></div>;

  if (!campaign) return (
    <div className="p-6 lg:p-8 max-w-3xl anim-enter">
      <Link href="/campaigns" className="inline-flex items-center gap-1 text-[13px] text-gray-400 hover:text-navy-900 transition-colors mb-5"><ArrowLeft className="w-4 h-4" /> Back</Link>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center">
        <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
        <h2 className="text-[15px] font-semibold text-navy-900">Campaign not found</h2>
        <p className="text-[13px] text-gray-400 mt-1">This campaign may have been deleted.</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 lg:p-8 max-w-3xl anim-enter">
      <Link href="/campaigns" className="inline-flex items-center gap-1 text-[13px] text-gray-400 hover:text-navy-900 transition-colors mb-5 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back
      </Link>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-navy-900 tracking-tight">Edit Campaign</h1>
          <p className="text-[13px] text-gray-400 mt-0.5">{campaign.name}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <CampaignForm initialData={campaign} onSave={(d) => { updateCampaign(id, d); router.push("/campaigns"); }} onDelete={() => { if (confirm("Delete this campaign?")) { deleteCampaign(id); router.push("/campaigns"); } }} />
      </div>
    </div>
  );
}

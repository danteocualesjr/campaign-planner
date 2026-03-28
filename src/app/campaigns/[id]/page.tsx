"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle, Edit3 } from "lucide-react";
import CampaignForm from "@/components/CampaignForm";
import ConfirmModal from "@/components/ConfirmModal";
import { getCampaignById, updateCampaign, deleteCampaign } from "@/lib/storage";
import { Campaign } from "@/lib/types";

export default function Page() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => { setCampaign(getCampaignById(id) ?? null); setMounted(true); }, [id]);

  if (!mounted) return (
    <div className="p-4 lg:p-8 max-w-4xl">
      <div className="h-8 bg-card rounded-lg w-32 mb-6 animate-pulse" />
      <div className="h-32 bg-card rounded-3xl mb-6 animate-pulse" />
      <div className="h-[600px] bg-card rounded-3xl animate-pulse" />
    </div>
  );

  if (!campaign) return (
    <div className="p-4 lg:p-8 max-w-4xl animate-in">
      <Link href="/campaigns" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-yellow transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Campaigns
      </Link>
      <div className="glass rounded-3xl p-14 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-bg border border-red/20 flex items-center justify-center mx-auto mb-5">
          <AlertCircle className="w-7 h-7 text-red" />
        </div>
        <h2 className="text-xl font-bold text-text mb-2">Campaign Not Found</h2>
        <p className="text-text-secondary mb-6">This campaign may have been deleted or doesn't exist.</p>
        <Link href="/campaigns" className="h-11 px-6 btn-primary inline-flex items-center gap-2 text-sm font-semibold">
          View All Campaigns
        </Link>
      </div>
    </div>
  );

  return (
    <div className="p-4 lg:p-8 max-w-4xl">
      <Link href="/campaigns" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-yellow transition-colors mb-6 animate-in">
        <ArrowLeft className="w-4 h-4" /> Back to Campaigns
      </Link>
      
      {/* Hero header */}
      <div className="relative overflow-hidden rounded-3xl glass mb-8 animate-in delay-1">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-green/15 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative px-6 py-8 lg:px-8 lg:py-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green to-blue flex items-center justify-center shadow-lg shadow-green/20">
              <Edit3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-text mb-1">Edit Campaign</h1>
              <p className="text-text-secondary">{campaign.name}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="animate-in delay-2">
        <CampaignForm 
          initialData={campaign} 
          onSave={(d) => { updateCampaign(id, d); router.push("/campaigns"); }} 
          onDelete={() => setShowDeleteModal(true)} 
        />
      </div>

      <ConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => { deleteCampaign(id); router.push("/campaigns"); }}
        title="Delete Campaign?"
        message="This action cannot be undone. All campaign data will be permanently removed."
        confirmText="Delete Campaign"
      />
    </div>
  );
}

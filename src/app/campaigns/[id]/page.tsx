"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
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
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="h-6 bg-subtle rounded w-32 mb-6 animate-pulse" />
      <div className="h-10 bg-subtle rounded-lg w-64 mb-6 animate-pulse" />
      <div className="h-[500px] bg-subtle rounded-xl animate-pulse" />
    </div>
  );

  if (!campaign) return (
    <div className="p-6 lg:p-8 max-w-3xl animate-in">
      <Link href="/campaigns" className="inline-flex items-center gap-1.5 text-[13px] text-text-muted hover:text-text transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <div className="card p-12 text-center">
        <div className="w-12 h-12 rounded-xl bg-danger-muted flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-5 h-5 text-danger" />
        </div>
        <h2 className="text-[16px] font-semibold text-text mb-1">Campaign not found</h2>
        <p className="text-[13px] text-text-muted">This campaign may have been deleted.</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <Link href="/campaigns" className="inline-flex items-center gap-1.5 text-[13px] text-text-muted hover:text-text transition-colors mb-6 animate-in">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      
      <div className="mb-6 animate-in delay-1">
        <h1 className="text-xl font-bold text-text">Edit Campaign</h1>
        <p className="text-[13px] text-text-muted mt-0.5">{campaign.name}</p>
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
        title="Delete campaign?"
        message="This action cannot be undone. All campaign data will be permanently removed."
        confirmText="Delete"
      />
    </div>
  );
}

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
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="animate-pulse">
        <div className="h-6 bg-card rounded w-32 mb-6" />
        <div className="h-10 bg-card rounded-xl w-64 mb-6" />
        <div className="h-[500px] bg-card rounded-2xl" />
      </div>
    </div>
  );

  if (!campaign) return (
    <div className="p-6 lg:p-8 max-w-3xl anim-fade">
      <Link href="/campaigns" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-primary transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to campaigns
      </Link>
      <div className="glass rounded-2xl p-12 text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-soft flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6 text-red" />
        </div>
        <h2 className="text-[16px] font-semibold text-primary mb-2">Campaign not found</h2>
        <p className="text-[13px] text-secondary">This campaign may have been deleted.</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <Link href="/campaigns" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-primary transition-colors mb-6 group anim-fade">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back to campaigns
      </Link>
      
      <div className="flex items-center gap-3 mb-6 anim-fade delay-1">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
          <Edit3 className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h1 className="text-[24px] font-bold text-primary tracking-tight">Edit Campaign</h1>
          <p className="text-[13px] text-muted">{campaign.name}</p>
        </div>
      </div>
      
      <div className="anim-fade delay-2">
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
        confirmText="Delete Campaign"
        confirmVariant="danger"
      />
    </div>
  );
}

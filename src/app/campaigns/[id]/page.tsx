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

  useEffect(() => {
    setCampaign(getCampaignById(id) ?? null);
    setMounted(true);
  }, [id]);

  if (!mounted) {
    return (
      <div>
        <div className="h-8 skeleton w-32 mb-8" />
        <div className="h-20 skeleton mb-10" />
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 skeleton" style={{ borderRadius: "2rem" }} />
          ))}
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="animate-enter">
        <Link
          href="/campaigns"
          className="inline-flex items-center gap-2 text-sm text-sl500 hover:text-md-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to campaigns
        </Link>
        <div className="card-surface p-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-error-container flex items-center justify-center mb-6">
            <AlertCircle className="w-8 h-8 text-md-error" />
          </div>
          <h3 className="text-xl font-bold text-on-bg mb-2">Campaign not found</h3>
          <p className="text-on-surface-variant mb-6">
            This campaign may have been deleted.
          </p>
          <Link href="/campaigns" className="btn-cta px-6 py-3 rounded-full text-sm">
            View all campaigns
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Link
        href="/campaigns"
        className="inline-flex items-center gap-2 text-sm text-sl500 hover:text-md-primary transition-colors mb-8 animate-enter"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to campaigns
      </Link>

      <header className="mb-10 animate-enter delay-1">
        <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-sl400 mb-2">
          Edit Campaign
        </p>
        <h1 className="text-[3.5rem] font-bold tracking-tight text-on-bg leading-none">
          {campaign.name}
        </h1>
      </header>

      <div className="animate-enter delay-2">
        <CampaignForm
          initialData={campaign}
          onSave={(d) => {
            updateCampaign(id, d);
            router.push("/campaigns");
          }}
          onDelete={() => setShowDeleteModal(true)}
        />
      </div>

      <ConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          deleteCampaign(id);
          router.push("/campaigns");
        }}
        title="Delete campaign?"
        message="This action cannot be undone. All campaign data will be permanently removed."
        confirmText="Delete"
      />
    </>
  );
}

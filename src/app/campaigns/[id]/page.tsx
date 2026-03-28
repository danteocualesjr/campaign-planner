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
      <div className="p-6 lg:p-10 max-w-4xl">
        <div className="h-8 skeleton w-32 mb-8" />
        <div className="h-16 skeleton w-64 mb-10" />
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 skeleton" />
          ))}
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="p-6 lg:p-10 max-w-4xl animate-enter">
        <Link
          href="/campaigns"
          className="inline-flex items-center gap-2 caption hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to campaigns
        </Link>
        <div className="card empty-state">
          <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center mb-6">
            <AlertCircle className="w-8 h-8 text-danger" />
          </div>
          <h3 className="title text-text-primary mb-2">Campaign not found</h3>
          <p className="body text-text-secondary mb-6">
            This campaign may have been deleted.
          </p>
          <Link href="/campaigns" className="btn btn-primary btn-md">
            View all campaigns
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <Link
        href="/campaigns"
        className="inline-flex items-center gap-2 caption hover:text-accent transition-colors mb-8 animate-enter"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to campaigns
      </Link>

      <section className="mb-10 animate-enter delay-1">
        <p className="overline mb-2">Edit</p>
        <h1 className="display text-text-primary">{campaign.name}</h1>
      </section>

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
    </div>
  );
}

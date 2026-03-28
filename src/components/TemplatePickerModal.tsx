"use client";

import { useEffect, useRef } from "react";
import { X, ArrowRight } from "lucide-react";
import { CampaignTemplate } from "@/lib/types";
import { CAMPAIGN_TEMPLATES } from "@/lib/templates";
import { CAMPAIGN_TYPE_LABELS } from "@/lib/constants";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (t: CampaignTemplate) => void;
}

export default function TemplatePickerModal({ open, onClose, onSelect }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.focus();
      const esc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", esc);
      return () => document.removeEventListener("keydown", esc);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 modal-backdrop animate-fade" onClick={onClose} />

      <div
        ref={ref}
        className="relative w-full max-w-lg max-h-[85vh] overflow-hidden bg-surface-lowest rounded-[2rem] animate-scale"
        role="dialog"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-outline-variant/20">
          <div>
            <h2 className="text-xl font-bold text-on-bg">Campaign Templates</h2>
            <p className="text-sm text-on-surface-variant mt-1">
              Start with a pre-built campaign
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-sl500 hover:text-sl900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-3 overflow-y-auto max-h-[calc(85vh-100px)]">
          <div className="space-y-2">
            {CAMPAIGN_TEMPLATES.map((t, i) => (
              <button
                key={t.id}
                onClick={() => onSelect(t)}
                className="w-full text-left group flex items-start gap-4 p-4 rounded-2xl bg-surface-low hover:bg-surface-container transition-all animate-enter"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span className="text-3xl">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-on-bg group-hover:text-md-primary transition-colors">
                      {t.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-sl400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-on-surface-variant line-clamp-2 mb-3">
                    {t.description}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {t.defaults.type && (
                      <span className="chip">
                        {CAMPAIGN_TYPE_LABELS[t.defaults.type]}
                      </span>
                    )}
                    {t.defaults.budget && t.defaults.budget > 0 && (
                      <span className="chip bg-primary-container/20 text-md-primary">
                        ₱{t.defaults.budget.toLocaleString()}
                      </span>
                    )}
                    {t.defaults.checklist && t.defaults.checklist.length > 0 && (
                      <span className="chip bg-green-100 text-green-700">
                        {t.defaults.checklist.length} tasks
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

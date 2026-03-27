"use client";

import { useEffect, useRef } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { CampaignTemplate } from "@/lib/types";
import { CAMPAIGN_TEMPLATES } from "@/lib/templates";
import { CAMPAIGN_TYPE_LABELS } from "@/lib/constants";

interface Props { open: boolean; onClose: () => void; onSelect: (t: CampaignTemplate) => void; }

export default function TemplatePickerModal({ open, onClose, onSelect }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.focus();
      const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
      document.addEventListener("keydown", esc);
      return () => document.removeEventListener("keydown", esc);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-base/80 backdrop-blur-sm modal-backdrop" onClick={onClose} />
      <div
        ref={ref}
        className="relative w-full max-w-lg max-h-[80vh] overflow-hidden card animate-scale"
        role="dialog"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-subtle">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-lemon-muted flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-lemon" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-text">Templates</h2>
              <p className="text-[11px] text-text-subtle">Start with a pre-built campaign</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-text-subtle hover:text-text hover:bg-muted">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="p-2 overflow-y-auto max-h-[calc(80vh-64px)]">
          {CAMPAIGN_TEMPLATES.map((t, i) => (
            <button
              key={t.id}
              onClick={() => onSelect(t)}
              className="w-full text-left group flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors animate-in"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span className="text-2xl mt-0.5">{t.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[14px] font-semibold text-text group-hover:text-lemon transition-colors">{t.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[12px] text-text-muted line-clamp-1 mb-1.5">{t.description}</p>
                <div className="flex items-center gap-2">
                  {t.defaults.type && (
                    <span className="text-[10px] font-medium text-text-subtle bg-muted px-1.5 py-0.5 rounded">
                      {CAMPAIGN_TYPE_LABELS[t.defaults.type]}
                    </span>
                  )}
                  {t.defaults.budget && t.defaults.budget > 0 && (
                    <span className="text-[10px] font-semibold text-lemon bg-lemon-muted px-1.5 py-0.5 rounded">
                      ₱{t.defaults.budget.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

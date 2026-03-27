"use client";

import { useEffect, useRef } from "react";
import { X, Sparkles, ArrowUpRight, Target } from "lucide-react";
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm modal-backdrop" onClick={onClose} />
      <div
        ref={ref}
        className="relative w-full max-w-lg max-h-[80vh] overflow-hidden glass rounded-xl anim-scale"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-primary">Templates</h2>
              <p className="text-[11px] text-muted">Pick a campaign to customize</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-card" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 overflow-y-auto max-h-[calc(80vh-80px)] space-y-1.5 scroll-subtle">
          {CAMPAIGN_TEMPLATES.map((t, i) => (
            <button
              key={t.id}
              onClick={() => onSelect(t)}
              className="w-full text-left group rounded-lg p-3 hover:bg-card transition-colors anim-fade"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="text-[13px] font-semibold text-primary group-hover:text-accent transition-colors">{t.name}</h3>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors shrink-0" />
                  </div>
                  <p className="text-[11px] text-muted leading-relaxed line-clamp-1 mb-1.5">{t.description}</p>
                  <div className="flex items-center gap-1.5">
                    {t.defaults.type && (
                      <span className="text-[9px] font-medium text-muted bg-elevated px-1.5 py-0.5 rounded">
                        {CAMPAIGN_TYPE_LABELS[t.defaults.type]}
                      </span>
                    )}
                    {t.defaults.budget && t.defaults.budget > 0 && (
                      <span className="text-[9px] font-semibold text-accent bg-accent-soft px-1.5 py-0.5 rounded">
                        ₱{t.defaults.budget.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

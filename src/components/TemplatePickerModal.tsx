"use client";

import { useEffect, useRef } from "react";
import { X, Sparkles, ArrowRight, Zap } from "lucide-react";
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
      <div className="absolute inset-0 bg-bg/90 backdrop-blur-xl modal-backdrop" onClick={onClose} />
      <div
        ref={ref}
        className="relative w-full max-w-lg max-h-[85vh] overflow-hidden glass rounded-3xl animate-scale"
        role="dialog"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange to-yellow flex items-center justify-center shadow-lg shadow-yellow/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text">Quick Start Templates</h2>
              <p className="text-sm text-text-secondary">Choose a template to get started fast</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-elevated border border-border flex items-center justify-center text-text-secondary hover:text-text hover:border-border-light transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="p-3 overflow-y-auto max-h-[calc(85vh-88px)]">
          <div className="space-y-2">
            {CAMPAIGN_TEMPLATES.map((t, i) => (
              <button
                key={t.id}
                onClick={() => onSelect(t)}
                className="w-full text-left group glass rounded-2xl p-4 hover:border-border-light transition-all animate-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{t.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-semibold text-text group-hover:text-yellow transition-colors">{t.name}</span>
                      <ArrowRight className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-text-secondary line-clamp-2 mb-3">{t.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {t.defaults.type && (
                        <span className="text-xs font-medium text-text-secondary bg-elevated border border-border px-2 py-1 rounded-lg">
                          {CAMPAIGN_TYPE_LABELS[t.defaults.type]}
                        </span>
                      )}
                      {t.defaults.budget && t.defaults.budget > 0 && (
                        <span className="text-xs font-semibold text-yellow bg-yellow-bg border border-yellow/20 px-2 py-1 rounded-lg">
                          ₱{t.defaults.budget.toLocaleString()}
                        </span>
                      )}
                      {t.defaults.checklist && t.defaults.checklist.length > 0 && (
                        <span className="text-xs font-medium text-green bg-green-bg border border-green/20 px-2 py-1 rounded-lg">
                          {t.defaults.checklist.length} tasks
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-elevated/50">
          <p className="text-xs text-text-tertiary text-center flex items-center justify-center gap-1.5">
            <Zap className="w-3 h-3 text-yellow" />
            Templates pre-fill your campaign details. You can customize everything.
          </p>
        </div>
      </div>
    </div>
  );
}

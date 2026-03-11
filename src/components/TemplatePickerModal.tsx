"use client";

import { X, ArrowRight, Sparkles } from "lucide-react";
import { CampaignTemplate } from "@/lib/types";
import { CAMPAIGN_TEMPLATES } from "@/lib/templates";

interface Props { open: boolean; onClose: () => void; onSelect: (t: CampaignTemplate) => void; }

export default function TemplatePickerModal({ open, onClose, onSelect }: Props) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-xl max-h-[85vh] overflow-hidden rounded-2xl anim-scale">
        <div className="absolute inset-0 glass" />
        <div className="absolute top-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple/20 rounded-full blur-3xl" />
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-primary">Start from Template</h2>
                <p className="text-[13px] text-muted">Choose a pre-built campaign to customize</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg text-muted hover:text-primary hover:bg-card transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Templates */}
          <div className="p-4 overflow-y-auto max-h-[calc(85vh-100px)] space-y-2">
            {CAMPAIGN_TEMPLATES.map((t) => (
              <button key={t.id} onClick={() => onSelect(t)}
                className="w-full text-left group relative glass rounded-xl p-4 glass-hover transition-all hover:scale-[1.01]">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{t.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-[14px] font-semibold text-primary group-hover:text-accent transition-colors">{t.name}</h3>
                      <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                    </div>
                    <p className="text-[12px] text-secondary leading-relaxed line-clamp-2">{t.description}</p>
                    {t.defaults.budget && (
                      <span className="inline-block mt-2 text-[11px] font-semibold text-accent bg-accent-soft px-2 py-0.5 rounded-full">
                        ₱{t.defaults.budget.toLocaleString()} budget
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

function ArrowUpRight(props: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
    </svg>
  );
}

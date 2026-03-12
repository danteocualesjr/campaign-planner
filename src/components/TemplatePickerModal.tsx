"use client";

import { useEffect, useRef } from "react";
import { X, Sparkles, ArrowUpRight, Clock, Target } from "lucide-react";
import { CampaignTemplate } from "@/lib/types";
import { CAMPAIGN_TEMPLATES } from "@/lib/templates";
import { CAMPAIGN_TYPE_LABELS } from "@/lib/constants";

interface Props { open: boolean; onClose: () => void; onSelect: (t: CampaignTemplate) => void; }

export default function TemplatePickerModal({ open, onClose, onSelect }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (open) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleEsc);
      modalRef.current?.focus();
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [open, onClose]);

  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md modal-backdrop" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        ref={modalRef}
        className="relative w-full max-w-xl max-h-[85vh] overflow-hidden rounded-2xl anim-scale"
        role="dialog"
        aria-modal="true"
        aria-labelledby="template-modal-title"
        tabIndex={-1}
      >
        <div className="absolute inset-0 glass" />
        <div className="absolute top-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple/20 rounded-full blur-3xl" />
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 id="template-modal-title" className="text-lg font-bold text-primary">Start from Template</h2>
                <p className="text-[13px] text-muted">Choose a pre-built campaign to customize</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 rounded-lg text-muted hover:text-primary hover:bg-card transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Templates */}
          <div className="p-4 overflow-y-auto max-h-[calc(85vh-100px)] space-y-2 scroll-subtle">
            {CAMPAIGN_TEMPLATES.map((t, i) => (
              <button 
                key={t.id} 
                onClick={() => onSelect(t)}
                className="w-full text-left group relative glass rounded-xl p-4 transition-all duration-200 hover:bg-card-hover hover:scale-[1.01] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg anim-fade"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{t.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-[14px] font-semibold text-primary group-hover:text-accent transition-colors">{t.name}</h3>
                      <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-[12px] text-secondary leading-relaxed line-clamp-2 mb-2">{t.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {t.defaults.type && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-muted bg-card px-2 py-0.5 rounded-full">
                          <Target className="w-2.5 h-2.5" />
                          {CAMPAIGN_TYPE_LABELS[t.defaults.type]}
                        </span>
                      )}
                      {t.defaults.budget && t.defaults.budget > 0 && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-accent bg-accent-soft px-2 py-0.5 rounded-full">
                          ₱{t.defaults.budget.toLocaleString()}
                        </span>
                      )}
                      {t.defaults.checklist && t.defaults.checklist.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-muted bg-card px-2 py-0.5 rounded-full">
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
      </div>
    </div>
  );
}

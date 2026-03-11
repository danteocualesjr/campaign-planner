"use client";

import { X, ArrowRight } from "lucide-react";
import { CampaignTemplate } from "@/lib/types";
import { CAMPAIGN_TEMPLATES } from "@/lib/templates";

interface Props { open: boolean; onClose: () => void; onSelect: (t: CampaignTemplate) => void; }

export default function TemplatePickerModal({ open, onClose, onSelect }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[80vh] overflow-hidden anim-scale">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-navy-900">Start from a Template</h2>
            <p className="text-[13px] text-gray-400 mt-0.5">Pick a pre-built campaign to customize</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)] space-y-2">
          {CAMPAIGN_TEMPLATES.map((t) => (
            <button key={t.id} onClick={() => onSelect(t)}
              className="w-full text-left flex items-start gap-4 rounded-xl p-4 ring-1 ring-gray-100 hover:ring-brand-300 hover:bg-brand-50/30 transition-all group">
              <span className="text-2xl mt-0.5">{t.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-[14px] font-semibold text-navy-900 group-hover:text-brand-700 transition-colors">{t.name}</h3>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-500 transition-colors shrink-0" />
                </div>
                <p className="text-[12px] text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">{t.description}</p>
                {t.defaults.budget && <span className="inline-block mt-2 text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md">₱{t.defaults.budget.toLocaleString()}</span>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Check } from "lucide-react";
import { Campaign, CampaignType, CampaignStatus, ProductLine, Channel, Region, ChecklistItem } from "@/lib/types";
import { CAMPAIGN_TYPE_LABELS, PRODUCT_LINE_LABELS, CHANNEL_LABELS, REGION_LABELS, CAMPAIGN_STATUS_LABELS } from "@/lib/constants";

interface CampaignFormProps {
  initialData?: Campaign;
  onSave: (data: Omit<Campaign, "id" | "createdAt" | "updatedAt">) => void;
  onDelete?: () => void;
}

const defaults: Omit<Campaign, "id" | "createdAt" | "updatedAt"> = {
  name: "", description: "", type: "social_media", status: "draft",
  productLines: [], channels: [], region: "all_branches",
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
  budget: 0, notes: "", checklist: [],
};

const input = "w-full h-10 px-3 rounded-lg ring-1 ring-gray-200 bg-white text-[13px] text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all";
const label = "block text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5";

export default function CampaignForm({ initialData, onSave, onDelete }: CampaignFormProps) {
  const router = useRouter();
  const [form, setForm] = useState(() => {
    if (initialData) { const { id, createdAt, updatedAt, ...rest } = initialData; return rest; }
    return { ...defaults };
  });
  const [newCheck, setNewCheck] = useState("");

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((p) => ({ ...p, [k]: v }));
  const toggle = <T,>(arr: T[], item: T): T[] => arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

  const addCheck = () => {
    if (!newCheck.trim()) return;
    set("checklist", [...form.checklist, { id: crypto.randomUUID(), text: newCheck.trim(), done: false }]);
    setNewCheck("");
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="divide-y divide-gray-100">
      {/* Details */}
      <div className="p-5 sm:p-6 space-y-4">
        <h3 className="text-[13px] font-bold text-navy-900">Campaign Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className={label}>Name *</label><input required type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Summer Frozen Promo" className={input} /></div>
          <div><label className={label}>Type</label><select value={form.type} onChange={(e) => set("type", e.target.value as CampaignType)} className={input}>
            {Object.entries(CAMPAIGN_TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
        </div>
        <div><label className={label}>Description</label><textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Campaign objectives and key messaging..." className={input + " h-auto py-2.5 resize-none"} /></div>
      </div>

      {/* Config */}
      <div className="p-5 sm:p-6 space-y-4">
        <h3 className="text-[13px] font-bold text-navy-900">Configuration</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className={label}>Status</label><select value={form.status} onChange={(e) => set("status", e.target.value as CampaignStatus)} className={input}>
            {Object.entries(CAMPAIGN_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
          <div><label className={label}>Region</label><select value={form.region} onChange={(e) => set("region", e.target.value as Region)} className={input}>
            {Object.entries(REGION_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
        </div>
      </div>

      {/* Schedule */}
      <div className="p-5 sm:p-6 space-y-4">
        <h3 className="text-[13px] font-bold text-navy-900">Schedule & Budget</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><label className={label}>Start *</label><input required type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} className={input} /></div>
          <div><label className={label}>End *</label><input required type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} className={input} /></div>
          <div><label className={label}>Budget (₱)</label><input type="number" min={0} value={form.budget || ""} onChange={(e) => set("budget", Number(e.target.value) || 0)} placeholder="0" className={input} /></div>
        </div>
      </div>

      {/* Products & Channels */}
      <div className="p-5 sm:p-6 space-y-5">
        <div>
          <h3 className="text-[13px] font-bold text-navy-900 mb-3">Product Lines</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(PRODUCT_LINE_LABELS).map(([k, v]) => {
              const on = form.productLines.includes(k as ProductLine);
              return <button type="button" key={k} onClick={() => set("productLines", toggle(form.productLines, k as ProductLine))}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold ring-1 transition-all ${on ? "bg-brand-500 text-white ring-brand-500" : "bg-white text-gray-500 ring-gray-200 hover:ring-brand-300"}`}>{v}</button>;
            })}
          </div>
        </div>
        <div>
          <h3 className="text-[13px] font-bold text-navy-900 mb-3">Channels</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CHANNEL_LABELS).map(([k, v]) => {
              const on = form.channels.includes(k as Channel);
              return <button type="button" key={k} onClick={() => set("channels", toggle(form.channels, k as Channel))}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold ring-1 transition-all ${on ? "bg-brand-500 text-white ring-brand-500" : "bg-white text-gray-500 ring-gray-200 hover:ring-brand-300"}`}>{v}</button>;
            })}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="p-5 sm:p-6">
        <h3 className="text-[13px] font-bold text-navy-900 mb-3">Notes</h3>
        <textarea rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Internal notes, creative briefs..." className={input + " h-auto py-2.5 resize-none"} />
      </div>

      {/* Checklist */}
      <div className="p-5 sm:p-6 space-y-3">
        <h3 className="text-[13px] font-bold text-navy-900">Task Checklist</h3>
        {form.checklist.map((item) => (
          <div key={item.id} className="flex items-center gap-3 group">
            <button type="button" onClick={() => set("checklist", form.checklist.map((c) => c.id === item.id ? { ...c, done: !c.done } : c))}
              className={`w-5 h-5 rounded-md ring-2 flex items-center justify-center shrink-0 transition-all ${item.done ? "bg-brand-500 ring-brand-500" : "ring-gray-300 hover:ring-brand-400"}`}>
              {item.done && <Check className="w-3 h-3 text-white" />}
            </button>
            <span className={`flex-1 text-[13px] ${item.done ? "line-through text-gray-300" : "text-navy-800"}`}>{item.text}</span>
            <button type="button" onClick={() => set("checklist", form.checklist.filter((c) => c.id !== item.id))}
              className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        ))}
        <div className="flex gap-2">
          <input type="text" value={newCheck} onChange={(e) => setNewCheck(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCheck(); } }}
            placeholder="Add a task..." className={input + " flex-1"} />
          <button type="button" onClick={addCheck} className="h-10 w-10 rounded-lg ring-1 ring-gray-200 text-gray-400 hover:text-brand-600 hover:ring-brand-300 transition-all flex items-center justify-center shrink-0">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 px-5 sm:px-6 py-4 bg-gray-50">
        <button type="submit" className="h-10 px-5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-[13px] font-semibold transition-colors">
          {initialData ? "Save Changes" : "Create Campaign"}
        </button>
        <button type="button" onClick={() => router.back()} className="h-10 px-5 rounded-lg ring-1 ring-gray-200 text-gray-500 text-[13px] font-medium hover:bg-white transition-colors">Cancel</button>
        {onDelete && (
          <button type="button" onClick={onDelete} className="ml-auto h-10 px-4 rounded-lg text-red-500 text-[13px] font-medium hover:bg-red-50 transition-colors">
            <Trash2 className="w-4 h-4 inline mr-1 -mt-px" />Delete
          </button>
        )}
      </div>
    </form>
  );
}

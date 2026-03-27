"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Check } from "lucide-react";
import { Campaign, CampaignType, CampaignStatus, ProductLine, Channel, Region } from "@/lib/types";
import { CAMPAIGN_TYPE_LABELS, PRODUCT_LINE_LABELS, CHANNEL_LABELS, REGION_LABELS, CAMPAIGN_STATUS_LABELS } from "@/lib/constants";

interface Props {
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

export default function CampaignForm({ initialData, onSave, onDelete }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(() => {
    if (initialData) { const { id, createdAt, updatedAt, ...rest } = initialData; return rest; }
    return { ...defaults };
  });
  const [newTask, setNewTask] = useState("");

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((p) => ({ ...p, [k]: v }));
  const toggle = <T,>(arr: T[], item: T): T[] => arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
  const addTask = () => {
    if (!newTask.trim()) return;
    set("checklist", [...form.checklist, { id: crypto.randomUUID(), text: newTask.trim(), done: false }]);
    setNewTask("");
  };

  const labelClass = "block text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-1.5";
  const inputClass = "w-full h-9 px-3 input text-[13px]";

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="card divide-y divide-border-subtle">
      {/* Details */}
      <div className="p-5">
        <h3 className="text-[13px] font-semibold text-text mb-4">Campaign Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Name *</label>
            <input required type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Summer Frozen Promo" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Type</label>
            <select value={form.type} onChange={(e) => set("type", e.target.value as CampaignType)} className={inputClass}>
              {Object.entries(CAMPAIGN_TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className={labelClass}>Description</label>
          <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)}
            placeholder="Campaign objectives and key messaging..."
            className={inputClass + " h-auto py-2.5 resize-none"} />
        </div>
      </div>

      {/* Config */}
      <div className="p-5">
        <h3 className="text-[13px] font-semibold text-text mb-4">Configuration</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Status</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value as CampaignStatus)} className={inputClass}>
              {Object.entries(CAMPAIGN_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Region</label>
            <select value={form.region} onChange={(e) => set("region", e.target.value as Region)} className={inputClass}>
              {Object.entries(REGION_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="p-5">
        <h3 className="text-[13px] font-semibold text-text mb-4">Schedule & Budget</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Start *</label>
            <input required type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>End *</label>
            <input required type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Budget (₱)</label>
            <input type="number" min={0} value={form.budget || ""} onChange={(e) => set("budget", Number(e.target.value) || 0)} placeholder="0" className={inputClass} />
          </div>
        </div>
      </div>

      {/* Product lines */}
      <div className="p-5">
        <h3 className="text-[13px] font-semibold text-text mb-4">Product Lines</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(PRODUCT_LINE_LABELS).map(([k, v]) => {
            const on = form.productLines.includes(k as ProductLine);
            return (
              <button type="button" key={k} onClick={() => set("productLines", toggle(form.productLines, k as ProductLine))}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                  on ? "bg-lemon text-base" : "bg-muted text-text-muted hover:text-text"
                }`}>{v}</button>
            );
          })}
        </div>
      </div>

      {/* Channels */}
      <div className="p-5">
        <h3 className="text-[13px] font-semibold text-text mb-4">Channels</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(CHANNEL_LABELS).map(([k, v]) => {
            const on = form.channels.includes(k as Channel);
            return (
              <button type="button" key={k} onClick={() => set("channels", toggle(form.channels, k as Channel))}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                  on ? "bg-lemon text-base" : "bg-muted text-text-muted hover:text-text"
                }`}>{v}</button>
            );
          })}
        </div>
      </div>

      {/* Notes */}
      <div className="p-5">
        <h3 className="text-[13px] font-semibold text-text mb-4">Notes</h3>
        <textarea rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)}
          placeholder="Internal notes, creative briefs, links..."
          className={inputClass + " h-auto py-2.5 resize-none"} />
      </div>

      {/* Checklist */}
      <div className="p-5">
        <h3 className="text-[13px] font-semibold text-text mb-4">Task Checklist</h3>
        {form.checklist.length > 0 && (
          <div className="space-y-1 mb-3">
            {form.checklist.map((item) => (
              <div key={item.id} className="flex items-center gap-2.5 group py-1.5 px-2 -mx-2 rounded-lg hover:bg-muted transition-colors">
                <button type="button" onClick={() => set("checklist", form.checklist.map((c) => c.id === item.id ? { ...c, done: !c.done } : c))}
                  className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                    item.done ? "bg-lemon" : "border border-border-emphasis hover:border-lemon"
                  }`}>
                  {item.done && <Check className="w-2.5 h-2.5 text-base" />}
                </button>
                <span className={`flex-1 text-[13px] ${item.done ? "line-through text-text-subtle" : "text-text"}`}>{item.text}</span>
                <button type="button" onClick={() => set("checklist", form.checklist.filter((c) => c.id !== item.id))}
                  className="opacity-0 group-hover:opacity-100 text-text-subtle hover:text-danger transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTask(); } }}
            placeholder="Add a task..." className={inputClass + " flex-1"} />
          <button type="button" onClick={addTask} className="w-9 h-9 btn btn-secondary">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2.5 p-5 bg-subtle">
        <button type="submit" className="h-9 px-5 btn btn-primary text-[13px]">
          {initialData ? "Save Changes" : "Create Campaign"}
        </button>
        <button type="button" onClick={() => router.back()} className="h-9 px-4 btn btn-ghost text-[13px]">
          Cancel
        </button>
        {onDelete && (
          <button type="button" onClick={onDelete} className="ml-auto h-9 px-3 btn btn-ghost text-danger text-[13px]">
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

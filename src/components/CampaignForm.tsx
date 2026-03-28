"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Check, Info, DollarSign, Calendar, Tag, Radio, FileText, ListTodo } from "lucide-react";
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

  const labelClass = "block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2";
  const inputClass = "w-full h-11 px-4 input text-sm";

  const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-xl bg-yellow-bg border border-yellow/20 flex items-center justify-center">
        <Icon className="w-4 h-4 text-yellow" />
      </div>
      <h3 className="text-base font-semibold text-text">{title}</h3>
    </div>
  );

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="space-y-4">
      {/* Details */}
      <div className="glass rounded-2xl p-6">
        <SectionHeader icon={Info} title="Campaign Details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
        <div className="mt-5">
          <label className={labelClass}>Description</label>
          <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)}
            placeholder="Campaign objectives and key messaging..."
            className={inputClass + " h-auto py-3 resize-none"} />
        </div>
      </div>

      {/* Schedule & Budget */}
      <div className="glass rounded-2xl p-6">
        <SectionHeader icon={Calendar} title="Schedule & Budget" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label className={labelClass}>Start Date *</label>
            <input required type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>End Date *</label>
            <input required type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Budget (₱)</label>
            <input type="number" min={0} value={form.budget || ""} onChange={(e) => set("budget", Number(e.target.value) || 0)} placeholder="0" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value as CampaignStatus)} className={inputClass}>
              {Object.entries(CAMPAIGN_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <label className={labelClass}>Region</label>
          <select value={form.region} onChange={(e) => set("region", e.target.value as Region)} className={inputClass}>
            {Object.entries(REGION_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
      </div>

      {/* Product lines */}
      <div className="glass rounded-2xl p-6">
        <SectionHeader icon={Tag} title="Product Lines" />
        <div className="flex flex-wrap gap-2">
          {Object.entries(PRODUCT_LINE_LABELS).map(([k, v]) => {
            const on = form.productLines.includes(k as ProductLine);
            return (
              <button type="button" key={k} onClick={() => set("productLines", toggle(form.productLines, k as ProductLine))}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  on 
                    ? "bg-gradient-to-r from-yellow-bright to-yellow text-black shadow-lg shadow-yellow/20" 
                    : "bg-elevated border border-border text-text-secondary hover:text-text hover:border-border-light"
                }`}>{v}</button>
            );
          })}
        </div>
      </div>

      {/* Channels */}
      <div className="glass rounded-2xl p-6">
        <SectionHeader icon={Radio} title="Channels" />
        <div className="flex flex-wrap gap-2">
          {Object.entries(CHANNEL_LABELS).map(([k, v]) => {
            const on = form.channels.includes(k as Channel);
            return (
              <button type="button" key={k} onClick={() => set("channels", toggle(form.channels, k as Channel))}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  on 
                    ? "bg-gradient-to-r from-yellow-bright to-yellow text-black shadow-lg shadow-yellow/20" 
                    : "bg-elevated border border-border text-text-secondary hover:text-text hover:border-border-light"
                }`}>{v}</button>
            );
          })}
        </div>
      </div>

      {/* Notes */}
      <div className="glass rounded-2xl p-6">
        <SectionHeader icon={FileText} title="Notes" />
        <textarea rows={4} value={form.notes} onChange={(e) => set("notes", e.target.value)}
          placeholder="Internal notes, creative briefs, links to resources..."
          className={inputClass + " h-auto py-3 resize-none"} />
      </div>

      {/* Checklist */}
      <div className="glass rounded-2xl p-6">
        <SectionHeader icon={ListTodo} title="Task Checklist" />
        {form.checklist.length > 0 && (
          <div className="space-y-2 mb-4">
            {form.checklist.map((item) => (
              <div key={item.id} className="flex items-center gap-3 group p-3 -mx-1 rounded-xl bg-elevated/50 border border-transparent hover:border-border transition-colors">
                <button type="button" onClick={() => set("checklist", form.checklist.map((c) => c.id === item.id ? { ...c, done: !c.done } : c))}
                  className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                    item.done 
                      ? "bg-gradient-to-br from-green to-green/80 shadow-lg shadow-green/20" 
                      : "border-2 border-border hover:border-yellow"
                  }`}>
                  {item.done && <Check className="w-3 h-3 text-white" />}
                </button>
                <span className={`flex-1 text-sm ${item.done ? "line-through text-text-tertiary" : "text-text"}`}>{item.text}</span>
                <button type="button" onClick={() => set("checklist", form.checklist.filter((c) => c.id !== item.id))}
                  className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-lg bg-red-bg border border-red/20 flex items-center justify-center text-red transition-all hover:bg-red/20">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-3">
          <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTask(); } }}
            placeholder="Add a new task..." className={inputClass + " flex-1"} />
          <button type="button" onClick={addTask} className="w-11 h-11 rounded-xl bg-yellow-bg border border-yellow/20 flex items-center justify-center text-yellow hover:bg-yellow/20 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="glass rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-3">
        <button type="submit" className="h-12 px-8 btn-primary text-sm font-semibold w-full sm:w-auto">
          {initialData ? "Save Changes" : "Create Campaign"}
        </button>
        <button type="button" onClick={() => router.back()} className="h-12 px-6 btn-secondary text-sm font-semibold w-full sm:w-auto">
          Cancel
        </button>
        {onDelete && (
          <button type="button" onClick={onDelete} className="sm:ml-auto h-12 px-5 rounded-xl bg-red-bg text-red border border-red/20 text-sm font-semibold flex items-center gap-2 hover:bg-red/20 transition-colors w-full sm:w-auto justify-center">
            <Trash2 className="w-4 h-4" />
            Delete Campaign
          </button>
        )}
      </div>
    </form>
  );
}

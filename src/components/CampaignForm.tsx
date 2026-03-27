"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Check, FileText, Settings, Calendar, Package, Radio, StickyNote, ListTodo } from "lucide-react";
import { Campaign, CampaignType, CampaignStatus, ProductLine, Channel, Region } from "@/lib/types";
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

function Section({ icon: Icon, title, children }: { icon: typeof FileText; title: string; children: React.ReactNode }) {
  return (
    <div className="px-5 py-5 border-b border-border">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-accent" />
        <h3 className="text-[12px] font-bold text-primary uppercase tracking-wide">{title}</h3>
      </div>
      {children}
    </div>
  );
}

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

  const input = "w-full h-9 px-3 rounded-lg input-dark text-[12px]";
  const label = "block text-[10px] font-semibold text-muted uppercase tracking-wider mb-1.5";

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="glass rounded-xl overflow-hidden">
      <Section icon={FileText} title="Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={label}>Name *</label>
            <input required type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Summer Frozen Promo" className={input} />
          </div>
          <div>
            <label className={label}>Type</label>
            <select value={form.type} onChange={(e) => set("type", e.target.value as CampaignType)} className={input}>
              {Object.entries(CAMPAIGN_TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-3">
          <label className={label}>Description</label>
          <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)}
            placeholder="Campaign objectives and key messaging..."
            className={input + " h-auto py-2.5 resize-none"} />
        </div>
      </Section>

      <Section icon={Settings} title="Configuration">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={label}>Status</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value as CampaignStatus)} className={input}>
              {Object.entries(CAMPAIGN_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Region</label>
            <select value={form.region} onChange={(e) => set("region", e.target.value as Region)} className={input}>
              {Object.entries(REGION_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>
      </Section>

      <Section icon={Calendar} title="Schedule & Budget">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className={label}>Start *</label>
            <input required type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} className={input} />
          </div>
          <div>
            <label className={label}>End *</label>
            <input required type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} className={input} />
          </div>
          <div>
            <label className={label}>Budget (₱)</label>
            <input type="number" min={0} value={form.budget || ""} onChange={(e) => set("budget", Number(e.target.value) || 0)} placeholder="0" className={input} />
          </div>
        </div>
      </Section>

      <Section icon={Package} title="Product Lines">
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(PRODUCT_LINE_LABELS).map(([k, v]) => {
            const on = form.productLines.includes(k as ProductLine);
            return (
              <button type="button" key={k} onClick={() => set("productLines", toggle(form.productLines, k as ProductLine))}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                  on ? "bg-accent text-[#09090B]" : "bg-card text-secondary hover:text-primary hover:bg-card-hover"
                }`}>{v}</button>
            );
          })}
        </div>
      </Section>

      <Section icon={Radio} title="Channels">
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(CHANNEL_LABELS).map(([k, v]) => {
            const on = form.channels.includes(k as Channel);
            return (
              <button type="button" key={k} onClick={() => set("channels", toggle(form.channels, k as Channel))}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                  on ? "bg-accent text-[#09090B]" : "bg-card text-secondary hover:text-primary hover:bg-card-hover"
                }`}>{v}</button>
            );
          })}
        </div>
      </Section>

      <Section icon={StickyNote} title="Notes">
        <textarea rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)}
          placeholder="Internal notes, creative briefs, links..."
          className={input + " h-auto py-2.5 resize-none"} />
      </Section>

      <Section icon={ListTodo} title="Checklist">
        <div className="space-y-1 mb-3">
          {form.checklist.map((item) => (
            <div key={item.id} className="flex items-center gap-2.5 group py-1.5 px-1.5 rounded-lg hover:bg-card transition-colors">
              <button type="button" onClick={() => set("checklist", form.checklist.map((c) => c.id === item.id ? { ...c, done: !c.done } : c))}
                className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all ${
                  item.done ? "bg-accent" : "border border-border hover:border-accent"
                }`}>
                {item.done && <Check className="w-2.5 h-2.5 text-[#09090B]" />}
              </button>
              <span className={`flex-1 text-[12px] ${item.done ? "line-through text-muted" : "text-primary"}`}>{item.text}</span>
              <button type="button" onClick={() => set("checklist", form.checklist.filter((c) => c.id !== item.id))}
                className="opacity-0 group-hover:opacity-100 text-muted hover:text-red transition-all">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-1.5">
          <input type="text" value={newCheck} onChange={(e) => setNewCheck(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCheck(); } }}
            placeholder="Add a task..." className={input + " flex-1"} />
          <button type="button" onClick={addCheck}
            className="w-9 h-9 rounded-lg bg-card text-muted hover:text-accent hover:bg-card-hover transition-all flex items-center justify-center shrink-0">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </Section>

      <div className="flex items-center gap-2.5 p-5">
        <button type="submit" className="h-9 px-5 rounded-lg btn-primary text-[12px]">
          {initialData ? "Save Changes" : "Create Campaign"}
        </button>
        <button type="button" onClick={() => router.back()} className="h-9 px-4 rounded-lg btn-ghost text-[12px]">Cancel</button>
        {onDelete && (
          <button type="button" onClick={onDelete} className="ml-auto h-9 px-3 rounded-lg text-red text-[12px] font-medium hover:bg-red-soft transition-colors flex items-center gap-1">
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        )}
      </div>
    </form>
  );
}

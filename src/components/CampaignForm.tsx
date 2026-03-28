"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Check } from "lucide-react";
import {
  Campaign,
  CampaignType,
  CampaignStatus,
  ProductLine,
  Channel,
  Region,
} from "@/lib/types";
import {
  CAMPAIGN_TYPE_LABELS,
  PRODUCT_LINE_LABELS,
  CHANNEL_LABELS,
  REGION_LABELS,
  CAMPAIGN_STATUS_LABELS,
} from "@/lib/constants";

interface Props {
  initialData?: Campaign;
  onSave: (data: Omit<Campaign, "id" | "createdAt" | "updatedAt">) => void;
  onDelete?: () => void;
}

const defaults: Omit<Campaign, "id" | "createdAt" | "updatedAt"> = {
  name: "",
  description: "",
  type: "social_media",
  status: "draft",
  productLines: [],
  channels: [],
  region: "all_branches",
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
  budget: 0,
  notes: "",
  checklist: [],
};

export default function CampaignForm({ initialData, onSave, onDelete }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(() => {
    if (initialData) {
      const { id, createdAt, updatedAt, ...rest } = initialData;
      return rest;
    }
    return { ...defaults };
  });
  const [newTask, setNewTask] = useState("");

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const toggle = <T,>(arr: T[], item: T): T[] =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

  const addTask = () => {
    if (!newTask.trim()) return;
    set("checklist", [
      ...form.checklist,
      { id: crypto.randomUUID(), text: newTask.trim(), done: false },
    ]);
    setNewTask("");
  };

  const inputClass = "input input-rect h-12 text-sm bg-surface-lowest border border-outline-variant/20";
  const labelClass = "meta-label mb-2 block";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
      className="space-y-6"
    >
      {/* Details */}
      <section className="card-surface p-8">
        <h3 className="text-lg font-bold text-on-bg mb-6">Campaign Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Name *</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Summer Frozen Promo"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Type</label>
            <select
              value={form.type}
              onChange={(e) => set("type", e.target.value as CampaignType)}
              className={inputClass}
            >
              {Object.entries(CAMPAIGN_TYPE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <label className={labelClass}>Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Campaign objectives and key messaging..."
            className={inputClass + " h-auto py-3 resize-none"}
          />
        </div>
      </section>

      {/* Schedule & Budget */}
      <section className="card-surface p-8">
        <h3 className="text-lg font-bold text-on-bg mb-6">Schedule & Budget</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label className={labelClass}>Start Date *</label>
            <input
              required
              type="date"
              value={form.startDate}
              onChange={(e) => set("startDate", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>End Date *</label>
            <input
              required
              type="date"
              value={form.endDate}
              onChange={(e) => set("endDate", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Budget (₱)</label>
            <input
              type="number"
              min={0}
              value={form.budget || ""}
              onChange={(e) => set("budget", Number(e.target.value) || 0)}
              placeholder="0"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select
              value={form.status}
              onChange={(e) => set("status", e.target.value as CampaignStatus)}
              className={inputClass}
            >
              {Object.entries(CAMPAIGN_STATUS_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <label className={labelClass}>Region</label>
          <select
            value={form.region}
            onChange={(e) => set("region", e.target.value as Region)}
            className={inputClass}
          >
            {Object.entries(REGION_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Product Lines */}
      <section className="card-surface p-8">
        <h3 className="text-lg font-bold text-on-bg mb-6">Product Lines</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(PRODUCT_LINE_LABELS).map(([k, v]) => {
            const on = form.productLines.includes(k as ProductLine);
            return (
              <button
                type="button"
                key={k}
                onClick={() => set("productLines", toggle(form.productLines, k as ProductLine))}
                className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-95 ${
                  on
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-high"
                }`}
              >
                {on && <Check className="w-4 h-4 inline mr-1" />}
                {v}
              </button>
            );
          })}
        </div>
      </section>

      {/* Channels */}
      <section className="card-surface p-8">
        <h3 className="text-lg font-bold text-on-bg mb-6">Channels</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(CHANNEL_LABELS).map(([k, v]) => {
            const on = form.channels.includes(k as Channel);
            return (
              <button
                type="button"
                key={k}
                onClick={() => set("channels", toggle(form.channels, k as Channel))}
                className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-95 ${
                  on
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-high"
                }`}
              >
                {on && <Check className="w-4 h-4 inline mr-1" />}
                {v}
              </button>
            );
          })}
        </div>
      </section>

      {/* Notes */}
      <section className="card-surface p-8">
        <h3 className="text-lg font-bold text-on-bg mb-6">Notes</h3>
        <textarea
          rows={4}
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Internal notes, creative briefs, links..."
          className={inputClass + " h-auto py-3 resize-none"}
        />
      </section>

      {/* Checklist */}
      <section className="card-surface p-8">
        <h3 className="text-lg font-bold text-on-bg mb-6">Task Checklist</h3>
        {form.checklist.length > 0 && (
          <div className="space-y-2 mb-5">
            {form.checklist.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 group p-3 rounded-xl bg-surface-low"
              >
                <button
                  type="button"
                  onClick={() =>
                    set(
                      "checklist",
                      form.checklist.map((c) =>
                        c.id === item.id ? { ...c, done: !c.done } : c
                      )
                    )
                  }
                  className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                    item.done
                      ? "bg-green-500 text-white"
                      : "border-2 border-outline-variant hover:border-primary-container"
                  }`}
                >
                  {item.done && <Check className="w-3 h-3" />}
                </button>
                <span
                  className={`flex-1 text-sm ${
                    item.done
                      ? "line-through text-sl400"
                      : "text-on-bg"
                  }`}
                >
                  {item.text}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    set(
                      "checklist",
                      form.checklist.filter((c) => c.id !== item.id)
                    )
                  }
                  className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-error-container flex items-center justify-center text-md-error transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTask();
              }
            }}
            placeholder="Add a new task..."
            className={inputClass + " flex-1"}
          />
          <button
            type="button"
            onClick={addTask}
            className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Actions */}
      <section className="card-surface p-8 flex flex-col sm:flex-row items-center gap-3">
        <button type="submit" className="btn-cta px-8 py-3.5 rounded-full text-sm w-full sm:w-auto">
          {initialData ? "Save Changes" : "Create Campaign"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-outline px-6 py-3.5 text-sm w-full sm:w-auto"
        >
          Cancel
        </button>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="sm:ml-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-md-error text-white font-bold text-sm rounded-full hover:opacity-90 transition-opacity w-full sm:w-auto"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        )}
      </section>
    </form>
  );
}

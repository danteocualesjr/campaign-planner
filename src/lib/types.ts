export type CampaignStatus = "draft" | "active" | "paused" | "completed";

export type CampaignType =
  | "social_media"
  | "email"
  | "in_store_promo"
  | "franchise_event"
  | "product_launch";

export type ProductLine =
  | "old_fashioned"
  | "fresh_flavored"
  | "premium_blends"
  | "hot_lemonade"
  | "frozen_series"
  | "smoothies";

export type Channel =
  | "facebook"
  | "instagram"
  | "in_store"
  | "email"
  | "sms";

export type Region =
  | "all_branches"
  | "metro_manila"
  | "visayas"
  | "mindanao";

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  type: CampaignType;
  status: CampaignStatus;
  productLines: ProductLine[];
  channels: Channel[];
  region: Region;
  startDate: string;
  endDate: string;
  budget: number;
  notes: string;
  checklist: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CampaignTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  defaults: Partial<Omit<Campaign, "id" | "createdAt" | "updatedAt">>;
}

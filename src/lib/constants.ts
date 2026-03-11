import { CampaignStatus, CampaignType, ProductLine, Channel, Region } from "./types";

export const CAMPAIGN_STATUS_LABELS: Record<CampaignStatus, string> = {
  draft: "Draft",
  active: "Active",
  paused: "Paused",
  completed: "Completed",
};

export const CAMPAIGN_STATUS_COLORS: Record<CampaignStatus, { bg: string; text: string; dot: string }> = {
  draft: { bg: "bg-card", text: "text-secondary", dot: "bg-secondary" },
  active: { bg: "bg-green-soft", text: "text-green", dot: "bg-green" },
  paused: { bg: "bg-orange-soft", text: "text-orange", dot: "bg-orange" },
  completed: { bg: "bg-blue-soft", text: "text-blue", dot: "bg-blue" },
};

export const CAMPAIGN_TYPE_LABELS: Record<CampaignType, string> = {
  social_media: "Social Media",
  email: "Email",
  in_store_promo: "In-Store Promo",
  franchise_event: "Franchise Event",
  product_launch: "Product Launch",
};

export const CAMPAIGN_TYPE_COLORS: Record<CampaignType, { bg: string; text: string }> = {
  social_media: { bg: "bg-blue", text: "text-blue" },
  email: { bg: "bg-purple", text: "text-purple" },
  in_store_promo: { bg: "bg-accent", text: "text-accent" },
  franchise_event: { bg: "bg-green", text: "text-green" },
  product_launch: { bg: "bg-orange", text: "text-orange" },
};

export const PRODUCT_LINE_LABELS: Record<ProductLine, string> = {
  old_fashioned: "Old-Fashioned",
  fresh_flavored: "Fresh-Flavored",
  premium_blends: "Premium Blends",
  hot_lemonade: "Hot Lemonade",
  frozen_series: "Frozen Series",
  smoothies: "Smoothies",
};

export const CHANNEL_LABELS: Record<Channel, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  in_store: "In-Store",
  email: "Email",
  sms: "SMS",
};

export const REGION_LABELS: Record<Region, string> = {
  all_branches: "All Branches",
  metro_manila: "Metro Manila",
  visayas: "Visayas",
  mindanao: "Mindanao",
};

export const STORAGE_KEY = "lemonco_campaigns";

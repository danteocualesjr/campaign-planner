import { CampaignStatus, CampaignType, ProductLine, Channel, Region } from "./types";

export const CAMPAIGN_STATUS_LABELS: Record<CampaignStatus, string> = {
  draft: "Draft",
  active: "Active",
  paused: "Paused",
  completed: "Completed",
};

export const CAMPAIGN_STATUS_COLORS: Record<CampaignStatus, { bg: string; text: string; dot: string }> = {
  draft: { bg: "bg-secondary-container", text: "text-md-secondary", dot: "bg-yellow-500" },
  active: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  paused: { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-500" },
  completed: { bg: "bg-sl200", text: "text-sl600", dot: "bg-sl400" },
};

export const CAMPAIGN_TYPE_LABELS: Record<CampaignType, string> = {
  social_media: "Social Media",
  email: "Email",
  in_store_promo: "In-Store Promo",
  franchise_event: "Franchise Event",
  product_launch: "Product Launch",
};

export const CAMPAIGN_TYPE_COLORS: Record<CampaignType, { bg: string; text: string }> = {
  social_media: { bg: "bg-blue-500", text: "text-blue-600" },
  email: { bg: "bg-purple-500", text: "text-purple-600" },
  in_store_promo: { bg: "bg-yellow-500", text: "text-yellow-700" },
  franchise_event: { bg: "bg-green-500", text: "text-green-600" },
  product_launch: { bg: "bg-orange-500", text: "text-orange-600" },
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

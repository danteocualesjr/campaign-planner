import { CampaignStatus, CampaignType, ProductLine, Channel, Region } from "./types";

export const CAMPAIGN_STATUS_LABELS: Record<CampaignStatus, string> = {
  draft: "Draft",
  active: "Active",
  paused: "Paused",
  completed: "Completed",
};

export const CAMPAIGN_STATUS_COLORS: Record<CampaignStatus, { bg: string; text: string; dot: string }> = {
  draft: { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" },
  active: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  paused: { bg: "bg-orange-50", text: "text-orange-500", dot: "bg-orange-500" },
  completed: { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-500" },
};

export const CAMPAIGN_TYPE_LABELS: Record<CampaignType, string> = {
  social_media: "Social Media",
  email: "Email",
  in_store_promo: "In-Store Promo",
  franchise_event: "Franchise Event",
  product_launch: "Product Launch",
};

export const CAMPAIGN_TYPE_COLORS: Record<CampaignType, string> = {
  social_media: "bg-blue-500",
  email: "bg-purple-500",
  in_store_promo: "bg-brand-500",
  franchise_event: "bg-green-500",
  product_launch: "bg-orange-500",
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

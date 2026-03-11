import { CampaignTemplate } from "./types";

export const CAMPAIGN_TEMPLATES: CampaignTemplate[] = [
  {
    id: "summer-promo",
    name: "Summer Frozen Promo",
    description:
      "Drive sales of the Frozen Series during peak summer months with social media and in-store promotions.",
    icon: "☀️",
    defaults: {
      name: "Summer Frozen Promo",
      description:
        "Beat the heat with our Frozen Series! Special summer pricing and bundle deals across all branches.",
      type: "in_store_promo",
      status: "draft",
      productLines: ["frozen_series"],
      channels: ["facebook", "instagram", "in_store"],
      region: "all_branches",
      budget: 50000,
      notes: "Focus on afternoon foot traffic. Pair with Instagram Reels content.",
      checklist: [
        { id: "1", text: "Design promotional posters", done: false },
        { id: "2", text: "Brief franchisees on pricing", done: false },
        { id: "3", text: "Schedule social media content", done: false },
        { id: "4", text: "Set up in-store signage", done: false },
      ],
    },
  },
  {
    id: "rainy-season",
    name: "Rainy Season Warmth",
    description:
      "Feature Hot Lemonade as the go-to comfort drink during the rainy season months.",
    icon: "🌧️",
    defaults: {
      name: "Rainy Season Warmth",
      description:
        "Warm up with The Lemon Co. Hot Lemonade — the perfect companion for rainy days. Special rainy day bundles available.",
      type: "social_media",
      status: "draft",
      productLines: ["hot_lemonade"],
      channels: ["facebook", "instagram", "sms"],
      region: "all_branches",
      budget: 30000,
      notes: "Target commuters and students. Rainy day discount triggers.",
      checklist: [
        { id: "1", text: "Create cozy-themed visual assets", done: false },
        { id: "2", text: "Set up SMS blast schedule", done: false },
        { id: "3", text: "Train staff on hot lemonade upsells", done: false },
      ],
    },
  },
  {
    id: "branch-opening",
    name: "New Branch Opening",
    description:
      "Grand opening campaign for a new franchise location with opening-day specials and local awareness.",
    icon: "🎉",
    defaults: {
      name: "New Branch Grand Opening",
      description:
        "Join us for the grand opening! Free taste tests, opening-day specials, and prizes for the first 100 customers.",
      type: "franchise_event",
      status: "draft",
      productLines: ["old_fashioned", "fresh_flavored", "premium_blends"],
      channels: ["facebook", "instagram", "in_store", "sms"],
      region: "metro_manila",
      budget: 75000,
      notes: "Coordinate with local government for permits. Invite local influencers.",
      checklist: [
        { id: "1", text: "Secure event permits", done: false },
        { id: "2", text: "Confirm influencer partnerships", done: false },
        { id: "3", text: "Print flyers and banners", done: false },
        { id: "4", text: "Prepare opening-day freebies", done: false },
        { id: "5", text: "Staff training completed", done: false },
      ],
    },
  },
  {
    id: "holiday-special",
    name: "Holiday Special",
    description:
      "Limited-edition holiday flavors and gift bundles for the Christmas/New Year season.",
    icon: "🎄",
    defaults: {
      name: "Holiday Special Collection",
      description:
        "Celebrate the season with limited-edition holiday blends and gift-ready lemonade bundles. Perfect for sharing!",
      type: "product_launch",
      status: "draft",
      productLines: ["premium_blends", "fresh_flavored"],
      channels: ["facebook", "instagram", "email", "in_store"],
      region: "all_branches",
      budget: 100000,
      notes: "Launch by November 15. Coordinate holiday packaging with suppliers.",
      checklist: [
        { id: "1", text: "Finalize holiday flavor recipes", done: false },
        { id: "2", text: "Design holiday packaging", done: false },
        { id: "3", text: "Email campaign to loyalty list", done: false },
        { id: "4", text: "Social media countdown content", done: false },
        { id: "5", text: "Brief all branches on menu additions", done: false },
      ],
    },
  },
  {
    id: "product-launch",
    name: "New Product Launch",
    description:
      "Multi-channel announcement and hype campaign for a new product addition to the menu.",
    icon: "🚀",
    defaults: {
      name: "New Product Launch",
      description:
        "Introducing something fresh to The Lemon Co. menu! Multi-channel teaser campaign leading to launch day.",
      type: "product_launch",
      status: "draft",
      productLines: ["smoothies"],
      channels: ["facebook", "instagram", "email", "in_store"],
      region: "all_branches",
      budget: 60000,
      notes: "Phased rollout: teasers 2 weeks before, reveal 1 week before, launch day event.",
      checklist: [
        { id: "1", text: "Product photography and videography", done: false },
        { id: "2", text: "Teaser social media posts", done: false },
        { id: "3", text: "Press release draft", done: false },
        { id: "4", text: "Staff tasting and training", done: false },
        { id: "5", text: "Launch day in-store setup", done: false },
      ],
    },
  },
];

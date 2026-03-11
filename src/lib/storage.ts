import { Campaign } from "./types";
import { STORAGE_KEY } from "./constants";

export function getCampaigns(): Campaign[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Campaign[];
  } catch {
    return [];
  }
}

export function saveCampaigns(campaigns: Campaign[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
}

export function getCampaignById(id: string): Campaign | undefined {
  return getCampaigns().find((c) => c.id === id);
}

export function createCampaign(campaign: Omit<Campaign, "id" | "createdAt" | "updatedAt">): Campaign {
  const now = new Date().toISOString();
  const newCampaign: Campaign = {
    ...campaign,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  const campaigns = getCampaigns();
  campaigns.unshift(newCampaign);
  saveCampaigns(campaigns);
  return newCampaign;
}

export function updateCampaign(id: string, updates: Partial<Campaign>): Campaign | undefined {
  const campaigns = getCampaigns();
  const index = campaigns.findIndex((c) => c.id === id);
  if (index === -1) return undefined;
  campaigns[index] = {
    ...campaigns[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveCampaigns(campaigns);
  return campaigns[index];
}

export function deleteCampaign(id: string): boolean {
  const campaigns = getCampaigns();
  const filtered = campaigns.filter((c) => c.id !== id);
  if (filtered.length === campaigns.length) return false;
  saveCampaigns(filtered);
  return true;
}

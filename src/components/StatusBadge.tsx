import { CampaignStatus } from "@/lib/types";
import { CAMPAIGN_STATUS_LABELS, CAMPAIGN_STATUS_COLORS } from "@/lib/constants";

export default function StatusBadge({ status }: { status: CampaignStatus }) {
  const c = CAMPAIGN_STATUS_COLORS[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {CAMPAIGN_STATUS_LABELS[status]}
    </span>
  );
}

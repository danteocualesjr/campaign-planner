import { CampaignStatus } from "@/lib/types";

const styles: Record<CampaignStatus, { bg: string; text: string; dot: string }> = {
  draft: { bg: "bg-muted", text: "text-text-muted", dot: "bg-text-subtle" },
  active: { bg: "bg-success-muted", text: "text-success", dot: "bg-success" },
  paused: { bg: "bg-warning-muted", text: "text-warning", dot: "bg-warning" },
  completed: { bg: "bg-info-muted", text: "text-info", dot: "bg-info" },
};

const labels: Record<CampaignStatus, string> = {
  draft: "Draft",
  active: "Active",
  paused: "Paused",
  completed: "Done",
};

export default function StatusBadge({ status }: { status: CampaignStatus }) {
  const s = styles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {labels[status]}
    </span>
  );
}

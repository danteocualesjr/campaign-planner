import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: "amber" | "green" | "blue";
}

const COLORS = {
  amber: { ring: "ring-brand-200", iconBg: "bg-brand-50", iconText: "text-brand-600" },
  green: { ring: "ring-green-100", iconBg: "bg-green-50", iconText: "text-green-600" },
  blue:  { ring: "ring-blue-100",  iconBg: "bg-blue-50",  iconText: "text-blue-600" },
};

export default function StatsCard({ label, value, icon: Icon, color }: StatsCardProps) {
  const c = COLORS[color];
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[13px] font-medium text-gray-500">{label}</span>
        <div className={`w-9 h-9 rounded-lg ${c.iconBg} flex items-center justify-center`}>
          <Icon className={`w-[18px] h-[18px] ${c.iconText}`} />
        </div>
      </div>
      <p className="text-[26px] font-bold text-navy-900 tracking-tight leading-none">{value}</p>
    </div>
  );
}

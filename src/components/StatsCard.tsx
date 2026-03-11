import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; up: boolean };
  color: "gold" | "green" | "blue" | "purple";
}

const COLORS = {
  gold: { iconBg: "from-accent/20 to-accent/5", icon: "text-accent", glow: "shadow-[0_0_30px_rgba(250,204,21,0.15)]" },
  green: { iconBg: "from-green/20 to-green/5", icon: "text-green", glow: "shadow-[0_0_30px_rgba(34,197,94,0.15)]" },
  blue: { iconBg: "from-blue/20 to-blue/5", icon: "text-blue", glow: "shadow-[0_0_30px_rgba(59,130,246,0.15)]" },
  purple: { iconBg: "from-purple/20 to-purple/5", icon: "text-purple", glow: "shadow-[0_0_30px_rgba(168,85,247,0.15)]" },
};

export default function StatsCard({ label, value, icon: Icon, trend, color }: StatsCardProps) {
  const c = COLORS[color];
  return (
    <div className={`group relative glass rounded-2xl p-5 glass-hover transition-all duration-300 hover:scale-[1.02] ${c.glow}`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.iconBg} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${c.icon}`} />
          </div>
          {trend && (
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${trend.up ? "bg-green-soft text-green" : "bg-red-soft text-red"}`}>
              {trend.up ? "+" : ""}{trend.value}%
            </span>
          )}
        </div>
        <p className="text-[12px] font-medium text-muted uppercase tracking-wider mb-1">{label}</p>
        <p className="text-[28px] font-bold text-primary tracking-tight">{value}</p>
      </div>
    </div>
  );
}

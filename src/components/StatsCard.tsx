import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; up: boolean };
  color: "gold" | "green" | "blue" | "purple";
}

const COLORS = {
  gold:   { icon: "text-accent",  bg: "bg-accent-soft",  ring: "ring-accent/10" },
  green:  { icon: "text-green",   bg: "bg-green-soft",   ring: "ring-green/10" },
  blue:   { icon: "text-blue",    bg: "bg-blue-soft",    ring: "ring-blue/10" },
  purple: { icon: "text-purple",  bg: "bg-purple-soft",  ring: "ring-purple/10" },
};

export default function StatsCard({ label, value, icon: Icon, trend, color }: StatsCardProps) {
  const c = COLORS[color];
  return (
    <div className="glass rounded-xl p-4 transition-all duration-200 hover:border-border-hover">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${c.icon}`} />
        </div>
        {trend && (
          <span className={`flex items-center gap-0.5 text-[11px] font-semibold ${trend.up ? "text-green" : "text-red"}`}>
            {trend.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend.up ? "+" : ""}{trend.value}%
          </span>
        )}
      </div>
      <p className="text-[24px] font-bold text-primary tracking-tight leading-none mb-0.5">{value}</p>
      <p className="text-[11px] font-medium text-muted">{label}</p>
    </div>
  );
}

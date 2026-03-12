import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; up: boolean };
  color: "gold" | "green" | "blue" | "purple";
  subtitle?: string;
}

const COLORS = {
  gold: { 
    iconBg: "from-accent/25 to-accent/10", 
    icon: "text-accent", 
    glow: "shadow-[0_0_40px_rgba(250,204,21,0.12)]",
    ring: "group-hover:ring-accent/20"
  },
  green: { 
    iconBg: "from-green/25 to-green/10", 
    icon: "text-green", 
    glow: "shadow-[0_0_40px_rgba(34,197,94,0.12)]",
    ring: "group-hover:ring-green/20"
  },
  blue: { 
    iconBg: "from-blue/25 to-blue/10", 
    icon: "text-blue", 
    glow: "shadow-[0_0_40px_rgba(59,130,246,0.12)]",
    ring: "group-hover:ring-blue/20"
  },
  purple: { 
    iconBg: "from-purple/25 to-purple/10", 
    icon: "text-purple", 
    glow: "shadow-[0_0_40px_rgba(168,85,247,0.12)]",
    ring: "group-hover:ring-purple/20"
  },
};

export default function StatsCard({ label, value, icon: Icon, trend, color, subtitle }: StatsCardProps) {
  const c = COLORS[color];
  return (
    <div className={`group relative glass rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] ring-1 ring-transparent ${c.ring} ${c.glow}`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
            <Icon className={`w-5 h-5 ${c.icon}`} />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg ${
              trend.up ? "bg-green-soft text-green" : "bg-red-soft text-red"
            }`}>
              {trend.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trend.up ? "+" : ""}{trend.value}%
            </div>
          )}
        </div>
        <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">{label}</p>
        <p className="text-[28px] font-bold text-primary tracking-tight leading-none">{value}</p>
        {subtitle && (
          <p className="text-[11px] text-muted mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

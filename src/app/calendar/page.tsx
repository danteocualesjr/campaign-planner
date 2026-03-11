"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addMonths, subMonths, format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Campaign } from "@/lib/types";
import { getCampaigns } from "@/lib/storage";
import CalendarGrid from "@/components/CalendarGrid";

export default function CalendarPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [cur, setCur] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setCampaigns(getCampaigns()); setMounted(true); }, []);

  if (!mounted) return <div className="p-6 lg:p-8"><div className="animate-pulse"><div className="h-8 bg-gray-100 rounded w-48 mb-4" /><div className="h-[500px] bg-gray-100 rounded-xl" /></div></div>;

  return (
    <div className="p-6 lg:p-8 max-w-[1080px] anim-enter">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-navy-900 tracking-tight">Calendar</h1>
          <p className="text-[13px] text-gray-400 mt-0.5">Visual overview of campaign schedules</p>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setCur(subMonths(cur, 1))} className="p-2 rounded-lg ring-1 ring-gray-200 text-gray-400 hover:bg-white hover:text-gray-600 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="min-w-[150px] text-center text-[14px] font-semibold text-navy-900">{format(cur, "MMMM yyyy")}</span>
          <button onClick={() => setCur(addMonths(cur, 1))} className="p-2 rounded-lg ring-1 ring-gray-200 text-gray-400 hover:bg-white hover:text-gray-600 transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button onClick={() => setCur(new Date())} className="ml-1 h-8 px-3 rounded-lg ring-1 ring-gray-200 text-[12px] font-medium text-gray-500 hover:bg-white transition-colors">Today</button>
        </div>
      </div>

      <CalendarGrid currentDate={cur} campaigns={campaigns} onDayClick={(d) => router.push(`/campaigns/new?date=${format(d, "yyyy-MM-dd")}`)} />

      <div className="mt-4 flex items-center gap-4 text-[11px] text-gray-400">
        <span className="font-semibold text-gray-500">Legend:</span>
        {[["bg-blue-500","Social Media"],["bg-purple-500","Email"],["bg-brand-500","In-Store"],["bg-green-500","Franchise"],["bg-orange-500","Launch"]].map(([c,l])=>(
          <span key={l} className="flex items-center gap-1"><span className={`w-2.5 h-2.5 rounded-sm ${c}`} />{l}</span>
        ))}
      </div>
    </div>
  );
}

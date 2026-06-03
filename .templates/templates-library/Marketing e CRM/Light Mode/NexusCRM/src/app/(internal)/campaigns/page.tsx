"use client";

import React from "react";
import { 
  Megaphone, 
  Send, 
  Eye, 
  MousePointer2, 
  RefreshCcw,
  BarChart2,
  Calendar,
  Layers,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const campaigns = [
  { 
    id: 1, 
    name: "Enterprise Q3 Growth", 
    status: "Active", 
    type: "Email Marketing", 
    performance: 82, 
    budget: "$4,500", 
    sent: "12,400", 
    open: "24.5%", 
    click: "4.2%",
    color: "from-blue-500 to-indigo-600"
  },
  { 
    id: 2, 
    name: "C-Level Outreach 2024", 
    status: "Active", 
    type: "Direct Sales", 
    performance: 95, 
    budget: "$12,000", 
    sent: "850", 
    open: "68.2%", 
    click: "12.8%",
    color: "from-emerald-500 to-teal-600"
  },
  { 
    id: 3, 
    name: "SaaS Product Hunt Launch", 
    status: "Scheduled", 
    type: "Multi-channel", 
    performance: 0, 
    budget: "$2,000", 
    sent: "0", 
    open: "-", 
    click: "-",
    color: "from-orange-500 to-red-600"
  },
  { 
    id: 4, 
    name: "Retargeting Tech-Decision", 
    status: "Paused", 
    type: "Paid Ads", 
    performance: 45, 
    budget: "$8,200", 
    sent: "145,000", 
    open: "1.2%", 
    click: "0.8%",
    color: "from-purple-500 to-pink-600"
  },
];

export default function CampaignsPage() {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Campaign Hub
          </h1>
          <p className="text-muted-foreground mt-1">Design, execute and optimize your NexusCRM campaigns.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-5 py-2.5 font-medium transition-all hover:bg-white/10">
            <Calendar className="h-4 w-4" />
            Calendar
          </button>
          <button className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] rounded-xl px-5 py-2.5 font-medium transition-all">
            <Sparkles className="h-4 w-4" />
            AI Create
          </button>
        </div>
      </div>

      {/* Stats Mini Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Reach", value: "158.4K", icon: Send },
          { label: "Avg. Open Rate", value: "32.4%", icon: Eye },
          { label: "Avg. CTR", value: "5.8%", icon: MousePointer2 },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold tracking-tight font-mono">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {campaigns.map((camp) => (
          <div key={camp.id} className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300">
            {/* Background Glow */}
            <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 transition-opacity group-hover:opacity-40", camp.color)} />
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-8">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "h-2 w-2 rounded-full",
                      camp.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-zinc-500"
                    )} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{camp.status}</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{camp.name}</h3>
                  <p className="text-sm text-muted-foreground">{camp.type}</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Megaphone className="h-6 w-6 text-primary" />
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2 mb-8">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Performance Score</span>
                  <span className="text-white font-mono">{camp.performance}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className={cn("h-full rounded-full transition-all duration-1000 bg-gradient-to-r", camp.color)} 
                    style={{ width: `${camp.performance}%` }} 
                  />
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-white/5">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Budget</p>
                  <p className="text-sm font-bold font-mono text-white">{camp.budget}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Sent</p>
                  <p className="text-sm font-bold font-mono text-white">{camp.sent}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">CTR</p>
                  <p className="text-sm font-bold font-mono text-white">{camp.click}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                <button className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 rounded-xl text-xs font-bold transition-all">
                  <BarChart2 className="h-3.5 w-3.5" />
                  Analytics
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 rounded-xl text-xs font-bold transition-all">
                  <RefreshCcw className="h-3.5 w-3.5" />
                  Restart
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Create New Card */}
        <button className="group relative bg-white/[0.02] border-2 border-dashed border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-white/[0.04] transition-all duration-300">
          <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all">
            <Layers className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg">Create New Campaign</h3>
            <p className="text-sm text-muted-foreground">Launch a new strategic outreach</p>
          </div>
        </button>
      </div>
    </div>
  );
}

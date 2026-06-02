"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Megaphone, 
  Send, 
  Clock, 
  BarChart2, 
  MoreHorizontal,
  ChevronRight,
  Plus,
  Zap,
  CheckCircle2
} from "lucide-react";

const campaigns = [
  { 
    id: 1, 
    name: "Enterprise Q3 Outreach", 
    status: "Active", 
    type: "Email Sequence", 
    progress: 65, 
    sent: 1240, 
    openRate: "42%", 
    conversions: 18,
    color: "bg-indigo-500"
  },
  { 
    id: 2, 
    name: "OmniAI Beta Launch", 
    status: "Active", 
    type: "Multi-Channel", 
    progress: 88, 
    sent: 4500, 
    openRate: "38%", 
    conversions: 156,
    color: "bg-primary"
  },
  { 
    id: 3, 
    name: "Lead Re-engagement", 
    status: "Paused", 
    type: "Automated", 
    progress: 45, 
    sent: 820, 
    openRate: "28%", 
    conversions: 5,
    color: "bg-amber-500"
  },
  { 
    id: 4, 
    name: "C-Level Webinar Promo", 
    status: "Scheduled", 
    type: "LinkedIn Ads", 
    progress: 0, 
    sent: 0, 
    openRate: "0%", 
    conversions: 0,
    color: "bg-blue-500"
  },
];

export default function CampaignsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Campaign Engine</h1>
          <p className="text-muted-foreground mt-1">Orchestrate and monitor your multi-channel marketing.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all text-sm font-bold shadow-[0_5px_15px_rgba(79,70,229,0.2)]">
          <Plus className="h-4 w-4" />
          Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border rounded-2xl p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Send className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Total Sent</p>
            <p className="text-2xl font-black tracking-tighter">142,500</p>
          </div>
        </div>
        <div className="bg-card border rounded-2xl p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Conversions</p>
            <p className="text-2xl font-black tracking-tighter">1,240</p>
          </div>
        </div>
        <div className="bg-card border rounded-2xl p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Avg. Conversion</p>
            <p className="text-2xl font-black tracking-tighter">4.8%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {campaigns.map((campaign, idx) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-6 hover:border-primary/20 hover:bg-white/10 transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-lg", campaign.color)}>
                  <Megaphone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">{campaign.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{campaign.type}</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest",
                      campaign.status === "Active" ? "text-emerald-600" : "text-amber-600"
                    )}>
                      {campaign.status}
                    </span>
                  </div>
                </div>
              </div>
              <button className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-muted/30 rounded-xl p-3">
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Sent</p>
                <p className="text-sm font-black mt-1 font-mono">{campaign.sent.toLocaleString()}</p>
              </div>
              <div className="bg-muted/30 rounded-xl p-3">
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Open Rate</p>
                <p className="text-sm font-black mt-1 font-mono">{campaign.openRate}</p>
              </div>
              <div className="bg-muted/30 rounded-xl p-3">
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Conversions</p>
                <p className="text-sm font-black mt-1 font-mono text-primary">{campaign.conversions}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold">Campaign Progress</span>
                <span className="text-muted-foreground font-mono">{campaign.progress}%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${campaign.progress}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 + 0.5 }}
                  className={cn("h-full rounded-full", campaign.color)}
                />
              </div>
            </div>

            <button className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-border group-hover:border-primary/50 group-hover:bg-primary/5 transition-all text-xs font-bold uppercase tracking-widest">
              View Detailed Analytics
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

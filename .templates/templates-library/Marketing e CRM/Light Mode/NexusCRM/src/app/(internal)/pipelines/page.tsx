"use client";

import React from "react";
import { 
  GitBranch, 
  Search, 
  MoreHorizontal, 
  Calendar, 
  DollarSign, 
  Plus,
  User,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  { id: "discovery", title: "Discovery", count: 4, value: "$45.2K" },
  { id: "proposal", title: "Proposal", count: 2, value: "$128.0K" },
  { id: "negotiation", title: "Negotiation", count: 3, value: "$84.5K" },
  { id: "closed", title: "Closed Won", count: 5, value: "$210.3K" },
];

const deals = {
  discovery: [
    { title: "Azure Migration", company: "Skyline Tech", value: "$12,000", owner: "RB", days: 3 },
    { title: "CRM Implementation", company: "Nexus Partners", value: "$8,500", owner: "RB", days: 1 },
    { title: "Security Audit", company: "CyberGuard", value: "$15,200", owner: "MS", days: 5 },
    { title: "Cloud Storage", company: "DataBox", value: "$9,500", owner: "JD", days: 2 },
  ],
  proposal: [
    { title: "Enterprise License", company: "Globex Corp", value: "$85,000", owner: "RB", days: 12 },
    { title: "Custom Integration", company: "Innotech", value: "$43,000", owner: "MS", days: 8 },
  ],
  negotiation: [
    { title: "Global Expansion", company: "Omni Group", value: "$52,000", owner: "JD", days: 15 },
    { title: "AI Assistant Bot", company: "Brainy AI", value: "$12,500", owner: "RB", days: 22 },
    { title: "Legacy Migration", company: "Retro Systems", value: "$20,000", owner: "MS", days: 18 },
  ],
  closed: [
    { title: "Infrastructure Revamp", company: "Core Power", value: "$120,000", owner: "RB", days: 45 },
    { title: "API Development", company: "FastCode", value: "$25,000", owner: "RB", days: 30 },
  ]
};

export default function PipelinesPage() {
  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <GitBranch className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Sales Pipeline
            </h1>
            <p className="text-muted-foreground mt-0.5 font-medium">B2B Enterprise Pipeline • 2024</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Find deal..."
              className="h-10 w-48 rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-xs text-white placeholder:text-muted-foreground focus:w-64 transition-all outline-none"
            />
          </div>
          <button className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] rounded-xl px-4 py-2 text-sm font-bold transition-all">
            <Plus className="h-4 w-4" />
            New Deal
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {stages.map((stage) => (
          <div key={stage.id} className="flex flex-col w-[300px] shrink-0 bg-white/[0.02] border border-white/5 rounded-3xl">
            {/* Stage Header */}
            <div className="p-5 border-b border-white/5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold tracking-wide uppercase text-white/80">{stage.title}</h3>
                <span className="h-5 w-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                  {stage.count}
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-mono">{stage.value} total</p>
            </div>

            {/* Stage Cards */}
            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
              {(deals[stage.id as keyof typeof deals] || []).map((deal, i) => (
                <div key={i} className="group p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-primary/40 hover:bg-white/[0.08] transition-all cursor-grab active:cursor-grabbing">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors">{deal.title}</h4>
                    <button className="text-muted-foreground hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-4">
                    <User className="h-3 w-3" /> {deal.company}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <div className="h-5 w-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[8px] font-bold text-primary">
                        {deal.owner}
                      </div>
                      <span className="text-xs font-bold text-white/90 font-mono">{deal.value}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="h-3 w-3" /> {deal.days}d
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-3 rounded-2xl border border-dashed border-white/10 text-muted-foreground text-xs font-bold hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-2">
                <Plus className="h-3.5 w-3.5" />
                Add Opportunity
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

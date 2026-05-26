"use client";

import { Zap, Play, Pause, Trash2, Settings2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const automations = [
  {
    id: 1,
    name: "Welcome Email Sequence",
    trigger: "New Contact Created",
    steps: 4,
    active: true,
    lastRun: "5 mins ago",
  },
  {
    id: 2,
    name: "Lead Re-engagement",
    trigger: "Inactivity > 30 Days",
    steps: 3,
    active: true,
    lastRun: "2 hours ago",
  },
  {
    id: 3,
    name: "Enterprise Upgrade Flow",
    trigger: "Revenue > $50k",
    steps: 6,
    active: false,
    lastRun: "Yesterday",
  },
  {
    id: 4,
    name: "Abandoned Form Recovery",
    trigger: "Form Partially Filled",
    steps: 2,
    active: true,
    lastRun: "15 mins ago",
  },
  {
    id: 5,
    name: "NPS Survey Request",
    trigger: "After 3rd Purchase",
    steps: 3,
    active: false,
    lastRun: "2 days ago",
  },
];

export default function AutomationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Automations</h1>
          <p className="text-muted-foreground text-sm">Automate your marketing workflows and repetitive tasks.</p>
        </div>
        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 text-sm font-medium hover:bg-black/90 transition-colors">
          <Plus className="w-4 h-4" />
          New Automation
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {automations.map((automation) => (
          <div key={automation.id} className="p-6 border border-border/50 bg-white hover:border-black/20 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className={cn(
                "w-12 h-12 flex items-center justify-center",
                automation.active ? "bg-black text-white" : "bg-muted text-muted-foreground"
              )}>
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold">{automation.name}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    Trigger: {automation.trigger}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    {automation.steps} Steps
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Last Run</p>
                <p className="text-xs font-medium">{automation.lastRun}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <button className={cn(
                  "px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold border transition-colors",
                  automation.active 
                    ? "border-rose-200 text-rose-600 hover:bg-rose-50" 
                    : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                )}>
                  {automation.active ? "Deactivate" : "Activate"}
                </button>
                <button className="p-2 border border-border/50 hover:bg-muted transition-colors">
                  <Settings2 className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 border border-border/50 hover:bg-rose-50 hover:text-rose-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Workflow Placeholder */}
      <div className="p-12 border border-dashed border-border/50 bg-muted/20 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-white border border-border/50 flex items-center justify-center mb-4">
          <Zap className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Workflow Visualizer</h3>
        <p className="text-xs text-muted-foreground max-w-sm">
          Select an automation to view and edit its visual workflow. You can drag and drop nodes to create complex marketing logic.
        </p>
      </div>
    </div>
  );
}

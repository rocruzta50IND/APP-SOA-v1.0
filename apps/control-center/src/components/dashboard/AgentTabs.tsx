import React from 'react';
import { cn } from "@/lib/utils";

interface AgentTabsProps {
  activeSessions: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AgentTabs({ activeSessions, activeTab, setActiveTab }: AgentTabsProps) {
  const formatAgentName = (name: any) => {
    if (!name) return 'AGENT';
    if (name === 'MAESTRO' || name === 'orchestrator') return 'MAESTRO';
    const safeName = typeof name === 'string' ? name : (name?.agentId || 'AGENT');
    return (String(safeName)).replace(/[\[\]]/g, '').toUpperCase();
  };

  return (
    <div className="flex items-center gap-1">
      {activeSessions.map(id => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={cn(
            "px-3 py-1 rounded-md text-[8px] font-black tracking-widest transition-all border shrink-0",
            activeTab === id 
              ? "bg-orange-500/10 text-orange-500 border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.1)]" 
              : "text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-white/5"
          )}
        >
          {formatAgentName(id)}
        </button>
      ))}
    </div>
  );
}

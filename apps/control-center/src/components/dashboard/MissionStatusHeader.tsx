import React from 'react';
import { Monitor, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface MissionStatusHeaderProps {
  isTerminalPrimary: boolean;
  status: string;
  toggleFocus: () => void;
}

export function MissionStatusHeader({ isTerminalPrimary, status, toggleFocus }: MissionStatusHeaderProps) {
  return (
    <header className="h-10 border-b border-white/5 flex items-center px-4 justify-between bg-zinc-950/50 shrink-0">
      <div className="flex items-center gap-2">
        <Monitor className={cn("w-3.5 h-3.5", !isTerminalPrimary ? "text-amber-500" : "text-zinc-500")} />
        <span className="micro-label !text-zinc-400 uppercase tracking-tighter">
          {!isTerminalPrimary ? "Primary_Preview_Stage" : "Stage_Thumbnail"}
        </span>
      </div>
      {isTerminalPrimary && (
        <button onClick={toggleFocus} className="p-1.5 hover:bg-white/5 rounded-lg transition-colors group">
          <ArrowRightLeft className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-500" />
        </button>
      )}
      {!isTerminalPrimary && status === 'fabricating' && (
        <div className="flex items-center gap-2 bg-white/5 px-3 py-0.5 rounded-md border border-white/10">
          <div className="w-1 h-1 rounded-full bg-amber-500 animate-ping" />
          <span className="text-[8px] text-amber-500/80 font-mono tracking-tight uppercase">Live_Forge</span>
        </div>
      )}
    </header>
  );
}

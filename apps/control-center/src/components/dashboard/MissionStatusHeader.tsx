import React from 'react';
import { Monitor } from "lucide-react";

interface MissionStatusHeaderProps {
  status: string;
}

export function MissionStatusHeader({ status }: MissionStatusHeaderProps) {
  return (
    <header className="h-10 border-b border-white/5 flex items-center px-4 justify-between bg-zinc-950/50 shrink-0">
      <div className="flex items-center gap-2">
        <Monitor className="w-3.5 h-3.5 text-amber-500" />
        <span className="micro-label !text-zinc-400 uppercase tracking-tighter">
          Primary_Preview_Stage
        </span>
      </div>
      {status === 'fabricating' && (
        <div className="flex items-center gap-2 bg-white/5 px-3 py-0.5 rounded-md border border-white/10">
          <div className="w-1 h-1 rounded-full bg-amber-500 animate-ping" />
          <span className="text-[8px] text-amber-500/80 font-mono tracking-tight uppercase">Live_Forge</span>
        </div>
      )}
    </header>
  );
}

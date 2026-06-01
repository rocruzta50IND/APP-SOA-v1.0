"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, Bell, User } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  
  const getBreadcrumb = () => {
    if (pathname === "/") return "Forja de Templates";
    if (pathname === "/gallery") return "Galeria de Projetos";
    if (pathname === "/logs") return "Telemetria do Sistema";
    return pathname.split("/").filter(Boolean).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" / ");
  };

  return (
    <header className="h-16 border-b border-orange-500/10 flex items-center justify-between px-8 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-40">
      <div className="flex items-center gap-3 text-sm">
        <span className="text-zinc-500 font-medium">Dashboard</span>
        <ChevronRight className="w-4 h-4 text-zinc-800" />
        <span className="text-zinc-200 font-bold tracking-tight bg-white/5 px-3 py-1 rounded-md border border-white/5">{getBreadcrumb()}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/5 border border-orange-500/10">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_#f59e0b]" />
          <span className="text-[10px] font-bold text-orange-500/80 uppercase tracking-widest">Engine Stable</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-zinc-500 hover:text-orange-500">
            <Bell className="w-5 h-5" />
          </button>
          <div className="h-8 w-[1px] bg-white/5" />
          <button className="flex items-center gap-3 pl-1 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/20 to-zinc-900 border border-orange-500/20 flex items-center justify-center transition-all group-hover:border-orange-500/50">
              <User className="w-4 h-4 text-orange-500" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] font-bold text-zinc-300 group-hover:text-white transition-colors">Admin Account</span>
              <span className="text-[8px] text-zinc-600 font-mono uppercase">Superuser</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

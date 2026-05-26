"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, Bell, User } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  
  const getBreadcrumb = () => {
    if (pathname === "/") return "Forja de Templates";
    if (pathname === "/gallery") return "Galeria de Projetos";
    return pathname.split("/").filter(Boolean).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" / ");
  };

  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-40">
      <div className="flex items-center gap-3 text-sm">
        <span className="text-zinc-500">Dashboard</span>
        <ChevronRight className="w-4 h-4 text-zinc-700" />
        <span className="text-zinc-200 font-medium tracking-wide">{getBreadcrumb()}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Engine Stable</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-zinc-500">
            <Bell className="w-5 h-5" />
          </button>
          <div className="h-8 w-[1px] bg-white/10" />
          <button className="flex items-center gap-3 pl-1 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 flex items-center justify-center">
              <User className="w-4 h-4 text-zinc-400" />
            </div>
            <span className="text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}

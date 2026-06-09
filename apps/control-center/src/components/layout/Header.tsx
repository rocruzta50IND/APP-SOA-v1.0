"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const isProduction = pathname === "/production";
  const isStudio = pathname === "/studio";
  
  const getBreadcrumb = () => {
    if (pathname === "/") return "Forja de Templates";
    if (pathname === "/studio") return "Estúdio de Vídeo";
    if (pathname === "/gallery") return "Galeria de Projetos";
    if (pathname === "/logs") return "Telemetria do Sistema";
    return pathname.split("/").filter(Boolean).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" / ");
  };

  return (
    <header className={cn(
      "h-16 border-b flex items-center justify-between px-8 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-40",
      isProduction ? "border-emerald-500/10" : isStudio ? "border-purple-500/10" : "border-orange-500/10"
    )}>
      <div className="flex items-center gap-3 text-sm">
        <span className="text-zinc-500 font-medium">Dashboard</span>
        <ChevronRight className="w-4 h-4 text-zinc-800" />
        <span className="text-zinc-200 font-bold tracking-tight bg-white/5 px-3 py-1 rounded-md border border-white/5">{getBreadcrumb()}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className={cn(
          "flex items-center gap-2 px-3 py-1 rounded-full border",
          isProduction ? "bg-emerald-500/5 border-emerald-500/10" : isStudio ? "bg-purple-500/5 border-purple-500/10" : "bg-orange-500/5 border-orange-500/10"
        )}>
          <div className={cn(
            "w-1.5 h-1.5 rounded-full animate-pulse",
            isProduction ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : isStudio ? "bg-purple-500 shadow-[0_0_8px_#a855f7]" : "bg-orange-500 shadow-[0_0_8px_#f59e0b]"
          )} />
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-widest",
            isProduction ? "text-emerald-500/80" : isStudio ? "text-purple-500/80" : "text-orange-500/80"
          )}>Engine Stable</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className={cn(
            "p-2 rounded-lg hover:bg-white/5 transition-colors text-zinc-500",
            isProduction ? "hover:text-emerald-500" : isStudio ? "hover:text-purple-500" : "hover:text-orange-500"
          )}>
            <Bell className="w-5 h-5" />
          </button>
          <div className="h-8 w-[1px] bg-white/5" />
          <button className="flex items-center gap-3 pl-1 group">
            <div className={cn(
              "w-8 h-8 rounded-full bg-gradient-to-br to-zinc-900 border flex items-center justify-center transition-all",
              isProduction 
                ? "from-emerald-500/20 border-emerald-500/20 group-hover:border-emerald-500/50" 
                : isStudio
                  ? "from-purple-500/20 border-purple-500/20 group-hover:border-purple-500/50"
                  : "from-orange-500/20 border-orange-500/20 group-hover:border-orange-500/50"
            )}>
              <User className={cn("w-4 h-4", isProduction ? "text-emerald-500" : isStudio ? "text-purple-500" : "text-orange-500")} />
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

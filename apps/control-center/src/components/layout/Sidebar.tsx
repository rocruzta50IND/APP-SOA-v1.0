"use client";

import React, { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Cpu, 
  Layout, 
  Zap, 
  History, 
  Settings,
  Plus,
  Terminal,
  Activity,
  Network,
  Video
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const isProduction = pathname === "/production";
  const isStudio = pathname === "/studio";

  const menuItems = [
    { name: "Home", icon: Zap, href: "/" },
    { name: "Estúdio", icon: Video, href: "/studio" },
    { name: "Galeria", icon: Layout, href: "/gallery" },
    { name: "Dashboard", icon: Activity, href: "/history" },
    { name: "Produção", icon: Network, href: "/production" },
  ];

  return (
    <aside 
      className={cn(
        "h-screen bg-black border-r flex flex-col transition-all duration-300 relative z-50 shadow-[4px_0_24px_rgba(0,0,0,0.5)]",
        isProduction ? "border-emerald-500/10" : isStudio ? "border-purple-500/10" : "border-orange-500/10",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Brand */}
      <div className="p-4 flex items-center gap-3 h-16 border-b border-white/5 relative overflow-hidden">
        <div className={cn("absolute inset-0 bg-gradient-to-r pointer-events-none", isProduction ? "from-emerald-500/5 to-transparent" : isStudio ? "from-purple-500/5 to-transparent" : "from-orange-500/5 to-transparent")} />
        <div className={cn("p-2 rounded-lg shrink-0 border", isProduction ? "bg-emerald-500/10 border-emerald-500/20" : isStudio ? "bg-purple-500/10 border-purple-500/20" : "bg-orange-500/10 border-orange-500/20")}>
          <Cpu className={cn("w-5 h-5", isProduction ? "text-emerald-500" : isStudio ? "text-purple-500" : "text-orange-500")} />
        </div>
        {!isCollapsed && (
          <span className="font-bold text-sm tracking-tight truncate bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Control Center</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative overflow-hidden",
                isActive 
                  ? (isProduction && item.href === "/production" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/50 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" : isStudio && item.href === "/studio" ? "bg-purple-500/10 text-purple-500 border border-purple-500/50 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" : "bg-orange-500/10 text-white border border-orange-500/20")
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeSide"
                  className={cn("absolute left-0 w-1 h-4 rounded-r-full", isProduction ? "bg-emerald-500" : isStudio ? "bg-purple-500" : "bg-orange-500")}
                />
              )}
              <item.icon className={cn(
                "w-5 h-5 shrink-0 transition-colors",
                isActive 
                  ? (isProduction && item.href === "/production" ? "text-emerald-500" : isStudio && item.href === "/studio" ? "text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" : "text-orange-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]")
                  : (isProduction ? "group-hover:text-emerald-400" : isStudio ? "group-hover:text-purple-400" : "group-hover:text-orange-400")
              )} />
              {!isCollapsed && <span className="text-sm font-bold tracking-tight">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className={cn("p-3 border-t border-white/5 space-y-1 bg-gradient-to-t to-transparent", isProduction ? "from-emerald-500/5" : isStudio ? "from-purple-500/5" : "from-orange-500/5")}>
        <button className={cn(
          "flex items-center gap-3 px-3 py-2 w-full text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-all",
          isCollapsed ? "justify-center" : ""
        )}>
          <Settings className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Configurações</span>}
        </button>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "flex items-center gap-3 px-3 py-2 w-full text-zinc-600 hover:text-white hover:bg-white/5 rounded-lg transition-all border-t border-white/5 mt-1",
            isCollapsed ? "justify-center" : ""
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-widest">Recolher</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

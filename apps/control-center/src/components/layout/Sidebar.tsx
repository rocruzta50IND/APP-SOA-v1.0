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
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Forja", icon: Zap, href: "/" },
    { name: "Galeria", icon: Layout, href: "/gallery" },
    { name: "Histórico", icon: History, href: "/history" },
  ];

  return (
    <aside 
      className={cn(
        "h-screen bg-black border-r border-white/5 flex flex-col transition-all duration-300 relative z-50",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Brand */}
      <div className="p-4 flex items-center gap-3 h-16 border-b border-white/5">
        <div className="bg-white/10 p-2 rounded-lg shrink-0">
          <Cpu className="w-5 h-5 text-white" />
        </div>
        {!isCollapsed && (
          <span className="font-bold text-sm tracking-tight truncate">Forge v7.5</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-2 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
              pathname === item.href 
                ? "bg-white/10 text-white" 
                : "text-zinc-500 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 shrink-0",
              pathname === item.href ? "text-emerald-400" : "group-hover:text-emerald-400"
            )} />
            {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-white/5 space-y-1">
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

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BarChart3, 
  FileText, 
  Layers, 
  Settings, 
  LogOut,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Integrations", href: "/integrations", icon: Layers },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 border-r border-zinc-800 bg-zinc-950 h-screen sticky top-0">
      <div className="flex items-center h-16 px-6 border-b border-zinc-800">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-zinc-100 tracking-tight">
          <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl">Aetheris</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                isActive 
                  ? "bg-zinc-900 text-indigo-400" 
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-indigo-400" : "text-zinc-500")} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-zinc-800">
        <Link 
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
        >
          <LogOut className="w-4 h-4 text-zinc-500" />
          Logout
        </Link>
      </div>
    </div>
  );
}

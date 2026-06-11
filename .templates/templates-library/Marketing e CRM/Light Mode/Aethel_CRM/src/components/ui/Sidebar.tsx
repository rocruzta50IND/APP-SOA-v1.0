"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Target, BarChart3, Settings, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/leads", icon: Target },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Campaigns", href: "/campaigns", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-background border-r border-border">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center group-hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
          </div>
          <span className="font-black tracking-tighter text-xl italic uppercase">FlowSprint</span>
        </Link>
      </div>
      
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6 gap-6">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 px-2">Core Operations</div>
          <nav className="flex flex-1 flex-col gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex gap-3 rounded-md px-3 py-2.5 text-sm font-bold uppercase tracking-tight transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-muted border border-border rounded-full flex items-center justify-center overflow-hidden">
             <span className="text-xs font-bold text-foreground">JD</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold uppercase tracking-tight leading-none text-foreground">John Doe</span>
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-1">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
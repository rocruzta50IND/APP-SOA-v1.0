"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Megaphone, LineChart, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", path: "/leads", icon: Users },
  { name: "Campaigns", path: "/campaigns", icon: Megaphone },
  { name: "Analytics", path: "/analytics", icon: LineChart },
  { name: "Settings", path: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r border-border/50 bg-background min-h-screen flex flex-col shrink-0">
      <div className="h-24 flex items-center px-8 border-b border-border/50 shrink-0">
        <span className="font-serif text-2xl font-bold tracking-tighter text-foreground flex items-center gap-3">
          <div className="w-8 h-8 bg-foreground flex items-center justify-center">
             <span className="text-background text-sm font-sans font-bold uppercase tracking-widest">C</span>
          </div>
          CRMForge
        </span>
      </div>
      
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        <div className="px-4 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Platform Menu
        </div>
        {routes.map((route) => {
          const isActive = pathname === route.path || pathname?.startsWith(route.path + "/");
          return (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "flex items-center gap-4 px-4 py-3 text-sm font-medium transition-all duration-300 ease-out active:scale-95",
                isActive 
                  ? "bg-foreground text-background" 
                  : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
              )}
            >
              <route.icon className="w-4 h-4" strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="tracking-wide">{route.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/50 space-y-2 shrink-0">
        <div className="px-4 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          System
        </div>
        <Link
          href="/login"
          className="flex items-center gap-4 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted/30 hover:text-foreground transition-all duration-300 ease-out active:scale-95"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.5} />
          <span className="tracking-wide">Log out</span>
        </Link>
      </div>
    </aside>
  );
}

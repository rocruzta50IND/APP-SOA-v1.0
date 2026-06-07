"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  KanbanSquare, 
  CheckSquare, 
  BarChart2, 
  Settings, 
  LogOut,
  Hexagon
} from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/boards", label: "Boards", icon: KanbanSquare },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-background flex flex-col h-full shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
        <Link href="/" className="flex items-center gap-2 group">
          <Hexagon className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform duration-200" />
          <span className="font-bold tracking-tight text-lg">FlowBoard</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4 px-2">
          Overview
        </div>
        {routes.map((route) => {
          const Icon = route.icon;
          const isActive = pathname === route.href || pathname?.startsWith(route.href + "/");

          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200 ease-out group",
                isActive 
                  ? "bg-primary text-primary-foreground font-medium" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
              {route.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border shrink-0">
        <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200 ease-out w-full group">
          <LogOut className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
          Logout
        </button>
      </div>
    </aside>
  );
}

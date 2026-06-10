"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Kanban,
  ListTodo,
  BarChart3,
  Settings,
  Grid
} from "lucide-react";

const routes = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Boards", path: "/boards", icon: Kanban },
  { name: "Backlog", path: "/backlog", icon: ListTodo },
  { name: "Reports", path: "/reports", icon: BarChart3 },
  { name: "Settings", path: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r border-border bg-background flex flex-col hidden md:flex sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-border/50">
        <Link href="/" className="flex items-center gap-2 text-foreground font-black tracking-tight text-lg transition-transform hover:scale-105">
          <Grid className="w-5 h-5" />
          <span>FlowGrid</span>
        </Link>
      </div>
      
      <div className="p-4 flex-1 flex flex-col gap-1">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2 px-2">
          Workspace
        </div>
        {routes.map((route) => {
          const isActive = pathname === route.path;
          return (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-out",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <route.icon className="w-4 h-4" />
              {route.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 px-3 py-2 hover:bg-muted/50 rounded-md cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
            U
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-none">User Admin</span>
            <span className="text-xs text-muted-foreground mt-1">user@flowgrid.inc</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Kanban, ListTodo, Calendar, Users, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Boards", path: "/boards", icon: Kanban },
  { name: "Backlog", path: "/backlog", icon: ListTodo },
  { name: "Calendar", path: "/calendar", icon: Calendar },
  { name: "Team", path: "/team", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-background min-h-screen flex flex-col shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
        <span className="font-bold text-lg tracking-tight text-foreground flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
             <span className="text-primary-foreground text-xs font-black">F</span>
          </div>
          FluxBoard
        </span>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {routes.map((route) => {
          const isActive = pathname === route.path || pathname?.startsWith(route.path + "/");
          return (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-out",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <route.icon className="w-4 h-4" />
              {route.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-1 shrink-0">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all duration-200 ease-out"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all duration-200 ease-out"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </Link>
      </div>
    </aside>
  );
}

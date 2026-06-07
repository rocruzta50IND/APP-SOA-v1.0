"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Beaker, Play, CheckCircle, Settings, ShieldAlert } from "lucide-react";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Test Suites", href: "/test-suites", icon: Beaker },
  { name: "Executions", href: "/executions", icon: Play },
  { name: "Results", href: "/results", icon: CheckCircle },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-background">
      <div className="flex h-14 items-center border-b border-border px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold tracking-tight text-foreground">
          <ShieldAlert className="h-5 w-5" />
          <span>TestNexus</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-2">System Status</div>
        <div className="flex items-center gap-2 text-sm text-green-500">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          All systems operational
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Kanban, // alternative to Pipelines
  Megaphone,
  Settings,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const routes = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Pipelines", href: "/pipelines", icon: Kanban },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r border-white/10 bg-[#09090b]/80 backdrop-blur-md px-4 py-6">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_0_15px_rgba(79,70,229,0.4)]">
          <Zap className="h-5 w-5" />
        </div>
        <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          LeadPulse
        </span>
      </div>

      <nav className="flex-1 space-y-1.5">
        {routes.map((route) => {
          const isActive = pathname === route.href || pathname.startsWith(route.href + "/");

          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ease-out",
                isActive
                  ? "text-white"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-white/10 border border-white/10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <route.icon
                className={cn(
                  "h-4 w-4 relative z-10 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-white"
                )}
              />
              <span className="relative z-10">{route.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 relative overflow-hidden">
          <div className="absolute -inset-2 bg-primary/20 blur-[50px] rounded-full z-0" />
          <div className="relative z-10">
            <h4 className="text-sm font-semibold text-white mb-1">Pro Plan Active</h4>
            <p className="text-xs text-muted-foreground mb-3">2,450 / 5,000 leads</p>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-[49%]" />
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex items-center gap-3 px-2">
          <div className="h-8 w-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
            <span className="text-xs font-bold text-white">JD</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">John Doe</span>
            <span className="text-xs text-muted-foreground">admin@leadpulse.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

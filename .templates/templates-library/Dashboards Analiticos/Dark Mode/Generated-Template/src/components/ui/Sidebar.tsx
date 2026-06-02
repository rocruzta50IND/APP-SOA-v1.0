"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Activity, 
  CrystalBall, 
  Database, 
  Settings,
  ArrowUpRight
} from "lucide-react";

// Lucide doesn't have CrystalBall in all versions, let's use a safe fallback or SVG
const PredictionsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
  </svg>
);

const routes = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Real-Time",
    icon: Activity,
    href: "/real-time",
  },
  {
    label: "Predictions",
    icon: PredictionsIcon,
    href: "/predictions",
  },
  {
    label: "Datasets",
    icon: Database,
    href: "/datasets",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border/40 bg-background flex flex-col">
      <div className="p-8">
        <Link href="/dashboard" className="group flex items-center gap-2">
          <span className="font-serif text-2xl tracking-tighter transition-all group-hover:tracking-normal">
            Aura
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mt-1">
            Insights
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-8">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "group relative flex items-center gap-4 px-4 py-3 transition-all duration-500",
              pathname === route.href 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {pathname === route.href && (
              <motion.div
                layoutId="active-nav"
                className="absolute inset-0 bg-secondary rounded-none"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            
            <route.icon className={cn(
              "relative z-10 w-4 h-4 transition-transform duration-500 group-hover:scale-110",
              pathname === route.href ? "text-primary" : ""
            )} />
            
            <span className="relative z-10 text-[10px] uppercase tracking-[0.2em] font-bold">
              {route.label}
            </span>

            {pathname === route.href && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative z-10 ml-auto"
              >
                <ArrowUpRight className="w-3 h-3 text-primary/50" />
              </motion.div>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-8 border-t border-border/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="text-[10px] font-bold text-primary">JD</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest font-bold">Julian Deauville</span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-tighter">Enterprise Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

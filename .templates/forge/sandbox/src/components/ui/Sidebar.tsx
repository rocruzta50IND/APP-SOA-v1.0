"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  CreditCard, 
  UserPlus, 
  Settings, 
  LogOut,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Talent Pool", href: "/talent-pool" },
  { icon: BarChart3, label: "Performance", href: "/performance" },
  { icon: CreditCard, label: "Payroll", href: "/payroll" },
  { icon: UserPlus, label: "Recruitment", href: "/recruitment" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full border-r border-white/10 bg-black/40 backdrop-blur-xl flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)]">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 tracking-tighter">
          AuraTalent
        </span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(79,70,229,0.2)]" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                isActive ? "text-white" : "text-muted-foreground group-hover:text-white"
              )} />
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/10">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-xs font-bold text-white">
            JD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">Jane Doe</p>
            <p className="text-xs text-muted-foreground truncate">jane@auratalent.io</p>
          </div>
          <button className="text-muted-foreground hover:text-white transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

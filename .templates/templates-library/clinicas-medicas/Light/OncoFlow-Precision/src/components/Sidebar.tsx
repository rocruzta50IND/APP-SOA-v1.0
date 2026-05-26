"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users2, 
  Clock, 
  FlaskConical, 
  BarChart3, 
  Settings, 
  Activity,
  LogOut,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users2, label: "Pacientes", href: "/pacientes" },
  { icon: Clock, label: "Infusões", href: "/infusoes" },
  { icon: FlaskConical, label: "Farmácia", href: "/farmacia" },
  { icon: BarChart3, label: "Relatórios", href: "/relatorios" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-200 bg-white flex flex-col z-50">
      <div className="p-6 h-20 flex items-center gap-3 border-b border-slate-50">
        <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center">
          <Activity className="text-white w-6 h-6" />
        </div>
        <span className="font-bold text-lg tracking-tight text-slate-900">OncoFlow</span>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-3 mb-4 mt-2">Menu Principal</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive 
                  ? "bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-500/5" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("w-5 h-5", isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600")} />
                {item.label}
              </div>
              {isActive && <div className="w-1 h-1 rounded-full bg-emerald-600" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="p-3 rounded-2xl bg-slate-50 flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600">
            JD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-slate-900 truncate">Dr. João Diniz</p>
            <p className="text-[10px] text-slate-400 uppercase font-medium">Oncologista</p>
          </div>
          <button className="text-slate-400 hover:text-slate-900">
             <Settings className="w-4 h-4" />
          </button>
        </div>
        <Link href="/login" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors">
          <LogOut className="w-5 h-5" />
          Sair do Sistema
        </Link>
      </div>
    </aside>
  );
}

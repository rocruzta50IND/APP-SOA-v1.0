"use client";

import React from "react";
import { Bell, Search, Calendar, ChevronDown } from "lucide-react";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="h-20 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        <p className="text-xs text-slate-400 font-medium">Unidade Central • São Paulo</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar paciente ou protocolo..."
            className="w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 pr-6 border-r border-slate-100">
           <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors relative">
             <Bell className="w-5 h-5" />
             <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
           </button>
           <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
             <Calendar className="w-5 h-5" />
           </button>
        </div>

        <button className="flex items-center gap-2 group">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-900 leading-none">Status da Rede</p>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Online</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
        </button>
      </div>
    </header>
  );
}

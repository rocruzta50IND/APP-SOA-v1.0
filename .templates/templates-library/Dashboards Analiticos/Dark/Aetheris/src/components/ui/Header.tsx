"use client";

import React from "react";
import { Bell, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search data, reports, and more..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-1.5 pl-10 pr-4 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-zinc-400 hover:text-zinc-100 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-zinc-950"></span>
          </button>
          
          <div className="h-8 w-[1px] bg-zinc-800 mx-1"></div>
          
          <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-zinc-900 transition-colors group text-left">
            <div className="hidden sm:block">
              <p className="text-xs font-medium text-zinc-200 leading-tight">Alex Sterling</p>
              <p className="text-[10px] text-zinc-500 leading-tight">Admin</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
              <User className="w-5 h-5 text-zinc-400" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

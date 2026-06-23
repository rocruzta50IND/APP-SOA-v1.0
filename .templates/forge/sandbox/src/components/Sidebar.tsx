"use client";
import React from 'react';
import { LayoutDashboard, CheckSquare, Calendar, Users, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col hidden md:flex shrink-0 z-20 shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/20">
            <CheckSquare className="text-white w-5 h-5" />
          </div>
          ProTask
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Menu</div>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 rounded-xl transition-colors">
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-xl transition-colors shadow-sm ring-1 ring-indigo-100 dark:ring-indigo-900/30">
          <CheckSquare className="w-5 h-5" />
          <span className="font-medium">Kanban Board</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 rounded-xl transition-colors">
          <Calendar className="w-5 h-5" />
          <span className="font-medium">Calendar</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 rounded-xl transition-colors">
          <Users className="w-5 h-5" />
          <span className="font-medium">Team</span>
        </a>
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 rounded-xl transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </a>
      </div>
    </aside>
  );
}

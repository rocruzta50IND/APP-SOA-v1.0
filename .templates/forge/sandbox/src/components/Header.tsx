"use client";
import React from 'react';
import { Search, Bell, Plus, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 shadow-sm z-10 sticky top-0">
      <div className="flex-1 flex items-center gap-4">
        <button className="md:hidden text-slate-500 hover:text-slate-700">
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative w-full max-w-md hidden sm:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input 
            type="text" 
            className="block w-full rounded-full border-0 py-2 pl-10 pr-4 text-slate-900 dark:text-slate-100 ring-1 ring-inset ring-slate-200 dark:ring-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-slate-50 dark:bg-slate-900 sm:text-sm sm:leading-6 transition-all outline-none" 
            placeholder="Search tasks, people, or documents..." 
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm shadow-indigo-600/20 active:scale-95">
          <Plus className="w-4 h-4" />
          New Task
        </button>
        
        <button className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors bg-slate-50 dark:bg-slate-900 rounded-full">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white dark:border-slate-950"></span>
        </button>

        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-800 cursor-pointer shadow-sm hover:border-indigo-400 transition-colors">
          <img src="https://i.pravatar.cc/150?u=current_user" alt="User avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}

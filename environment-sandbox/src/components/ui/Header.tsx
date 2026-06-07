"use client";

import { Bell, Search, Plus } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 lg:px-8 shrink-0">
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md hidden md:flex items-center group">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search tasks, boards, or people..." 
            className="w-full bg-background border border-border rounded-md pl-9 pr-4 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none transition-all duration-200 placeholder:text-muted-foreground"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md hover:bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background"></span>
        </button>
        <button className="bg-primary text-primary-foreground hover:opacity-90 rounded-md px-4 py-2 text-sm font-medium flex items-center gap-2 transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-95 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Plus className="w-4 h-4" />
          New Task
        </button>
        <div className="w-8 h-8 rounded-md bg-muted border border-border overflow-hidden cursor-pointer shrink-0 hover:ring-2 hover:ring-ring hover:ring-offset-2 transition-all duration-200">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}

"use client";

import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  
  // Create a readable title from pathname
  const title = pathname === "/" 
    ? "Dashboard" 
    : pathname.split("/").filter(Boolean).map(segment => 
        segment.charAt(0).toUpperCase() + segment.slice(1)
      ).join(" / ");

  return (
    <header className="h-16 border-b border-white/10 bg-[#09090b]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold tracking-tight text-white">{title || "Dashboard"}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            className="h-9 w-64 bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
            placeholder="Search leads, campaigns..."
          />
        </div>

        <button className="relative p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(79,70,229,0.8)] animate-pulse" />
        </button>
      </div>
    </header>
  );
}

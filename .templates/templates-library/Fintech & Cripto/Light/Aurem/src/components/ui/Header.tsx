"use client";

import { Search, Bell, User, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium">Aurem</span>
          {pathParts.map((part, index) => (
            <div key={part} className="flex items-center gap-2">
              <ChevronRight className="w-3 h-3" />
              <span className={index === pathParts.length - 1 ? "text-foreground font-semibold capitalize" : "capitalize"}>
                {part}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search assets..."
            className="h-9 w-64 rounded-md border border-border bg-muted/50 pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-background" />
          </button>
          
          <div className="h-8 w-px bg-border" />
          
          <button className="flex items-center gap-2 pl-2 group">
            <div className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center overflow-hidden">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-xs font-semibold">Rodrigo</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Enterprise</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

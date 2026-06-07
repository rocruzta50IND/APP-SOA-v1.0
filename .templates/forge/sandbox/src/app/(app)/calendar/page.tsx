"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

// Helper to generate calendar days (static for UI purposes)
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const calendarDays = Array.from({ length: 35 }, (_, i) => {
  const day = i - 2; // offset to simulate previous month days
  if (day <= 0) return { day: 30 + day, isCurrentMonth: false, events: [] };
  if (day > 31) return { day: day - 31, isCurrentMonth: false, events: [] };
  
  // Mock events on specific days
  let events = [];
  if (day === 4) events.push({ id: 1, title: "Sprint Planning", type: "meeting" });
  if (day === 12) events.push({ id: 2, title: "Design Review", type: "review" }, { id: 3, title: "Release v1.2", type: "release" });
  if (day === 18) events.push({ id: 4, title: "Team Retro", type: "meeting" });
  if (day === 24) events.push({ id: 5, title: "Client Demo", type: "meeting" });
  if (day === 28) events.push({ id: 6, title: "End of Sprint", type: "milestone" });

  return { day, isCurrentMonth: true, events, isToday: day === 15 };
});

export default function CalendarPage() {
  return (
    <div className="p-6 h-full flex flex-col max-w-[1400px] mx-auto w-full">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">October 2026</h1>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-muted text-foreground transition-colors">
              Today
            </button>
            <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-muted/50 p-1 rounded-md border border-border">
            <button className="px-3 py-1 text-sm font-medium rounded shadow-sm bg-background text-foreground">Month</button>
            <button className="px-3 py-1 text-sm font-medium rounded text-muted-foreground hover:text-foreground">Week</button>
            <button className="px-3 py-1 text-sm font-medium rounded text-muted-foreground hover:text-foreground">Day</button>
          </div>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:opacity-90 h-9 px-4 ml-2">
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </button>
        </div>
      </div>

      <div className="flex-1 rounded-md border border-border bg-card shadow-sm overflow-hidden flex flex-col">
        <div className="grid grid-cols-7 border-b border-border bg-muted/30 shrink-0">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>
        
        <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-border gap-[1px]">
          {calendarDays.map((date, i) => (
            <div 
              key={i} 
              className={cn(
                "bg-card p-2 flex flex-col hover:bg-muted/10 transition-colors cursor-pointer",
                !date.isCurrentMonth && "text-muted-foreground/50 bg-card/50"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={cn(
                  "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full",
                  date.isToday ? "bg-primary text-primary-foreground" : date.isCurrentMonth ? "text-foreground" : "text-muted-foreground/50"
                )}>
                  {date.day}
                </span>
              </div>
              <div className="flex-1 space-y-1 overflow-y-auto">
                {date.events.map((event) => (
                  <div 
                    key={event.id}
                    className={cn(
                      "text-xs px-2 py-1 rounded truncate font-medium border",
                      event.type === "meeting" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                      event.type === "review" ? "bg-purple-500/10 text-purple-500 border-purple-500/20" :
                      event.type === "release" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                      "bg-orange-500/10 text-orange-500 border-orange-500/20"
                    )}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

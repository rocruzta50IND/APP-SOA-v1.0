"use client";

import { cn } from "@/lib/utils";
import { Plus, MoreHorizontal, MessageSquare, Paperclip, Clock, Calendar as CalendarIcon, User, Search, Filter } from "lucide-react";

const initialColumns = [
  {
    id: "col-1",
    title: "To Do",
    count: 3,
    tasks: [
      { id: "TSK-128", title: "Implement SSO Authentication", type: "Feature", priority: "High", date: "Oct 12", comments: 2, attachments: 1 },
      { id: "TSK-129", title: "Refactor Database Schema", type: "Tech Debt", priority: "Medium", date: "Oct 14", comments: 0, attachments: 3 },
      { id: "TSK-130", title: "Update Terms of Service", type: "Documentation", priority: "Low", date: "Oct 15", comments: 1, attachments: 0 },
    ]
  },
  {
    id: "col-2",
    title: "In Progress",
    count: 2,
    tasks: [
      { id: "TSK-125", title: "Design System Overhaul", type: "Design", priority: "High", date: "Oct 10", comments: 5, attachments: 2 },
      { id: "TSK-127", title: "WebSocket Integration", type: "Feature", priority: "High", date: "Oct 11", comments: 12, attachments: 0 },
    ]
  },
  {
    id: "col-3",
    title: "In Review",
    count: 1,
    tasks: [
      { id: "TSK-122", title: "Fix Memory Leak in Production", type: "Bug", priority: "Urgent", date: "Oct 08", comments: 8, attachments: 4 },
    ]
  },
  {
    id: "col-4",
    title: "Done",
    count: 4,
    tasks: [
      { id: "TSK-118", title: "Onboarding Flow", type: "Feature", priority: "Medium", date: "Oct 01", comments: 3, attachments: 0 },
      { id: "TSK-119", title: "Stripe Billing Webhooks", type: "Feature", priority: "High", date: "Oct 02", comments: 1, attachments: 1 },
      { id: "TSK-120", title: "Add Dark Mode", type: "Feature", priority: "Low", date: "Oct 03", comments: 0, attachments: 0 },
      { id: "TSK-121", title: "Analytics Dashboard", type: "Feature", priority: "Medium", date: "Oct 05", comments: 2, attachments: 2 },
    ]
  }
];

export default function BoardsPage() {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Flux Sprint 12</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track your active sprint tasks.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="h-9 w-64 rounded-md border border-border bg-background pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border h-9 px-4">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:opacity-90 h-9 px-4">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full gap-6 pb-4" style={{ minWidth: "max-content" }}>
          {initialColumns.map((col) => (
            <div key={col.id} className="w-80 flex flex-col h-full bg-muted/30 border border-border rounded-md">
              <div className="p-3 border-b border-border flex items-center justify-between bg-background/50 rounded-t-md shrink-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-foreground">{col.title}</h3>
                  <span className="flex items-center justify-center bg-muted text-muted-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                    {col.count}
                  </span>
                </div>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {col.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-card text-card-foreground border border-border rounded-md p-3 shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{task.id}</span>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider",
                        task.priority === "Urgent" ? "bg-red-500/10 text-red-500" :
                        task.priority === "High" ? "bg-orange-500/10 text-orange-500" :
                        task.priority === "Medium" ? "bg-yellow-500/10 text-yellow-500" :
                        "bg-green-500/10 text-green-500"
                      )}>
                        {task.priority}
                      </span>
                    </div>
                    
                    <h4 className="font-medium text-sm leading-snug mb-3">{task.title}</h4>
                    
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                       <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-foreground border border-border/50">
                          {task.type}
                       </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                       <div className="flex items-center gap-3 text-muted-foreground">
                          {task.comments > 0 && (
                             <div className="flex items-center gap-1 text-xs">
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>{task.comments}</span>
                             </div>
                          )}
                          {task.attachments > 0 && (
                             <div className="flex items-center gap-1 text-xs">
                                <Paperclip className="w-3.5 h-3.5" />
                                <span>{task.attachments}</span>
                             </div>
                          )}
                       </div>
                       
                       <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                             <Clock className="w-3.5 h-3.5" />
                             <span>{task.date}</span>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center ml-1">
                             <User className="w-3 h-3 text-primary" />
                          </div>
                       </div>
                    </div>
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

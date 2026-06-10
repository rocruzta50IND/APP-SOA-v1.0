"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Filter, ChevronDown, CheckCircle2, Circle, Clock, MoreHorizontal, ArrowUpDown } from "lucide-react";

const mockTasks = Array.from({ length: 15 }).map((_, i) => ({
  id: `TSK-${1000 + i}`,
  title: [
    "Upgrade PostgreSQL to v15",
    "Fix hydration mismatch in React",
    "Implement SSO via SAML",
    "Design system sync with Figma",
    "Write e2e tests for checkout",
    "Migrate to Tailwind v4",
    "Optimize Core Web Vitals"
  ][i % 7],
  status: ["To Do", "In Progress", "Done"][i % 3],
  priority: ["Low", "Medium", "High", "Critical"][i % 4],
  assignee: ["Alex D.", "Sarah C.", "Mike R.", "Jane K."][i % 4],
  dueDate: `Oct ${10 + i}`,
}));

export default function TasksPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">All Tasks</h1>
          <p className="text-muted-foreground text-sm mt-1">View, filter, and manage across all projects.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 border border-border bg-background hover:bg-muted h-10 px-4 py-2")}>
            Export
          </button>
          <button className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 bg-primary text-primary-foreground hover:opacity-90 h-10 px-4 py-2")}>
            New Task
          </button>
        </div>
      </div>

      <div className="bg-card border border-border shadow-sm rounded-md overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/10 flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Filter tasks..." 
              className="h-9 pl-9 pr-4 w-[300px] rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-3 border border-border rounded-md text-sm font-medium hover:bg-muted flex items-center gap-2 text-muted-foreground">
              Status <ChevronDown className="w-4 h-4" />
            </button>
            <button className="h-9 px-3 border border-border rounded-md text-sm font-medium hover:bg-muted flex items-center gap-2 text-muted-foreground">
              Assignee <ChevronDown className="w-4 h-4" />
            </button>
            <button className="h-9 px-3 border border-border rounded-md text-sm font-medium hover:bg-muted flex items-center gap-2 text-muted-foreground">
              More Filters <Filter className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] uppercase tracking-widest text-muted-foreground bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold w-12">
                  <input type="checkbox" className="rounded border-border bg-background" />
                </th>
                <th className="px-6 py-4 font-semibold flex items-center cursor-pointer hover:text-foreground">
                  Task <ArrowUpDown className="w-3.5 h-3.5 ml-2" />
                </th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Priority</th>
                <th className="px-6 py-4 font-semibold">Assignee</th>
                <th className="px-6 py-4 font-semibold">Due Date</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockTasks.map((task, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors group">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-border bg-background" />
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground">{task.id}</span>
                    {task.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {task.status === "Done" ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : 
                       task.status === "In Progress" ? <Clock className="w-4 h-4 text-blue-500" /> : 
                       <Circle className="w-4 h-4 text-muted-foreground" />}
                      <span className="text-xs font-medium">{task.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border",
                      task.priority === "Critical" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                      task.priority === "High" ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                      task.priority === "Medium" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                      "bg-muted text-muted-foreground border-border"
                    )}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                        {task.assignee.split(" ").map(n => n[0]).join("")}
                      </div>
                      {task.assignee}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs font-medium">{task.dueDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-border flex items-center justify-between text-xs font-medium text-muted-foreground bg-muted/10">
          <div>Showing 1 to 10 of 15 tasks</div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-md border border-border hover:bg-muted disabled:opacity-50 text-foreground" disabled>Previous</button>
            <button className="px-3 py-1.5 rounded-md border border-border hover:bg-muted text-foreground">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

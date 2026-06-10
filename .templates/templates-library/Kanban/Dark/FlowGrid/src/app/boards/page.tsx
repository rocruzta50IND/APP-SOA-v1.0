"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, MoreHorizontal, Search, Filter, MessageSquare, Paperclip, Clock } from "lucide-react";
import { motion } from "framer-motion";

const mockColumns = [
  { id: "todo", title: "To Do", count: 12 },
  { id: "in-progress", title: "In Progress", count: 4 },
  { id: "review", title: "Review", count: 2 },
  { id: "done", title: "Done", count: 28 },
];

const mockCards = [
  {
    id: "TASK-4821",
    title: "Implement RBAC in Main API",
    status: "todo",
    priority: "High",
    tags: ["Backend", "Security"],
    comments: 4,
    attachments: 1,
    dueDate: "Tomorrow",
    assignee: "RD"
  },
  {
    id: "TASK-4822",
    title: "Design System Tokens Migration",
    status: "todo",
    priority: "Medium",
    tags: ["Design", "UI"],
    comments: 2,
    attachments: 0,
    dueDate: "Oct 12",
    assignee: "JS"
  },
  {
    id: "TASK-4819",
    title: "Fix Memory Leak in Dashboard",
    status: "in-progress",
    priority: "Critical",
    tags: ["Performance", "Frontend"],
    comments: 8,
    attachments: 3,
    dueDate: "Today",
    assignee: "MK"
  },
  {
    id: "TASK-4815",
    title: "Update Terms of Service Modal",
    status: "review",
    priority: "Low",
    tags: ["Legal", "UI"],
    comments: 1,
    attachments: 2,
    dueDate: "Oct 15",
    assignee: "AL"
  },
  {
    id: "TASK-4790",
    title: "Client Onboarding Flow",
    status: "done",
    priority: "Medium",
    tags: ["Product", "Growth"],
    comments: 12,
    attachments: 5,
    dueDate: "Oct 01",
    assignee: "RD"
  }
];

export default function BoardsPage() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto flex flex-col h-[calc(100vh-64px)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Sprint Board</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage and track your active sprint tasks.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="h-10 pl-9 pr-4 w-[250px] rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            />
          </div>
          <button className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 border border-border bg-background hover:bg-muted h-10 px-4 py-2")}>
            <Filter className="w-4 h-4 mr-2" /> Filter
          </button>
          <button className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 bg-primary text-primary-foreground hover:opacity-90 h-10 px-4 py-2")}>
            <Plus className="w-4 h-4 mr-2" /> New Task
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-6 min-w-max h-full">
          {mockColumns.map((col, idx) => (
            <div key={col.id} className="w-[320px] flex flex-col h-full bg-muted/20 rounded-lg p-4 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">{col.title}</h3>
                  <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-md border border-border/50">
                    {col.count}
                  </span>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3 overflow-y-auto pr-1">
                {mockCards.filter(c => c.status === col.id).map((card, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.1 + i * 0.05, ease: "easeOut" }}
                    key={card.id} 
                    className="bg-card text-card-foreground border border-border shadow-sm rounded-md p-4 cursor-grab hover:-translate-y-1 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-muted-foreground tracking-widest">{card.id}</span>
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                        {card.assignee}
                      </div>
                    </div>
                    <h4 className="font-semibold text-sm leading-snug mb-3">{card.title}</h4>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {card.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md bg-muted text-muted-foreground border border-border/50">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-4 pt-3 border-t border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{card.comments}</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>{card.attachments}</span>
                        </div>
                      </div>
                      <div className={cn(
                        "flex items-center gap-1", 
                        card.dueDate === "Today" || card.dueDate === "Tomorrow" ? "text-orange-500 font-medium" : ""
                      )}>
                        <Clock className="w-3.5 h-3.5" />
                        <span>{card.dueDate}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <button className="flex items-center justify-center w-full h-10 border border-dashed border-border rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-sm font-medium mt-2">
                  <Plus className="w-4 h-4 mr-2" /> Add Card
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

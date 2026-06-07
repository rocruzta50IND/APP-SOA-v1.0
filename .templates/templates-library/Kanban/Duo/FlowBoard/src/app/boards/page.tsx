"use client";

import { motion } from "framer-motion";
import { Plus, MoreHorizontal, Layout, Users, Clock } from "lucide-react";

const BOARDS = [
  { id: 1, name: "Alpha Release", tasks: 24, completed: 18, team: 4, updated: "2h ago", status: "Active" },
  { id: 2, name: "Marketing Campaign", tasks: 12, completed: 4, team: 3, updated: "5h ago", status: "Active" },
  { id: 3, name: "Infrastructure Mig", tasks: 45, completed: 45, team: 6, updated: "1d ago", status: "Completed" },
  { id: 4, name: "Q3 Planning", tasks: 8, completed: 0, team: 2, updated: "3d ago", status: "Planning" },
  { id: 5, name: "Customer Feedback", tasks: 156, completed: 89, team: 8, updated: "1w ago", status: "Active" },
];

export default function BoardsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Boards</h1>
          <p className="text-muted-foreground mt-1">Manage your team&apos;s kanban boards and projects.</p>
        </div>
        <button className="bg-primary text-primary-foreground hover:opacity-90 rounded-md px-4 py-2 text-sm font-medium flex items-center gap-2 transition-all duration-300 ease-out active:scale-95">
          <Plus className="w-4 h-4" />
          New Board
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {BOARDS.map((board, i) => (
          <motion.div
            key={board.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: i * 0.05 }}
            className="bg-background border border-border shadow-sm rounded-md p-5 flex flex-col hover:-translate-y-1 transition-all duration-300 ease-out group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center border border-border/50">
                  <Layout className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{board.name}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">{board.status}</p>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-auto space-y-4">
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-primary h-full rounded-full" 
                  style={{ width: `${Math.max(5, (board.completed / board.tasks) * 100)}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {board.updated}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {board.team}
                  </span>
                </div>
                <span className="font-medium text-foreground">{board.completed}/{board.tasks} tasks</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
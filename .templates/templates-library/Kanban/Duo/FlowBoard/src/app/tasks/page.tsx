"use client";

import { motion } from "framer-motion";
import { Search, Filter, Plus, AlertCircle, CheckCircle2, Circle, ArrowUp, ArrowRight, ArrowDown } from "lucide-react";

const TASKS = [
  { id: "TASK-8931", title: "Implement new authentication flow", status: "In Progress", priority: "High", assignee: "Alex F.", date: "Today" },
  { id: "TASK-8932", title: "Design system audit for V2", status: "Backlog", priority: "Medium", assignee: "Sarah K.", date: "Tomorrow" },
  { id: "TASK-8933", title: "Fix memory leak in dashboard", status: "Todo", priority: "Urgent", assignee: "Mike R.", date: "Oct 24" },
  { id: "TASK-8934", title: "Update Terms of Service page", status: "Done", priority: "Low", assignee: "Emma W.", date: "Oct 22" },
  { id: "TASK-8935", title: "Database migration to Postgres", status: "In Progress", priority: "High", assignee: "Alex F.", date: "Oct 25" },
  { id: "TASK-8936", title: "Client onboarding presentation", status: "Todo", priority: "Medium", assignee: "Sarah K.", date: "Oct 26" },
];

export default function TasksPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Tasks</h1>
          <p className="text-muted-foreground mt-1">View and manage all your tasks across boards.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-background border border-border shadow-sm rounded-md px-4 py-2 text-sm font-medium flex items-center gap-2 hover:bg-muted transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="bg-primary text-primary-foreground hover:opacity-90 rounded-md px-4 py-2 text-sm font-medium flex items-center gap-2 transition-all duration-300 ease-out active:scale-95">
            <Plus className="w-4 h-4" />
            Create Task
          </button>
        </div>
      </div>

      <div className="bg-background border border-border shadow-sm rounded-md overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground focus-visible:ring-0"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Task ID</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Assignee</th>
                <th className="px-6 py-4">Due Date</th>
              </tr>
            </thead>
            <motion.tbody 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {TASKS.map((task, i) => (
                <motion.tr 
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut", delay: i * 0.05 }}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4 font-mono text-muted-foreground">{task.id}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{task.title}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2">
                      {task.status === "Done" ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : 
                       task.status === "In Progress" ? <Circle className="w-4 h-4 fill-blue-500 text-blue-500" /> :
                       <Circle className="w-4 h-4 text-muted-foreground" />}
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5">
                      {task.priority === "Urgent" ? <AlertCircle className="w-3.5 h-3.5 text-red-500" /> :
                       task.priority === "High" ? <ArrowUp className="w-3.5 h-3.5 text-orange-500" /> :
                       task.priority === "Medium" ? <ArrowRight className="w-3.5 h-3.5 text-yellow-500" /> :
                       <ArrowDown className="w-3.5 h-3.5 text-muted-foreground" />}
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                        {task.assignee.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-muted-foreground">{task.assignee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{task.date}</td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
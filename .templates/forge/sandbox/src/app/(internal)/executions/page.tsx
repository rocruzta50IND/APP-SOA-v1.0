"use client";

import React from "react";
import { 
  Play, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  Download,
  Terminal,
  ExternalLink,
  Cpu,
  Database
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const executions = [
  { id: "RUN-88291", suite: "Core API Suite", status: "passed", duration: "1.2s", date: "2024-03-21 14:22", branch: "main", commit: "a2b4c5d" },
  { id: "RUN-88290", suite: "Mobile Auth Flow", status: "failed", duration: "3.4s", date: "2024-03-21 13:45", branch: "fix/auth-leak", commit: "9e8d7c6" },
  { id: "RUN-88289", suite: "Checkout Logic", status: "passed", duration: "0.8s", date: "2024-03-21 12:10", branch: "main", commit: "5f4e3d2" },
  { id: "RUN-88288", suite: "User Profile", status: "passed", duration: "2.1s", date: "2024-03-21 10:30", branch: "feat/profiles", commit: "1a2b3c4" },
  { id: "RUN-88287", suite: "Database Sync", status: "passed", duration: "5.6s", date: "2024-03-21 09:15", branch: "main", commit: "f6e5d4c" },
  { id: "RUN-88286", suite: "Admin Panel", status: "failed", duration: "4.2s", date: "2024-03-20 18:00", branch: "staging", commit: "d3c2b1a" },
  { id: "RUN-88285", suite: "Legacy API", status: "passed", duration: "1.5s", date: "2024-03-20 16:45", branch: "main", commit: "b7a6c5e" },
];

export default function ExecutionsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white">Executions</h1>
          <p className="text-muted-foreground">Historical log of all test runs and automated workflows.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-white hover:bg-white/10">
            <Download className="h-4 w-4" />
            CSV
          </button>
          <button className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:bg-primary/90 transition-all">
            <Terminal className="h-4 w-4" />
            CLI Runner
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-white">42 Passed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-400" />
              <span className="text-xs font-medium text-white">3 Failed</span>
            </div>
          </div>
          <div className="flex gap-2">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter executions..."
                  className="h-9 w-64 rounded-lg border border-white/10 bg-black/20 pl-9 pr-4 text-xs text-white outline-none focus:border-primary/50"
                />
             </div>
             <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/20 text-muted-foreground hover:text-white">
                <Filter className="h-4 w-4" />
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">ID</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Suite / Context</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Duration</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Resources</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {executions.map((run, i) => (
                <motion.tr
                  key={run.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-bold text-primary">{run.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-white">{run.suite}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <ExternalLink className="h-2.5 w-2.5" />
                          {run.branch}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground bg-white/5 px-1.5 py-0.5 rounded">
                          {run.commit}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                      run.status === "passed" ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"
                    )}>
                      {run.status === "passed" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      {run.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-white">
                    {run.duration}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                       <Cpu className="h-4 w-4 text-muted-foreground hover:text-white transition-colors cursor-help" />
                       <Database className="h-4 w-4 text-muted-foreground hover:text-white transition-colors cursor-help" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-xs text-muted-foreground">
                    {run.date}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-white/[0.01] flex items-center justify-between">
           <p className="text-xs text-muted-foreground">Showing 7 of 1,248 executions</p>
           <div className="flex gap-2">
              <button className="h-8 px-3 rounded-lg border border-white/10 text-xs text-white hover:bg-white/5 disabled:opacity-50" disabled>Previous</button>
              <button className="h-8 px-3 rounded-lg border border-white/10 text-xs text-white hover:bg-white/5">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
}

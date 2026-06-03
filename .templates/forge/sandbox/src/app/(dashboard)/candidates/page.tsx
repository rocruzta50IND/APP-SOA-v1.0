"use client";

import { cn } from "@/lib/utils";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const candidates = [
  { id: 1, name: "Sarah Jenkins", role: "Senior Frontend Engineer", experience: "8 yrs", status: "Interviewing", score: 94, applied: "2 days ago" },
  { id: 2, name: "Michael Chen", role: "Product Designer", experience: "5 yrs", status: "Offer Sent", score: 88, applied: "1 week ago" },
  { id: 3, name: "Emma Rodriguez", role: "DevOps Specialist", experience: "6 yrs", status: "Sourcing", score: 82, applied: "4 days ago" },
  { id: 4, name: "David Kim", role: "Backend Architect", experience: "12 yrs", status: "Technical Test", score: 91, applied: "3 days ago" },
  { id: 5, name: "Lisa Thompson", role: "HR Manager", experience: "7 yrs", status: "Hired", score: 85, applied: "2 weeks ago" },
  { id: 6, name: "James Wilson", role: "Fullstack Dev", experience: "4 yrs", status: "Rejected", score: 65, applied: "1 month ago" },
  { id: 7, name: "Ana Garcia", role: "QA Engineer", experience: "3 yrs", status: "Interviewing", score: 78, applied: "5 days ago" },
];

export default function CandidatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white">Candidates</h1>
          <p className="text-muted-foreground mt-1">Manage and track your talent pipeline.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search name, role..." 
              className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 w-64"
            />
          </div>
          <button className="p-2 bg-white/5 border border-white/10 rounded-xl text-muted-foreground hover:text-white transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Candidate</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Experience</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Match Score</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Applied</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {candidates.map((candidate, i) => (
                <motion.tr 
                  key={candidate.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-white">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">{candidate.name}</p>
                        <p className="text-xs text-muted-foreground">{candidate.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-white font-mono">{candidate.experience}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full w-24 overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            candidate.score > 90 ? "bg-emerald-500" : candidate.score > 80 ? "bg-primary" : "bg-amber-500"
                          )} 
                          style={{ width: `${candidate.score}%` }} 
                        />
                      </div>
                      <span className="text-xs font-mono font-bold text-white">{candidate.score}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter",
                      candidate.status === "Hired" ? "bg-emerald-500/10 text-emerald-500" : 
                      candidate.status === "Offer Sent" ? "bg-primary/10 text-primary" : 
                      candidate.status === "Rejected" ? "bg-red-500/10 text-red-500" : "bg-white/5 text-muted-foreground"
                    )}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{candidate.applied}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-muted-foreground hover:text-white hover:bg-white/10 rounded-lg transition-all">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-muted-foreground hover:text-white hover:bg-white/10 rounded-lg transition-all">
                        <Calendar className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-muted-foreground hover:text-white hover:bg-white/10 rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-mono">Showing 1-7 of 142 candidates</p>
          <div className="flex items-center gap-2">
            <button className="p-2 text-muted-foreground hover:text-white bg-white/5 rounded-lg disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-white bg-white/5 rounded-lg">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

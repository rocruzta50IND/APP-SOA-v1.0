"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  MapPin, 
  Clock, 
  Users
} from "lucide-react";
import { motion } from "framer-motion";

const jobs = [
  { id: 1, title: "Senior React Developer", department: "Engineering", location: "Remote", type: "Full-time", candidates: 24, status: "Active" },
  { id: 2, title: "Product Designer", department: "Design", location: "New York, NY", type: "Full-time", candidates: 18, status: "Active" },
  { id: 3, title: "Customer Success Manager", department: "Operations", location: "Remote", type: "Contract", candidates: 12, status: "Closed" },
  { id: 4, title: "Backend Engineer (Go)", department: "Engineering", location: "London, UK", type: "Full-time", candidates: 32, status: "Active" },
  { id: 5, title: "Marketing Director", department: "Marketing", location: "Remote", type: "Full-time", candidates: 9, status: "Active" },
];

export default function RecruitmentPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <header>
          <h1 className="text-4xl font-bold tracking-tighter text-gradient">Recruitment</h1>
          <p className="text-muted-foreground mt-2">Manage your active job openings and candidate pipeline.</p>
        </header>
        <button className="bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] rounded-xl px-5 py-2.5 font-medium transition-all flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Job Opening
        </button>
      </div>

      {/* Filters */}
      <div className="glass p-4 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by job title, department..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-primary/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="glass px-4 py-2 text-sm flex items-center gap-2 hover:bg-white/10 transition-colors">
            <Filter className="h-4 w-4" />
            Department
          </button>
          <button className="glass px-4 py-2 text-sm flex items-center gap-2 hover:bg-white/10 transition-colors">
            Status
          </button>
        </div>
      </div>

      {/* Job Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobs.map((job, idx) => (
          <motion.div 
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass p-6 group cursor-pointer hover:border-primary/40 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={cn(
                "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                job.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/10 text-muted-foreground"
              )}>
                {job.status}
              </div>
              <button className="text-muted-foreground hover:text-white transition-colors">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
            <p className="text-sm text-muted-foreground mb-6">{job.department}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {job.location}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                {job.type}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                {job.candidates} Candidates Applied
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-white/10 flex items-center justify-center text-[10px] font-bold">
                    {String.fromCharCode(64 + i + idx)}
                  </div>
                ))}
                <div className="h-8 w-8 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                  +{job.candidates - 3}
                </div>
              </div>
              <button className="text-sm font-medium text-white hover:text-primary transition-colors">
                Manage Applicants
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

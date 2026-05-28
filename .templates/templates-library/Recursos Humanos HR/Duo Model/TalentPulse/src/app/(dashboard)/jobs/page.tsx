"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Clock, MoreVertical, Plus, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const jobs = [
  {
    id: "JOB-001",
    title: "Senior Product Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
    applicants: 124,
    newApplicants: 12,
    status: "Open",
    posted: "2 days ago"
  },
  {
    id: "JOB-002",
    title: "Backend Engineer (Go)",
    department: "Engineering",
    type: "Full-time",
    location: "San Francisco",
    applicants: 86,
    newApplicants: 5,
    status: "Open",
    posted: "4 days ago"
  },
  {
    id: "JOB-003",
    title: "Marketing Manager",
    department: "Growth",
    type: "Contract",
    location: "London",
    applicants: 215,
    newApplicants: 0,
    status: "Closed",
    posted: "1 week ago"
  },
  {
    id: "JOB-004",
    title: "Customer Success Lead",
    department: "Operations",
    type: "Full-time",
    location: "Remote",
    applicants: 42,
    newApplicants: 8,
    status: "Open",
    posted: "1 day ago"
  },
  {
    id: "JOB-005",
    title: "Frontend Developer (React)",
    department: "Engineering",
    type: "Full-time",
    location: "New York",
    applicants: 156,
    newApplicants: 24,
    status: "Draft",
    posted: "Just now"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 400, damping: 30 }
  }
} as const;

export default function JobsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Job Openings
          </h1>
          <p className="text-muted-foreground mt-1">Create and manage your organization's career opportunities.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10 transition-all">
            Archive
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:bg-primary/90 transition-all">
            <Plus className="h-4 w-4" />
            Post New Job
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Jobs", value: "24", sub: "+2 from last month", icon: Briefcase },
          { label: "Total Applicants", value: "1,842", sub: "128 needing review", icon: Users },
          { label: "Avg. Time to Hire", value: "18 Days", sub: "-3 days trend", icon: Clock },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 text-muted-foreground mb-2">
              <stat.icon className="h-4 w-4 text-primary" />
              <span className="text-[10px] uppercase tracking-widest font-bold">{stat.label}</span>
            </div>
            <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Jobs List */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            variants={itemVariants}
            className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.08] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1 h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-white">{job.title}</h3>
                  <span className={cn(
                    "text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full border",
                    job.status === "Open" ? "text-emerald-400 border-emerald-400/20 bg-emerald-400/10" :
                    job.status === "Closed" ? "text-red-400 border-red-400/20 bg-red-400/10" :
                    "text-amber-400 border-amber-400/20 bg-amber-400/10"
                  )}>
                    {job.status}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span>{job.department}</span>
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span>{job.type}</span>
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span>{job.location}</span>
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span className="text-xs">ID: {job.id}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-12">
                <div className="text-center">
                  <div className="text-sm font-bold text-white">{job.applicants}</div>
                  <div className="text-[10px] uppercase text-muted-foreground font-bold">Applicants</div>
                </div>
                {job.newApplicants > 0 && (
                  <div className="text-center">
                    <div className="text-sm font-bold text-primary">+{job.newApplicants}</div>
                    <div className="text-[10px] uppercase text-primary/70 font-bold">New</div>
                  </div>
                )}
                <div className="hidden lg:block text-right">
                  <div className="text-sm text-white">{job.posted}</div>
                  <div className="text-[10px] uppercase text-muted-foreground font-bold">Posted</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="rounded-lg border border-white/10 bg-white/5 p-2 text-muted-foreground hover:bg-white/10 hover:text-white transition-all">
                  <MoreVertical className="h-4 w-4" />
                </button>
                <button className="rounded-lg bg-primary/10 border border-primary/20 p-2 text-primary hover:bg-primary/20 transition-all">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

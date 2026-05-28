"use client";

import { motion } from "framer-motion";
import { 
  Briefcase, 
  Users, 
  Calendar, 
  MapPin, 
  Plus,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const jobs = [
  { id: 1, title: "Senior Product Designer", dept: "Design", type: "Full-time", location: "Remote", applicants: 24, status: "Active" },
  { id: 2, title: "Backend Engineer (Go)", dept: "Engineering", type: "Full-time", location: "London, UK", applicants: 18, status: "Active" },
  { id: 3, title: "Marketing Specialist", dept: "Marketing", type: "Contract", location: "New York, US", applicants: 32, status: "Paused" },
  { id: 4, title: "Customer Success Lead", dept: "Support", type: "Full-time", location: "Remote", applicants: 15, status: "Active" },
];

export default function RecruitmentPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Recruitment Hub
          </h1>
          <p className="text-muted-foreground mt-1">Manage open positions and track candidate pipelines.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:opacity-90 transition-all">
          <Plus className="w-4 h-4" />
          <span>Post New Job</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-md relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
          <Sparkles className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-xl font-bold">AI Talent Scout</h3>
          <p className="text-sm text-muted-foreground mt-2">Let our AI analyze the talent pool to find the perfect match for your open roles.</p>
          <button className="mt-6 text-sm font-semibold flex items-center gap-2 text-primary group-hover:translate-x-1 transition-transform">
            Launch Scout <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Candidates</p>
            <h3 className="text-3xl font-bold mt-1">142</h3>
          </div>
          <div className="flex -space-x-2 mt-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0a0b] bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-[#0a0a0b] bg-white/10 flex items-center justify-center text-[10px] text-white">
              +8
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <p className="text-sm font-medium text-muted-foreground">Interviews Today</p>
          <h3 className="text-3xl font-bold mt-1">6</h3>
          <p className="text-xs text-emerald-500 mt-2 font-medium flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Next in 45 mins
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          Active Job Openings
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-bold group-hover:text-primary transition-colors">{job.title}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {job.location}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="w-3 h-3" /> {job.applicants} Applicants
                    </span>
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded border uppercase",
                      job.status === 'Active' ? 'border-emerald-500/20 text-emerald-500' : 'border-amber-500/20 text-amber-500'
                    )}>
                      {job.status}
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:bg-white/10 transition-all">
                Manage Role
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

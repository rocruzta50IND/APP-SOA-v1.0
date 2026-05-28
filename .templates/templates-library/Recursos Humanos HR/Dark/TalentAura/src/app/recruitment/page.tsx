"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import { Header } from "@/components/ui/Header";
import { 
  UserPlus, 
  Search, 
  Filter, 
  Calendar,
  ChevronRight,
  MoreVertical,
  Star,
  Clock,
  Briefcase
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const conversionData = [
  { stage: "Applied", count: 450, color: "hsl(var(--primary))" },
  { stage: "Screening", count: 280, color: "hsl(var(--primary))" },
  { stage: "Technical", count: 120, color: "hsl(var(--primary))" },
  { stage: "Interview", count: 45, color: "hsl(var(--primary))" },
  { stage: "Offer", count: 12, color: "hsl(var(--primary))" },
];

const jobs = [
  { id: 1, title: "Senior UX Designer", type: "Full-time", applicants: 84, status: "Active", date: "Posted 2d ago" },
  { id: 2, title: "Fullstack Engineer (React)", type: "Remote", applicants: 156, status: "Urgent", date: "Posted 4d ago" },
  { id: 3, title: "Product Marketing Manager", type: "Full-time", applicants: 42, status: "Closed", date: "Posted 1w ago" },
  { id: 4, title: "DevOps Specialist", type: "Contract", applicants: 28, status: "Active", date: "Posted 1w ago" },
  { id: 5, title: "Junior Frontend Developer", type: "Hybrid", applicants: 210, status: "Active", date: "Posted 2w ago" },
];

const candidates = [
  { id: 1, name: "Lucas Vance", role: "Senior UX Designer", source: "LinkedIn", rating: 5, avatar: "LV" },
  { id: 2, name: "Mia Takahashi", role: "Fullstack Engineer", source: "Referral", rating: 4, avatar: "MT" },
  { id: 3, name: "Jordan Smith", role: "DevOps Specialist", source: "Indeed", rating: 4, avatar: "JS" },
];

export default function RecruitmentPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <Header />
      
      <main className="pl-64 pt-16">
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                Recruitment Hub
              </h1>
              <p className="text-muted-foreground mt-1">Track applicants, manage job postings, and analyze your hiring funnel.</p>
            </div>
            <button className="flex items-center space-x-2 bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] rounded-xl px-5 py-2.5 font-medium transition-all">
              <UserPlus className="h-4 w-4" />
              <span>New Job Post</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Conversion Funnel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
            >
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white tracking-tight">Hiring Funnel</h3>
                <p className="text-sm text-muted-foreground">Candidate conversion rates across all active roles</p>
              </div>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversionData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ffffff10" />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="stage" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                      contentStyle={{ 
                        backgroundColor: 'rgba(9, 9, 11, 0.9)', 
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(8px)'
                      }}
                    />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                      {conversionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsla(var(--primary), ${1 - index * 0.15})`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Top Talent */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
            >
              <h3 className="text-xl font-bold text-white tracking-tight mb-6">Top Candidates</h3>
              <div className="space-y-6">
                {candidates.map((cand) => (
                  <div key={cand.id} className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/10">
                    <div className="h-10 w-10 rounded-xl bg-primary/20 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                      {cand.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{cand.name}</p>
                      <p className="text-[10px] text-muted-foreground">{cand.role} • {cand.source}</p>
                    </div>
                    <div className="flex items-center text-amber-400">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="ml-1 text-xs font-mono">{cand.rating}.0</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-all">
                View All Candidates
              </button>
            </motion.div>
          </div>

          {/* Job Listings Table */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white tracking-tight">Active Job Openings</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="h-9 w-64 rounded-lg border border-white/10 bg-white/5 pl-9 pr-4 text-xs outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {jobs.map((job) => (
                <div key={job.id} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/20 transition-colors">
                      <Briefcase className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{job.title}</h4>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs text-muted-foreground">{job.type}</span>
                        <span className="text-[10px] text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{job.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-12">
                    <div className="text-right">
                      <p className="text-sm font-bold text-white font-mono">{job.applicants}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Applicants</p>
                    </div>
                    <div className="w-24 text-right">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                        job.status === "Urgent" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
                        job.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                        "bg-white/5 text-muted-foreground border-white/10"
                      )}>
                        {job.status}
                      </span>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground transition-all">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Total Candidates", value: "12,482", trend: "+12.5%", positive: true, icon: Users },
  { label: "Active Job Openings", value: "84", trend: "+4.2%", positive: true, icon: Briefcase },
  { label: "Interviews Today", value: "18", trend: "-2.1%", positive: false, icon: Calendar },
  { label: "New Hires (MTD)", value: "32", trend: "+8.4%", positive: true, icon: UserPlus },
];

const chartData = [
  { name: "Jan", applications: 400, hires: 240 },
  { name: "Feb", applications: 300, hires: 139 },
  { name: "Mar", applications: 200, hires: 980 },
  { name: "Apr", applications: 278, hires: 390 },
  { name: "May", applications: 189, hires: 480 },
  { name: "Jun", applications: 239, hires: 380 },
];

const recentCandidates = [
  { name: "Sarah Jenkins", role: "Senior Frontend Engineer", status: "In Review", source: "LinkedIn", match: 94 },
  { name: "Michael Chen", role: "Product Manager", status: "Interviewing", source: "Referral", match: 88 },
  { name: "Emma Wilson", role: "UX Designer", status: "Offer Sent", source: "Dribbble", match: 91 },
  { name: "David Miller", role: "Backend Architect", status: "Technical Assessment", source: "Indeed", match: 82 },
  { name: "Sophia Garcia", role: "DevOps Engineer", status: "New", source: "LinkedIn", match: 79 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 30 }
  },
} as const;

export default function DashboardPage() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Executive Overview
        </h1>
        <p className="text-muted-foreground mt-1">Welcome back, Alex. Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon className="h-12 w-12" />
            </div>
            <div className="flex items-center gap-3 text-muted-foreground mb-3">
              <stat.icon className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-widest font-bold">{stat.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-black tracking-tighter text-white font-mono">{stat.value}</span>
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                stat.positive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
              )}>
                {stat.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-semibold text-lg">Talent Acquisition Trends</h3>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white/40" />
                <span className="text-muted-foreground">Hires</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff30" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#ffffff30" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(0,0,0,0.8)", 
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    backdropFilter: "blur(8px)"
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="#4F46E5" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorApps)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="hires" 
                  stroke="#ffffff40" 
                  strokeWidth={2}
                  fill="transparent" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6"
        >
          <h3 className="font-semibold text-lg mb-8">Pipeline Distribution</h3>
          <div className="space-y-6">
            {[
              { label: "Sourcing", count: 420, total: 1000, color: "bg-blue-500" },
              { label: "Screening", count: 280, total: 1000, color: "bg-purple-500" },
              { label: "Technical", count: 150, total: 1000, color: "bg-primary" },
              { label: "Final Stage", count: 45, total: 1000, color: "bg-emerald-500" },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-mono text-white">{item.count}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.count / item.total) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={cn("h-full rounded-full", item.color)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-6 border-t border-white/5 text-center">
            <button className="text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
              View Detailed Pipeline
            </button>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity Table */}
      <motion.div 
        variants={itemVariants}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-semibold text-lg">Top Talent Recommendations</h3>
          <button className="text-muted-foreground hover:text-white transition-colors">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Candidate</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Role</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Match Score</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentCandidates.map((candidate, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-xs">
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{candidate.name}</div>
                        <div className="text-[10px] text-muted-foreground">{candidate.source}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{candidate.role}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium bg-white/5 border border-white/10 text-white">
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 w-16 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${candidate.match}%` }} />
                      </div>
                      <span className="text-xs font-mono text-white">{candidate.match}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-all">
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

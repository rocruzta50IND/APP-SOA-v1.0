"use client";

import { cn } from "@/lib/utils";
import { 
  Users, 
  UserPlus, 
  TrendingUp, 
  Clock, 
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
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
  Bar
} from "recharts";
import { motion } from "framer-motion";

const stats = [
  { 
    name: "Total Employees", 
    value: "2,450", 
    trend: "+12.5%", 
    trendType: "up", 
    icon: Users,
    color: "text-blue-500"
  },
  { 
    name: "Active Candidates", 
    value: "1,120", 
    trend: "+18.2%", 
    trendType: "up", 
    icon: UserPlus,
    color: "text-primary"
  },
  { 
    name: "Time to Hire", 
    value: "18 Days", 
    trend: "-4.5%", 
    trendType: "up", // In HR, less time is good
    icon: Clock,
    color: "text-emerald-500"
  },
  { 
    name: "Open Positions", 
    value: "42", 
    trend: "+2", 
    trendType: "up", 
    icon: Briefcase,
    color: "text-amber-500"
  },
];

const chartData = [
  { name: "Jan", hires: 45, applications: 240 },
  { name: "Feb", hires: 52, applications: 300 },
  { name: "Mar", hires: 48, applications: 280 },
  { name: "Apr", hires: 61, applications: 350 },
  { name: "May", hires: 55, applications: 320 },
  { name: "Jun", hires: 67, applications: 410 },
];

const recentCandidates = [
  { name: "Sarah Jenkins", role: "Senior Frontend Engineer", status: "Interviewing", avatar: "SJ" },
  { name: "Michael Chen", role: "Product Designer", status: "Offer Sent", avatar: "MC" },
  { name: "Emma Rodriguez", role: "DevOps Specialist", status: "Sourcing", avatar: "ER" },
  { name: "David Kim", role: "Backend Architect", status: "Technical Test", avatar: "DK" },
  { name: "Lisa Thompson", role: "HR Manager", status: "Hired", avatar: "LT" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Alex. Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
            Export Report
          </button>
          <button className="bg-primary text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all">
            Post New Job
          </button>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg bg-white/5", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                stat.trendType === "up" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
              )}>
                {stat.trendType === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">{stat.name}</p>
              <h3 className="text-2xl font-bold text-white mt-1 font-mono tracking-tighter">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts & Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recruitment Trend Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Recruitment Trends</h3>
              <p className="text-sm text-muted-foreground">Monthly acquisition vs. successful hires</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-lg text-xs px-3 py-1.5 focus:outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1e1e2d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="hires" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorHires)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Candidates List */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white tracking-tight">Active Candidates</h3>
            <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">View All</button>
          </div>
          
          <div className="space-y-6">
            {recentCandidates.map((candidate) => (
              <div key={candidate.name} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-primary group-hover:bg-primary/10 transition-colors">
                    {candidate.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">{candidate.name}</p>
                    <p className="text-xs text-muted-foreground">{candidate.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter",
                    candidate.status === "Hired" ? "bg-emerald-500/10 text-emerald-500" : 
                    candidate.status === "Offer Sent" ? "bg-primary/10 text-primary" : "bg-white/5 text-muted-foreground"
                  )}>
                    {candidate.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-primary/5 border border-primary/10 rounded-xl">
            <div className="flex items-center gap-2 text-primary mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Growth Insight</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Talent acquisition is up <span className="text-white font-medium">24%</span> compared to last quarter. Recommended to increase interview bandwidth.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

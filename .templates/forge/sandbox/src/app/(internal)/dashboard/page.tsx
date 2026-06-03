"use client";

import React from "react";
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
import { 
  Play, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Zap, 
  TrendingUp,
  Activity,
  ArrowUpRight,
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const performanceData = [
  { name: "Mon", score: 85 },
  { name: "Tue", score: 88 },
  { name: "Wed", score: 92 },
  { name: "Thu", score: 90 },
  { name: "Fri", score: 95 },
  { name: "Sat", score: 94 },
  { name: "Sun", score: 98 },
];

const executionHistory = [
  { id: "EX-9421", suite: "Core API Suite", status: "passed", time: "1.2s", date: "2 mins ago" },
  { id: "EX-9420", suite: "Mobile Auth Flow", status: "failed", time: "3.4s", date: "15 mins ago" },
  { id: "EX-9419", suite: "Checkout Logic", status: "passed", time: "0.8s", date: "1 hour ago" },
  { id: "EX-9418", suite: "User Profile Edge Cases", status: "passed", time: "2.1s", date: "3 hours ago" },
  { id: "EX-9417", suite: "Database Migration Sync", status: "passed", time: "5.6s", date: "5 hours ago" },
];

const kpis = [
  { label: "Success Rate", value: "94.2%", trend: "+2.1%", icon: CheckCircle2, color: "text-emerald-400" },
  { label: "Avg Execution", value: "1.4s", trend: "-120ms", icon: Clock, color: "text-blue-400" },
  { label: "Tests Covered", value: "1,248", trend: "+42", icon: Layers, color: "text-primary" },
  { label: "Active Nodes", value: "24/30", trend: "Stable", icon: Activity, color: "text-purple-400" },
];

import { Layers } from "lucide-react";

export default function DashboardPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white">System Overview</h1>
          <p className="text-muted-foreground">Monitor your automation health and performance in real-time.</p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10">
            Export Report
          </button>
          <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all hover:bg-primary/90">
            Run All Suites
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 400, damping: 30 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10"
          >
            <div className="flex items-center justify-between">
              <div className={cn("rounded-lg bg-white/5 p-2", kpi.color)}>
                <kpi.icon className="h-5 w-5" />
              </div>
              <span className={cn(
                "text-xs font-medium",
                kpi.trend.startsWith("+") ? "text-emerald-400" : kpi.trend.startsWith("-") ? "text-blue-400" : "text-muted-foreground"
              )}>
                {kpi.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
              <h3 className="text-2xl font-bold tracking-tight text-white font-mono">{kpi.value}</h3>
            </div>
            <div className="absolute -right-2 -bottom-2 h-16 w-16 bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
          </motion.div>
        ))}
      </div>

      {/* Main Grid Section */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl overflow-hidden relative"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-semibold text-white">Stability Index</h3>
              <p className="text-sm text-muted-foreground">Test success rate over the last 7 days</p>
            </div>
            <select className="bg-transparent border border-white/10 rounded-lg text-xs text-white px-2 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(0, 0, 0, 0.8)", 
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    backdropFilter: "blur(8px)"
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Executions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Executions</h3>
            <button className="text-xs text-primary hover:underline font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            {executionHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-all group">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    item.status === "passed" ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" : "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]"
                  )} />
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">{item.suite}</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground font-mono">{item.id} • {item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono text-white">{item.time}</p>
                  <p className={cn(
                    "text-[10px] font-bold uppercase",
                    item.status === "passed" ? "text-emerald-400/70" : "text-red-400/70"
                  )}>{item.status}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/20 relative overflow-hidden">
             <Zap className="absolute -right-4 -bottom-4 h-24 w-24 text-primary/10 -rotate-12" />
             <p className="text-sm font-bold text-white mb-1">Compute Efficiency</p>
             <p className="text-xs text-white/60 mb-3">You saved 4.2 hours of manual testing today.</p>
             <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full w-[70%]" />
             </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-sm" />
    </div>
  );
}

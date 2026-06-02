"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
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
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  MousePointer2, 
  ArrowUpRight,
  MoreHorizontal,
  Zap
} from "lucide-react";

// Realistic Mock Data
const performanceData = [
  { name: "Jan", leads: 400, revenue: 2400 },
  { name: "Feb", leads: 300, revenue: 1398 },
  { name: "Mar", leads: 200, revenue: 9800 },
  { name: "Apr", leads: 278, revenue: 3908 },
  { name: "May", leads: 189, revenue: 4800 },
  { name: "Jun", leads: 239, revenue: 3800 },
  { name: "Jul", leads: 349, revenue: 4300 },
];

const channelData = [
  { name: "LinkedIn", value: 45, color: "#0077b5" },
  { name: "Email", value: 30, color: "#4f46e5" },
  { name: "Search", value: 15, color: "#10b981" },
  { name: "Others", value: 10, color: "#6366f1" },
];

const kpis = [
  { title: "Total Contacts", value: "24,512", trend: "+12.5%", isPositive: true, icon: Users },
  { title: "Active Campaigns", value: "18", trend: "+2", isPositive: true, icon: Target },
  { title: "Avg. CTR", value: "4.2%", trend: "-0.4%", isPositive: false, icon: MousePointer2 },
  { title: "Pipeline Value", value: "$1.2M", trend: "+22%", isPositive: true, icon: TrendingUp },
];

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8 relative">
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
      
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
            Executive Overview
          </h1>
          <p className="text-muted-foreground mt-1">Real-time orchestration of your marketing ecosystem.</p>
        </div>
        <div className="flex items-center gap-2 bg-card border rounded-xl p-1 shadow-sm">
          {["24h", "7d", "30d", "12m"].map((period) => (
            <button 
              key={period} 
              className={cn(
                "px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
                period === "7d" ? "bg-primary text-white shadow-md" : "hover:bg-muted text-muted-foreground"
              )}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, type: "spring", stiffness: 400, damping: 30 } as const}
            className="group relative bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 hover:border-primary/20 hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <kpi.icon className="h-5 w-5" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg",
                kpi.isPositive ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"
              )}>
                {kpi.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {kpi.trend}
              </div>
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{kpi.title}</p>
            <p className="text-3xl font-black tracking-tighter mt-1 font-mono">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Bento Grid Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Revenue vs. Leads</h3>
              <p className="text-sm text-muted-foreground">Performance metrics over the last quarter</p>
            </div>
            <button className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
          
          <div className="h-[350px] w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000008" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#888' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#888' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      backdropFilter: 'blur(10px)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#4f46e5" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="leads" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fillOpacity={0}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Channels Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8 flex flex-col"
        >
          <h3 className="text-xl font-bold tracking-tight mb-2">Acquisition</h3>
          <p className="text-sm text-muted-foreground mb-8">Lead source distribution</p>
          
          <div className="flex-1 space-y-6">
            {channelData.map((channel) => (
              <div key={channel.name} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>{channel.name}</span>
                  <span className="text-muted-foreground">{channel.value}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${channel.value}%` }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: channel.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button className="mt-8 w-full group flex items-center justify-center gap-2 rounded-xl bg-muted/50 py-3 text-sm font-bold hover:bg-primary hover:text-white transition-all">
            View Source Details
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold tracking-tight">Recent Activity</h3>
            <button className="text-xs font-bold text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { user: "Sarah Johnson", action: "opened campaign", target: "Q3 Enterprise Outreach", time: "2m ago" },
              { user: "Michael Chen", action: "converted to", target: "Qualified Lead", time: "15m ago" },
              { user: "System", action: "automated follow-up sent to", target: "42 contacts", time: "1h ago" },
              { user: "Alex Rivera", action: "updated pipeline for", target: "Stellar Corp", time: "3h ago" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                    {item.user[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      <span className="font-bold">{item.user}</span> {item.action} <span className="text-primary font-semibold">{item.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-primary to-blue-600 rounded-3xl p-8 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
          <h3 className="text-2xl font-black tracking-tighter mb-4">Ready for AI Automation?</h3>
          <p className="text-white/80 text-sm mb-8 leading-relaxed">
            OmniNexus AI can now predict lead conversion with 94% accuracy. Enable the module to start optimizing your pipeline.
          </p>
          <button className="w-full bg-white text-primary font-bold py-3 rounded-xl shadow-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2">
            Enable AI Engine
            <Zap className="h-4 w-4 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
}

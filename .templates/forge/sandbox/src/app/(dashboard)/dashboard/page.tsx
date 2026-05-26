"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { 
  Users, 
  UserCheck, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  Briefcase,
  Calendar,
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

const data = [
  { name: "Jan", applications: 400, hires: 240 },
  { name: "Feb", applications: 300, hires: 139 },
  { name: "Mar", applications: 200, hires: 980 },
  { name: "Apr", applications: 278, hires: 390 },
  { name: "May", applications: 189, hires: 480 },
  { name: "Jun", applications: 239, hires: 380 },
  { name: "Jul", applications: 349, hires: 430 },
];

const recentHires = [
  { id: 1, name: "Sarah Jenkins", role: "Senior Frontend Engineer", status: "Onboarding", date: "2h ago" },
  { id: 2, name: "Michael Chen", role: "Product Manager", status: "Completed", date: "5h ago" },
  { id: 3, name: "Elena Rodriguez", role: "UX Designer", status: "Pending", date: "1d ago" },
  { id: 4, name: "David Kim", role: "DevOps Specialist", status: "Onboarding", date: "2d ago" },
  { id: 5, name: "Lisa Thompson", role: "HR Generalist", status: "Completed", date: "3d ago" },
];

function StatCard({ title, value, trend, trendValue, icon: Icon }: any) {
  const isPositive = trend === "up";
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 group hover:border-primary/30 transition-all duration-500"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
          isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
        )}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {trendValue}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-3xl font-bold tracking-tighter mt-1 font-mono">{value}</p>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter text-gradient">Recruitment Overview</h1>
        <p className="text-muted-foreground mt-2">Welcome back, Alex. Here's what's happening with your team today.</p>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Employees" 
          value="1,284" 
          trend="up" 
          trendValue="+12.5%" 
          icon={Users} 
        />
        <StatCard 
          title="Active Openings" 
          value="42" 
          trend="up" 
          trendValue="+4 new" 
          icon={Briefcase} 
        />
        <StatCard 
          title="Avg. Time to Hire" 
          value="18d" 
          trend="down" 
          trendValue="-2.4 days" 
          icon={Clock} 
        />
        <StatCard 
          title="Retention Rate" 
          value="98.2%" 
          trend="up" 
          trendValue="+0.5%" 
          icon={UserCheck} 
        />
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart - Bento Item 1 (Large) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-semibold text-white">Application Trends</h3>
              <p className="text-sm text-muted-foreground">Monthly recruitment pipeline performance</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-primary/50 transition-all">
              <option>Last 7 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff40" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#ffffff40" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(0, 0, 0, 0.8)", 
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    backdropFilter: "blur(8px)"
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="var(--color-primary)" 
                  fillOpacity={1} 
                  fill="url(#colorApps)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Side Panel - Bento Item 2 */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Hires</h3>
            <button className="text-primary hover:underline text-sm font-medium">View all</button>
          </div>
          <div className="space-y-6 flex-1">
            {recentHires.map((hire) => (
              <div key={hire.id} className="flex items-center gap-4 group cursor-pointer">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white group-hover:border-primary/50 transition-all">
                  {hire.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{hire.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{hire.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase font-mono">{hire.date}</p>
                  <div className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full inline-block mt-1",
                    hire.status === "Completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                  )}>
                    {hire.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Lower Panel - Bento Item 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-white">Upcoming Interviews</h3>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-4 w-4 text-primary" />
             </div>
             <div className="flex flex-col items-center justify-center bg-primary/20 rounded-lg w-12 h-12 border border-primary/30">
                <span className="text-xs font-bold text-primary">OCT</span>
                <span className="text-lg font-bold text-white leading-none">24</span>
             </div>
             <div>
                <p className="text-sm font-medium text-white">Technical Interview</p>
                <p className="text-xs text-muted-foreground">Jordan Smith • 10:30 AM</p>
             </div>
          </div>
        </motion.div>

        {/* Lower Panel - Bento Item 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Hiring Source Efficiency</h3>
            <MoreHorizontal className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-white" />
          </div>
          <div className="h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'LinkedIn', value: 85 },
                { name: 'Referral', value: 65 },
                { name: 'Indeed', value: 45 },
                { name: 'Website', value: 30 },
                { name: 'Direct', value: 20 },
              ]}>
                <Bar 
                  dataKey="value" 
                  fill="var(--color-primary)" 
                  radius={[4, 4, 0, 0]} 
                  opacity={0.8}
                />
                <XAxis dataKey="name" hide />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ 
                    backgroundColor: "rgba(0, 0, 0, 0.8)", 
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-4">
             {['LinkedIn', 'Referral', 'Indeed', 'Website', 'Direct'].map((source) => (
               <div key={source} className="flex flex-col items-center">
                  <span className="text-[10px] text-muted-foreground uppercase font-mono">{source}</span>
                  <div className="h-1 w-8 bg-white/10 rounded-full mt-1 overflow-hidden">
                     <div className="h-full bg-primary" style={{ width: source === 'LinkedIn' ? '80%' : '40%' }} />
                  </div>
               </div>
             ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

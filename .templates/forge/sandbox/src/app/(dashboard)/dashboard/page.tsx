"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Plus
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
  { label: "Total Employees", value: "1,284", trend: "+12.5%", positive: true, icon: Users },
  { label: "Active Recruitments", value: "42", trend: "+4", positive: true, icon: UserCheck },
  { label: "Retention Rate", value: "94.2%", trend: "-0.4%", positive: false, icon: TrendingUp },
  { label: "Avg. Time to Hire", value: "18 Days", trend: "-2 Days", positive: true, icon: Clock },
];

const chartData = [
  { name: "Jan", talent: 400, performance: 240 },
  { name: "Feb", talent: 300, performance: 139 },
  { name: "Mar", talent: 200, performance: 980 },
  { name: "Apr", talent: 278, performance: 390 },
  { name: "May", talent: 189, performance: 480 },
  { name: "Jun", talent: 239, performance: 380 },
  { name: "Jul", talent: 349, performance: 430 },
];

const recentActivities = [
  { id: 1, user: "Alex Rivera", action: "Completed onboarding", time: "2 hours ago", status: "success" },
  { id: 2, user: "Sarah Chen", action: "Submitted performance review", time: "4 hours ago", status: "pending" },
  { id: 3, user: "Marcus Wright", action: "New application for Senior UI Designer", time: "5 hours ago", status: "new" },
  { id: 4, user: "Elena Gilbert", action: "Salary adjustment approved", time: "Yesterday", status: "success" },
  { id: 5, user: "David Miller", action: "Requested leave for next week", time: "Yesterday", status: "pending" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 400, damping: 30 }
  }
};

export default function DashboardPage() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Overview
          </h1>
          <p className="text-muted-foreground mt-1">Welcome back, Jane. Here's what's happening today.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-medium shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:bg-primary/90 transition-all active:scale-95">
          <Plus className="w-4 h-4" />
          <span>New Report</span>
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon className="w-12 h-12" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-bold font-mono tracking-tight">{stat.value}</h3>
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                stat.positive ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
              )}>
                {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
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
          className="lg:col-span-2 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold">Talent Acquisition Growth</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none">
              <option>Last 7 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTalent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="talent" 
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorTalent)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
        >
          <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4 group">
                <div className={cn(
                  "w-2 h-2 rounded-full mt-2 shrink-0 shadow-[0_0_10px_currentColor]",
                  activity.status === 'success' ? 'text-emerald-500 bg-emerald-500' : 
                  activity.status === 'pending' ? 'text-amber-500 bg-amber-500' : 'text-primary bg-primary'
                )} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors cursor-pointer">{activity.user}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{activity.action}</p>
                  <p className="text-[10px] text-muted-foreground/60">{activity.time}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-medium hover:bg-white/10 transition-all">
            View All Activity
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

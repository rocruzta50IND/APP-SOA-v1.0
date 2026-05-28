"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import { Header } from "@/components/ui/Header";
import { 
  Users, 
  UserPlus, 
  TrendingUp, 
  TrendingDown,
  Briefcase,
  Clock,
  ArrowRight
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
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const data = [
  { name: "Jan", hires: 45, applicants: 120 },
  { name: "Feb", hires: 52, applicants: 150 },
  { name: "Mar", hires: 48, applicants: 180 },
  { name: "Apr", hires: 61, applicants: 210 },
  { name: "May", hires: 55, applicants: 190 },
  { name: "Jun", hires: 67, applicants: 240 },
];

const kpis = [
  { 
    name: "Total Employees", 
    value: "1,284", 
    trend: "+4.5%", 
    isPositive: true, 
    icon: Users,
    color: "from-blue-500/20 to-blue-600/20"
  },
  { 
    name: "Open Roles", 
    value: "42", 
    trend: "+12%", 
    isPositive: true, 
    icon: Briefcase,
    color: "from-purple-500/20 to-purple-600/20"
  },
  { 
    name: "New Applicants", 
    value: "847", 
    trend: "-2.1%", 
    isPositive: false, 
    icon: UserPlus,
    color: "from-emerald-500/20 to-emerald-600/20"
  },
  { 
    name: "Avg. Time to Hire", 
    value: "18 Days", 
    trend: "-3 Days", 
    isPositive: true, 
    icon: Clock,
    color: "from-orange-500/20 to-orange-600/20"
  },
];

const recentActivity = [
  { id: 1, user: "Sarah Jenkins", action: "Applied for Senior UX Designer", time: "2h ago", status: "New" },
  { id: 2, user: "Michael Chen", action: "Signed offer letter", time: "4h ago", status: "Hired" },
  { id: 3, user: "Elena Rodriguez", action: "Interview scheduled", time: "5h ago", status: "Scheduled" },
  { id: 4, user: "David Kim", action: "Completed technical test", time: "1d ago", status: "Review" },
  { id: 5, user: "Lisa Thompson", action: "Applied for Product Manager", time: "1d ago", status: "New" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <Header />
      
      <main className="pl-64 pt-16">
        <div className="p-8 space-y-8">
          {/* Hero Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                Talent Overview
              </h1>
              <p className="text-muted-foreground mt-1">Welcome back, Alex. Here's what's happening with your team today.</p>
            </div>
            <button className="flex items-center space-x-2 bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] rounded-xl px-5 py-2.5 font-medium transition-all">
              <UserPlus className="h-4 w-4" />
              <span>Post a Job</span>
            </button>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, i) => (
              <motion.div
                key={kpi.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 400, damping: 30 }}
                className="relative group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all overflow-hidden"
              >
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", kpi.color)} />
                <div className="relative flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                    <kpi.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className={cn(
                    "flex items-center text-xs font-semibold px-2 py-1 rounded-full",
                    kpi.isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                  )}>
                    {kpi.isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {kpi.trend}
                  </div>
                </div>
                <div className="relative">
                  <p className="text-sm font-medium text-muted-foreground mb-1">{kpi.name}</p>
                  <p className="text-2xl font-bold font-mono tracking-tight">{kpi.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Area */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 400, damping: 30 }}
              className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mt-64" />
              <div className="relative mb-8 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Hiring Velocity</h3>
                  <p className="text-sm text-muted-foreground">Applications vs. Hires in the last 6 months</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-xs text-muted-foreground">Applicants</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-white/40" />
                    <span className="text-xs text-muted-foreground">Hires</span>
                  </div>
                </div>
              </div>

              <div className="h-[350px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(9, 9, 11, 0.9)', 
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(8px)'
                      }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="applicants" 
                      stroke="rgba(255, 255, 255, 0.3)" 
                      fillOpacity={0} 
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="hires" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1} 
                      fill="url(#colorHires)" 
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Sidebar List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 30 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white tracking-tight">Recent Activity</h3>
                <button className="text-xs text-primary hover:underline flex items-center">
                  View all <ArrowRight className="ml-1 h-3 w-3" />
                </button>
              </div>

              <div className="space-y-6">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 group cursor-pointer">
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
                    <div className="flex-1 border-b border-white/5 pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{item.user}</p>
                        <span className="text-[10px] text-muted-foreground">{item.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{item.action}</p>
                      <span className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full border",
                        item.status === "Hired" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                        item.status === "New" ? "bg-primary/10 text-primary border-primary/20" :
                        "bg-white/5 text-muted-foreground border-white/10"
                      )}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

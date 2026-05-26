"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import { 
  Users, 
  TrendingUp, 
  Briefcase, 
  Zap,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import { cn } from "@/lib/utils";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 900 },
  { name: "Jul", value: 1100 },
];

const kpis = [
  { label: "Total Workforce", value: "2,840", trend: "+12.4%", icon: Users, positive: true },
  { label: "Active Pipelines", value: "48", trend: "+5.2%", icon: Briefcase, positive: true },
  { label: "Avg. Time to Hire", value: "18d", trend: "-2.4%", icon: Zap, positive: true },
  { label: "Retention Rate", value: "94.2%", trend: "-0.8%", icon: TrendingUp, positive: false },
];

const activities = [
  { user: "Elena Vance", action: "Hired as Lead Designer", time: "2h ago", status: "Completed" },
  { user: "Julian Casablancas", action: "Pipeline: Senior Engineer", time: "5h ago", status: "Interviewing" },
  { user: "Sarah Connor", action: "Payroll processed", time: "1d ago", status: "Success" },
  { user: "Rick Deckard", action: "Performance review", time: "2d ago", status: "Pending" },
  { user: "Molly Millions", action: "Security clearance", time: "3d ago", status: "In Progress" },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">System Intelligence</span>
            <h1 className="font-serif text-6xl md:text-8xl tracking-tighter leading-none">
              Strategic <br />
              <span className="text-muted-foreground/20">Overview</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-foreground text-background text-[10px] uppercase tracking-[0.2em] font-bold hover:opacity-80 transition-all duration-500 rounded-full">
              Export Report
            </button>
          </div>
        </section>

        {/* KPI Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 border border-border/50 bg-card/50 backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                  <kpi.icon className="w-5 h-5 text-muted-foreground" />
                  <div className={cn(
                    "flex items-center gap-1 text-[10px] font-bold",
                    kpi.positive ? "text-primary" : "text-destructive"
                  )}>
                    {kpi.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {kpi.trend}
                  </div>
                </div>
                <div className="mt-12 space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">{kpi.label}</p>
                  <p className="text-4xl font-sans tracking-tighter font-black">{kpi.value}</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full -mr-16 -mt-16 transition-all duration-1000 group-hover:bg-primary/10" />
            </motion.div>
          ))}
        </section>

        {/* Chart Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 p-10 border border-border/50 bg-card/30 backdrop-blur-sm space-y-8">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Intelligence Chart</p>
                <h3 className="font-serif text-3xl tracking-tighter">Acquisition Velocity</h3>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-1 border border-border/50 text-[8px] uppercase tracking-widest font-bold">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Current Cycle
                </div>
              </div>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      borderColor: "hsl(var(--border))",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      fontWeight: "bold",
                      padding: "12px"
                    }}
                    cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    animationDuration={2500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-10 border border-border/50 bg-card/30 backdrop-blur-sm flex flex-col">
            <div className="space-y-1 mb-8">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Flow Control</p>
              <h3 className="font-serif text-3xl tracking-tighter">Live Activity</h3>
            </div>
            <div className="flex-1 space-y-6">
              {activities.map((activity, index) => (
                <motion.div 
                  key={activity.user}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1), duration: 0.8 }}
                  className="flex items-center justify-between group cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest group-hover:text-primary transition-colors">{activity.user}</p>
                    <p className="text-[8px] text-muted-foreground uppercase tracking-widest">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-bold uppercase tracking-widest">{activity.status}</p>
                    <p className="text-[8px] text-muted-foreground/50 uppercase tracking-widest mt-0.5">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="mt-8 w-full border border-border/50 py-4 text-[8px] uppercase tracking-[0.3em] font-bold hover:bg-muted/50 transition-colors">
              View All Logs
            </button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

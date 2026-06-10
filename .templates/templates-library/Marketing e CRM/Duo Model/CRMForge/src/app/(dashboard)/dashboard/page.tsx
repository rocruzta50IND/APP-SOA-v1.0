"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowUpRight, ArrowDownRight, Activity, Users, Briefcase, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const data = [
  { name: "Jan", val1: 4000, val2: 2400 },
  { name: "Feb", val1: 3000, val2: 1398 },
  { name: "Mar", val1: 2000, val2: 9800 },
  { name: "Apr", val1: 2780, val2: 3908 },
  { name: "May", val1: 1890, val2: 4800 },
  { name: "Jun", val1: 2390, val2: 3800 },
  { name: "Jul", val1: 3490, val2: 4300 },
];

const cinematicTransition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };
const cinematicEntrance = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

function MetricCard({ title, value, trend, icon: Icon, delay = 0 }: { title: string, value: string, trend: number, icon: any, delay?: number }) {
  return (
    <motion.div 
      {...cinematicEntrance}
      transition={{ ...cinematicTransition, delay }}
      className="p-8 border border-border/50 bg-background relative overflow-hidden group hover:border-foreground/20 transition-colors duration-500"
    >
      <div className="flex justify-between items-start mb-12">
        <div className="w-10 h-10 border border-border/50 flex items-center justify-center bg-muted/10">
          <Icon className="w-4 h-4 text-foreground" strokeWidth={1.5} />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-sm font-sans tracking-wide",
          trend > 0 ? "text-emerald-500" : "text-rose-500"
        )}>
          {trend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {Math.abs(trend)}%
        </div>
      </div>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
          {title}
        </div>
        <div className="font-serif text-4xl tracking-tighter">
          {value}
        </div>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  return (
    <div className="p-12 md:p-16 lg:p-24 max-w-screen-2xl mx-auto">
      {/* Header Section */}
      <motion.div 
        {...cinematicEntrance}
        transition={cinematicTransition}
        className="mb-16"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block mb-4">
          Executive Overview
        </span>
        <h1 className="font-serif text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-6">
          Intelligence.
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg font-sans tracking-wide leading-relaxed">
          Monitor your high-ticket assets and campaign performance across all luxury portfolios in real-time.
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/50 border border-border/50 mb-16">
        <MetricCard title="Total Asset Value" value="$42.5M" trend={12.4} icon={Briefcase} delay={0.1} />
        <MetricCard title="Active Campaigns" value="14" trend={-2.1} icon={Activity} delay={0.2} />
        <MetricCard title="Exclusive Leads" value="1,284" trend={8.7} icon={Users} delay={0.3} />
        <MetricCard title="Conversion Rate" value="4.2%" trend={1.2} icon={Zap} delay={0.4} />
      </div>

      {/* Main Chart Section */}
      <motion.div 
        {...cinematicEntrance}
        transition={{ ...cinematicTransition, delay: 0.5 }}
        className="border border-border/50 p-12 relative overflow-hidden"
      >
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h3 className="font-serif text-5xl font-bold tracking-tighter mb-4">Capital Flow</h3>
            <p className="text-muted-foreground font-sans tracking-wide text-sm">
              Inbound and outbound transaction volume across networks.
            </p>
          </div>
          <button className="inline-flex items-center justify-center rounded-full bg-foreground text-background hover:opacity-80 px-8 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-500 active:scale-95">
            View Full Report
          </button>
        </div>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVal1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorVal2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--foreground)" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="var(--foreground)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--background)', 
                  border: '1px solid hsl(var(--border) / 0.5)', 
                  borderRadius: '0px',
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)'
                }}
                itemStyle={{ color: 'var(--foreground)' }}
              />
              <Area type="monotone" dataKey="val2" stroke="var(--foreground)" strokeWidth={2} fillOpacity={1} fill="url(#colorVal2)" />
              <Area type="monotone" dataKey="val1" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorVal1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}

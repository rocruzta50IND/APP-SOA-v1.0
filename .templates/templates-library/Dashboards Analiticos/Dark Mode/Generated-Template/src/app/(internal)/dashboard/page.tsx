"use client";

import { motion } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Activity, Zap, Shield, Target } from "lucide-react";

const mockChartData = [
  { name: "JAN", value: 400 },
  { name: "FEB", value: 300 },
  { name: "MAR", value: 600 },
  { name: "APR", value: 800 },
  { name: "MAY", value: 500 },
  { name: "JUN", value: 900 },
  { name: "JUL", value: 1200 },
];

const kpis = [
  {
    label: "Gross Throughput",
    value: "$4.2M",
    trend: "+12.5%",
    trendUp: true,
    icon: Activity,
  },
  {
    label: "Neural Efficiency",
    value: "98.4%",
    trend: "+0.2%",
    trendUp: true,
    icon: Zap,
  },
  {
    label: "Data Integrity",
    value: "100%",
    trend: "STABLE",
    trendUp: true,
    icon: Shield,
  },
  {
    label: "Forecast Accuracy",
    value: "94.1%",
    trend: "-1.4%",
    trendUp: false,
    icon: Target,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

export default function DashboardPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.label}
            variants={item}
            className="group relative p-8 border border-border/40 bg-secondary/20 transition-all duration-500 hover:border-primary/40"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-background border border-border/40 rounded-none group-hover:border-primary/20 transition-colors">
                <kpi.icon className="w-4 h-4 text-primary" />
              </div>
              <span className={cn(
                "text-[10px] font-bold tracking-widest uppercase",
                kpi.trendUp ? "text-emerald-500" : "text-rose-500"
              )}>
                {kpi.trend}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
                {kpi.label}
              </span>
              <h3 className="text-4xl font-serif tracking-tighter">
                {kpi.value}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Chart Section */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-10 border border-border/40 bg-secondary/10 relative overflow-hidden">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary mb-2 block">
                Performance Index
              </span>
              <h2 className="text-5xl font-serif tracking-tighter">Velocity Matrix</h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                Current Delta
              </span>
              <div className="flex items-center gap-2 text-emerald-500 font-serif text-2xl">
                <ArrowUpRight className="w-5 h-5" />
                <span>+24.8%</span>
              </div>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    fontSize: '10px',
                    fontFamily: 'Inter',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}
                  cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1 }}
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

        {/* Side Panel / Insights */}
        <div className="p-10 border border-border/40 bg-background relative flex flex-col justify-between">
          <div className="space-y-8">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground block">
              Strategic Insights
            </span>
            
            <div className="space-y-12">
              {[
                { title: "Node Optimization", desc: "Redistribute load to Singapore Cluster-A for 14% latency reduction." },
                { title: "Anomaly Detected", desc: "Unusual volume in E-commerce sector. Recommend tier-2 verification." },
                { title: "Prediction Ready", desc: "Q3 Forecast models have converged with 99.2% confidence." }
              ].map((insight, i) => (
                <div key={i} className="group cursor-pointer">
                  <h4 className="font-serif text-xl mb-2 group-hover:text-primary transition-colors">{insight.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed tracking-wide">{insight.desc}</p>
                  <div className="mt-4 h-[1px] w-0 bg-primary group-hover:w-full transition-all duration-700" />
                </div>
              ))}
            </div>
          </div>

          <button className="w-full py-6 mt-12 bg-foreground text-background text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary transition-all duration-500">
            Generate Executive Report
          </button>
        </div>
      </motion.div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i}
            variants={item}
            className="h-48 border border-border/40 bg-secondary/5 p-8 flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-4 h-4 text-primary" />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
              Module 0{i}
            </span>
            <h4 className="text-2xl font-serif">Advanced Neural{i === 1 ? " Mapping" : i === 2 ? " Synthesis" : " Extraction"}</h4>
            <div className="w-full h-1 bg-border/40">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${30 * i}%` }}
                transition={{ duration: 2, delay: 1 }}
                className="h-full bg-primary"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

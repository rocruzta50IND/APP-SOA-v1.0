"use client";

import { motion } from "framer-motion";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import { cn } from "@/lib/utils";
import { Brain, TrendingUp, Sparkles, Filter } from "lucide-react";

const mockPieData = [
  { name: "Expansion", value: 45 },
  { name: "Correction", value: 25 },
  { name: "Stagnation", value: 15 },
  { name: "Volatility", value: 15 },
];

const COLORS = ['hsl(var(--primary))', 'rgba(var(--primary), 0.6)', 'rgba(var(--primary), 0.4)', 'rgba(var(--primary), 0.2)'];

const forecasts = [
  { target: "Revenue Q4", confidence: "98.2%", impact: "High", timeline: "Oct - Dec" },
  { target: "User Churn", confidence: "84.5%", impact: "Medium", timeline: "Sep - Nov" },
  { target: "Market Shift", confidence: "72.1%", impact: "Critical", timeline: "2027+" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
};

export default function PredictionsPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-16"
    >
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
        <div className="p-4 rounded-full bg-primary/5 border border-primary/20">
          <Brain className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-muted-foreground">Predictive Engine v4.0</span>
          <h2 className="text-6xl font-serif tracking-tighter leading-none">The Future, Synthesized.</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed tracking-wide font-sans max-w-lg">
          Our proprietary neural models analyze 4.2 petabytes of cross-sector data to deliver high-confidence market trajectories.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Trajectory Breakdown */}
        <motion.div variants={item} className="lg:col-span-1 p-10 border border-border/40 bg-secondary/5 flex flex-col justify-center items-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-8">Probability Distribution</span>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {mockPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', fontSize: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full mt-8">
            {mockPieData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">{d.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Forecast Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {forecasts.map((f, i) => (
            <motion.div 
              key={i} 
              variants={item}
              className="p-10 border border-border/40 bg-background hover:bg-secondary/10 transition-all duration-700 group cursor-crosshair"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary italic">Scenario 0{i+1}</span>
                <Sparkles className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-3xl font-serif mb-6 group-hover:tracking-wider transition-all duration-700">{f.target}</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Confidence</span>
                  <span className="text-[9px] font-mono">{f.confidence}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Impact</span>
                  <span className={cn(
                    "text-[9px] font-mono",
                    f.impact === "Critical" ? "text-rose-500" : "text-emerald-500"
                  )}>{f.impact}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Timeline</span>
                  <span className="text-[9px] font-mono">{f.timeline}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          <motion.div 
            variants={item}
            className="p-10 border border-dashed border-border/60 bg-transparent flex flex-col items-center justify-center text-center space-y-4 group hover:border-primary/40 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
              <Filter className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Configure Custom Vector</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

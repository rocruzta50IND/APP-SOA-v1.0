"use client";

import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip 
} from "recharts";
import { cn } from "@/lib/utils";
import { Server, Globe, Cpu, Wifi } from "lucide-react";

const mockBarData = [
  { name: "LON", value: 45 },
  { name: "NYC", value: 52 },
  { name: "TOK", value: 38 },
  { name: "SIN", value: 65 },
  { name: "BER", value: 48 },
  { name: "SF", value: 59 },
];

const nodes = [
  { name: "Edge Alpha", status: "Active", load: "42%", latency: "12ms", region: "North America" },
  { name: "Edge Beta", status: "Active", load: "18%", latency: "45ms", region: "Europe" },
  { name: "Edge Gamma", status: "Warning", load: "89%", latency: "120ms", region: "Asia" },
  { name: "Edge Delta", status: "Active", load: "34%", latency: "8ms", region: "South America" },
  { name: "Edge Epsilon", status: "Maintenance", load: "0%", latency: "-", region: "Oceania" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

export default function RealTimePage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      <div className="flex justify-between items-center border-b border-border/40 pb-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary mb-2 block">
            Live Stream
          </span>
          <h2 className="text-5xl font-serif tracking-tighter italic">Neural Pulse</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col text-right">
            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Global Latency</span>
            <span className="font-serif text-2xl">24.5ms</span>
          </div>
          <div className="w-12 h-12 border border-border/40 flex items-center justify-center animate-spin-slow">
            <Globe className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Region Load Chart */}
        <motion.div variants={item} className="p-10 border border-border/40 bg-secondary/5">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-8 block">Regional Load Distribution</span>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockBarData}>
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--primary))', opacity: 0.1 }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    fontSize: '10px',
                    fontFamily: 'Inter'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))" 
                  radius={[0, 0, 0, 0]} 
                  animationDuration={2000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* System Health */}
        <motion.div variants={item} className="grid grid-cols-2 gap-6">
          {[
            { label: "Core Temperature", value: "42°C", icon: Cpu },
            { label: "Bandwidth Util", value: "2.4 GB/s", icon: Wifi },
            { label: "Active Requests", value: "14.2k", icon: Server },
            { label: "Node Uptime", value: "99.99%", icon: Globe },
          ].map((stat, i) => (
            <div key={i} className="p-8 border border-border/40 bg-background flex flex-col justify-between group hover:border-primary/40 transition-all">
              <stat.icon className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors mb-4" />
              <div>
                <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground block mb-1">{stat.label}</span>
                <span className="text-2xl font-serif">{stat.value}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Node Table */}
      <motion.div variants={item} className="border border-border/40 overflow-hidden">
        <div className="p-6 bg-secondary/10 border-b border-border/40">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Edge Node Registry</span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/40">
              {["Node Identifier", "Status", "Load", "Latency", "Region"].map((h) => (
                <th key={h} className="p-6 text-[9px] uppercase tracking-widest font-black text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {nodes.map((node, i) => (
              <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-secondary/5 transition-colors group">
                <td className="p-6 font-serif text-lg">{node.name}</td>
                <td className="p-6">
                  <span className={cn(
                    "px-3 py-1 text-[8px] uppercase tracking-tighter font-bold border",
                    node.status === "Active" ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/5" :
                    node.status === "Warning" ? "border-amber-500/20 text-amber-500 bg-amber-500/5" :
                    "border-muted-foreground/20 text-muted-foreground bg-muted-foreground/5"
                  )}>
                    {node.status}
                  </span>
                </td>
                <td className="p-6 font-mono text-xs">{node.load}</td>
                <td className="p-6 font-mono text-xs">{node.latency}</td>
                <td className="p-6 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{node.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}

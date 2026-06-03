"use client";

import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const resourceData = [
  { name: "Jan", cpu: 45, ram: 30 },
  { name: "Feb", cpu: 52, ram: 38 },
  { name: "Mar", cpu: 48, ram: 42 },
  { name: "Apr", cpu: 61, ram: 45 },
  { name: "May", cpu: 55, ram: 40 },
  { name: "Jun", cpu: 67, ram: 52 },
];

const errorData = [
  { name: "Network Timeout", value: 45, color: "#ef4444" },
  { name: "Schema Mismatch", value: 25, color: "#f59e0b" },
  { name: "Auth Failure", value: 20, color: "#4f46e5" },
  { name: "Logic Error", value: 10, color: "#10b981" },
];

export default function ReportsPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white">Analytics & Reports</h1>
          <p className="text-muted-foreground">Deep dive into your infrastructure performance and test results.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-white hover:bg-white/10 transition-all">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </button>
          <button className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:bg-primary/90 transition-all">
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-lg font-semibold text-white">Resource Consumption</h3>
             <div className="flex gap-4">
                <div className="flex items-center gap-2">
                   <div className="h-3 w-3 rounded bg-primary" />
                   <span className="text-xs text-muted-foreground">CPU Usage</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="h-3 w-3 rounded bg-purple-500" />
                   <span className="text-xs text-muted-foreground">RAM Usage</span>
                </div>
             </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resourceData}>
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
                />
                <Tooltip 
                  cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                  contentStyle={{ 
                    backgroundColor: "rgba(0, 0, 0, 0.8)", 
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    backdropFilter: "blur(8px)"
                  }}
                />
                <Bar dataKey="cpu" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ram" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Failure Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={errorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {errorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(0, 0, 0, 0.8)", 
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                  }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-4">
             {errorData.slice(0, 2).map((item) => (
               <div key={item.name} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-xs text-white">{item.name}</span>
                  <span className="text-xs font-bold text-red-400">+{item.value}%</span>
               </div>
             ))}
          </div>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
         {[
           { label: "Cost Efficiency", value: "84%", icon: TrendingUp, color: "text-emerald-400" },
           { label: "Critical Alerts", value: "12", icon: AlertTriangle, color: "text-red-400" },
           { label: "Uptime Score", value: "99.99%", icon: CheckCircle2, color: "text-primary" }
         ].map((stat, i) => (
           <motion.div
             key={stat.label}
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2 + i * 0.1 }}
             className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
           >
              <div className={cn("h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center mb-4", stat.color)}>
                 <stat.icon className="h-6 w-6" />
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <h4 className="text-2xl font-bold text-white font-mono mt-1">{stat.value}</h4>
           </motion.div>
         ))}
      </div>
    </div>
  );
}

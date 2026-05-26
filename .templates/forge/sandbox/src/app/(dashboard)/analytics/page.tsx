"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  Zap,
  Globe,
  PieChart as PieChartIcon
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { motion } from "framer-motion";

const workforceData = [
  { name: "Full-time", value: 850, color: "var(--color-primary)" },
  { name: "Contractors", value: 240, color: "#a855f7" },
  { name: "Remote", value: 194, color: "#ec4899" },
];

const hiringVelocity = [
  { month: "Jan", velocity: 45 },
  { month: "Feb", velocity: 52 },
  { month: "Mar", velocity: 48 },
  { month: "Apr", velocity: 70 },
  { month: "May", velocity: 65 },
  { month: "Jun", velocity: 90 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter text-gradient">Deep Analytics</h1>
        <p className="text-muted-foreground mt-2">Data-driven insights to optimize your workforce strategy.</p>
      </header>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Workforce Pie - Bento 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 flex flex-col items-center justify-center lg:col-span-1"
        >
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 self-start">Workforce Mix</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                  <Pie
                    data={workforceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {workforceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", borderColor: "rgba(255, 255, 255, 0.1)", borderRadius: "12px" }}
                  />
               </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2 w-full">
             {workforceData.map((item) => (
               <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                     <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                     <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-bold text-white">{item.value}</span>
               </div>
             ))}
          </div>
        </motion.div>

        {/* Hiring Velocity - Bento 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 lg:col-span-3"
        >
          <div className="flex items-center justify-between mb-8">
             <div>
                <h3 className="text-xl font-bold text-white">Hiring Velocity</h3>
                <p className="text-sm text-muted-foreground">Candidate conversion speed per month</p>
             </div>
             <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold bg-emerald-400/10 px-3 py-1 rounded-full">
                <TrendingUp className="h-4 w-4" />
                +24% Efficiency
             </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
               <LineChart data={hiringVelocity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="month" 
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
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", borderColor: "rgba(255, 255, 255, 0.1)", borderRadius: "12px" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="velocity" 
                    stroke="var(--color-primary)" 
                    strokeWidth={4} 
                    dot={{ fill: "var(--color-primary)", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                  />
               </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Insights - Bento 3 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-6 lg:col-span-2 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6">
             <Zap className="h-8 w-8 text-primary opacity-20 group-hover:opacity-50 transition-opacity" />
          </div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
             <Target className="h-5 w-5 text-primary" />
             AI Strategic Recommendations
          </h3>
          <ul className="space-y-4">
             <li className="flex gap-4">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-[10px] text-primary font-bold">1</div>
                <p className="text-sm text-muted-foreground">Predictive turnover risk detected in <span className="text-white font-medium">Customer Success</span> for Q4.</p>
             </li>
             <li className="flex gap-4">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-[10px] text-primary font-bold">2</div>
                <p className="text-sm text-muted-foreground">Optimized hiring window for <span className="text-white font-medium">Backend Engineers</span> starts in 12 days.</p>
             </li>
          </ul>
        </motion.div>

        {/* Global Distribution - Bento 4 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-6 lg:col-span-2"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
             <Globe className="h-5 w-5 text-primary" />
             Regional Performance
          </h3>
          <div className="space-y-4">
             {[
               { region: "North America", value: 65, status: "Optimal" },
               { region: "Europe", value: 42, status: "Growing" },
               { region: "APAC", value: 28, status: "Critical" }
             ].map((r) => (
               <div key={r.region} className="space-y-2">
                  <div className="flex justify-between text-xs">
                     <span className="text-white font-medium">{r.region}</span>
                     <span className={cn(
                       "font-bold",
                       r.status === 'Optimal' ? 'text-emerald-400' : r.status === 'Growing' ? 'text-primary' : 'text-rose-400'
                     )}>{r.status}</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${r.value}%` }}
                        className={cn(
                          "h-full rounded-full",
                          r.status === 'Optimal' ? 'bg-emerald-500' : r.status === 'Growing' ? 'bg-primary' : 'bg-rose-500'
                        )}
                     />
                  </div>
               </div>
             ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

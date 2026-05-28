"use client";

import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { Star, Zap, Target, Award, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const performanceData = [
  { name: "Q1", score: 84 },
  { name: "Q2", score: 92 },
  { name: "Q3", score: 78 },
  { name: "Q4", score: 95 },
];

const teamScores = [
  { name: "Engineering", score: 94, color: "#4f46e5" },
  { name: "Product", score: 88, color: "#8b5cf6" },
  { name: "Design", score: 91, color: "#ec4899" },
  { name: "Marketing", score: 82, color: "#f59e0b" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function PerformancePage() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Performance Analytics
        </h1>
        <p className="text-muted-foreground mt-1">Real-time metrics and organizational growth tracking.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <h3 className="text-lg font-semibold mb-8 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Quarterly Performance Index
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Bar 
                  dataKey="score" 
                  radius={[6, 6, 0, 0]}
                  barSize={60}
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4f46e5' : '#8b5cf6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              Top Performers
            </h3>
            <div className="space-y-4">
              {[
                { name: "Alex Rivera", role: "Dev", score: "9.8" },
                { name: "Sarah Chen", role: "Design", score: "9.5" },
                { name: "Marcus Wright", role: "Ops", score: "9.2" }
              ].map((performer, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                  <div>
                    <p className="text-sm font-medium">{performer.name}</p>
                    <p className="text-xs text-muted-foreground">{performer.role}</p>
                  </div>
                  <div className="text-primary font-mono font-bold">{performer.score}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-primary/10 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Award className="w-16 h-16" />
            </div>
            <h4 className="font-bold text-lg">Goal Completion</h4>
            <p className="text-3xl font-bold mt-2 font-mono">87.4%</p>
            <div className="w-full h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "87.4%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-primary shadow-[0_0_10px_#4f46e5]"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">+2.1% from last month</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

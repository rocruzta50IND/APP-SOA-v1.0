"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, Zap, CheckCircle2 } from "lucide-react";

const PERFORMANCE_DATA = [
  { name: 'Mon', completed: 12, added: 15 },
  { name: 'Tue', completed: 19, added: 12 },
  { name: 'Wed', completed: 15, added: 20 },
  { name: 'Thu', completed: 25, added: 10 },
  { name: 'Fri', completed: 22, added: 22 },
  { name: 'Sat', completed: 8, added: 5 },
  { name: 'Sun', completed: 14, added: 8 },
];

const VELOCITY_DATA = [
  { sprint: 'Sprint 1', points: 45 },
  { sprint: 'Sprint 2', points: 52 },
  { sprint: 'Sprint 3', points: 48 },
  { sprint: 'Sprint 4', points: 61 },
  { sprint: 'Sprint 5', points: 58 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">Monitor team performance and sprint velocity.</p>
        </div>
        <select className="bg-background border border-border shadow-sm rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Quarter</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Total Completed", value: "115", change: "+12.5%", trend: "up", icon: CheckCircle2 },
          { title: "Avg. Cycle Time", value: "2.4 days", change: "-8.1%", trend: "down", icon: Zap },
          { title: "Team Velocity", value: "58 pts", change: "+4.2%", trend: "up", icon: Activity },
        ].map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: i * 0.1 }}
            className="bg-background border border-border shadow-sm rounded-md p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{stat.title}</span>
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</span>
              <span className={`text-xs font-medium flex items-center ${stat.trend === 'up' ? 'text-green-500' : 'text-blue-500'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-background border border-border shadow-sm rounded-md p-6"
        >
          <h3 className="text-sm font-semibold text-foreground mb-6">Task Completion Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PERFORMANCE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '0.375rem' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Area type="monotone" dataKey="completed" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorCompleted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-background border border-border shadow-sm rounded-md p-6"
        >
          <h3 className="text-sm font-semibold text-foreground mb-6">Sprint Velocity</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VELOCITY_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="sprint" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                <Tooltip 
                  cursor={{ fill: 'var(--muted)', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '0.375rem' }}
                />
                <Bar dataKey="points" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
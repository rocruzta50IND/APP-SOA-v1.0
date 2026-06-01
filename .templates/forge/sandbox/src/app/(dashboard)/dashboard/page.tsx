"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  UserPlus, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Briefcase
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
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const stats = [
  { name: "Total Candidates", value: "2,840", trend: "+12.5%", positive: true, icon: Users },
  { name: "Active Employees", value: "452", trend: "+2.4%", positive: true, icon: Briefcase },
  { name: "Open Positions", value: "38", trend: "-4.1%", positive: false, icon: UserPlus },
  { name: "Time to Hire", value: "18 Days", trend: "-2 Days", positive: true, icon: Clock },
];

const hiringData = [
  { month: "Jan", hires: 45, applicants: 120 },
  { month: "Feb", hires: 52, applicants: 140 },
  { month: "Mar", hires: 48, applicants: 135 },
  { month: "Apr", hires: 61, applicants: 160 },
  { month: "May", hires: 55, applicants: 155 },
  { month: "Jun", hires: 67, applicants: 180 },
];

const sourceData = [
  { name: "LinkedIn", value: 45, color: "#0A66C2" },
  { name: "Referrals", value: 25, color: "#10B981" },
  { name: "Indeed", value: 20, color: "#2557A7" },
  { name: "Direct", value: 10, color: "#6366F1" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function DashboardPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tighter text-gradient">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Alex. Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div key={stat.name} variants={item}>
            <Card className="glass group hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                    stat.positive ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                  }`}>
                    {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.trend}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  <h3 className="text-2xl font-mono font-black tracking-tighter mt-1">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bento Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="glass h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Hiring Overview</CardTitle>
                <CardDescription>Applications vs Hires (Last 6 Months)</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="h-[350px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hiringData}>
                  <defs>
                    <linearGradient id="colorApplicants" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "rgba(10, 10, 12, 0.8)", 
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      backdropFilter: "blur(8px)"
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="applicants" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorApplicants)" 
                    strokeWidth={3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="hires" 
                    stroke="#10B981" 
                    fillOpacity={0} 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Source Distribution */}
        <motion.div variants={item}>
          <Card className="glass h-full">
            <CardHeader>
              <CardTitle>Candidate Sources</CardTitle>
              <CardDescription>Top channels for new talent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sourceData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      stroke="rgba(255,255,255,0.5)" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{ 
                        backgroundColor: "rgba(10, 10, 12, 0.8)", 
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px"
                      }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4 mt-4">
                {sourceData.map((source) => (
                  <div key={source.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: source.color }} />
                      <span className="text-muted-foreground">{source.name}</span>
                    </div>
                    <span className="font-mono font-medium">{source.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity / Bento Item */}
        <motion.div variants={item} className="lg:col-span-3">
          <Card className="glass overflow-hidden">
            <CardHeader>
              <CardTitle>Recent Candidate Activity</CardTitle>
              <CardDescription>Track latest updates in the hiring pipeline</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/5">
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Candidate</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Position</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stage</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { name: "Sarah Jenkins", role: "Senior Frontend Engineer", stage: "Technical Interview", date: "2 hours ago", initial: "SJ" },
                      { name: "Michael Chen", role: "Product Designer", stage: "Portfolio Review", date: "5 hours ago", initial: "MC" },
                      { name: "Aisha Mohammed", role: "DevOps Architect", stage: "Offer Sent", date: "Yesterday", initial: "AM" },
                      { name: "David Wilson", role: "Marketing Lead", stage: "Initial Screening", date: "Yesterday", initial: "DW" },
                    ].map((candidate, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                              {candidate.initial}
                            </div>
                            <span className="font-medium">{candidate.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{candidate.role}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                            {candidate.stage}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{candidate.date}</td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm" className="text-xs group-hover:text-primary transition-colors">View Profile</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

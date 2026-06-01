"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  DollarSign, 
  Download, 
  Calendar,
  ChevronDown
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const retentionData = [
  { month: "Jan", rate: 94, benchmark: 90 },
  { month: "Feb", rate: 95, benchmark: 90 },
  { month: "Mar", rate: 93, benchmark: 90 },
  { month: "Apr", rate: 96, benchmark: 90 },
  { month: "May", rate: 97, benchmark: 90 },
  { month: "Jun", rate: 95, benchmark: 90 },
];

const diversityData = [
  { name: "Engineering", value: 45 },
  { name: "Product", value: 20 },
  { name: "Design", value: 15 },
  { name: "Marketing", value: 10 },
  { name: "Others", value: 10 },
];

const COLORS = ["#6366F1", "#EC4899", "#10B981", "#F59E0B", "#8B5CF6"];

const hiringCostData = [
  { month: "Jan", cost: 12000 },
  { month: "Feb", cost: 15000 },
  { month: "Mar", cost: 11000 },
  { month: "Apr", cost: 18000 },
  { month: "May", cost: 14000 },
  { month: "Jun", cost: 19000 },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function AnalyticsPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gradient">Analytics</h1>
          <p className="text-muted-foreground">Advanced insights into your workforce performance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="gap-2">
            <Calendar className="w-4 h-4" /> Last 6 Months
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" /> Download Report
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Avg. Employee Lifetime", value: "4.2 Yrs", trend: "+0.5", icon: Users },
          { label: "Cost Per Hire", value: "$4,250", trend: "-12%", icon: DollarSign },
          { label: "Engagement Score", value: "8.8/10", trend: "+4%", icon: TrendingUp },
        ].map((metric, idx) => (
          <motion.div key={idx} variants={item}>
            <Card className="glass overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <metric.icon className="w-12 h-12" />
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground font-medium">{metric.label}</p>
                <div className="flex items-end gap-3 mt-2">
                  <h3 className="text-3xl font-mono font-black tracking-tighter">{metric.value}</h3>
                  <span className="text-emerald-500 text-sm font-bold mb-1">{metric.trend}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Retention Line Chart */}
        <motion.div variants={item}>
          <Card className="glass">
            <CardHeader>
              <CardTitle>Employee Retention Rate</CardTitle>
              <CardDescription>Monthly percentage vs industry benchmark</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retentionData}>
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
                    domain={[80, 100]}
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
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={4}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="benchmark" 
                    stroke="rgba(255,255,255,0.2)" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Hiring Cost Bar Chart */}
        <motion.div variants={item}>
          <Card className="glass">
            <CardHeader>
              <CardTitle>Monthly Hiring Investment</CardTitle>
              <CardDescription>Total spend on talent acquisition</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hiringCostData}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
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
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ 
                      backgroundColor: "rgba(10, 10, 12, 0.8)", 
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px"
                    }}
                  />
                  <Bar dataKey="cost" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Diversity Pie Chart */}
        <motion.div variants={item}>
          <Card className="glass">
            <CardHeader>
              <CardTitle>Workforce Composition</CardTitle>
              <CardDescription>Team distribution by department</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] flex flex-col md:flex-row items-center justify-around">
              <div className="w-full h-full max-w-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={diversityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {diversityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "rgba(10, 10, 12, 0.8)", 
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {diversityData.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.value}% of total</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Growth Insights */}
        <motion.div variants={item}>
          <Card className="glass h-full">
            <CardHeader>
              <CardTitle>Quarterly Growth Insights</CardTitle>
              <CardDescription>AI-generated workforce summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: "Retention is climbing", desc: "Retention rates have increased by 3% since last quarter, outperforming the benchmark.", status: "positive" },
                { title: "Engineering is scaling", desc: "The tech department grew by 15 members this month, reaching a new milestone.", status: "positive" },
                { title: "Hiring costs rising", desc: "Average cost per hire increased due to competitive market rates in senior roles.", status: "warning" },
              ].map((insight, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group">
                  <div className={`w-2 h-12 rounded-full ${insight.status === "positive" ? "bg-emerald-500" : "bg-amber-500"}`} />
                  <div>
                    <h4 className="font-bold group-hover:text-primary transition-colors">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{insight.desc}</p>
                  </div>
                </div>
              ))}
              <Button variant="secondary" className="w-full mt-4">View Detailed Analysis</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

"use client";

import React from "react";
import { Card, Text, Metric, AreaChart, BarChart, Tracker } from "@tremor/react";
import { motion } from "framer-motion";
import { Target, TrendingUp, Users, DollarSign, Activity } from "lucide-react";

const chartData = [
  { date: "Jan", "Qualified Leads": 2890, "Lost": 1400 },
  { date: "Feb", "Qualified Leads": 3890, "Lost": 1300 },
  { date: "Mar", "Qualified Leads": 3390, "Lost": 1100 },
  { date: "Apr", "Qualified Leads": 4890, "Lost": 900 },
  { date: "May", "Qualified Leads": 5890, "Lost": 850 },
  { date: "Jun", "Qualified Leads": 6490, "Lost": 700 },
];

const sourceData = [
  { name: "Email Campaign", value: 456 },
  { name: "LinkedIn Ads", value: 351 },
  { name: "Organic Search", value: 271 },
  { name: "Direct", value: 191 },
  { name: "Referral", value: 91 },
];

const trackerData = [
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "rose", tooltip: "Degraded Performance" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, ease: "easeOut" }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.05 } }
};

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial="initial" animate="animate" variants={fadeIn} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">Overview</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1">Real-time performance metrics and lead intelligence.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-background border border-border text-foreground text-xs font-bold uppercase tracking-widest rounded-md hover:bg-muted transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest rounded-md hover:opacity-90 transition-opacity">
            New Campaign
          </button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div initial="initial" animate="animate" variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={fadeIn}>
          <Card className="border-border bg-background shadow-sm rounded-md h-full flex flex-col justify-between group hover:border-primary/50 transition-colors">
            <div>
              <div className="flex justify-between items-start">
                <Text className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Total Revenue (MRR)</Text>
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
              <Metric className="text-foreground text-3xl font-black mt-2 tracking-tighter">$142,300</Metric>
            </div>
            <div className="mt-4 flex items-center text-[10px] font-bold uppercase tracking-widest text-primary">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Card className="border-border bg-background shadow-sm rounded-md h-full flex flex-col justify-between group hover:border-primary/50 transition-colors">
            <div>
              <div className="flex justify-between items-start">
                <Text className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Active Leads</Text>
                <Users className="w-4 h-4 text-primary" />
              </div>
              <Metric className="text-foreground text-3xl font-black mt-2 tracking-tighter">8,432</Metric>
            </div>
            <div className="mt-4 flex items-center text-[10px] font-bold uppercase tracking-widest text-primary">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+4.2% velocity</span>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Card className="border-border bg-background shadow-sm rounded-md h-full flex flex-col justify-between group hover:border-primary/50 transition-colors">
            <div>
              <div className="flex justify-between items-start">
                <Text className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Conversion Rate</Text>
                <Target className="w-4 h-4 text-primary" />
              </div>
              <Metric className="text-foreground text-3xl font-black mt-2 tracking-tighter">18.4%</Metric>
            </div>
            <div className="mt-4 flex items-center text-[10px] font-bold uppercase tracking-widest text-primary">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+2.1% from last quarter</span>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Card className="border-border bg-background shadow-sm rounded-md h-full flex flex-col justify-between group hover:border-primary/50 transition-colors">
            <div>
              <div className="flex justify-between items-start">
                <Text className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">System Health</Text>
                <Activity className="w-4 h-4 text-primary" />
              </div>
              <Metric className="text-foreground text-3xl font-black mt-2 tracking-tighter">99.9%</Metric>
            </div>
            <div className="mt-4">
              <Tracker data={trackerData} className="mt-2 w-full" />
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Main Charts */}
      <motion.div initial="initial" animate="animate" variants={stagger} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <motion.div variants={fadeIn} className="lg:col-span-2">
          <Card className="border-border bg-background shadow-sm rounded-md p-0 overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black italic uppercase tracking-tighter">Lead Acquisition Pipeline</h3>
                <p className="text-xs text-muted-foreground font-medium mt-1">Qualified vs Lost over the last 6 months.</p>
              </div>
            </div>
            <div className="p-6">
              <AreaChart
                className="h-72"
                data={chartData}
                index="date"
                categories={["Qualified Leads", "Lost"]}
                colors={["slate", "zinc"]}
                showGridLines={false}
                curveType="monotone"
                showAnimation={true}
              />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Card className="border-border bg-background shadow-sm rounded-md p-0 overflow-hidden h-full">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-black italic uppercase tracking-tighter">Top Sources</h3>
              <p className="text-xs text-muted-foreground font-medium mt-1">Highest converting acquisition channels.</p>
            </div>
            <div className="p-6">
              <BarChart
                className="h-72"
                data={sourceData}
                index="name"
                categories={["value"]}
                colors={["slate"]}
                showGridLines={false}
                layout="vertical"
                showLegend={false}
                showAnimation={true}
              />
            </div>
          </Card>
        </motion.div>

      </motion.div>
      
      {/* Table Section */}
      <motion.div initial="initial" animate="animate" variants={fadeIn}>
        <Card className="border-border bg-background shadow-sm rounded-md p-0 overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="text-lg font-black italic uppercase tracking-tighter">Recent High-Value Targets</h3>
            <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Industry</th>
                  <th className="px-6 py-4">Score</th>
                  <th className="px-6 py-4 text-right">Potential MRR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { name: "Acme Corp", industry: "Fintech", score: 98, mrr: "$12,500" },
                  { name: "Globex Inc", industry: "SaaS", score: 94, mrr: "$8,200" },
                  { name: "Initech", industry: "Cybersecurity", score: 89, mrr: "$15,000" },
                  { name: "Soylent Corp", industry: "Logistics", score: 85, mrr: "$6,400" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-foreground">{row.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{row.industry}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                        {row.score}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-foreground font-medium">{row.mrr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
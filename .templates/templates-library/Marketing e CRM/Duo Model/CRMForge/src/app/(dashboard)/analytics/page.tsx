"use client";

import { motion } from "framer-motion";
import { Playfair_Display, Inter } from "next/font/google";
import { AreaChart, Area, ResponsiveContainer, LineChart, Line, Tooltip } from "recharts";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const revenueData = [
  { month: "Jan", value: 2400 },
  { month: "Feb", value: 1398 },
  { month: "Mar", value: 9800 },
  { month: "Apr", value: 3908 },
  { month: "May", value: 4800 },
  { month: "Jun", value: 3800 },
  { month: "Jul", value: 4300 },
  { month: "Aug", value: 8500 },
  { month: "Sep", value: 11000 },
  { month: "Oct", value: 12500 },
];

const conversionData = [
  { day: "1", rate: 2.4 },
  { day: "2", rate: 2.1 },
  { day: "3", rate: 3.2 },
  { day: "4", rate: 3.8 },
  { day: "5", rate: 3.1 },
  { day: "6", rate: 4.5 },
  { day: "7", rate: 4.8 },
  { day: "8", rate: 5.2 },
  { day: "9", rate: 4.9 },
  { day: "10", rate: 6.1 },
];

const transitionPhysics = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };

export default function AnalyticsPage() {
  return (
    <div className="p-12 md:p-24 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitionPhysics}
        className="mb-16"
      >
        <div className={cn(inter.className, "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4")}>
          Performance Intelligence
        </div>
        <h1 className={cn(playfair.className, "text-6xl md:text-8xl font-bold tracking-tighter leading-none text-foreground")}>
          Global<br/>Analytics.
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionPhysics, delay: 0.1 }}
          className="md:col-span-8 border border-border/50 p-10 bg-background relative overflow-hidden group"
        >
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className={cn(inter.className, "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2")}>Total Pipeline Volume</div>
              <div className={cn(playfair.className, "text-5xl md:text-6xl font-bold tracking-tighter")}>$42.8M</div>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <span className="font-serif text-xl">+14.2%</span>
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '0', color: 'var(--foreground)' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                  cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--primary)" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  activeDot={{ r: 6, fill: "var(--primary)", stroke: "var(--background)", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Secondary Metric */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionPhysics, delay: 0.2 }}
          className="md:col-span-4 border border-border/50 p-10 bg-foreground text-background relative flex flex-col justify-between"
        >
          <div>
            <div className={cn(inter.className, "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2 opacity-70")}>Average Conversion Rate</div>
            <div className={cn(playfair.className, "text-5xl font-bold tracking-tighter")}>6.1%</div>
          </div>
          <div className="h-[150px] w-full mt-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionData}>
                <Line 
                  type="stepAfter" 
                  dataKey="rate" 
                  stroke="var(--background)" 
                  strokeWidth={2} 
                  dot={false}
                  activeDot={{ r: 4, fill: "var(--foreground)", stroke: "var(--background)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transitionPhysics, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {[
          { label: "Active Clients", value: "1,204", trend: "+24" },
          { label: "Lost Deals (Q4)", value: "$1.2M", trend: "-12%" },
          { label: "Avg. Deal Size", value: "$340K", trend: "+5.4%" }
        ].map((stat, i) => (
          <div key={i} className="border-t border-border/50 pt-8 pb-4 flex justify-between items-end">
            <div>
              <div className={cn(inter.className, "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4")}>{stat.label}</div>
              <div className={cn(playfair.className, "text-4xl font-bold tracking-tight")}>{stat.value}</div>
            </div>
            <div className="text-sm font-medium tracking-wider text-muted-foreground mb-2">
              {stat.trend}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

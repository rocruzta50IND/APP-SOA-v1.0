"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { cn } from "@/lib/utils";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  Activity, 
  Zap, 
  Globe 
} from "lucide-react";

const data = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 7000 },
];

const transactions = [
  { id: 1, asset: "Bitcoin", type: "Buy", amount: "0.42 BTC", value: "$28,402.10", status: "Completed", date: "2 mins ago" },
  { id: 2, asset: "Ethereum", type: "Staking Reward", amount: "1.24 ETH", value: "$2,840.50", status: "Processing", date: "15 mins ago" },
  { id: 3, asset: "Solana", type: "Sell", amount: "150.00 SOL", value: "$22,500.00", status: "Completed", date: "1 hour ago" },
  { id: 4, asset: "USDC", type: "Transfer", amount: "5,000.00 USDC", value: "$5,000.00", status: "Completed", date: "3 hours ago" },
  { id: 5, asset: "Cardano", type: "Buy", amount: "10,000.00 ADA", value: "$4,200.00", status: "Failed", date: "5 hours ago" },
];

const stats = [
  { label: "Total Net Worth", value: "$1,284,502.00", trend: "+12.4%", up: true, icon: TrendingUp },
  { label: "24h P&L", value: "+$42,102.50", trend: "+2.1%", up: true, icon: Activity },
  { label: "Staking APR", value: "14.2%", trend: "-0.4%", up: false, icon: Zap },
  { label: "Global Exposure", value: "84.2%", trend: "+5.2%", up: true, icon: Globe },
];

export default function DashboardPage() {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-2">Institutional Overview</p>
        <h1 className="text-6xl font-serif tracking-tighter leading-none mb-4">Executive Dashboard</h1>
        <p className="text-muted-foreground max-w-2xl text-lg font-light">
          Welcome back, Alexander. Your portfolio is performing <span className="text-foreground font-medium">8.4% above benchmark</span> this quarter.
        </p>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 border border-border/50 bg-card/30 backdrop-blur-sm rounded-none hover:border-primary/50 transition-colors duration-500 group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-muted/50 rounded-full text-muted-foreground group-hover:text-primary transition-colors duration-500">
                <stat.icon className="w-4 h-4" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase",
                stat.up ? "text-emerald-500" : "text-rose-500"
              )}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-2xl font-serif tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </section>

      {/* Chart & Activity Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 p-8 border border-border/50 bg-card/30 backdrop-blur-sm rounded-none">
          <div className="flex justify-between items-center mb-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-1">Portfolio Performance</p>
              <h3 className="text-2xl font-serif tracking-tight">Growth Projection</h3>
            </div>
            <div className="flex gap-2">
              {["1D", "1W", "1M", "1Y", "ALL"].map((t) => (
                <button key={t} className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors">
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0px",
                    fontSize: "10px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-8 border border-border/50 bg-card/30 backdrop-blur-sm rounded-none">
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-1">Audit Log</p>
            <h3 className="text-2xl font-serif tracking-tight">Recent Activity</h3>
          </div>
          
          <div className="space-y-6">
            {transactions.map((tx, i) => (
              <motion.div 
                key={tx.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-500">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium tracking-tight">{tx.asset}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{tx.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium tracking-tight">{tx.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{tx.date}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-12 py-4 border border-border/50 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground hover:bg-foreground hover:text-background transition-all duration-500">
            View Full Ledger
          </button>
        </div>
      </section>
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import { cn } from "@/lib/utils";
import { 
  Lock, 
  Zap, 
  Shield, 
  ArrowUpRight,
  TrendingUp,
  Clock
} from "lucide-react";

const rewardData = [
  { day: "1", amount: 100 },
  { day: "5", amount: 150 },
  { day: "10", amount: 280 },
  { day: "15", amount: 420 },
  { day: "20", amount: 580 },
  { day: "25", amount: 750 },
  { day: "30", amount: 980 },
];

const pools = [
  { id: 1, name: "Ethereum 2.0", apr: "4.2%", tvl: "$12.4B", status: "Active", risk: "Low" },
  { id: 2, name: "Solana Liquid", apr: "7.8%", tvl: "$2.1B", status: "Active", risk: "Medium" },
  { id: 3, name: "Polkadot Relay", apr: "14.2%", tvl: "$840M", status: "High Yield", risk: "Medium" },
  { id: 4, name: "Cardano Stake", apr: "3.5%", tvl: "$3.2B", status: "Stable", risk: "Low" },
  { id: 5, name: "Cosmos Hub", apr: "18.4%", tvl: "$120M", status: "Emerging", risk: "High" },
];

export default function StakingPage() {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-2">Yield Generation</p>
        <h1 className="text-6xl font-serif tracking-tighter leading-none mb-4">Capital Staking</h1>
        <p className="text-muted-foreground max-w-2xl text-lg font-light">
          Secure the network and earn institutional-grade rewards on your idle assets.
        </p>
      </section>

      {/* Rewards Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-12 border border-border/50 bg-card/30 backdrop-blur-sm relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-start mb-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-1">Total Rewards Earned</p>
              <h3 className="text-4xl font-serif tracking-tight">$42,502.10</h3>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-bold tracking-widest uppercase">
              <TrendingUp className="w-3 h-3" />
              +14.2% Monthly
            </div>
          </div>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rewardData}>
                <Area 
                  type="stepAfter" 
                  dataKey="amount" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.1} 
                  strokeWidth={2}
                />
                <Tooltip 
                   contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0px",
                    fontSize: "10px"
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-8 border border-border/50 bg-primary text-background">
             <div className="flex justify-between items-start mb-8">
               <Zap className="w-6 h-6" />
               <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Pro Strategy</span>
             </div>
             <p className="text-xl font-serif leading-tight mb-4">Auto-Compound and maximize your yields.</p>
             <button className="w-full py-3 bg-background text-foreground text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
               Enable Auto-Yield
             </button>
          </div>
          <div className="p-8 border border-border/50 bg-card/30 backdrop-blur-sm">
             <div className="flex items-center gap-3 mb-4">
               <Shield className="w-5 h-5 text-primary" />
               <p className="text-[10px] font-bold uppercase tracking-widest">Insurance Fund</p>
             </div>
             <p className="text-sm text-muted-foreground leading-relaxed">
               All staked assets are covered by our $500M institutional insurance protocol.
             </p>
          </div>
        </div>
      </section>

      {/* Staking Pools */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">Available Opportunities</p>
            <h3 className="text-3xl font-serif tracking-tight">Active Pools</h3>
          </div>
          <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary hover:border-b border-primary transition-all">
            View All Protocols
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pools.map((pool, i) => (
            <motion.div
              key={pool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="p-8 border border-border/50 bg-card/30 backdrop-blur-sm group hover:border-primary/50 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-lg font-serif tracking-tight mb-1">{pool.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{pool.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-serif text-primary">{pool.apr}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Est. APR</p>
                </div>
              </div>
              
              <div className="space-y-4 pt-6 border-t border-border/50">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-muted-foreground">Total Value Locked</span>
                  <span>{pool.tvl}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-muted-foreground">Risk Profile</span>
                  <span className={cn(
                    pool.risk === "Low" ? "text-emerald-500" : "text-amber-500"
                  )}>{pool.risk}</span>
                </div>
              </div>

              <button className="w-full mt-8 py-4 border border-border/50 rounded-full text-[10px] font-bold uppercase tracking-widest group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                Stake Assets
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

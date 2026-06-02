"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip,
  Cell
} from "recharts";
import { cn } from "@/lib/utils";
import { 
  ArrowLeftRight, 
  Info, 
  ChevronDown,
  Lock,
  Zap,
  ShieldCheck
} from "lucide-react";

const chartData = [
  { time: "09:00", volume: 400 },
  { time: "10:00", volume: 300 },
  { time: "11:00", volume: 500 },
  { time: "12:00", volume: 450 },
  { time: "13:00", volume: 600 },
  { time: "14:00", volume: 550 },
  { time: "15:00", volume: 700 },
];

const orderBook = {
  asks: [
    { price: "64,502.50", amount: "0.450", total: "29,026.12" },
    { price: "64,501.00", amount: "1.200", total: "77,401.20" },
    { price: "64,498.80", amount: "0.085", total: "5,482.40" },
    { price: "64,495.20", amount: "2.500", total: "161,238.00" },
    { price: "64,492.00", amount: "0.150", total: "9,673.80" },
  ],
  bids: [
    { price: "64,485.50", amount: "0.300", total: "19,345.65" },
    { price: "64,482.00", amount: "1.100", total: "70,930.20" },
    { price: "64,478.40", amount: "0.050", total: "3,223.92" },
    { price: "64,475.00", amount: "5.000", total: "322,375.00" },
    { price: "64,470.10", amount: "0.120", total: "7,736.41" },
  ]
};

export default function ExchangePage() {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-2">Prime Brokerage</p>
        <h1 className="text-6xl font-serif tracking-tighter leading-none mb-4">Institutional Exchange</h1>
        <div className="flex items-center gap-8 mt-6">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-background font-bold text-[10px]">BTC</div>
             <div>
               <p className="text-sm font-medium tracking-tight">BTC / USD</p>
               <p className="text-[10px] uppercase tracking-widest text-emerald-500">+1.24%</p>
             </div>
           </div>
           <div className="h-8 w-px bg-border/50" />
           <div>
             <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Last Price</p>
             <p className="text-sm font-mono font-medium">$64,490.25</p>
           </div>
           <div>
             <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">24h High</p>
             <p className="text-sm font-mono font-medium">$65,102.00</p>
           </div>
           <div>
             <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">24h Vol</p>
             <p className="text-sm font-mono font-medium">1.2B USD</p>
           </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Trading Terminal */}
        <div className="lg:col-span-8 space-y-8">
          <div className="p-8 border border-border/50 bg-card/30 backdrop-blur-sm">
             <div className="flex justify-between items-center mb-12">
               <h3 className="text-xl font-serif tracking-tight">Market Depth</h3>
               <div className="flex gap-4">
                 <button className="text-[10px] uppercase tracking-widest font-bold text-primary border-b border-primary pb-1">Price</button>
                 <button className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-foreground transition-colors pb-1">Depth</button>
               </div>
             </div>
             <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <Bar dataKey="volume" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fillOpacity={0.4 + (index * 0.1)} />
                      ))}
                    </Bar>
                    <Tooltip 
                      cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }}
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--background))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0px",
                        fontSize: "10px"
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="p-8 border border-border/50 bg-card/30 backdrop-blur-sm">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-rose-500 mb-6">Sell Orders</h4>
              <div className="space-y-3">
                {orderBook.asks.map((ask, i) => (
                  <div key={i} className="flex justify-between text-[10px] font-mono">
                    <span className="text-rose-500/80">{ask.price}</span>
                    <span className="text-muted-foreground">{ask.amount}</span>
                    <span className="text-foreground">{ask.total}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 border border-border/50 bg-card/30 backdrop-blur-sm">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-500 mb-6">Buy Orders</h4>
              <div className="space-y-3">
                {orderBook.bids.map((bid, i) => (
                  <div key={i} className="flex justify-between text-[10px] font-mono">
                    <span className="text-emerald-500/80">{bid.price}</span>
                    <span className="text-muted-foreground">{bid.amount}</span>
                    <span className="text-foreground">{bid.total}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trade Execution */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-8 border border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="flex gap-4 mb-8">
              <button className="flex-1 py-3 text-[10px] uppercase tracking-[0.2em] font-bold bg-foreground text-background rounded-full transition-all duration-500">Buy</button>
              <button className="flex-1 py-3 text-[10px] uppercase tracking-[0.2em] font-bold border border-border/50 text-muted-foreground hover:text-foreground rounded-full transition-all duration-500">Sell</button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 block">Order Type</label>
                <button className="w-full p-4 border border-border/50 flex justify-between items-center text-sm font-medium tracking-tight hover:border-primary/50 transition-colors">
                  Market Order <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 block">Amount to Spend</label>
                <div className="relative">
                  <input type="text" placeholder="0.00" className="w-full p-4 bg-muted/20 border border-border/50 focus:outline-none focus:border-primary/50 font-mono text-sm" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase text-muted-foreground">USD</span>
                </div>
              </div>

              <div className="p-4 bg-primary/5 border border-primary/10 space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <span>Est. Receive</span>
                  <span className="text-foreground">0.00 BTC</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <span>Fee (0.1%)</span>
                  <span className="text-foreground">0.00 USD</span>
                </div>
              </div>

              <button className="w-full py-5 bg-primary text-background text-[10px] uppercase tracking-[0.3em] font-bold rounded-full hover:opacity-90 transition-all duration-500 shadow-xl shadow-primary/20">
                Execute Transaction
              </button>
            </div>

            <div className="mt-8 flex items-center gap-3 p-4 border border-border/50">
               <ShieldCheck className="w-5 h-5 text-primary" />
               <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-tight">
                 Assets are protected by Kryptera Multi-Sig Custody.
               </p>
            </div>
          </div>

          <div className="p-8 border border-border/50 bg-card/30 backdrop-blur-sm">
             <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-6">Recent Trades</h4>
             <div className="space-y-4">
               {[1, 2, 3, 4, 5].map((i) => (
                 <div key={i} className="flex justify-between items-center text-[10px]">
                    <div className="flex items-center gap-2">
                       <span className={i % 2 === 0 ? "text-emerald-500" : "text-rose-500"}>●</span>
                       <span className="font-mono">$64,49{i}.{i}0</span>
                    </div>
                    <span className="text-muted-foreground">0.0{i}2 BTC</span>
                    <span className="text-muted-foreground">12:0{i}:22</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

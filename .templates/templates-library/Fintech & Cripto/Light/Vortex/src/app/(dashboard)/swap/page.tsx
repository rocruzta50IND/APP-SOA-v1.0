"use client";

import React from "react";
import { 
  ArrowDown, 
  Settings, 
  Info, 
  ArrowLeftRight, 
  TrendingUp, 
  ChevronDown,
  AlertCircle
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const priceData = [
  { time: "00:00", price: 2450 },
  { time: "04:00", price: 2480 },
  { time: "08:00", price: 2420 },
  { time: "12:00", price: 2510 },
  { time: "16:00", price: 2490 },
  { time: "20:00", price: 2550 },
  { time: "23:59", price: 2530 },
];

export default function SwapPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">Asset Exchange</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Instant liquidity for digital assets</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Swap Form */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="rounded-none border-border/50 shadow-2xl shadow-primary/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest">Swap Tokens</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings size={14} />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* From Asset */}
              <div className="p-4 bg-muted/50 border border-border space-y-2 group focus-within:ring-1 focus-within:ring-primary transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Pay</span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Balance: 1.245 BTC</span>
                </div>
                <div className="flex justify-between items-center">
                  <input 
                    type="text" 
                    placeholder="0.00" 
                    className="bg-transparent border-none text-2xl font-black tracking-tighter w-full focus:outline-none placeholder:text-muted-foreground/30"
                  />
                  <Button variant="outline" size="sm" className="h-8 rounded-none gap-2 bg-background font-black text-[10px] uppercase">
                    BTC <ChevronDown size={12} />
                  </Button>
                </div>
              </div>

              {/* Swap Divider */}
              <div className="relative flex justify-center -my-2 z-10">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-none bg-background border-border hover:bg-primary hover:text-primary-foreground transition-all">
                  <ArrowDown size={14} />
                </Button>
              </div>

              {/* To Asset */}
              <div className="p-4 bg-muted/50 border border-border space-y-2 group focus-within:ring-1 focus-within:ring-primary transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Receive</span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Balance: 12.50 ETH</span>
                </div>
                <div className="flex justify-between items-center">
                  <input 
                    type="text" 
                    placeholder="0.00" 
                    className="bg-transparent border-none text-2xl font-black tracking-tighter w-full focus:outline-none placeholder:text-muted-foreground/30"
                    readOnly
                  />
                  <Button variant="outline" size="sm" className="h-8 rounded-none gap-2 bg-background font-black text-[10px] uppercase">
                    ETH <ChevronDown size={12} />
                  </Button>
                </div>
              </div>

              {/* Swap Details */}
              <div className="space-y-2 p-2">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                  <span className="text-muted-foreground">Exchange Rate</span>
                  <span>1 BTC = 17.24 ETH</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                  <span className="text-muted-foreground">Slippage Tolerance</span>
                  <span className="text-emerald-500">0.5%</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                  <span className="text-muted-foreground">Network Fee</span>
                  <span>$12.45</span>
                </div>
              </div>

              <Button variant="primary" className="w-full h-12 rounded-none text-xs font-black uppercase tracking-[0.2em]">
                Confirm Exchange
              </Button>
            </CardContent>
          </Card>

          <div className="p-4 bg-amber-500/5 border border-amber-500/20 flex gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
            <p className="text-[10px] leading-relaxed font-medium text-amber-700 uppercase tracking-wide">
              Market volatility is high. Price impact may exceed 1%. Review your slippage settings before proceeding.
            </p>
          </div>
        </div>

        {/* Market Data */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="rounded-none border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold uppercase tracking-widest">BTC / ETH Market</CardTitle>
                  <CardDescription className="text-[10px] uppercase tracking-widest mt-1">24h price action performance</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black tracking-tighter">17.2451</p>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">+1.25%</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border)/0.5)" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", fontWeight: 700 }}
                  />
                  <YAxis 
                    hide
                    domain={['dataMin - 50', 'dataMax + 50']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0px",
                      fontSize: "10px",
                      fontWeight: "700",
                      textTransform: "uppercase"
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card className="rounded-none border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Order Depth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center h-4 relative overflow-hidden">
                      <div className="absolute inset-y-0 right-0 bg-emerald-500/10" style={{ width: `${80 - i * 15}%` }} />
                      <span className="text-[9px] font-bold text-emerald-500 z-10">17.2450</span>
                      <span className="text-[9px] font-mono font-bold z-10">0.450 BTC</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-none border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Market Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { time: "14:20:12", amount: "1.24 BTC", type: "buy" },
                    { time: "14:19:45", amount: "0.50 BTC", type: "sell" },
                    { time: "14:18:30", amount: "2.10 BTC", type: "buy" },
                  ].map((trade, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-border/30 pb-1">
                      <span className="text-[9px] font-bold text-muted-foreground uppercase">{trade.time}</span>
                      <span className="text-[9px] font-black">{trade.amount}</span>
                      <span className={cn("text-[8px] font-black uppercase", trade.type === "buy" ? "text-emerald-500" : "text-rose-500")}>
                        {trade.type}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  Wallet, 
  ArrowLeftRight, 
  History,
  MoreVertical,
  ChevronRight,
  ExternalLink
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
import { cn } from "@/lib/utils";

const performanceData = [
  { name: "JAN", value: 45000 },
  { name: "FEB", value: 52000 },
  { name: "MAR", value: 48000 },
  { name: "APR", value: 61000 },
  { name: "MAY", value: 59000 },
  { name: "JUN", value: 72000 },
  { name: "JUL", value: 85000 },
];

const topAssets = [
  { name: "Bitcoin", symbol: "BTC", value: "$42,231.89", change: "+4.2%", positive: true },
  { name: "Ethereum", symbol: "ETH", value: "$2,451.12", change: "+1.8%", positive: true },
  { name: "Solana", symbol: "SOL", value: "$102.45", change: "-2.4%", positive: false },
  { name: "Polkadot", symbol: "DOT", value: "$7.23", change: "+0.5%", positive: true },
];

const transactions = [
  { id: "1", type: "received", asset: "BTC", amount: "0.124 BTC", status: "completed", date: "2 mins ago" },
  { id: "2", type: "sent", asset: "ETH", amount: "1.500 ETH", status: "pending", date: "15 mins ago" },
  { id: "3", type: "swapped", asset: "SOL/USDC", amount: "45.0 SOL", status: "completed", date: "1 hour ago" },
  { id: "4", type: "received", asset: "USDT", amount: "1,200 USDT", status: "completed", date: "3 hours ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">Command Center</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Real-time overview of your digital empire</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-8 rounded-none border-border/50 text-[10px] uppercase font-black tracking-widest">
            Export Report
          </Button>
          <Button variant="primary" size="sm" className="h-8 rounded-none text-[10px] uppercase font-black tracking-widest">
            New Transaction
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Portfolio Value", value: "$124,592.12", change: "+12.5%", positive: true, icon: Wallet },
          { title: "24h Volume", value: "$12,450.00", change: "-2.1%", positive: false, icon: ArrowLeftRight },
          { title: "Active Positions", value: "18 Assets", change: "+3 New", positive: true, icon: TrendingUp },
          { title: "Transaction History", value: "1,245 Total", change: "+12 today", positive: true, icon: History },
        ].map((kpi, i) => (
          <Card key={i} className="rounded-none border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black tracking-tighter">{kpi.value}</div>
              <p className={cn(
                "flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest mt-1",
                kpi.positive ? "text-emerald-500" : "text-rose-500"
              )}>
                {kpi.positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {kpi.change}
                <span className="text-muted-foreground ml-1 font-medium">vs last period</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 rounded-none border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-widest">Portfolio Performance</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest mt-1">Growth trajectory over the last 6 months</CardDescription>
              </div>
              <div className="flex gap-2">
                {["1D", "1W", "1M", "1Y", "ALL"].map((p) => (
                  <button key={p} className={cn(
                    "px-2 py-1 text-[10px] font-black tracking-widest border transition-colors",
                    p === "1M" ? "bg-primary text-primary-foreground border-primary" : "border-border/50 hover:bg-muted"
                  )}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border)/0.5)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", fontWeight: 700 }}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0px",
                    fontSize: "10px",
                    fontWeight: "700",
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
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-none border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest">Top Allocations</CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-widest mt-1">Weight distribution by asset class</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {topAssets.map((asset) => (
                <div key={asset.symbol} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 flex items-center justify-center bg-muted border border-border group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <span className="text-[10px] font-black">{asset.symbol[0]}</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest">{asset.name}</p>
                      <p className="text-[10px] text-muted-foreground font-medium">{asset.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold tracking-tight">{asset.value}</p>
                    <p className={cn("text-[10px] font-bold uppercase", asset.positive ? "text-emerald-500" : "text-rose-500")}>
                      {asset.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full rounded-none text-[10px] uppercase font-black tracking-widest h-9">
              View All Assets
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid: Transactions & News */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 rounded-none border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-bold uppercase tracking-widest">Recent Activity</CardTitle>
              <CardDescription className="text-[10px] uppercase tracking-widest mt-1">Live transaction monitoring stream</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical size={16} />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border/50">
                  <tr>
                    <th className="pb-3 font-bold">Transaction</th>
                    <th className="pb-3 font-bold">Asset</th>
                    <th className="pb-3 font-bold">Amount</th>
                    <th className="pb-3 font-bold">Status</th>
                    <th className="pb-3 font-bold text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="group hover:bg-muted/30 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "h-2 w-2 rounded-full",
                            tx.type === "received" ? "bg-emerald-500" : tx.type === "sent" ? "bg-rose-500" : "bg-amber-500"
                          )} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{tx.type}</span>
                        </div>
                      </td>
                      <td className="py-4 text-[10px] font-bold uppercase tracking-widest">{tx.asset}</td>
                      <td className="py-4 text-[10px] font-bold tracking-tight">{tx.amount}</td>
                      <td className="py-4">
                        <span className={cn(
                          "px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border",
                          tx.status === "completed" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        )}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-[10px] text-muted-foreground font-bold uppercase">{tx.date}</span>
                          <ChevronRight size={12} className="text-muted-foreground" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-border/50 bg-primary text-primary-foreground overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp size={120} />
          </div>
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest">Market Insights</CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-widest mt-1 text-primary-foreground/60">AI-Powered intelligence</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10">
            <div className="p-4 bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Bullish Signal</span>
              </div>
              <p className="text-xs leading-relaxed font-medium">
                Vortex Alpha predicts a 15% increase in Layer 2 volume over the next 48 hours based on institutional inflow.
              </p>
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-white/40 hover:text-white cursor-pointer transition-colors">
                Read Analysis <ExternalLink size={10} />
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Global Indicators</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">S&P 500</p>
                  <p className="text-sm font-black">+0.45%</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">DXY Index</p>
                  <p className="text-sm font-black">102.40</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full rounded-none border-white/20 bg-transparent text-white hover:bg-white hover:text-primary text-[10px] uppercase font-black tracking-widest h-9">
              Upgrade to Alpha Pro
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download,
  Search
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const allocationData = [
  { name: "Bitcoin", value: 45, color: "hsl(var(--primary))" },
  { name: "Ethereum", value: 30, color: "hsl(var(--primary)/0.7)" },
  { name: "Solana", value: 15, color: "hsl(var(--primary)/0.4)" },
  { name: "USDC", value: 10, color: "hsl(var(--primary)/0.2)" },
];

const performanceData = [
  { name: "BTC", change: 12.5 },
  { name: "ETH", change: 8.2 },
  { name: "SOL", change: -4.5 },
  { name: "DOT", change: 2.1 },
  { name: "LINK", change: 5.7 },
  { name: "MATIC", change: -1.2 },
];

const assets = [
  { name: "Bitcoin", symbol: "BTC", balance: "1.245 BTC", value: "$52,592.12", price: "$42,242.10", change: "+4.2%", positive: true },
  { name: "Ethereum", symbol: "ETH", balance: "12.50 ETH", balanceValue: "$30,639.00", price: "$2,451.12", change: "+1.8%", positive: true },
  { name: "Solana", symbol: "SOL", balance: "450.00 SOL", balanceValue: "$46,102.50", price: "$102.45", change: "-2.4%", positive: false },
  { name: "USDC", symbol: "USDC", balance: "12,450.00 USDC", balanceValue: "$12,450.00", price: "$1.00", change: "0.0%", positive: true },
];

export default function PortfolioPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">Asset Portfolio</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Comprehensive breakdown of holdings</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-8 rounded-none text-[10px] uppercase font-black tracking-widest">
            <Download size={14} className="mr-2" /> Export CSV
          </Button>
          <Button variant="primary" size="sm" className="h-8 rounded-none text-[10px] uppercase font-black tracking-widest">
             Manage Assets
          </Button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-none border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest">Asset Allocation</CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-widest mt-1">Weight distribution by value</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
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
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-12">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total Value</p>
              <p className="text-xl font-black tracking-tighter">$141,783</p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 rounded-none border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest">Performance Heatmap</CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-widest mt-1">24h price movement across assets</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
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
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  cursor={{ fill: "hsl(var(--muted)/0.5)" }}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0px",
                    fontSize: "10px",
                    fontWeight: "700",
                    textTransform: "uppercase"
                  }}
                />
                <Bar dataKey="change" radius={[0, 0, 0, 0]}>
                  {performanceData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.change > 0 ? "hsl(var(--primary))" : "hsl(var(--destructive)/0.5)"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Asset Table */}
      <Card className="rounded-none border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-bold uppercase tracking-widest">Holdings Details</CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-widest mt-1">Real-time valuation of all assets</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative group">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="FILTER ASSETS..." 
                className="h-8 w-48 bg-muted/50 border border-border pl-8 text-[10px] uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-none border-border/50">
              <Filter size={14} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border/50">
                <tr>
                  <th className="pb-3 font-bold">Asset</th>
                  <th className="pb-3 font-bold text-right">Balance</th>
                  <th className="pb-3 font-bold text-right">Value (USD)</th>
                  <th className="pb-3 font-bold text-right">Price</th>
                  <th className="pb-3 font-bold text-right">24h Change</th>
                  <th className="pb-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {assets.map((asset) => (
                  <tr key={asset.symbol} className="group hover:bg-muted/30 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 flex items-center justify-center bg-muted border border-border group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <span className="text-[10px] font-black">{asset.symbol[0]}</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest">{asset.name}</p>
                          <p className="text-[10px] text-muted-foreground font-medium">{asset.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest">{asset.balance}</p>
                    </td>
                    <td className="py-4 text-right">
                      <p className="text-[10px] font-black tracking-tight">{asset.value}</p>
                    </td>
                    <td className="py-4 text-right">
                      <p className="text-[10px] font-bold text-muted-foreground">{asset.price}</p>
                    </td>
                    <td className="py-4 text-right">
                      <p className={cn(
                        "flex items-center justify-end gap-1 text-[10px] font-bold uppercase tracking-widest",
                        asset.positive ? "text-emerald-500" : "text-rose-500"
                      )}>
                        {asset.positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                        {asset.change}
                      </p>
                    </td>
                    <td className="py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] uppercase font-black tracking-widest">
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

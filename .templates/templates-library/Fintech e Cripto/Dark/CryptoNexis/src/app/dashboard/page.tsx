"use client";

import { DashboardSidebar, DashboardHeader } from "@/components/DashboardShell";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Clock,
  CheckCircle2,
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
import { cn } from "@/lib/utils";

const chartData = [
  { name: "Mon", value: 2400 },
  { name: "Tue", value: 1398 },
  { name: "Wed", value: 9800 },
  { name: "Thu", value: 3908 },
  { name: "Fri", value: 4800 },
  { name: "Sat", value: 3800 },
  { name: "Sun", value: 4300 },
];

const transactions = [
  { id: "TX-9021", type: "Inbound", amount: "+45.28 BTC", status: "Completed", time: "2 mins ago" },
  { id: "TX-4820", type: "Execution", amount: "-120,000 USDC", status: "Pending", time: "15 mins ago" },
  { id: "TX-3912", type: "Staking", amount: "+8,200 SOL", status: "Completed", time: "1 hour ago" },
  { id: "TX-2841", type: "Outbound", amount: "-12.5 ETH", status: "Review", time: "3 hours ago" },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        
        <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto w-full">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Institutional Overview</h1>
              <p className="text-muted-foreground">Welcome back, Alex. Your vaults are secure.</p>
            </div>
            <div className="flex gap-3">
              <button className="h-10 px-4 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted transition-all">
                Export Report
              </button>
              <button className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all">
                New Transaction
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Total Asset Value", value: "$12,482,902.50", change: "+12.5%", up: true, icon: Wallet },
              { label: "Execution Volume", value: "$4.2B", change: "+4.2%", up: true, icon: TrendingUp },
              { label: "Network Fees", value: "$12,902.12", change: "-2.1%", up: false, icon: TrendingDown },
              { label: "Node Health", value: "99.99%", change: "Stable", up: true, icon: CheckCircle2 },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                    <stat.icon className="size-5" />
                  </div>
                  <div className={cn(
                    "flex items-center text-xs font-bold px-2 py-1 rounded-full",
                    stat.up ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                  )}>
                    {stat.up ? <ArrowUpRight className="size-3 mr-1" /> : <ArrowDownRight className="size-3 mr-1" />}
                    {stat.change}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            ))}
          </div>

          {/* Main Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Area */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border/50 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2">
                  <TrendingUp className="size-4 text-primary" />
                  Performance Metrics
                </h3>
                <div className="flex gap-2">
                  {["1D", "1W", "1M", "1Y"].map(t => (
                    <button key={t} className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-md transition-all",
                      t === "1W" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: "var(--muted-foreground)"}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: "var(--muted-foreground)"}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "12px" }}
                      itemStyle={{ color: "var(--primary)" }}
                    />
                    <Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Asset Distribution */}
            <div className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col">
              <h3 className="font-bold mb-6">Asset Allocation</h3>
              <div className="space-y-4 flex-1">
                {[
                  { name: "Bitcoin", symbol: "BTC", value: "65%", color: "bg-orange-500" },
                  { name: "Ethereum", symbol: "ETH", value: "20%", color: "bg-blue-500" },
                  { name: "Solana", symbol: "SOL", value: "10%", color: "bg-purple-500" },
                  { name: "Stablecoins", symbol: "USDC", value: "5%", color: "bg-emerald-500" },
                ].map((asset, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">{asset.name}</span>
                      <span className="text-muted-foreground">{asset.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", asset.color)} style={{ width: asset.value }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-border/50 text-center">
                <button className="text-sm text-primary font-bold hover:underline">Manage All Vaults</button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-3 p-6 rounded-2xl bg-card border border-border/50 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold">Recent Transactions</h3>
                <button className="text-xs text-muted-foreground hover:text-primary">View All History</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs text-muted-foreground border-b border-border/50">
                      <th className="pb-4 font-medium uppercase tracking-wider">Transaction ID</th>
                      <th className="pb-4 font-medium uppercase tracking-wider">Type</th>
                      <th className="pb-4 font-medium uppercase tracking-wider">Amount</th>
                      <th className="pb-4 font-medium uppercase tracking-wider">Status</th>
                      <th className="pb-4 font-medium uppercase tracking-wider">Time</th>
                      <th className="pb-4"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {transactions.map((tx, i) => (
                      <tr key={i} className="border-b border-border/10 last:border-0 hover:bg-muted/30 transition-colors group">
                        <td className="py-4 font-mono text-xs">{tx.id}</td>
                        <td className="py-4">{tx.type}</td>
                        <td className="py-4 font-bold">{tx.amount}</td>
                        <td className="py-4">
                          <div className={cn(
                            "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold",
                            tx.status === "Completed" ? "bg-green-500/10 text-green-500" : 
                            tx.status === "Pending" ? "bg-yellow-500/10 text-yellow-500" : "bg-blue-500/10 text-blue-500"
                          )}>
                            {tx.status === "Completed" ? <CheckCircle2 className="size-3" /> : 
                             tx.status === "Pending" ? <Clock className="size-3" /> : <AlertCircle className="size-3" />}
                            {tx.status}
                          </div>
                        </td>
                        <td className="py-4 text-muted-foreground text-xs">{tx.time}</td>
                        <td className="py-4 text-right">
                          <button className="p-1 rounded hover:bg-muted opacity-0 group-hover:opacity-100 transition-all">
                            <MoreHorizontal className="size-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

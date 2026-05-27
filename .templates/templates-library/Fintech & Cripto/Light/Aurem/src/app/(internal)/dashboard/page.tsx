"use client";

import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Activity,
  ArrowRight
} from "lucide-react";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  CartesianGrid
} from "recharts";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const chartData = [
  { name: "Jan", value: 2400 },
  { name: "Feb", value: 1398 },
  { name: "Mar", value: 9800 },
  { name: "Apr", value: 3908 },
  { name: "May", value: 4800 },
  { name: "Jun", value: 3800 },
  { name: "Jul", value: 4300 },
];

const recentTransactions = [
  { id: 1, type: "Buy", asset: "BTC", amount: "0.045", price: "$64,230.12", status: "Completed", date: "2 mins ago" },
  { id: 2, type: "Sell", asset: "ETH", amount: "1.2", price: "$3,450.00", status: "Completed", date: "15 mins ago" },
  { id: 3, type: "Buy", asset: "SOL", amount: "25.0", price: "$145.22", status: "Pending", date: "1 hour ago" },
  { id: 4, type: "Transfer", asset: "USDT", amount: "1,500", price: "$1,500.00", status: "Completed", date: "3 hours ago" },
  { id: 5, type: "Buy", asset: "BTC", amount: "0.012", price: "$64,450.00", status: "Failed", date: "5 hours ago" },
];

const kpis = [
  { 
    title: "Total Balance", 
    value: "$124,592.45", 
    trend: "+12.5%", 
    trendType: "up", 
    icon: Wallet 
  },
  { 
    title: "Active Assets", 
    value: "14", 
    trend: "+2", 
    trendType: "up", 
    icon: Activity 
  },
  { 
    title: "24h Volume", 
    value: "$12,450.12", 
    trend: "-4.2%", 
    trendType: "down", 
    icon: TrendingUp 
  },
  { 
    title: "Rewards Earned", 
    value: "$1,245.00", 
    trend: "+8.1%", 
    trendType: "up", 
    icon: ArrowUpRight 
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Portfolio Overview</h1>
          <p className="text-muted-foreground text-sm">Welcome back, monitoring your assets in real-time.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">Download Report</Button>
          <Button size="sm">Trade Assets</Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="p-6 border-border/50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{kpi.title}</p>
                <h3 className="text-2xl font-black tracking-tighter">{kpi.value}</h3>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <kpi.icon className="w-4 h-4 text-foreground" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className={cn(
                "text-xs font-bold flex items-center gap-0.5",
                kpi.trendType === "up" ? "text-green-500" : "text-red-500"
              )}>
                {kpi.trendType === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownLeft className="w-3 h-3" />}
                {kpi.trend}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase font-medium">from last month</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 p-6 border-border/50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold tracking-tight">Performance Analytics</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Market Value vs Deposits</p>
            </div>
            <div className="flex gap-1 bg-muted p-1 rounded-md">
              {['1D', '1W', '1M', '1Y', 'ALL'].map((range) => (
                <button 
                  key={range} 
                  className={cn(
                    "px-3 py-1 text-[10px] font-bold rounded-sm transition-colors",
                    range === '1M' ? "bg-background shadow-sm" : "hover:bg-background/50"
                  )}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '4px',
                    fontSize: '12px'
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
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-6 border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold tracking-tight">Recent Activity</h3>
            <Button variant="ghost" size="sm" className="text-[10px] uppercase tracking-widest font-bold h-8">
              View All <ArrowRight className="ml-2 w-3 h-3" />
            </Button>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 border border-border/40 rounded-md hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-md flex items-center justify-center",
                    tx.type === "Buy" ? "bg-green-500/10 text-green-500" : 
                    tx.type === "Sell" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
                  )}>
                    {tx.type === "Buy" ? <TrendingUp className="w-4 h-4" /> : 
                     tx.type === "Sell" ? <TrendingDown className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold">{tx.type} {tx.asset}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black tracking-tight">{tx.price}</p>
                  <p className={cn(
                    "text-[10px] font-bold uppercase tracking-widest",
                    tx.status === "Completed" ? "text-green-500" : 
                    tx.status === "Pending" ? "text-yellow-500" : "text-red-500"
                  )}>{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

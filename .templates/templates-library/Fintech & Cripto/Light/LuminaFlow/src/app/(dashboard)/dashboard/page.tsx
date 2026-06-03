"use client";

import React from "react";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  TrendingUp, 
  Activity, 
  CreditCard 
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

const data = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 7000 },
];

const stats = [
  {
    label: "Total Balance",
    value: "$124,592.00",
    trend: "+12.5%",
    trendUp: true,
    icon: Wallet,
  },
  {
    label: "Monthly Profit",
    value: "$12,402.15",
    trend: "+8.2%",
    trendUp: true,
    icon: TrendingUp,
  },
  {
    label: "Active Trades",
    value: "14",
    trend: "-2.4%",
    trendUp: false,
    icon: Activity,
  },
  {
    label: "Total Expenses",
    value: "$3,240.50",
    trend: "+4.1%",
    trendUp: false,
    icon: CreditCard,
  },
];

const recentActivity = [
  { id: 1, type: "Buy", asset: "BTC", amount: "0.042", price: "$64,210", status: "Completed", date: "2 mins ago" },
  { id: 2, type: "Sell", asset: "ETH", amount: "1.24", price: "$3,420", status: "Completed", date: "15 mins ago" },
  { id: 3, type: "Transfer", asset: "USDT", amount: "5,000", price: "$1.00", status: "Pending", date: "1 hour ago" },
  { id: 4, type: "Buy", asset: "SOL", amount: "12.5", price: "$145", status: "Completed", date: "3 hours ago" },
  { id: 5, type: "Sell", asset: "BTC", amount: "0.01", price: "$63,980", status: "Completed", date: "5 hours ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, John. Here&apos;s your portfolio overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-md border border-border bg-background p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-md bg-muted p-2">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium",
                stat.trendUp ? "text-green-600" : "text-red-600"
              )}>
                {stat.trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Performance Chart */}
        <div className="col-span-4 rounded-md border border-border bg-background p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-semibold tracking-tight">Portfolio Performance</h3>
            <p className="text-sm text-muted-foreground">Total growth over the last 7 months</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
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
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "6px",
                    fontSize: "12px"
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-3 rounded-md border border-border bg-background p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">Recent Activity</h3>
              <p className="text-sm text-muted-foreground">Latest transactions and trades</p>
            </div>
          </div>
          <div className="space-y-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-md font-bold text-xs",
                    activity.type === "Buy" ? "bg-green-100 text-green-700" : 
                    activity.type === "Sell" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                  )}>
                    {activity.type[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.type} {activity.asset}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{activity.amount} {activity.asset}</p>
                  <p className={cn(
                    "text-[10px] font-medium uppercase tracking-wider",
                    activity.status === "Completed" ? "text-green-600" : "text-amber-600"
                  )}>
                    {activity.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full rounded-md border border-border py-2 text-xs font-medium transition-colors hover:bg-muted">
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
}

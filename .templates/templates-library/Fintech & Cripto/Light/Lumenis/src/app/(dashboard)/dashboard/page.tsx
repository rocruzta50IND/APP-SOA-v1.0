"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { 
  TrendingUp, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  Plus
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
import { Button } from "@/components/ui/Button";

const data = [
  { name: "Jan", value: 42000 },
  { name: "Feb", value: 45000 },
  { name: "Mar", value: 43000 },
  { name: "Apr", value: 48000 },
  { name: "May", value: 52000 },
  { name: "Jun", value: 49000 },
  { name: "Jul", value: 55000 },
];

const stats = [
  {
    title: "Total Balance",
    value: "$55,234.12",
    change: "+12.5%",
    trend: "up",
    icon: Wallet,
  },
  {
    title: "24h Volume",
    value: "$1,204,500",
    change: "-2.4%",
    trend: "down",
    icon: Activity,
  },
  {
    title: "Active Assets",
    value: "14",
    change: "+2",
    trend: "up",
    icon: Plus,
  },
  {
    title: "Open Trades",
    value: "5",
    change: "0%",
    trend: "neutral",
    icon: TrendingUp,
  },
];

const recentTransactions = [
  { id: 1, type: "Buy", asset: "BTC", amount: "0.05", value: "$2,450.00", status: "Completed", date: "2 mins ago" },
  { id: 2, type: "Sell", asset: "ETH", amount: "1.2", value: "$3,120.50", status: "Completed", date: "15 mins ago" },
  { id: 3, type: "Swap", asset: "SOL/USDC", amount: "45.0", value: "$4,500.00", status: "Pending", date: "1 hour ago" },
  { id: 4, type: "Buy", asset: "BTC", amount: "0.01", value: "$490.00", status: "Completed", date: "3 hours ago" },
  { id: 5, type: "Transfer", asset: "USDC", amount: "500.0", value: "$500.00", status: "Completed", date: "5 hours ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Overview</h1>
          <p className="text-muted-foreground text-sm">Welcome back, John. Your portfolio is up 12% today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest">
            Export PDF
          </Button>
          <Button size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest">
            Add Funds
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-none border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black tracking-tighter">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                ) : stat.trend === "down" ? (
                  <ArrowDownRight className="w-3 h-3 text-rose-500" />
                ) : null}
                <span className={cn(
                  "text-xs font-medium",
                  stat.trend === "up" ? "text-emerald-500" : stat.trend === "down" ? "text-rose-500" : "text-muted-foreground"
                )}>
                  {stat.change}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-none border-border">
          <CardHeader>
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest">Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
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
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    border: "1px solid hsl(var(--border))",
                    fontSize: "12px",
                    fontWeight: "600",
                    borderRadius: "4px"
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

        <Card className="shadow-none border-border">
          <CardHeader>
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center border",
                      tx.type === "Buy" ? "bg-emerald-50 border-emerald-100 text-emerald-600" : 
                      tx.type === "Sell" ? "bg-rose-50 border-rose-100 text-rose-600" :
                      "bg-blue-50 border-blue-100 text-blue-600"
                    )}>
                      {tx.type === "Buy" ? <ArrowUpRight className="w-4 h-4" /> : 
                       tx.type === "Sell" ? <ArrowDownRight className="w-4 h-4" /> : 
                       <ArrowLeftRight className="w-4 h-4" /> }
                    </div>
                    <div>
                      <div className="text-sm font-bold tracking-tight">{tx.type} {tx.asset}</div>
                      <div className="text-[10px] text-muted-foreground uppercase">{tx.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black tracking-tighter">{tx.value}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">{tx.amount} {tx.asset}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 text-[10px] font-bold uppercase tracking-widest h-9">
              View All History
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ArrowLeftRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3 4 7l4 4" />
      <path d="M4 7h16" />
      <path d="m16 21 4-4-4-4" />
      <path d="M20 17H4" />
    </svg>
  );
}

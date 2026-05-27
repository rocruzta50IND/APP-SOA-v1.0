"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from "recharts";
import { TrendingUp, Download, Calendar, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const barData = [
  { name: "Mon", deposits: 4000, withdrawals: 2400 },
  { name: "Tue", deposits: 3000, withdrawals: 1398 },
  { name: "Wed", deposits: 2000, withdrawals: 9800 },
  { name: "Thu", deposits: 2780, withdrawals: 3908 },
  { name: "Fri", deposits: 1890, withdrawals: 4800 },
  { name: "Sat", deposits: 2390, withdrawals: 3800 },
  { name: "Sun", deposits: 3490, withdrawals: 4300 },
];

const pieData = [
  { name: "Bitcoin", value: 45, color: "#f59e0b" },
  { name: "Ethereum", value: 30, color: "#3b82f6" },
  { name: "Solana", value: 15, color: "#8b5cf6" },
  { name: "Others", value: 10, color: "#94a3b8" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Deep Analytics</h1>
          <p className="text-muted-foreground text-sm">Advanced insights into your trading behavior and performance.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </Button>
          <Button size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <Card className="lg:col-span-2 p-6 border-border/50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold tracking-tight">Flow Analysis</h3>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Deposits vs Withdrawals</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Deposits</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Withdrawals</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
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
                  cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="deposits" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                <Bar dataKey="withdrawals" fill="hsl(var(--muted-foreground))" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart */}
        <Card className="p-6 border-border/50">
          <h3 className="text-lg font-bold tracking-tight mb-1">Asset Allocation</h3>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-8">Portfolio Weighting</p>
          <div className="h-[250px] w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-medium">{item.name}</span>
                </div>
                <span className="text-xs font-black">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Additional Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-border/50 bg-muted/20">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Avg. Trade Size</p>
          <h4 className="text-2xl font-black tracking-tighter">$1,452.20</h4>
          <div className="mt-4 flex items-center gap-2 text-green-500">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs font-bold">+14.2%</span>
          </div>
        </Card>
        <Card className="p-6 border-border/50 bg-muted/20">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Trade Success Rate</p>
          <h4 className="text-2xl font-black tracking-tighter">94.2%</h4>
          <div className="mt-4 flex items-center gap-2 text-green-500">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs font-bold">+2.1%</span>
          </div>
        </Card>
        <Card className="p-6 border-border/50 bg-muted/20">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Staking APY</p>
          <h4 className="text-2xl font-black tracking-tighter">8.42%</h4>
          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <span className="text-xs font-bold">Stable</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

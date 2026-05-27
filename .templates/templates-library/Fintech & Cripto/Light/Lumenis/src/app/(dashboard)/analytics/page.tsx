"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
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
  Legend
} from "recharts";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, ArrowDownRight, Download, Calendar } from "lucide-react";

const volumeData = [
  { day: "Mon", volume: 450000 },
  { day: "Tue", volume: 520000 },
  { day: "Wed", volume: 480000 },
  { day: "Thu", volume: 610000 },
  { day: "Fri", volume: 590000 },
  { day: "Sat", volume: 320000 },
  { day: "Sun", volume: 280000 },
];

const allocationData = [
  { name: "Bitcoin", value: 55, color: "hsl(var(--primary))" },
  { name: "Ethereum", value: 25, color: "hsl(var(--primary) / 0.7)" },
  { name: "Solana", value: 12, color: "hsl(var(--primary) / 0.4)" },
  { name: "Others", value: 8, color: "hsl(var(--primary) / 0.1)" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Analytics</h1>
          <p className="text-muted-foreground text-sm">Deep dive into your portfolio performance and market trends.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest">
            <Download className="w-3.5 h-3.5 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 shadow-none border-border">
          <CardHeader>
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest">Trading Volume (USD)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
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
                  cursor={{ fill: 'hsl(var(--muted) / 0.4)' }}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    border: "1px solid hsl(var(--border))",
                    fontSize: "12px",
                    fontWeight: "600",
                    borderRadius: "4px"
                  }}
                />
                <Bar 
                  dataKey="volume" 
                  fill="hsl(var(--primary))" 
                  radius={[2, 2, 0, 0]} 
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-none border-border">
          <CardHeader>
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest">Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col justify-center">
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
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    border: "1px solid hsl(var(--border))",
                    fontSize: "12px",
                    fontWeight: "600",
                    borderRadius: "4px"
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  align="center"
                  iconType="circle"
                  formatter={(value) => <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Sharpe Ratio", value: "2.45", trend: "+0.12", trendType: "up" },
          { label: "Max Drawdown", value: "-12.4%", trend: "+2.1%", trendType: "down" },
          { label: "Win Rate", value: "64.2%", trend: "+1.5%", trendType: "up" },
          { label: "Profit Factor", value: "1.85", trend: "-0.05", trendType: "down" },
        ].map((metric) => (
          <Card key={metric.label} className="shadow-none border-border">
            <CardContent className="pt-6">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{metric.label}</div>
              <div className="flex items-end justify-between">
                <div className="text-xl font-black tracking-tighter">{metric.value}</div>
                <div className={cn(
                  "text-[10px] font-bold flex items-center gap-0.5 mb-1",
                  metric.trendType === "up" ? "text-emerald-500" : "text-rose-500"
                )}>
                  {metric.trendType === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {metric.trend}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-none border-border">
        <CardHeader>
          <CardTitle className="text-[10px] font-bold uppercase tracking-widest">Performance Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { asset: "Bitcoin", return: "+145.2%", volatility: "Low", score: 85 },
              { asset: "Ethereum", return: "+82.4%", volatility: "Medium", score: 72 },
              { asset: "Solana", return: "+210.5%", volatility: "High", score: 64 },
            ].map((row) => (
              <div key={row.asset} className="flex items-center justify-between p-4 border border-border rounded-md">
                <div className="flex items-center gap-4">
                  <div className="text-sm font-bold tracking-tight">{row.asset}</div>
                  <div className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-muted rounded">Return: {row.return}</div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">Volatility</span>
                    <span className="text-xs font-medium">{row.volatility}</span>
                  </div>
                  <div className="flex flex-col items-end min-w-[100px]">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">Efficiency Score</span>
                    <div className="w-full h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${row.score}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

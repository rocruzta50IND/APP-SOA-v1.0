"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import { cn } from "@/lib/utils";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, Calendar, Filter, ArrowUpRight } from "lucide-react";

const salesData = [
  { name: 'Jan', revenue: 400000, margin: 24000 },
  { name: 'Feb', revenue: 300000, margin: 13980 },
  { name: 'Mar', revenue: 500000, margin: 98000 },
  { name: 'Apr', revenue: 278000, margin: 39080 },
  { name: 'May', revenue: 189000, margin: 48000 },
  { name: 'Jun', revenue: 239000, margin: 38000 },
];

const categoryData = [
  { name: 'Hardware', value: 400 },
  { name: 'Machinery', value: 300 },
  { name: 'Electronics', value: 300 },
  { name: 'Services', value: 200 },
];

const COLORS = ['hsl(var(--primary))', '#3b82f6', '#10b981', '#f59e0b'];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-muted/20">
      <Sidebar />
      <main className="pl-64 pr-8 pt-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
              <p className="text-muted-foreground mt-1">Advanced B2B commerce reporting and insights</p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-border bg-background rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                <Calendar className="size-4" />
                Last 30 Days
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                <Download className="size-4" />
                Download Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 border border-border bg-background rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Revenue vs Margin</h3>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="size-3 bg-primary rounded" />
                    <span className="text-muted-foreground">Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 bg-blue-500 rounded" />
                    <span className="text-muted-foreground">Margin</span>
                  </div>
                </div>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '12px',
                      }}
                    />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="margin" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="border border-border bg-background rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6">Revenue by Category</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 space-y-4">
                {categoryData.map((cat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-sm font-medium">{cat.name}</span>
                    </div>
                    <span className="text-sm font-bold">{cat.value}k</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Conversion Rate", value: "3.2%", trend: "+0.4%" },
              { label: "Avg. Order Value", value: "$4,280", trend: "+$240" },
              { label: "Customer Lifetime Value", value: "$124,500", trend: "+12%" },
              { label: "Cart Abandonment", value: "14.5%", trend: "-2.1%" },
            ].map((stat, i) => (
              <div key={i} className="p-6 border border-border bg-background rounded-2xl shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{stat.label}</p>
                <div className="flex items-baseline justify-between">
                  <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                  <span className="text-xs font-bold text-emerald-500">{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
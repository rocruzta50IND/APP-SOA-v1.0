"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Package, MoreHorizontal, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const data = [
  { name: 'Hub North', stock: 4200, status: 'Healthy' },
  { name: 'Hub South', stock: 2100, status: 'Reordering' },
  { name: 'East Central', stock: 5800, status: 'Healthy' },
  { name: 'West Coast', stock: 1200, status: 'Critical' },
  { name: 'Euro Hub 1', stock: 3400, status: 'Healthy' },
];

export function InventoryPreview() {
  return (
    <section className="py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Live Inventory Tracker
            </h2>
            <p className="text-muted-foreground text-lg">
              Get an instant snapshot of your global stock health. VeloceMarket Pro consolidates 
              data from all warehouses in real-time.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="px-4 py-2 bg-background border border-border rounded-lg flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium">Live Feed</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 border border-border bg-background rounded-3xl p-8 shadow-sm">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
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
                    cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '12px',
                    }}
                  />
                  <Bar dataKey="stock" radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.status === 'Critical' ? '#ef4444' : entry.status === 'Reordering' ? '#f59e0b' : 'hsl(var(--primary))'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="p-4 border border-border bg-background rounded-2xl flex items-center justify-between group hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-muted flex items-center justify-center">
                    <Package className="size-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.stock.toLocaleString()} units available</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={cn(
                    "text-[10px] uppercase font-bold px-2 py-0.5 rounded-full",
                    item.status === 'Critical' ? 'bg-red-500/10 text-red-500' : 
                    item.status === 'Reordering' ? 'bg-amber-500/10 text-amber-500' : 
                    'bg-emerald-500/10 text-emerald-500'
                  )}>
                    {item.status}
                  </span>
                  <ArrowUpRight className="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
            <button className="w-full p-4 text-sm font-medium text-muted-foreground hover:text-foreground border border-dashed border-border rounded-2xl transition-colors">
              View All Warehouses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import { StatCard } from "@/components/ui/StatCard";
import { cn } from "@/lib/utils";
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Star,
  Search,
  Bell
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
  Bar
} from "recharts";

const data = [
  { name: "Jan", sales: 4000, exclusivity: 85 },
  { name: "Feb", sales: 3000, exclusivity: 88 },
  { name: "Mar", sales: 5000, exclusivity: 92 },
  { name: "Apr", sales: 4500, exclusivity: 90 },
  { name: "May", sales: 6000, exclusivity: 94 },
  { name: "Jun", sales: 5500, exclusivity: 96 },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-border flex items-center justify-between px-8 bg-background/50 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4 bg-secondary/50 px-4 py-2 rounded-2xl border border-border/50 w-full max-w-md">
            <Search className="size-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search VIP clients, products, or reports..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative size-10 rounded-full bg-secondary flex items-center justify-center hover:bg-zinc-200 transition-colors">
              <Bell className="size-5" />
              <span className="absolute top-2.5 right-2.5 size-2 bg-primary rounded-full border-2 border-background" />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">Maison Dior</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Administrator</p>
              </div>
              <div className="size-10 rounded-full bg-zinc-900 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Maison+Dior&background=18181b&color=fff" alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="mb-10">
            <h1 className="font-serif text-4xl font-bold mb-2">Visão Geral</h1>
            <p className="text-muted-foreground">O pulso da sua marca em tempo real.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard 
              title="Vendas Totais" 
              value="€1,240,500" 
              change="12.5%" 
              isPositive={true} 
              icon={TrendingUp} 
            />
            <StatCard 
              title="Itens Curados" 
              value="842" 
              change="4.2%" 
              isPositive={true} 
              icon={ShoppingBag} 
            />
            <StatCard 
              title="Novos VIPs" 
              value="128" 
              change="2.1%" 
              isPositive={false} 
              icon={Users} 
            />
            <StatCard 
              title="Exclusivity Score" 
              value="94/100" 
              change="0.5%" 
              isPositive={true} 
              icon={Star} 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Sales Chart */}
            <div className="lg:col-span-2 p-8 rounded-[40px] border border-border bg-background shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-serif text-2xl font-bold">Performance de Vendas</h3>
                <select className="bg-secondary border border-border rounded-xl px-3 py-1 text-xs font-bold outline-none">
                  <option>Últimos 6 meses</option>
                  <option>Este ano</option>
                </select>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#18181b" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#18181b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 12, fill: '#71717a'}} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 12, fill: '#71717a'}}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: '1px solid #e4e4e7', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#18181b" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorSales)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Retention Heatmap / Mini Grid */}
            <div className="p-8 rounded-[40px] border border-border bg-background shadow-sm">
              <h3 className="font-serif text-2xl font-bold mb-6">VIP Retention</h3>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 49 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "aspect-square rounded-[4px] transition-all hover:scale-125 hover:z-10 cursor-pointer",
                      i % 3 === 0 ? "bg-zinc-900" : i % 5 === 0 ? "bg-zinc-500" : i % 2 === 0 ? "bg-zinc-300" : "bg-zinc-100"
                    )}
                  />
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span>Less Active</span>
                  <div className="flex gap-1">
                    <div className="size-2 rounded-full bg-zinc-100" />
                    <div className="size-2 rounded-full bg-zinc-300" />
                    <div className="size-2 rounded-full bg-zinc-500" />
                    <div className="size-2 rounded-full bg-zinc-900" />
                  </div>
                  <span>High Value</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import { Search, Bell, Download, Calendar } from "lucide-react";
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
  Cell
} from "recharts";

const categoryData = [
  { name: "Handbags", value: 45, color: "#18181b" },
  { name: "Watches", value: 25, color: "#3f3f46" },
  { name: "Jewelry", value: 20, color: "#71717a" },
  { name: "Apparel", value: 10, color: "#a1a1aa" },
];

const performanceData = [
  { name: "Mon", current: 4000, previous: 2400 },
  { name: "Tue", current: 3000, previous: 1398 },
  { name: "Wed", current: 2000, previous: 9800 },
  { name: "Thu", current: 2780, previous: 3908 },
  { name: "Fri", current: 1890, previous: 4800 },
  { name: "Sat", current: 2390, previous: 3800 },
  { name: "Sun", current: 3490, previous: 4300 },
];

export default function AnalyticsPage() {
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
              placeholder="Search reports..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full"
            />
          </div>
          
          <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 bg-secondary border border-border px-4 py-2 rounded-xl text-sm font-medium hover:bg-zinc-200 transition-all">
              <Download className="size-4" />
              Exportar
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="font-serif text-4xl font-bold mb-2">Analytics Profundo</h1>
              <p className="text-muted-foreground">Métricas de retenção e inteligência de mercado.</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-secondary border border-border px-4 py-2 rounded-xl text-sm font-medium">
                <Calendar className="size-4" />
                Maio 2026
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Revenue Bar Chart */}
            <div className="lg:col-span-2 p-8 rounded-[40px] border border-border bg-background shadow-sm">
              <h3 className="font-serif text-2xl font-bold mb-8">Receita por Categoria</h3>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
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
                      cursor={{fill: '#f4f4f5'}}
                      contentStyle={{ borderRadius: '16px', border: '1px solid #e4e4e7', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="current" fill="#18181b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="previous" fill="#e4e4e7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Distribution Pie Chart */}
            <div className="p-8 rounded-[40px] border border-border bg-background shadow-sm">
              <h3 className="font-serif text-2xl font-bold mb-8">Market Share</h3>
              <div className="h-[250px] w-full mb-8">
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
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-bold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Exclusivity Score Widget Re-use or similar */}
          <div className="p-8 rounded-[40px] border border-primary bg-primary text-primary-foreground shadow-2xl">
             <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                   <h3 className="font-serif text-3xl font-bold mb-2">Exclusivity Score: Elite Tier</h3>
                   <p className="text-primary-foreground/70 max-w-xl">
                      Sua marca mantém um nível de raridade de 94%. Recomendamos limitar a próxima coleção "Riviera" a apenas 50 unidades globalmente para manter o prestígio.
                   </p>
                </div>
                <div className="text-center">
                   <div className="text-6xl font-bold mb-1">94%</div>
                   <div className="text-xs uppercase tracking-widest font-bold text-primary-foreground/50">Market Rarity Index</div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}

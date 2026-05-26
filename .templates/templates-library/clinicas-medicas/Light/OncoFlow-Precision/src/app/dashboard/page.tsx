"use client";

import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { 
  Users2, 
  Clock, 
  FlaskConical, 
  TrendingUp, 
  AlertCircle,
  MoreVertical,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const chartData = [
  { name: "Seg", valor: 4000 },
  { name: "Ter", valor: 3000 },
  { name: "Qua", valor: 2000 },
  { name: "Qui", valor: 2780 },
  { name: "Sex", valor: 1890 },
  { name: "Sáb", valor: 2390 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header title="Dashboard Principal" />
        
        <div className="p-8 space-y-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Pacientes Ativos", value: "1,284", change: "+12%", icon: Users2, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Infusões Hoje", value: "42", change: "+5", icon: Clock, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Estoque Crítico", value: "08", change: "-2", icon: FlaskConical, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Faturamento Mes", value: "R$ 420k", change: "+8.2%", icon: TrendingUp, color: "text-slate-900", bg: "bg-slate-100" },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className={cn("p-2 rounded-xl", stat.bg)}>
                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                  </div>
                  <span className={cn("text-xs font-bold px-2 py-1 rounded-full", 
                    stat.change.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  )}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Agenda de Infusões - spans 8 columns */}
            <div className="md:col-span-8 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Agenda de Infusões</h3>
                  <p className="text-xs text-slate-400">Próximos procedimentos agendados para hoje.</p>
                </div>
                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
                   <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Mariana Silva", time: "09:30", drug: "Trastuzumabe", status: "Em Preparo", color: "bg-blue-500" },
                  { name: "Roberto Almeida", time: "10:15", drug: "Rituximabe", status: "Aguardando", color: "bg-slate-300" },
                  { name: "Lúcia Santos", time: "11:00", drug: "Pembrolizumabe", status: "Confirmado", color: "bg-emerald-500" },
                  { name: "Carlos Ferreira", time: "11:45", drug: "Doxorrubicina", status: "Aguardando", color: "bg-slate-300" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-emerald-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600">
                        {item.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.drug} • {item.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="text-right mr-4">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Status</span>
                         <div className="flex items-center gap-1.5 justify-end">
                           <div className={cn("w-1.5 h-1.5 rounded-full", item.color)} />
                           <span className="text-xs font-bold text-slate-700">{item.status}</span>
                         </div>
                       </div>
                       <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 group-hover:text-emerald-600 group-hover:border-emerald-200 transition-all">
                         <ChevronRight className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alertas Críticos - spans 4 columns */}
            <div className="md:col-span-4 p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px]" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <AlertCircle className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-bold">Alertas Críticos</h3>
                </div>

                <div className="space-y-4">
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Farmácia</p>
                      <p className="text-sm font-medium mb-1">Nivolumabe 100mg com estoque abaixo do mínimo (2 frascos).</p>
                      <p className="text-[10px] text-slate-500">Há 15 minutos</p>
                   </div>
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">Clínico</p>
                      <p className="text-sm font-medium mb-1">Exames de Mariana Silva (Protocolo 42) pendentes de revisão.</p>
                      <p className="text-[10px] text-slate-500">Há 2 horas</p>
                   </div>
                </div>

                <button className="w-full mt-8 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors">
                   Ver Todos os Alertas
                </button>
              </div>
            </div>

            {/* Performance Financeira - spans 7 columns */}
            <div className="md:col-span-7 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
               <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Performance da Unidade</h3>
                    <p className="text-xs text-slate-400">Receita bruta vs meta operacional.</p>
                  </div>
                  <div className="flex gap-2">
                     <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-100 text-xs font-bold text-slate-600">
                        Este Mês
                     </div>
                  </div>
               </div>

               <div className="h-[250px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={chartData}>
                     <defs>
                       <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                         <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                     <YAxis hide />
                     <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#059669', fontWeight: 'bold' }}
                     />
                     <Area type="monotone" dataKey="valor" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValor)" />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
            </div>

            {/* Estoque de Drogas - spans 5 columns */}
            <div className="md:col-span-5 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Estoque Prioritário</h3>
                  <button className="text-emerald-600 text-xs font-bold hover:underline">Ver Inventário</button>
               </div>
               
               <div className="space-y-6">
                 {[
                   { name: "Pembrolizumabe", stock: 85, color: "bg-emerald-500" },
                   { name: "Trastuzumabe", stock: 42, color: "bg-blue-500" },
                   { name: "Rituximabe", stock: 15, color: "bg-amber-500" },
                   { name: "Doxorrubicina", stock: 68, color: "bg-emerald-500" },
                 ].map((drug, i) => (
                   <div key={i}>
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-slate-700">{drug.name}</span>
                        <span className="text-xs font-bold text-slate-400">{drug.stock}%</span>
                     </div>
                     <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full transition-all duration-500", drug.color)} style={{ width: `${drug.stock}%` }} />
                     </div>
                   </div>
                 ))}
               </div>

               <div className="mt-8 p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                     <ArrowUpRight className="w-5 h-5 text-slate-400" />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-slate-900">Pedido Sugerido</p>
                     <p className="text-[10px] text-slate-500">Com base no consumo semanal.</p>
                   </div>
                 </div>
                 <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold">Gerar</button>
               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

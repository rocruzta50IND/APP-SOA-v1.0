"use client";

import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { BarChart3, Download, TrendingUp, PieChart } from "lucide-react";

export default function RelatoriosPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header title="Analytics Clínico" />
        <div className="p-8">
           <div className="flex justify-between items-center mb-8">
              <div>
                 <h2 className="text-lg font-bold text-slate-900">Relatórios de Performance</h2>
                 <p className="text-sm text-slate-500">Dados consolidados da unidade.</p>
              </div>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold">
                 <Download className="w-4 h-4" /> Exportar Dados
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Volume de Infusões / Mês", icon: TrendingUp },
                { title: "Distribuição por Patologia", icon: PieChart },
                { title: "Glosas por Convênio", icon: BarChart3 },
                { title: "Ticket Médio por Protocolo", icon: TrendingUp },
              ].map((r, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center min-h-[300px]">
                   <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
                      <r.icon className="w-8 h-8 text-slate-300" />
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 mb-2">{r.title}</h3>
                   <p className="text-sm text-slate-400 max-w-xs mb-8">Visualização detalhada do relatório de {r.title.toLowerCase()}.</p>
                   <button className="text-emerald-600 font-bold text-sm hover:underline">Abrir Relatório</button>
                </div>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
}

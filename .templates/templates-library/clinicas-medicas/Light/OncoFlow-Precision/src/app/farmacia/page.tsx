"use client";

import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Search, Package, AlertTriangle, ArrowDown } from "lucide-react";

export default function FarmaciaPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header title="Farmácia Oncológica" />
        <div className="p-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-center gap-4">
                 <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                    <AlertTriangle className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-2xl font-black text-slate-900">08</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Itens Críticos</p>
                 </div>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-center gap-4">
                 <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                    <Package className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-2xl font-black text-slate-900">142</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Itens em Estoque</p>
                 </div>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-600 text-white flex items-center justify-between">
                 <div>
                    <p className="text-sm font-bold">Gerar Inventário</p>
                    <p className="text-xs opacity-80">Relatório completo de drogas.</p>
                 </div>
                 <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                    <ArrowDown className="w-5 h-5" />
                 </button>
              </div>
           </div>

           <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="font-bold text-slate-900">Controle de Quimioterápicos</h3>
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Buscar droga..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                 </div>
              </div>
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/50">
                       <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Droga / Fabricante</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dosagem</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Qtd. Atual</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estabilidade</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {[
                      { name: "Pembrolizumabe", dose: "100mg / 4ml", qty: "12 frascos", status: "Estável" },
                      { name: "Trastuzumabe", dose: "440mg", qty: "05 frascos", status: "Alerta" },
                      { name: "Nivolumabe", dose: "40mg / 4ml", qty: "02 frascos", status: "Crítico" },
                      { name: "Rituximabe", dose: "500mg / 50ml", qty: "08 frascos", status: "Estável" },
                    ].map((d, i) => (
                      <tr key={i}>
                         <td className="px-6 py-4 text-sm font-bold text-slate-900">{d.name}</td>
                         <td className="px-6 py-4 text-sm text-slate-500 font-medium">{d.dose}</td>
                         <td className="px-6 py-4 text-sm font-black text-slate-900">{d.qty}</td>
                         <td className="px-6 py-4">
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${
                               d.status === 'Crítico' ? 'text-red-500' : 
                               d.status === 'Alerta' ? 'text-amber-500' : 'text-emerald-500'
                            }`}>{d.status}</span>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </main>
    </div>
  );
}

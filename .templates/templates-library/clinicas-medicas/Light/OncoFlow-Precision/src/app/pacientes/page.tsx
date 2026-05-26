"use client";

import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Search, Filter, MoreHorizontal, UserPlus } from "lucide-react";

export default function PacientesPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header title="Gestão de Pacientes" />
        
        <div className="p-8">
           <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4 flex-1 max-w-xl">
                 <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Filtrar por nome ou CPF..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all" />
                 </div>
                 <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                    <Filter className="w-4 h-4" />
                    Filtros
                 </button>
              </div>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/10">
                 <UserPlus className="w-4 h-4" />
                 Novo Paciente
              </button>
           </div>

           <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                 <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                       <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Paciente</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status Clínico</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Última Visita</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Próxima Infusão</th>
                       <th className="px-6 py-4"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {[
                      { name: "Mariana Silva", age: "45 anos", status: "Em Tratamento", last: "Ontem", next: "Hoje, 09:30" },
                      { name: "Roberto Almeida", age: "62 anos", status: "Estável", last: "Há 3 dias", next: "Hoje, 10:15" },
                      { name: "Lúcia Santos", age: "51 anos", status: "Crítico", last: "Hoje", next: "Hoje, 11:00" },
                      { name: "Carlos Ferreira", age: "68 anos", status: "Remissão", last: "Há 1 semana", next: "Agendado (12/06)" },
                      { name: "Ana Beatriz", age: "39 anos", status: "Triagem", last: "Novo", next: "Pendente" },
                    ].map((p, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                               <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                                  {p.name.split(' ').map(n => n[0]).join('')}
                               </div>
                               <div>
                                  <p className="text-sm font-bold text-slate-900">{p.name}</p>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">{p.age}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                               p.status === 'Crítico' ? 'bg-red-50 text-red-600' :
                               p.status === 'Em Tratamento' ? 'bg-blue-50 text-blue-600' :
                               'bg-emerald-50 text-emerald-600'
                            }`}>
                               {p.status}
                            </span>
                         </td>
                         <td className="px-6 py-4 text-sm text-slate-600 font-medium">{p.last}</td>
                         <td className="px-6 py-4 text-sm text-slate-900 font-bold">{p.next}</td>
                         <td className="px-6 py-4 text-right">
                            <button className="p-2 text-slate-400 hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-all">
                               <MoreHorizontal className="w-5 h-5" />
                            </button>
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

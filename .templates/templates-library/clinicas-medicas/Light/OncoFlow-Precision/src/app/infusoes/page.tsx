"use client";

import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Calendar, Plus, Clock, MapPin } from "lucide-react";

export default function InfusoesPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Header title="Gestão de Infusões" />
        <div className="p-8">
           <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold text-slate-900">Mapa de Poltronas/Leitos</h2>
              <div className="flex gap-3">
                 <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600">
                    <Calendar className="w-4 h-4" /> 18 de Maio, 2026
                 </button>
                 <button className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all">
                    <Plus className="w-4 h-4" /> Novo Agendamento
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`p-4 rounded-2xl border bg-white transition-all cursor-pointer hover:shadow-md ${i < 4 ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-100'}`}>
                   <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">P-{i+1}</span>
                      <div className={`w-2 h-2 rounded-full ${i < 4 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                   </div>
                   <div className="h-12 flex flex-col justify-center">
                      {i < 4 ? (
                        <>
                          <p className="text-xs font-bold text-slate-900 truncate">Paciente {i+1}</p>
                          <p className="text-[10px] text-emerald-600 font-bold uppercase">Em Curso</p>
                        </>
                      ) : (
                        <p className="text-xs font-bold text-slate-300">Livre</p>
                      )}
                   </div>
                </div>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
}

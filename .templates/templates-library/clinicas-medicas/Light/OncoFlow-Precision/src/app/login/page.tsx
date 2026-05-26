"use client";

import React from "react";
import Link from "next/link";
import { Activity, ArrowLeft, ShieldCheck, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side: Form */}
      <div className="w-full md:w-[450px] p-8 md:p-16 flex flex-col justify-between relative z-10 bg-white">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-12 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Voltar para o site</span>
          </Link>

          <div className="mb-10">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center mb-6">
              <Activity className="text-white w-7 h-7" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Bem-vindo ao OncoFlow</h1>
            <p className="text-slate-500">Insira suas credenciais para acessar a plataforma.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">E-mail Institucional</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="nome@clinica.com.br"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Senha</label>
                <Link href="#" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">Esqueceu a senha?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <Link href="/dashboard" className="block w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-center hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
              Acessar Plataforma
            </Link>
          </form>
        </div>

        <div className="pt-12 border-t border-slate-100 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <p className="text-xs text-slate-400 leading-tight">
            Ambiente seguro com criptografia de ponta a ponta e conformidade com a LGPD.
          </p>
        </div>
      </div>

      {/* Right Side: Graphic/Visual */}
      <div className="hidden md:flex flex-1 bg-slate-950 relative overflow-hidden items-center justify-center p-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-blue-600/20" />
        
        {/* Abstract Grid/Pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #334155 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="relative z-10 max-w-lg text-center">
          <div className="inline-block p-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 mb-8">
            <div className="grid grid-cols-3 gap-2">
               {[...Array(9)].map((_, i) => (
                 <div key={i} className={`w-12 h-12 rounded-lg ${i === 4 ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-white/10'}`} />
               ))}
            </div>
          </div>
          <h2 className="text-4xl font-black text-white mb-6 leading-tight">
            Tecnologia que impulsiona o <span className="text-emerald-400">cuidado</span>.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            "O OncoFlow transformou nossa operação. A precisão na gestão de infusões elevou nossa segurança clínica a um novo patamar."
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/10" />
            <div className="text-left">
              <p className="text-sm font-bold text-white">Dr. Ricardo Menezes</p>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Diretor Clínico, Centro OncoLife</p>
            </div>
          </div>
        </div>

        {/* Decorative Blobs */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full" />
      </div>
    </main>
  );
}

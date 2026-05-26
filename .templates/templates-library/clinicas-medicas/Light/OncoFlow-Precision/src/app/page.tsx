"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Activity, 
  ShieldCheck, 
  FlaskConical, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2,
  Stethoscope,
  Users2,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
          <Activity className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900">OncoFlow <span className="text-emerald-600">Precision</span></span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <Link href="#features" className="hover:text-emerald-600 transition-colors">Funcionalidades</Link>
        <Link href="#solutions" className="hover:text-emerald-600 transition-colors">Soluções</Link>
        <Link href="#about" className="hover:text-emerald-600 transition-colors">Sobre</Link>
        <Link href="/login" className="px-5 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors">
          Entrar no Sistema
        </Link>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative min-h-screen flex flex-col justify-center items-center px-4 py-32 overflow-hidden bg-slate-50">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
    
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">Avançado & Seguro</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[1.1] mb-8 pb-4 bg-clip-text text-transparent bg-gradient-to-b from-slate-950 via-slate-900 to-slate-700">
          O Futuro da <span className="text-emerald-600">Oncologia</span> é de Precisão.
        </h1>
        
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Plataforma integrada para gestão de infusões, protocolos oncológicos e analytics clínico de alta performance. Eficiência operacional para quem cuida da vida.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login" className="group px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-2">
            Começar Agora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-all">
            Ver Demonstração
          </button>
        </div>
      </motion.div>
    </div>
    
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="mt-20 w-full max-w-6xl px-4 relative z-10"
    >
      <div className="relative rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden aspect-video">
        <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
           {/* Placeholder for App Preview */}
           <div className="text-slate-400 flex flex-col items-center gap-3">
             <BarChart3 className="w-12 h-12" />
             <span className="font-medium">Dashboard Preview</span>
           </div>
        </div>
        <div className="absolute top-0 left-0 right-0 h-10 border-b border-slate-100 bg-slate-50/50 flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
      </div>
    </motion.div>
  </section>
);

const Features = () => (
  <section id="features" className="scroll-mt-16 min-h-screen flex flex-col justify-center py-32 bg-white px-4">
    <div className="max-w-7xl mx-auto w-full">
      <div className="text-center mb-20">
        <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">Gestão Ponta a Ponta</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-slate-900 pb-2">Especializado em Oncologia</h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: Users2,
            title: "Prontuário de Precisão",
            desc: "Histórico detalhado, estadiamento TNM, e acompanhamento clínico dinâmico para decisões personalizadas."
          },
          {
            icon: Clock,
            title: "Gestão de Infusões",
            desc: "Agendamento inteligente de leitos e poltronas, sincronizado com a farmácia e protocolos de quimioterapia."
          },
          {
            icon: FlaskConical,
            title: "Farmácia Oncológica",
            desc: "Controle rigoroso de estoque, estabilidade de drogas e manipulação com rastreabilidade total."
          }
        ].map((f, i) => (
          <div key={i} className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-emerald-200 transition-all hover:shadow-lg group">
            <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <f.icon className="w-6 h-6 text-emerald-600" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h4>
            <p className="text-slate-600 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Stats = () => (
  <section className="min-h-screen flex flex-col justify-center py-32 bg-slate-900 text-white overflow-hidden relative px-4">
    <div className="absolute top-0 right-0 w-[50%] h-full bg-emerald-600/10 blur-[100px]" />
    <div className="max-w-7xl mx-auto w-full relative z-10">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight pb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-400">
            Insights Clínicos em Tempo Real.
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Nossa plataforma transforma dados complexos em decisões claras. Monitore a performance da sua clínica e a evolução dos pacientes com dashboards intuitivos.
          </p>
          <div className="space-y-4">
            {["Rastreabilidade 100% Digital", "Redução de Glosas em 40%", "Otimização de Agenda em 30%"].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="font-medium text-slate-200">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-emerald-400 mb-2">99.9%</span>
            <span className="text-slate-400 text-xs uppercase tracking-widest text-center">Disponibilidade</span>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl mt-8 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-emerald-400 mb-2">+150k</span>
            <span className="text-slate-400 text-xs uppercase tracking-widest text-center">Infusões/Ano</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-slate-200 bg-white">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center">
          <Activity className="text-white w-4 h-4" />
        </div>
        <span className="font-bold text-lg text-slate-900 uppercase tracking-tighter">OncoFlow Precision</span>
      </div>
      <p className="text-slate-500 text-sm">© 2026 OncoFlow Precision. Todos os direitos reservados.</p>
      <div className="flex gap-6 text-slate-400">
         <span className="hover:text-emerald-600 cursor-pointer transition-colors">Twitter</span>
         <span className="hover:text-emerald-600 cursor-pointer transition-colors">LinkedIn</span>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <main className="min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <section id="solutions" className="scroll-mt-16 min-h-screen flex flex-col justify-center py-32 bg-slate-50 px-4">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Pronto para elevar o padrão da sua clínica?</h2>
          <p className="text-slate-600 mb-10 text-lg">Agende uma conversa com nossos especialistas em oncologia digital.</p>
          <Link href="/login" className="inline-flex px-10 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-emerald-500/20 transition-all">
            Solicitar Acesso
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}


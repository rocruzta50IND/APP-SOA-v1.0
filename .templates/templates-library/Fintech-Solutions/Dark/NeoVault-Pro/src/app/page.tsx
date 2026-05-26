
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Vault, 
  Shield, 
  Zap, 
  Globe, 
  BarChart3, 
  ChevronRight,
  CheckCircle2,
  Lock,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full z-0 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full z-0 pointer-events-none" />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Vault className="text-white size-6" />
            </div>
            <span className="font-bold text-2xl tracking-tighter">NeoVault <span className="text-blue-500">Pro</span></span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 text-sm font-semibold text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Infrastructure</a>
            <a href="#security" className="hover:text-white transition-colors">Security Protocol</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">
              Terminal Login
            </Link>
            <Link 
              href="/login" 
              className="bg-white text-zinc-950 px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:bg-zinc-200 active:scale-95 shadow-xl shadow-white/5"
            >
              Request Access
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 z-10">
        <div className="max-w-7xl mx-auto w-full text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-bold tracking-widest uppercase mb-12 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            V.2.0: Quantum-Safe Protocol Now Live
          </div>
          <h1 className="text-7xl md:text-[120px] font-black tracking-tighter leading-[0.95] mb-8 pb-4 bg-gradient-to-b from-white via-white to-zinc-600 bg-clip-text text-transparent">
            Institutional <br />
            Digital Assets.
          </h1>
          <p className="text-zinc-400 text-xl md:text-2xl max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
            The high-performance infrastructure for digital asset custody, real-time settlement, and algorithmic liquidity management.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/login" 
              className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20 group"
            >
              Start Onboarding <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto px-10 py-5 rounded-full font-bold text-lg border border-zinc-800 hover:bg-zinc-900 transition-all backdrop-blur-sm">
              View Architecture
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
          <ChevronDown className="size-8" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative min-h-screen flex flex-col justify-center py-32 px-8 border-t border-zinc-900/50">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8">
                Built for <br />
                <span className="text-blue-500">Uncompromising</span> <br />
                Reliability.
              </h2>
              <p className="text-zinc-500 text-lg mb-12 leading-relaxed">
                Our proprietary stack eliminates the latency between traditional finance and decentralized markets, providing sub-second settlement with military-grade safety.
              </p>
              <div className="space-y-6">
                {[
                  'Multi-Signature MPC Architecture',
                  'Atomic Real-time Settlement',
                  'Predictive Liquidity Forecasting',
                  'Regulatory-Grade Compliance Engine'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                      <CheckCircle2 className="size-3 text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-zinc-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Zap, title: 'Speed', val: '250ms', label: 'Avg Latency' },
                { icon: Shield, title: 'Safety', val: '100%', label: 'Cold Storage' },
                { icon: Globe, title: 'Reach', val: '150+', label: 'Countries' },
                { icon: BarChart3, title: 'Volume', val: '$2.8B', label: 'Assets Managed' },
              ].map((stat, i) => (
                <div key={i} className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-3xl backdrop-blur-sm hover:border-blue-500/30 transition-all">
                  <stat.icon className="size-6 text-blue-500 mb-6" />
                  <p className="text-4xl font-bold tracking-tighter mb-1">{stat.val}</p>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="min-h-screen flex flex-col justify-center py-32 px-8 bg-zinc-900/20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">Scalable Plans.</h2>
            <p className="text-zinc-500 text-lg">Choose the tier that aligns with your institutional objectives.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { name: 'Starter Node', price: '$1.5k', features: ['Up to $50M AUC', 'Standard API', 'Audit Logs'], active: false },
              { name: 'Core Terminal', price: '$4.9k', features: ['Up to $500M AUC', 'Full Analytics', 'Priority Clearing', '24/7 Desk'], active: true },
              { name: 'Global Engine', price: 'Custom', features: ['Unlimited AUC', 'Dedicated Cloud', 'Custom MPC', 'White-glove Service'], active: false },
            ].map((plan, i) => (
              <div key={i} className={`group p-10 rounded-[2.5rem] border transition-all duration-500 ${plan.active ? 'border-blue-600 bg-blue-600/5 ring-4 ring-blue-600/10' : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'} flex flex-col`}>
                <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-10">
                  <span className="text-5xl font-bold tracking-tighter">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-zinc-500 text-sm ml-2">/month</span>}
                </div>
                <div className="space-y-6 mb-12 flex-1">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                      <CheckCircle2 className={`size-4 ${plan.active ? 'text-blue-500' : 'text-zinc-700'}`} /> {f}
                    </div>
                  ))}
                </div>
                <button className={`w-full py-5 rounded-2xl font-bold text-sm transition-all ${plan.active ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20' : 'bg-zinc-800 hover:bg-zinc-700 text-white active:scale-95'}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-zinc-900 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Vault className="text-blue-500 size-6" />
            <span className="font-bold text-xl tracking-tighter text-white">NeoVault <span className="text-blue-500">Pro</span></span>
          </div>
          <div className="flex gap-10 text-zinc-500 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white">Security</a>
            <a href="#" className="hover:text-white">Compliance</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Status</a>
          </div>
          <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.2em]">© 2026 NEOVAULT PRO LTD.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

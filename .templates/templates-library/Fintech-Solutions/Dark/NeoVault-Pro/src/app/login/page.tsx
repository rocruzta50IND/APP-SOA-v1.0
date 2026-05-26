
"use client";

import React from 'react';
import Link from 'next/link';
import { Vault, Lock, Mail, ArrowRight, ShieldCheck, Globe, Zap } from 'lucide-react';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex overflow-hidden selection:bg-blue-500/30">
      {/* Left Side: Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-12 md:px-24 z-10 bg-zinc-950">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-16 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
              <Vault className="text-white size-6" />
            </div>
            <span className="font-bold text-2xl tracking-tighter text-white">NeoVault <span className="text-blue-500">Pro</span></span>
          </Link>

          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tighter text-white mb-3">Terminal Access.</h1>
            <p className="text-zinc-500 font-medium">Please enter your institutional credentials to continue.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Work Identity</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="email" 
                  placeholder="name@institution.com"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Security Protocol</label>
                <button className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors">Reset Key</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••••••"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input type="checkbox" className="w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-blue-600 focus:ring-blue-500/20" />
              <span className="text-xs text-zinc-500 font-medium">Keep session active for 12 hours</span>
            </div>

            <Link 
              href="/dashboard"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] group"
            >
              Initialize Session <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="mt-12 text-center text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">
            Secure Gateway v.2.4.0 • Level 4 Encryption
          </p>
        </div>
      </div>

      {/* Right Side: Visual Panel */}
      <div className="hidden lg:flex flex-1 relative bg-zinc-900 items-center justify-center p-20">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-zinc-900 to-zinc-950" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent)]" />
        
        {/* Glassmorphic Card */}
        <div className="relative w-full max-w-xl aspect-square z-10">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden">
            <div className="p-12 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <ShieldCheck className="text-blue-400 size-6" />
                </div>
                <div>
                  <p className="text-white font-bold tracking-tight">Institutional Trust</p>
                  <p className="text-zinc-500 text-xs font-medium">Verified Goldman Sachs Node</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <blockquote className="text-3xl font-bold tracking-tighter text-white leading-tight mb-8">
                  "NeoVault Pro has revolutionized how we manage digital settlement latency. It's the only platform that truly understands institutional requirements."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700" />
                  <div>
                    <p className="text-sm font-bold text-white tracking-tight">Alexander Sterling</p>
                    <p className="text-xs text-zinc-500 font-medium">Head of Digital Assets, Sterling Capital</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto grid grid-cols-3 gap-6 pt-12 border-t border-white/5">
                <div className="text-center">
                  <Zap className="size-4 text-blue-400 mx-auto mb-2" />
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Low Latency</p>
                </div>
                <div className="text-center">
                  <Globe className="size-4 text-blue-400 mx-auto mb-2" />
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Global Nodes</p>
                </div>
                <div className="text-center">
                  <Lock className="size-4 text-blue-400 mx-auto mb-2" />
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">MPC Custody</p>
                </div>
              </div>
            </div>
          </div>

          {/* Abstract Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-600/10 blur-[80px] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

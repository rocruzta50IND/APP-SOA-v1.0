"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ArrowRight, ShieldCheck, Globe2, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="ambient-glow w-[600px] h-[600px] -top-64 -left-64 opacity-20" />
      <div className="ambient-glow w-[500px] h-[500px] -bottom-40 -right-40 opacity-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="w-full max-w-2xl z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter">AuraCommerce</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Scale your enterprise</h1>
          <p className="text-muted-foreground mt-2">Join the next generation of commerce orchestration.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <div className="glass-card p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground ml-1">
                    First Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="John"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground ml-1">
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground ml-1">
                    Work Email
                  </label>
                  <input 
                    type="email" 
                    placeholder="john@enterprise.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground ml-1">
                    Company Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Acme Corp"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground ml-1">
                    Estimated Annual GMV
                  </label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none text-muted-foreground">
                    <option>$10M - $50M</option>
                    <option>$50M - $250M</option>
                    <option>$250M - $1B</option>
                    <option>$1B+</option>
                  </select>
                </div>
              </div>

              <Link 
                href="/dashboard"
                className="premium-button w-full flex items-center justify-center gap-2 py-3 mb-4 group"
              >
                Create Enterprise Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-[10px] text-center text-muted-foreground leading-relaxed uppercase tracking-wider">
                By clicking create account, you agree to our <br />
                <span className="text-white">Service Level Agreement</span> and <span className="text-white">Privacy Policy</span>.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="glass-card p-6 border-primary/20">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-bold text-sm mb-2 uppercase tracking-tight">Enterprise Security</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Full SOC2 compliance and end-to-end encryption for all transaction data.
              </p>
            </div>
            <div className="glass-card p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Globe2 className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-bold text-sm mb-2 uppercase tracking-tight">Global Infrastructure</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Localized edge computing in over 120 regions for sub-100ms latency.
              </p>
            </div>
            <div className="glass-card p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-bold text-sm mb-2 uppercase tracking-tight">Multi-Entity Support</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Unified management for complex corporate structures and multi-brand portfolios.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

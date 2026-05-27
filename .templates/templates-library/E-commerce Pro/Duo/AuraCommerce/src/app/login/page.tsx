"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Terminal, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="ambient-glow w-[600px] h-[600px] -top-64 -right-64 opacity-20" />
      <div className="ambient-glow w-[500px] h-[500px] -bottom-40 -left-40 opacity-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter">AuraCommerce</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your enterprise orchestration console.</p>
        </div>

        <div className="glass-card p-8">
          <div className="space-y-4 mb-6">
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground ml-1">
                Corporate Email
              </label>
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground ml-1">
                  Password
                </label>
                <Link href="#" className="text-[10px] font-bold tracking-widest uppercase text-primary hover:underline">
                  Forgot?
                </Link>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <Link 
            href="/dashboard"
            className="premium-button w-full flex items-center justify-center gap-2 py-3 mb-6 group"
          >
            Authenticate
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em]">
              <span className="bg-[#0b0c10] px-3 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 border border-white/10 rounded-xl py-2.5 text-sm hover:bg-white/5 transition-colors">
              <Globe className="w-4 h-4" />
              SSO
            </button>
            <button className="flex items-center justify-center gap-2 border border-white/10 rounded-xl py-2.5 text-sm hover:bg-white/5 transition-colors">
              <Terminal className="w-4 h-4" />
              Github
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-bold hover:underline">
            Request access
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

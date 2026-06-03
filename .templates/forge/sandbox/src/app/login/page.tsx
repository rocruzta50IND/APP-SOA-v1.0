"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Github, Mail, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const transition = { type: "spring", stiffness: 400, damping: 30 } as const;

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-20" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        className="w-full max-w-[440px] z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 group mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] group-hover:rotate-12 transition-transform">
              <Sparkles size={24} />
            </div>
          </Link>
          <h1 className="text-3xl font-bold tracking-tighter mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Log in to your VividTalent workspace</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1" htmlFor="email">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-muted-foreground" htmlFor="password">Password</label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <Link
              href="/dashboard"
              className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all group mt-6"
            >
              Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest text-muted-foreground">
              <span className="bg-[#09090b] px-4">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.224 1.224-3.136 2.552-6.712 2.552-5.44 0-9.76-4.4-9.76-9.84s4.32-9.84 9.76-9.84c2.968 0 5.216 1.16 6.84 2.72l2.328-2.328C18.816 1.136 16.032 0 12.48 0 5.864 0 .416 5.416.416 12s5.448 12 12.064 12c3.568 0 6.272-1.176 8.528-3.52 2.312-2.312 3.032-5.552 3.032-8.12 0-.768-.064-1.488-.184-2.144h-11.416z"/></svg>
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              <span className="text-sm font-medium">GitHub</span>
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-bold hover:underline">Start free trial</Link>
        </p>
      </motion.div>

      {/* Footer Links */}
      <div className="absolute bottom-8 w-full flex justify-center gap-6 text-xs text-muted-foreground font-mono">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Support</a>
      </div>
    </div>
  );
}

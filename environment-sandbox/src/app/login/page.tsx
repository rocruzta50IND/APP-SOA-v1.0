"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background font-sans antialiased">
      {/* Left Panel: Visual/Brand (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between p-12 border-r border-border bg-muted/10 relative overflow-hidden">
        <div className="z-10">
          <Link href="/" className="flex items-center gap-2 font-black tracking-tighter text-2xl uppercase italic mb-12">
            <Zap className="h-6 w-6 fill-primary text-primary" />
            TalentFlow
          </Link>
          
          <div className="max-w-md space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none mb-6">
                Enterprise <span className="text-muted-foreground">security</span> as standard.
              </h1>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Experience the surgical precision of the world&apos;s most advanced HR platform. Secure, autonomous, and built for scale.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 pt-12">
              {[
                { label: "Uptime", value: "99.99%", desc: "SLA Guaranteed" },
                { label: "Security", value: "SOC2", desc: "Type II Certified" },
                { label: "Global", value: "120+", desc: "Countries Supported" }
              ].map((stat, i) => (
                <div key={i} className="p-4 border border-border bg-background rounded-md">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black tracking-tighter">{stat.value}</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="z-10 flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <p>© 2026 TalentFlow</p>
          <Link href="#" className="hover:text-foreground">Privacy</Link>
          <Link href="#" className="hover:text-foreground">Terms</Link>
        </div>

        {/* Subtle Grid Background */}
        <div className="absolute inset-0 -z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Right Panel: Auth Form */}
      <div className="flex flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-[400px] space-y-8">
          <div className="lg:hidden flex justify-center mb-12">
            <Link href="/" className="flex items-center gap-2 font-black tracking-tighter text-2xl uppercase italic">
              <Zap className="h-6 w-6 fill-primary text-primary" />
              TalentFlow
            </Link>
          </div>

          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase italic mb-2">Welcome Back</h2>
            <p className="text-sm font-medium text-muted-foreground">Enter your credentials to access your workspace.</p>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-3 border border-border bg-background hover:bg-muted/50 rounded-md py-3 text-xs font-bold uppercase tracking-widest transition-colors">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 border border-border bg-background hover:bg-muted/50 rounded-md py-3 text-xs font-bold uppercase tracking-widest transition-colors">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              GitHub
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
              <span className="bg-background px-4 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Work Email</label>
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Password</label>
                <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">Forgot?</Link>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <Link 
              href="/dashboard"
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:opacity-90 rounded-md py-4 text-xs font-bold uppercase tracking-widest transition-opacity"
            >
              Sign In <ArrowRight className="h-4 w-4" />
            </Link>
          </form>

          <p className="text-center text-xs font-medium text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-bold uppercase tracking-widest hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

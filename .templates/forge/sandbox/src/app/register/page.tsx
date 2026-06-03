"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Github, Mail, Lock, User, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const transition = { type: "spring", stiffness: 400, damping: 30 } as const;

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background">
      {/* Background Orbs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-20" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        className="w-full max-w-[480px] z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 group mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] group-hover:rotate-12 transition-transform">
              <Sparkles size={24} />
            </div>
          </Link>
          <h1 className="text-3xl font-bold tracking-tighter mb-2">Create your account</h1>
          <p className="text-muted-foreground">Start your 14-day free trial. No credit card required.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1" htmlFor="first-name">First Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    id="first-name"
                    type="text"
                    placeholder="Jane"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1" htmlFor="last-name">Last Name</label>
                <input
                  id="last-name"
                  type="text"
                  placeholder="Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1" htmlFor="company">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  id="company"
                  type="text"
                  placeholder="Acme Inc."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1" htmlFor="email">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder="jane@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1" htmlFor="password">Password</label>
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

            <div className="flex items-start gap-2 pt-2">
              <input type="checkbox" id="terms" className="mt-1 rounded border-white/10 bg-white/5 text-primary focus:ring-primary/50" />
              <label htmlFor="terms" className="text-xs text-muted-foreground leading-normal">
                I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <Link
              href="/dashboard"
              className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all group mt-6"
            >
              Create Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline">Sign In</Link>
        </p>
      </motion.div>

      {/* Footer Links */}
      <div className="absolute bottom-8 w-full flex justify-center gap-6 text-xs text-muted-foreground font-mono">
        <span>© 2026 VividTalent</span>
        <a href="#" className="hover:text-white transition-colors">Security</a>
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
      </div>
    </div>
  );
}

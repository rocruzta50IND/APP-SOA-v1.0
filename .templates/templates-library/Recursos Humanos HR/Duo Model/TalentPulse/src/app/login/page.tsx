"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, GitBranch, Mail, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const Input = ({ label, type = "text", placeholder }: { label: string; type?: string; placeholder: string }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-muted-foreground">{label}</label>
    <input 
      type={type}
      placeholder={placeholder}
      className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
    />
  </div>
);

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />

      <Link href="/" className="absolute top-8 left-8 text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-2xl mb-4 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Log in to your TalentPulse account to continue.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="space-y-6">
            <Input label="Work Email" placeholder="name@company.com" />
            <Input label="Password" type="password" placeholder="••••••••" />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary" />
                <span className="text-xs text-muted-foreground">Remember me</span>
              </label>
              <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
            </div>

            <Link href="/dashboard" className="block">
              <button className="w-full h-11 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                Sign In
              </button>
            </Link>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 h-11 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm font-medium">
                <GitBranch className="w-4 h-4" /> GitHub
              </button>
              <button className="flex items-center justify-center gap-2 h-11 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm font-medium">
                <Mail className="w-4 h-4" /> Google
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary font-medium hover:underline">Create one for free</Link>
        </p>
      </motion.div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, SquareTerminal, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const springTransition = { type: "spring", stiffness: 400, damping: 30 } as const;

export default function LoginPage() {
  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-background overflow-hidden">
      {/* Left Side: Auth Form */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 relative">
        <div className="absolute top-10 left-8 md:left-16 lg:left-24">
          <Link href="/" className="flex items-center gap-2 group text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={springTransition}
          className="max-w-md w-full mx-auto lg:mx-0"
        >
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tighter">TalentAura</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
          <p className="text-muted-foreground mb-10">Enter your credentials to access your dashboard.</p>

          <div className="space-y-4 mb-8">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-medium">
              <Globe className="w-5 h-5" />
              Sign in with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-medium">
              <SquareTerminal className="w-5 h-5" />
              Sign in with GitHub
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1">Work Email</label>
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium">Password</label>
                <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
              />
            </div>
            <Link 
              href="/dashboard"
              className="block w-full text-center py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] mt-8"
            >
              Sign In
            </Link>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary font-semibold hover:underline">Start free trial</Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side: Visual Content */}
      <div className="hidden lg:flex relative bg-white/[0.02] border-l border-white/10 flex-col justify-center items-center p-12 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...springTransition, delay: 0.2 }}
          className="relative z-10 w-full max-w-lg"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
               <div className="h-6 w-32 bg-white/10 rounded-full" />
               <div className="w-8 h-8 rounded-full bg-primary/20" />
            </div>
            <div className="space-y-6">
               <div className="space-y-2">
                  <div className="h-4 w-full bg-white/10 rounded-full" />
                  <div className="h-4 w-2/3 bg-white/5 rounded-full" />
               </div>
               <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-24 bg-white/5 rounded-2xl border border-white/5" />
                  ))}
               </div>
               <div className="h-32 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-primary opacity-50" />
               </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4 tracking-tight">The Future of Workforce Management</h2>
            <p className="text-muted-foreground leading-relaxed">
              Join 500+ enterprises that use TalentAura to automate their HR operations and focus on what matters: their people.
            </p>
          </div>
        </motion.div>

        {/* Floating Decoration */}
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
      </div>
    </main>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const springTransition = { type: "spring", stiffness: 400, damping: 30 } as const;

export default function RegisterPage() {
  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-background overflow-hidden">
      {/* Left Side: Visual Content */}
      <div className="hidden lg:flex relative bg-white/[0.02] border-r border-white/10 flex-col justify-center px-12 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={springTransition}
          className="relative z-10 max-w-lg mx-auto"
        >
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">TalentAura</span>
          </div>

          <h2 className="text-4xl font-bold mb-8 tracking-tighter leading-tight">
            Start your 14-day <br /> <span className="text-primary">Free Trial</span> today.
          </h2>

          <div className="space-y-6">
            {[
              { icon: Zap, title: "Automated Onboarding", desc: "Get your team up and running in minutes, not days." },
              { icon: ShieldCheck, title: "Enterprise-Grade Security", desc: "Your data is protected by bank-level encryption." },
              { icon: CheckCircle2, title: "100% Compliance", desc: "Stay compliant with local tax and labor laws globally." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            <p className="text-sm italic text-muted-foreground mb-4">
              "TalentAura has completely transformed how we manage our global team. Implementation was seamless and the ROI was immediate."
            </p>
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10" />
               <div>
                  <p className="text-sm font-bold text-white">Sarah Jenkins</p>
                  <p className="text-xs text-muted-foreground">VP of HR, GlobalFlow</p>
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 relative">
        <div className="absolute top-10 right-8 md:right-16 lg:right-24">
          <Link href="/" className="flex items-center gap-2 group text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-sm font-medium">Back to Home</span>
            <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={springTransition}
          className="max-w-md w-full mx-auto lg:ml-0 lg:mr-auto"
        >
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join 500+ companies scaling with TalentAura.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">First Name</label>
                <input 
                  type="text" 
                  placeholder="Jane"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1">Work Email</label>
              <input 
                type="email" 
                placeholder="jane@company.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium ml-1">Company Name</label>
              <input 
                type="text" 
                placeholder="Acme Inc."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium ml-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
              />
            </div>

            <div className="pt-2">
              <p className="text-xs text-muted-foreground leading-relaxed mb-6 text-center lg:text-left">
                By clicking "Get Started", you agree to our{" "}
                <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and{" "}
                <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>

              <Link 
                href="/dashboard"
                className="block w-full text-center py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]"
              >
                Get Started
              </Link>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}

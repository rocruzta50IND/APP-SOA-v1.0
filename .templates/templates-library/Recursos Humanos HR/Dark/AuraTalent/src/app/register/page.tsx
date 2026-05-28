"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[130px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Marketing Content */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block"
        >
          <Link href="/" className="inline-flex items-center gap-2 mb-10 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tighter">AuraTalent</span>
          </Link>
          <h2 className="text-4xl font-black tracking-tighter mb-6 leading-tight">
            The future of <span className="text-primary">Talent Management</span> starts here.
          </h2>
          <div className="space-y-6">
            {[
              "Automate sourcing with AI-powered matching",
              "Manage global payroll and local compliance",
              "Real-time analytics for entire workforce",
              "Enterprise-grade security and SOC2 compliance"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl">
             <p className="text-sm italic text-muted-foreground mb-4">
               "AuraTalent transformed our hiring process. We've reduced time-to-hire by 40% and improved quality of hire significantly."
             </p>
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10" />
                <div>
                   <p className="text-xs font-bold">Sarah Jenkins</p>
                   <p className="text-[10px] text-muted-foreground uppercase tracking-widest">VP of People @ Veloce</p>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Right Side: Register Form */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <Card className="p-8">
            <div className="text-center mb-8 lg:hidden">
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                 </div>
                 <span className="font-bold text-xl tracking-tighter">AuraTalent</span>
              </Link>
            </div>
            <h1 className="text-2xl font-black tracking-tighter mb-2">Create your account</h1>
            <p className="text-sm text-muted-foreground mb-8">Start your 14-day free trial. No credit card required.</p>

            <CardContent className="p-0 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">First Name</label>
                  <input type="text" placeholder="John" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Last Name</label>
                  <input type="text" placeholder="Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Work Email</label>
                <input type="email" placeholder="john@company.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Company Name</label>
                <input type="text" placeholder="Acme Inc" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>

              <div className="pt-4">
                <Link href="/dashboard" className="block">
                  <Button className="w-full gap-2" size="lg">
                    Create Account <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <p className="text-[10px] text-center text-muted-foreground px-4">
                By signing up, you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
              </p>
            </CardContent>
          </Card>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}

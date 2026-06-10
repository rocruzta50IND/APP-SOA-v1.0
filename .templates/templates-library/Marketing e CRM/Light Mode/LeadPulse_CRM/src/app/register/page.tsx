"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Shield, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const transition = { type: "spring", stiffness: 400, damping: 30 } as const;

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row-reverse overflow-hidden">
      {/* Testimonial/Info Side */}
      <div className="hidden md:flex md:w-1/2 bg-white/[0.02] border-l border-white/5 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-md w-full relative z-10">
          <div className="mb-12">
            <div className="w-12 h-12 bg-primary/20 flex items-center justify-center rounded-xl mb-6">
              <CheckCircle2 className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter mb-6 leading-tight">
              Join the elite <br />
              <span className="text-primary italic">1% of Marketers</span>.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              &quot;LeadPulse completely transformed how we handle our inbound pipeline. We saw a 3x increase in conversion within the first 90 days.&quot;
            </p>
            <div className="mt-6 flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10" />
               <div>
                  <p className="text-sm font-bold">Sarah Chen</p>
                  <p className="text-xs text-muted-foreground">VP of Growth, Nexgen SaaS</p>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-12">
             {[
               { icon: Shield, label: "Enterprise Security" },
               { icon: Rocket, label: "Instant Setup" },
             ].map((item, i) => (
               <div key={i} className="p-4 rounded-2xl border border-white/5 bg-white/[0.03]">
                  <item.icon className="w-5 h-5 text-primary mb-2" />
                  <p className="text-xs font-bold uppercase tracking-wider">{item.label}</p>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Register Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={transition}
          className="max-w-[400px] w-full"
        >
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tighter mb-2">Create Account</h1>
            <p className="text-muted-foreground">Start your 14-day free trial. No credit card required.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">First Name</label>
                <Input 
                  placeholder="Jane" 
                  className="h-12 bg-white/5 border-white/10 focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">Last Name</label>
                <Input 
                  placeholder="Doe" 
                  className="h-12 bg-white/5 border-white/10 focus:border-primary/50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1">Work Email</label>
              <Input 
                type="email" 
                placeholder="jane@company.com" 
                className="h-12 bg-white/5 border-white/10 focus:border-primary/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium ml-1">Password</label>
              <Input 
                type="password" 
                placeholder="Min. 8 characters" 
                className="h-12 bg-white/5 border-white/10 focus:border-primary/50"
              />
            </div>

            <div className="pt-4 space-y-4">
              <Button asChild className="w-full h-12 text-base font-bold">
                <Link href="/dashboard">Create Free Account</Link>
              </Button>
              
              <p className="text-xs text-center text-muted-foreground px-4 leading-relaxed">
                By clicking &quot;Create Free Account&quot;, you agree to our{" "}
                <Link href="#" className="underline hover:text-foreground">Terms of Service</Link> and{" "}
                <Link href="#" className="underline hover:text-foreground">Privacy Policy</Link>.
              </p>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">Log In</Link>
          </p>
        </motion.div>
      </div>

      {/* Back button */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 md:left-12 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Site
      </Link>
    </div>
  );
}

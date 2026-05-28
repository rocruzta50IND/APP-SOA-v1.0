"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, GitBranch, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
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

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row relative overflow-hidden">
      {/* Left Side: Info (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between w-1/3 p-12 bg-white/[0.02] border-r border-white/5 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
        
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter">TalentPulse</span>
        </Link>

        <div>
          <h2 className="text-4xl font-bold tracking-tighter mb-6 leading-tight">
            Start building your <br />
            dream team today.
          </h2>
          <ul className="space-y-6">
            {[
              "14-day free trial on all plans",
              "Access to AI Sourcing engine",
              "Unlimited candidate profiles",
              "Dedicated account support"
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-3 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm text-muted-foreground">
          © 2026 TalentPulse Inc.
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 lg:hidden text-center">
             <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-primary" />
                <span className="text-2xl font-bold tracking-tighter">TalentPulse</span>
             </Link>
          </div>

          <div className="text-center lg:text-left mb-10">
            <h1 className="text-3xl font-bold tracking-tighter mb-2">Create an account</h1>
            <p className="text-muted-foreground">Join 10,000+ teams scaling with TalentPulse.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" placeholder="Jane" />
                <Input label="Last Name" placeholder="Doe" />
              </div>
              <Input label="Company Name" placeholder="Acme Inc." />
              <Input label="Work Email" placeholder="jane@acme.com" />
              <Input label="Password" type="password" placeholder="••••••••" />

              <div className="pt-2">
                <Link href="/dashboard" className="block">
                  <button className="w-full h-11 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                    Create Account
                  </button>
                </Link>
              </div>

              <p className="text-[10px] text-center text-muted-foreground leading-relaxed">
                By clicking "Create Account", you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
              </p>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
                <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-background px-2 text-muted-foreground">Or sign up with</span></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 h-10 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-medium">
                  <GitBranch className="w-4 h-4" /> GitHub
                </button>
                <button className="flex items-center justify-center gap-2 h-10 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-medium">
                  <Mail className="w-4 h-4" /> Google
                </button>
              </div>
            </div>
          </div>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">Log in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

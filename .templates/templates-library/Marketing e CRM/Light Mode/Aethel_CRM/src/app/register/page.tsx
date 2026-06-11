"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Lock, Mail, User, Building } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row overflow-hidden">
      {/* Back to Home */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
        Back to System
      </Link>

      {/* Left Side: Brand & Visual */}
      <div className="hidden md:flex md:w-1/2 bg-muted/30 border-r border-border p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-12 group">
            <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-md">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-primary-foreground"
              >
                <path d="M12 2v20" />
                <path d="m17 5-5-3-5 3" />
                <path d="m17 19-5 3-5-3" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span className="font-black text-xl tracking-tighter text-foreground uppercase">FlowSprint</span>
          </Link>

          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase italic leading-[0.9] mb-6">
            Join the <br />
            New Era of <br />
            <span className="text-muted-foreground/30">CRM Intelligence.</span>
          </h2>
          <p className="text-muted-foreground font-medium max-w-sm italic">
            Surgical lead management and ROI tracking starts here.
          </p>
        </div>

        <div className="relative z-10">
          <div className="space-y-4">
            {[
              { label: "Pipeline Efficiency", val: "94%" },
              { label: "Data Latency", val: "0.02ms" }
            ].map(stat => (
              <div key={stat.label} className="p-4 bg-background border border-border rounded-md shadow-sm max-w-xs">
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</div>
                <div className="text-2xl font-black italic tracking-tighter">{stat.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
        <motion.div 
          className="w-full max-w-[400px] py-12"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="mb-8 md:hidden">
             <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-md">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-primary-foreground"
                >
                  <path d="M12 2v20" />
                  <path d="m17 5-5-3-5 3" />
                  <path d="m17 19-5 3-5-3" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="font-black text-xl tracking-tighter text-foreground uppercase">FlowSprint</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black uppercase tracking-tighter italic">Create Account</h1>
            <p className="text-muted-foreground text-sm font-medium">Start your 14-day premium trial today.</p>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="text" placeholder="John" className="pl-10 h-12 bg-muted/20 border-border rounded-md" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Last Name</label>
                <Input type="text" placeholder="Doe" className="h-12 bg-muted/20 border-border rounded-md" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="email" placeholder="john@company.com" className="pl-10 h-12 bg-muted/20 border-border rounded-md" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Company Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="text" placeholder="Acme Inc." className="pl-10 h-12 bg-muted/20 border-border rounded-md" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="password" placeholder="••••••••" className="pl-10 h-12 bg-muted/20 border-border rounded-md" />
              </div>
            </div>

            <Button className="w-full h-12 rounded-md font-black uppercase tracking-widest italic group" asChild>
              <Link href="/dashboard">
                Initialize Workspace <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <span className="relative bg-background px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Partner SSO
            </span>
          </div>

          <Button variant="outline" className="w-full h-12 rounded-md font-bold uppercase tracking-widest text-xs gap-3">
             <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign up with Google
          </Button>

          <p className="mt-8 text-center text-sm font-medium text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-black uppercase tracking-widest text-xs hover:underline ml-1">
              Sign In
            </Link>
          </p>
          
          <p className="mt-12 text-[10px] text-center text-muted-foreground/60 leading-relaxed">
            By clicking "Initialize Workspace" or "Sign up with Google", you agree to FlowSprint&apos;s 
            <Link href="#" className="underline ml-1">Terms of Service</Link> and <Link href="#" className="underline ml-1">Privacy Policy</Link>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

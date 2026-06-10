"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, Chrome, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

const transition = { type: "spring", stiffness: 400, damping: 30 } as const;

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden">
      {/* Branding Side - Hidden on Mobile */}
      <div className="hidden md:flex md:w-1/2 bg-white/[0.02] border-r border-white/5 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-md w-full relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-12 group inline-block">
            <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)]">
               <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7 text-primary-foreground"
              >
                <path d="M12 2v20" />
                <path d="m4.93 10.93 1.41 1.41" />
                <path d="m17.66 10.93 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
              </svg>
            </div>
            <span className="font-bold text-3xl tracking-tighter">LeadPulse</span>
          </Link>
          
          <h2 className="text-4xl font-bold tracking-tighter mb-6 leading-tight">
            The platform for <br />
            <span className="text-primary italic">High-Velocity</span> Sales teams.
          </h2>
          
          <div className="space-y-8 mt-12">
            {[
              { icon: Zap, title: "Automated Workflows", text: "Scale your reach without increasing headcount." },
              { icon: Mail, title: "Smart Engagement", text: "Predictive timing for every outreach." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center opacity-30 grayscale pointer-events-none">
           <span className="text-xs font-mono uppercase tracking-widest italic">Encrypted Connection</span>
           <div className="flex gap-4">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
           </div>
        </div>
      </div>

      {/* Auth Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={transition}
          className="max-w-[400px] w-full"
        >
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tighter mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Log in to your LeadPulse workspace to continue.</p>
          </div>

          <div className="space-y-4 mb-8">
            <Button variant="outline" className="w-full h-12 gap-3 font-medium">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-4 text-muted-foreground font-mono">Or continue with</span>
              </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1">Work Email</label>
              <Input 
                type="email" 
                placeholder="name@company.com" 
                className="h-12 bg-white/5 border-white/10 focus:border-primary/50"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-medium">Password</label>
                <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="h-12 bg-white/5 border-white/10 focus:border-primary/50"
              />
            </div>

            <Button asChild className="w-full h-12 text-base font-bold mt-6">
              <Link href="/dashboard">Sign In to Dashboard</Link>
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline">Create Account</Link>
          </p>
        </motion.div>
      </div>

      {/* Back button */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 md:left-auto md:right-12 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Site
      </Link>
    </div>
  );
}

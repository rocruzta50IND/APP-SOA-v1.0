"use client";

import { motion } from "framer-motion";
import { Shield, ArrowLeft, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  return (
    <main className="min-h-screen grid md:grid-cols-2">
      {/* Left Side: Form */}
      <div className="flex flex-col p-8 md:p-12 lg:p-24 bg-background">
        <Link href="/" className="flex items-center gap-2 mb-20 text-muted-foreground hover:text-primary transition-colors group">
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="max-w-md w-full mx-auto md:mx-0 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Access the Forge</h1>
            <p className="text-muted-foreground">
              Institutional portal for digital asset management.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Corporate Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none">Security Key / Password</label>
                <Link href="#" className="text-xs text-primary hover:underline">Forgot access?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input 
                  type="password" 
                  placeholder="••••••••••••" 
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded border-border" />
              <label htmlFor="remember" className="text-xs text-muted-foreground">Keep session active for 24 hours</label>
            </div>

            <Link href="/dashboard" className="block w-full">
              <button className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all">
                Enter Dashboard
              </button>
            </Link>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with SSO</span></div>
            </div>

            <button className="w-full h-12 rounded-xl border border-border bg-card flex items-center justify-center gap-3 hover:bg-muted transition-all">
              <div className="size-5 bg-blue-600 rounded-sm flex items-center justify-center text-white text-[10px] font-bold">M</div>
              Microsoft Azure AD
            </button>
          </div>
        </div>

        <p className="mt-auto pt-8 text-center md:text-left text-xs text-muted-foreground leading-relaxed">
          Protected by CryptoNexis Shield™. <br />
          Unauthorized access is monitored and reported.
        </p>
      </div>

      {/* Right Side: Visual */}
      <div className="hidden md:flex relative bg-zinc-900 overflow-hidden items-center justify-center p-12">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
        
        {/* Abstract Grid / Graphic */}
        <div className="relative z-10 w-full max-w-lg aspect-square">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-[1px] border-primary/20 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-8 border-[1px] border-white/5 rounded-full"
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-48 rounded-[48px] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl flex items-center justify-center relative overflow-hidden group">
              <Shield className="size-20 text-primary drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>

          {/* Data Floating Elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute size-3 rounded-full bg-primary"
              animate={{
                x: [0, Math.cos(i * 60) * 200],
                y: [0, Math.sin(i * 60) * 200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut",
              }}
              style={{ left: '50%', top: '50%', marginLeft: '-6px', marginTop: '-6px' }}
            />
          ))}
        </div>

        <div className="absolute bottom-12 left-12 right-12 z-10">
          <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
            <p className="text-white font-medium mb-1">"The most secure portal we've ever deployed."</p>
            <p className="text-white/60 text-sm">— CTO at Global Digital Fund</p>
          </div>
        </div>
      </div>
    </main>
  );
}

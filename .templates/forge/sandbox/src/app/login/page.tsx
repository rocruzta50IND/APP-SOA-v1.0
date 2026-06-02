"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] } as const;
const microLabel = "text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 block";

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background overflow-hidden">
      {/* Left Pane - Visual */}
      <div className="hidden md:flex relative bg-secondary/30 flex-col justify-between p-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />
        </div>

        <Link href="/" className="relative z-10 flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Terminal
        </Link>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={transition}
          >
            <span className={microLabel}>The Institutional Standard</span>
            <h1 className="text-6xl md:text-7xl font-serif mb-8 leading-none">
              SECURE <br /> <span className="text-primary italic">IDENTITY.</span>
            </h1>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Access the vanguard of digital asset infrastructure. Your keys, your sovereignty, our precision.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 flex items-center gap-6">
           <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted" />
              ))}
           </div>
           <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
             Trusted by 850+ global entities
           </p>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="flex items-center justify-center p-8 md:p-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="flex md:hidden items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-primary rounded-full" />
            <span className="font-serif text-xl tracking-tighter">KRYPTERA</span>
          </div>

          <div className="mb-12">
            <h2 className="text-4xl font-serif mb-4">Welcome Back</h2>
            <p className="text-muted-foreground">Enter your institutional credentials.</p>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className={microLabel}>Institutional Email</label>
              <input 
                type="email" 
                placeholder="identity@institution.com"
                className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-primary transition-colors font-sans"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className={microLabel}>Security Phrase</label>
                <Link href="#" className="text-[10px] uppercase tracking-widest text-primary hover:underline">Forgot?</Link>
              </div>
              <input 
                type="password" 
                placeholder="••••••••••••"
                className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-primary transition-colors font-sans"
              />
            </div>

            <div className="pt-4">
              <Link 
                href="/dashboard"
                className="block w-full bg-foreground text-background text-center py-5 rounded-full text-sm font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-all duration-500"
              >
                Authorize Access
              </Link>
            </div>
          </form>

          <div className="mt-12 pt-12 border-t border-border flex flex-col gap-6">
            <button className="flex items-center justify-center gap-4 w-full py-4 border border-border rounded-full text-xs font-bold tracking-[0.1em] uppercase hover:bg-muted transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              SSO Login
            </button>
            
            <p className="text-center text-sm text-muted-foreground">
              New to the frontier? {" "}
              <Link href="/register" className="text-primary hover:underline font-bold">Inquire for Membership</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

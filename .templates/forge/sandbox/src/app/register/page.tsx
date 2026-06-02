"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] } as const;
const microLabel = "text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 block";

export default function RegisterPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background overflow-hidden">
      {/* Left Pane - Cinematic Content */}
      <div className="hidden md:flex relative bg-primary text-primary-foreground flex-col justify-between p-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
           <motion.div 
             initial={{ scale: 1.2, rotate: -10 }}
             animate={{ scale: 1, rotate: 0 }}
             transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
             className="font-serif text-[40vw] absolute -bottom-20 -left-20 leading-none select-none pointer-events-none"
           >
              K
           </motion.div>
        </div>

        <Link href="/" className="relative z-10 flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          The Terminal
        </Link>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-70 mb-4 block">Institutional Membership</span>
            <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-[0.85]">
              CLAIM <br /> <span className="italic opacity-70 font-sans tracking-tighter text-5xl md:text-7xl">SOVEREIGNTY.</span>
            </h1>
            
            <div className="space-y-6 mt-12">
               {[
                 "Direct Node Connectivity",
                 "Bespoke Risk Management",
                 "24/7 Concierge Support"
               ].map((benefit, i) => (
                 <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...transition, delay: 0.5 + (i * 0.1) }}
                    className="flex items-center gap-4"
                 >
                    <CheckCircle2 size={18} className="text-primary-foreground/50" />
                    <span className="text-sm font-bold tracking-widest uppercase">{benefit}</span>
                 </motion.div>
               ))}
            </div>
          </motion.div>
        </div>

        <div className="relative z-10">
           <p className="text-[10px] uppercase tracking-widest opacity-60 max-w-xs leading-relaxed">
             Membership is subject to institutional vetting and regulatory compliance standards.
           </p>
        </div>
      </div>

      {/* Right Pane - Refined Form */}
      <div className="flex items-center justify-center p-8 md:p-16">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...transition, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="flex md:hidden items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-primary rounded-full" />
            <span className="font-serif text-xl tracking-tighter text-foreground">KRYPTERA</span>
          </div>

          <div className="mb-12">
            <h2 className="text-4xl font-serif mb-4">Inquire Access</h2>
            <p className="text-muted-foreground">Begin the institutional onboarding process.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={microLabel}>Given Name</label>
                <input 
                  type="text" 
                  placeholder="Alexander"
                  className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-primary transition-colors font-sans"
                />
              </div>
              <div className="space-y-2">
                <label className={microLabel}>Surname</label>
                <input 
                  type="text" 
                  placeholder="Vanguard"
                  className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-primary transition-colors font-sans"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={microLabel}>Institution Name</label>
              <input 
                type="text" 
                placeholder="Vanguard Capital Group"
                className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-primary transition-colors font-sans"
              />
            </div>

            <div className="space-y-2">
              <label className={microLabel}>Institutional Email</label>
              <input 
                type="email" 
                placeholder="alexander@vanguard.com"
                className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-primary transition-colors font-sans"
              />
            </div>

            <div className="space-y-2 pt-4">
              <label className={microLabel}>Account Security</label>
              <input 
                type="password" 
                placeholder="Create secure phrase"
                className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-primary transition-colors font-sans"
              />
            </div>

            <div className="pt-8">
              <Link 
                href="/dashboard"
                className="block w-full bg-foreground text-background text-center py-5 rounded-full text-sm font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-all duration-500"
              >
                Submit Inquiry
              </Link>
            </div>
          </form>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Already an institutional member? {" "}
              <Link href="/login" className="text-primary hover:underline font-bold">Access Terminal</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

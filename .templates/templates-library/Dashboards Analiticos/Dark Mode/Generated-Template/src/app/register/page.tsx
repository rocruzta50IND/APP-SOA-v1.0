"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] } as const;

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT: CINEMATIC SIDE */}
      <div className="hidden lg:block relative bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center p-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={transition}
            className="w-full h-full border border-primary/20 flex flex-col justify-between p-12 relative"
          >
            <div className="space-y-4">
              <div className="w-12 h-1 bg-primary" />
              <h2 className="text-6xl font-serif tracking-tighter leading-none">JOIN <br /> THE <br /> ARCHITECTS.</h2>
            </div>
            
            <div className="max-w-xs">
              <p className="text-sm italic text-muted-foreground mb-6">&quot;Wealth is built on data. Legacy is built on insights.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Founding Member Program</span>
              </div>
            </div>

            {/* Abstract visual elements */}
            <div className="absolute top-1/4 left-0 w-32 h-px bg-primary/30 rotate-45" />
            <div className="absolute bottom-1/3 right-0 w-64 h-px bg-primary/10" />
          </motion.div>
        </div>
      </div>

      {/* RIGHT: FORM SIDE */}
      <div className="flex flex-col justify-between p-8 md:p-12 lg:p-20 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={transition}
        >
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-primary transition-colors mb-12">
            <ChevronLeft className="w-3 h-3" />
            Return to Nexus
          </Link>
          
          <div className="max-w-sm">
            <h1 className="text-4xl font-serif tracking-tighter mb-2">Acquire Access</h1>
            <p className="text-muted-foreground text-sm mb-10">Submit your dossier to join the elite network of data architects.</p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Given Name</label>
                  <input 
                    type="text" 
                    placeholder="Lucius"
                    className="w-full bg-transparent border-b border-border py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Surname</label>
                  <input 
                    type="text" 
                    placeholder="Vane"
                    className="w-full bg-transparent border-b border-border py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Corporate Email</label>
                <input 
                  type="email" 
                  placeholder="vane@nebula.com"
                  className="w-full bg-transparent border-b border-border py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Select Tier</label>
                <select className="w-full bg-transparent border-b border-border py-3 text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                  <option className="bg-background">Executive Access</option>
                  <option className="bg-background">Sovereign Protocol</option>
                  <option className="bg-background">Monarch Governance</option>
                </select>
              </div>

              <div className="pt-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-3 h-3 rounded-none border-border bg-transparent" />
                  <span className="text-[10px] leading-relaxed uppercase tracking-widest font-bold text-muted-foreground">
                    I agree to the non-disclosure protocols and neural integrity standards.
                  </span>
                </label>
              </div>

              <Link 
                href="/dashboard"
                className="w-full bg-foreground text-background py-4 rounded-full flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold hover:opacity-80 transition-all mt-8 group"
              >
                Submit Dossier
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </form>
          </div>
        </motion.div>

        <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
          Already synchronized? <Link href="/login" className="text-primary hover:underline ml-2">Portal Access</Link>
        </p>
      </div>
    </div>
  );
}

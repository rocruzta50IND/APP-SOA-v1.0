"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col lg:flex-row-reverse overflow-hidden">
      {/* Branding Side */}
      <section className="hidden lg:flex lg:w-1/2 bg-foreground relative flex-col justify-between p-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -ml-96 -mt-96" />
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={transition}
          className="relative z-10 flex justify-end"
        >
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-xl font-bold tracking-tighter uppercase text-background">
              Aethelgard
            </span>
            <div className="w-8 h-8 bg-background flex items-center justify-center">
              <span className="text-foreground font-serif font-bold text-xl">A</span>
            </div>
          </Link>
        </motion.div>

        <div className="relative z-10 text-right">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.2 }}
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-6 block"
          >
            The Inauguration
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.3 }}
            className="text-7xl font-serif font-bold text-background mb-8 tracking-tighter leading-none"
          >
            Founding a <br />
            <span className="italic text-primary">Dynasty.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.4 }}
            className="text-background/60 max-w-md ml-auto italic font-light"
          >
            Begin your journey into sovereign digital architecture. Secure your assets, define your legacy, and command the future.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
          className="absolute bottom-[-10%] left-[-10%] select-none pointer-events-none"
        >
          <Globe className="w-[600px] h-[600px] text-background" />
        </motion.div>
      </section>

      {/* Form Side */}
      <section className="flex-1 flex flex-col justify-center p-8 md:p-24 lg:p-32 relative">
        <Link 
          href="/" 
          className="absolute top-12 right-8 md:right-24 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
        >
          Retreat to Sanctuary <ArrowLeft className="w-3 h-3 group-hover:translate-x-1 transition-transform rotate-180" />
        </Link>

        <div className="max-w-md w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
          >
            <h2 className="text-4xl font-serif font-bold mb-2">Request Induction</h2>
            <p className="text-muted-foreground mb-12 italic text-sm">Provide your coordinates to initialize the sovereign link.</p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Honorific</label>
                  <Input 
                    type="text" 
                    placeholder="First Name" 
                    className="rounded-none border-t-0 border-x-0 border-b border-border/50 focus:border-primary bg-transparent px-0 h-12 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Legacy Name</label>
                  <Input 
                    type="text" 
                    placeholder="Last Name" 
                    className="rounded-none border-t-0 border-x-0 border-b border-border/50 focus:border-primary bg-transparent px-0 h-12 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Institutional Email</label>
                <Input 
                  type="email" 
                  placeholder="name@institution.com" 
                  className="rounded-none border-t-0 border-x-0 border-b border-border/50 focus:border-primary bg-transparent px-0 h-12 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Access Key (New)</label>
                <Input 
                  type="password" 
                  placeholder="••••••••••••" 
                  className="rounded-none border-t-0 border-x-0 border-b border-border/50 focus:border-primary bg-transparent px-0 h-12 transition-all"
                />
              </div>
            </div>

            <Button className="w-full" size="lg" asChild>
              <Link href="/dashboard" className="flex items-center justify-center gap-2">
                Initialize Sovereignty <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>

            <div className="pt-8 text-center">
              <p className="text-xs text-muted-foreground italic">
                Already established? <Link href="/login" className="text-primary font-bold uppercase tracking-widest hover:underline ml-1">Resume Command</Link>
              </p>
            </div>
          </motion.form>
        </div>

        <div className="absolute bottom-12 left-8 md:left-24 right-8 md:right-24 flex justify-between items-center opacity-30">
          <span className="text-[8px] font-bold uppercase tracking-[0.3em]">Protocol 0.4.1</span>
          <span className="text-[8px] font-bold uppercase tracking-[0.3em]">Awaiting Authorization</span>
        </div>
      </section>
    </main>
  );
}

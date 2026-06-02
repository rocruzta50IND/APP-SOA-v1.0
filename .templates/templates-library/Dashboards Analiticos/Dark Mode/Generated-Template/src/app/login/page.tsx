"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] } as const;

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT: FORM SIDE */}
      <div className="flex flex-col justify-between p-8 md:p-12 lg:p-20 bg-background">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={transition}
        >
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-primary transition-colors mb-12">
            <ChevronLeft className="w-3 h-3" />
            Return to Nexus
          </Link>
          
          <div className="max-w-sm">
            <h1 className="text-4xl font-serif tracking-tighter mb-2">Access Portal</h1>
            <p className="text-muted-foreground text-sm mb-10">Enter your credentials to synchronize with the Neural Core.</p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Corporate Identity</label>
                <input 
                  type="email" 
                  placeholder="name@enterprise.com"
                  className="w-full bg-transparent border-b border-border py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Security Key</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-border py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-3 h-3 rounded-none border-border bg-transparent" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Maintain Link</span>
                </label>
                <Link href="#" className="text-[10px] uppercase tracking-widest font-bold text-primary hover:opacity-70">Reset Key</Link>
              </div>

              <Link 
                href="/dashboard"
                className="w-full bg-foreground text-background py-4 rounded-full flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold hover:opacity-80 transition-all mt-8 group"
              >
                Establish Connection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </form>

            <div className="mt-12 pt-8 border-t border-border/50">
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-4">Or authenticate via</p>
              <div className="grid grid-cols-2 gap-4">
                <button className="border border-border py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-muted transition-all flex items-center justify-center gap-2">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.288 1.288-3.312 2.696-7.392 2.696-6.44 0-11.52-5.208-11.52-11.648s5.08-11.648 11.52-11.648c3.48 0 6.012 1.368 7.872 3.144l2.304-2.304c-2.1-1.968-5.328-3.48-10.176-3.48-8.904 0-16.14 7.236-16.14 16.14s7.236 16.14 16.14 16.14c4.8 0 8.412-1.584 11.232-4.524 2.904-2.904 3.816-6.996 3.816-10.356 0-.984-.084-1.92-.24-2.82h-14.808z"/></svg>
                  SSO
                </button>
                <button className="border border-border py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-muted transition-all flex items-center justify-center gap-2">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
                  Vault
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
          New to the collective? <Link href="/register" className="text-primary hover:underline ml-2">Request Access</Link>
        </p>
      </div>

      {/* RIGHT: CINEMATIC SIDE */}
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
              <h2 className="text-6xl font-serif tracking-tighter leading-none">THE <br /> INTELLIGENCE <br /> ERA.</h2>
            </div>
            
            <div className="max-w-xs">
              <p className="text-sm italic text-muted-foreground mb-6">&quot;Predictive modeling is no longer a luxury, but the baseline for global sovereignty.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Aura Core v.9.4</span>
              </div>
            </div>

            {/* Abstract visual elements */}
            <div className="absolute top-1/2 right-0 w-32 h-px bg-primary/30 -rotate-45" />
            <div className="absolute bottom-1/4 left-0 w-64 h-px bg-primary/10" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

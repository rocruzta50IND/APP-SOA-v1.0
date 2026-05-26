"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] } as const;

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans overflow-hidden">
      {/* Left Side - Visual/Branding */}
      <div className="hidden md:flex md:w-1/2 bg-muted/30 border-r border-border p-20 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-primary/5 -z-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        
        <Link href="/" className="flex items-center gap-2 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Back to Main</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={transition}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-6 block">Secure Portal</span>
          <h1 className="font-playfair text-6xl lg:text-8xl leading-none tracking-tighter mb-8">
            The Inner <br />
            <span className="italic text-muted-foreground/50 text-7xl">Sanctum.</span>
          </h1>
          <p className="text-muted-foreground max-w-sm leading-relaxed">
            Access your executive dashboard and manage your organization's 
            most valuable assets with absolute precision.
          </p>
        </motion.div>

        <div className="flex gap-12 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/40">
          <span>01 / Intelligence</span>
          <span>02 / Precision</span>
          <span>03 / Security</span>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="md:hidden mb-12">
            <Link href="/" className="font-playfair text-2xl font-bold tracking-tighter">
              LUMINA<span className="text-primary">TALENT</span>
            </Link>
          </div>

          <h2 className="font-playfair text-4xl mb-2">Welcome Back</h2>
          <p className="text-muted-foreground text-sm mb-12 uppercase tracking-widest font-medium">
            Enter your credentials to continue
          </p>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-6">
              <div className="relative group">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-2 block transition-colors group-focus-within:text-primary">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                  <input 
                    type="email" 
                    placeholder="executive@company.com"
                    className="w-full bg-transparent border-b border-border py-4 pl-8 focus:outline-none focus:border-primary transition-colors font-sans text-sm"
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground block transition-colors group-focus-within:text-primary">
                    Secret Key
                  </label>
                  <Link href="#" className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/40 hover:text-primary">
                    Recovery
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-transparent border-b border-border py-4 pl-8 focus:outline-none focus:border-primary transition-colors font-sans text-sm"
                  />
                </div>
              </div>
            </div>

            <Link 
              href="/dashboard" 
              className="w-full bg-foreground text-background hover:opacity-80 rounded-full py-5 flex items-center justify-center text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 mt-12"
            >
              Sign In to Portal
            </Link>

            <div className="text-center mt-12">
              <span className="text-muted-foreground text-xs">New to LuminaTalent? </span>
              <Link href="/register" className="text-primary text-xs uppercase tracking-widest font-bold hover:underline underline-offset-4">
                Inquire for Access
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

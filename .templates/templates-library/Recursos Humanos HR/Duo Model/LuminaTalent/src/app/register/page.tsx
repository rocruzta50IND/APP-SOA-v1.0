"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Building2, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] } as const;

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans overflow-hidden">
      {/* Left Side - Visual/Branding */}
      <div className="hidden md:flex md:w-1/2 bg-foreground text-background p-20 flex-col justify-between relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-full bg-primary/10 -z-10 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />
        
        <Link href="/" className="flex items-center gap-2 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Back to Main</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={transition}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-6 block">Member Inquiry</span>
          <h1 className="font-playfair text-6xl lg:text-8xl leading-none tracking-tighter mb-8">
            The Future <br />
            <span className="italic text-muted-foreground/30 text-7xl">Awaits.</span>
          </h1>
          <p className="text-muted-foreground max-w-sm leading-relaxed">
            Join the most exclusive human capital network in the enterprise world. 
            Precision at every touchpoint.
          </p>
        </motion.div>

        <div className="flex gap-12 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/30">
          <span>04 / Scale</span>
          <span>05 / Vision</span>
          <span>06 / Legacy</span>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-20 bg-background">
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

          <h2 className="font-playfair text-4xl mb-2">Member Inquiry</h2>
          <p className="text-muted-foreground text-sm mb-12 uppercase tracking-widest font-medium">
            Register your organization for a consultation
          </p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <div className="relative group">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-2 block transition-colors group-focus-within:text-primary">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-transparent border-b border-border py-4 pl-8 focus:outline-none focus:border-primary transition-colors font-sans text-sm"
                  />
                </div>
              </div>
              <div className="relative group">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-2 block transition-colors group-focus-within:text-primary">
                  Company
                </label>
                <div className="relative">
                  <Building2 className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                  <input 
                    type="text" 
                    placeholder="Global Corp"
                    className="w-full bg-transparent border-b border-border py-4 pl-8 focus:outline-none focus:border-primary transition-colors font-sans text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="relative group">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-2 block transition-colors group-focus-within:text-primary">
                Enterprise Email
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
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-2 block transition-colors group-focus-within:text-primary">
                Headquarters
              </label>
              <div className="relative">
                <Globe className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                <input 
                  type="text" 
                  placeholder="New York, USA"
                  className="w-full bg-transparent border-b border-border py-4 pl-8 focus:outline-none focus:border-primary transition-colors font-sans text-sm"
                />
              </div>
            </div>

            <div className="pt-8">
              <Link 
                href="/dashboard" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-5 flex items-center justify-center text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500"
              >
                Submit Inquiry
              </Link>
            </div>

            <div className="text-center mt-12">
              <span className="text-muted-foreground text-xs">Already a member? </span>
              <Link href="/login" className="text-primary text-xs uppercase tracking-widest font-bold hover:underline underline-offset-4">
                Access Portal
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

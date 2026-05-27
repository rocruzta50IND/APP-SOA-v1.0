"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Settings, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Visual Side */}
      <div className="hidden md:flex md:w-1/2 bg-muted/30 border-r border-border p-12 flex-col justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <Settings className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold tracking-tight text-xl">ZenithRetail</span>
        </Link>
        
        <div className="space-y-12">
          <h2 className="text-4xl font-bold tracking-tighter leading-tight max-w-md">
            Scale your retail operations globally.
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-4">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h4 className="font-bold text-sm">Enterprise Security</h4>
                <p className="text-xs text-muted-foreground mt-1">Granular RBAC and encrypted data silos for every operation.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Zap className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h4 className="font-bold text-sm">Instant Sync</h4>
                <p className="text-xs text-muted-foreground mt-1">Real-time inventory updates across all global warehouses.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Globe className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h4 className="font-bold text-sm">Global Compliance</h4>
                <p className="text-xs text-muted-foreground mt-1">Automated customs and tax documentation for 150+ countries.</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
          © 2026 ZenithRetail Global Operations
        </p>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div 
          className="w-full max-w-sm space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter">Create account</h1>
            <p className="text-muted-foreground text-sm">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                  First Name
                </label>
                <Input placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                  Last Name
                </label>
                <Input placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                Work Email
              </label>
              <Input type="email" placeholder="name@company.com" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                Company Name
              </label>
              <Input placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                Password
              </label>
              <Input type="password" placeholder="••••••••" />
            </div>
          </div>

          <Button className="w-full h-11" asChild>
            <Link href="/dashboard">
              Create Account <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-primary hover:underline">
              Sign in
            </Link>
          </p>

          <p className="text-[10px] text-center text-muted-foreground leading-relaxed">
            By clicking &quot;Create Account&quot;, you agree to our{" "}
            <Link href="#" className="underline underline-offset-2">Terms of Service</Link> and{" "}
            <Link href="#" className="underline underline-offset-2">Privacy Policy</Link>.
          </p>
        </motion.div>
      </div>
    </main>
  );
}

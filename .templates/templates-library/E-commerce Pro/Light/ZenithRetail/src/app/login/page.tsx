"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Settings, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
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
        
        <div className="space-y-6">
          <h2 className="text-4xl font-bold tracking-tighter leading-tight max-w-md">
            The infrastructure for industrial-grade commerce.
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-md border border-border bg-background shadow-sm">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <p className="text-sm font-medium">SOC2 Type II Certified</p>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-md border border-border bg-background shadow-sm">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <p className="text-sm font-medium">99.99% Uptime SLA</p>
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
            <h1 className="text-3xl font-bold tracking-tighter">Welcome back</h1>
            <p className="text-muted-foreground text-sm">
              Enter your enterprise credentials to access your dashboard.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                Work Email
              </label>
              <Input type="email" placeholder="name@company.com" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                  Password
                </label>
                <Link href="#" className="text-[10px] uppercase tracking-widest font-bold text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input type="password" placeholder="••••••••" />
            </div>
          </div>

          <Button className="w-full h-11" asChild>
            <Link href="/dashboard">
              Sign In <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-primary hover:underline">
              Start your free trial
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}

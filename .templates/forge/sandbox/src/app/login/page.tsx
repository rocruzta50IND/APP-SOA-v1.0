"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, ArrowRight, Code, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10" />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tighter">AuraTalent</span>
          </Link>
          <h1 className="text-3xl font-black tracking-tighter mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Enter your credentials to access your workspace.</p>
        </div>

        <Card className="p-8">
          <CardContent className="p-0 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Password</label>
                  <Link href="#" className="text-[10px] uppercase tracking-widest font-bold text-primary hover:underline">Forgot?</Link>
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <Link href="/dashboard" className="block">
              <Button className="w-full gap-2" size="lg">
                Sign In <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                <span className="bg-zinc-950 px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="gap-2">
                <Code className="w-4 h-4" /> Github
              </Button>
              <Button variant="outline" className="gap-2">
                <Globe className="w-4 h-4" /> Google
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary font-bold hover:underline">Create one</Link>
        </p>
      </motion.div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Glow } from "@/components/ui/Glow";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      <Glow className="top-1/3 left-1/4 w-[500px] h-[500px]" />
      <Glow className="bottom-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-500" />
      
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="w-full max-w-[1000px] grid md:grid-cols-2 gap-0 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden"
      >
        {/* Left Side: Form */}
        <div className="p-8 md:p-12">
          <div className="mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(79,70,229,0.5)]">
              <span className="text-white font-bold">Q</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter mb-2">Create an account.</h1>
            <p className="text-white/50">Join the vanguard of high-performance engineering.</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="John" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Doe" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Work Email</Label>
              <Input id="email" type="email" placeholder="name@company.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Minimum 8 characters" />
            </div>
          </div>

          <Button className="w-full mb-6" asChild>
            <Link href="/dashboard">Create My Account</Link>
          </Button>

          <p className="text-xs text-center text-white/30 px-6">
            By signing up, you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
          </p>
        </div>

        {/* Right Side: Visual */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-primary/5 border-l border-white/10 relative">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Trusted by 10,000+ developers worldwide.
            </h2>
            
            <div className="space-y-8">
              <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Lightning Fast Setup</h4>
                  <p className="text-xs text-white/50">Get started in less than 5 minutes with our universal CLI.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Enterprise Grade</h4>
                  <p className="text-xs text-white/50">Built-in SSO, RBAC, and SOC2 compliance out of the box.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-4 text-white/30 text-xs mt-12">
            <span>Powering:</span>
            <span className="font-bold uppercase tracking-widest">Orbit</span>
            <span className="font-bold uppercase tracking-widest">Nebula</span>
            <span className="font-bold uppercase tracking-widest">Volt</span>
          </div>
          
          <Glow className="bottom-0 right-0 w-[400px] h-[400px]" />
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";
import { Glow } from "@/components/ui/Glow";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      <Glow className="top-1/4 left-1/4 w-[400px] h-[400px]" />
      <Glow className="bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500" />
      
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to home
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="w-full max-w-[1000px] grid md:grid-cols-2 gap-0 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden"
      >
        {/* Left Side: Form */}
        <div className="p-8 md:p-12">
          <div className="mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(79,70,229,0.5)]">
              <span className="text-white font-bold">Q</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter mb-2">Welcome back.</h1>
            <p className="text-white/50">Enter your credentials to access your workspace.</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="grid gap-2">
              <Label htmlFor="email">Work Email</Label>
              <Input id="email" type="email" placeholder="name@company.com" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
          </div>

          <Button className="w-full mb-6" asChild>
            <Link href="/dashboard">Sign In to Quantix</Link>
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-white/30">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
             <Button variant="secondary" className="gap-2">
               {/* GitHub SVG Inline */}
               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
               GitHub
             </Button>
             <Button variant="secondary" className="gap-2">
               {/* Google SVG Inline */}
               <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.764 4.024-1.124 1.124-2.8 2.308-6.076 2.308-5.112 0-9.224-4.112-9.224-9.224s4.112-9.224 9.224-9.224c2.784 0 4.904 1.092 6.4 2.5l2.324-2.324c-2.112-2.008-4.856-3.18-8.724-3.18-7.232 0-13.12 5.888-13.12 13.12s5.888 13.12 13.12 13.12c3.904 0 6.856-1.272 9.16-3.664 2.384-2.384 3.136-5.744 3.136-8.48 0-.8-.064-1.568-.192-2.28h-12.08z"/></svg>
               Google
             </Button>
          </div>

          <p className="text-center text-sm text-white/50">
            Don&apos;t have an account? <Link href="/register" className="text-primary hover:underline">Create an account</Link>
          </p>
        </div>

        {/* Right Side: Visual */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-primary/5 border-l border-white/10 relative">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Accelerate your engineering lifecycle.
            </h2>
            <div className="space-y-4">
              {[
                "10x faster test execution",
                "AI-driven visual regression",
                "Seamless CI/CD integration",
                "SOC2 Type II compliant"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-white/70">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <p className="text-white/80 italic mb-4">
              &quot;Quantix transformed our QA process. We ship 4x more features per week since adopting the platform.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20" />
              <div>
                <p className="text-sm font-bold">Sarah Chen</p>
                <p className="text-xs text-white/40">VP Engineering, Nebula</p>
              </div>
            </div>
          </div>
          
          <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]" />
        </div>
      </motion.div>
    </div>
  );
}

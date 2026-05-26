"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Package2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side: Form */}
      <div className="flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-sm">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors">
            <ArrowLeft className="size-4" />
            Back to Platform
          </Link>

          <div className="mb-8">
            <Package2 className="size-10 text-primary mb-4" />
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground mt-2">Sign in to your B2B account</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Work Email</label>
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            <Link href="/dashboard" className="block">
              <Button className="w-full h-12 rounded-xl text-lg font-bold">
                Sign In
              </Button>
            </Link>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account? <Link href="/register" className="text-primary hover:underline">Create Account</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side: Visual */}
      <div className="hidden lg:block relative bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center">
          <div className="relative z-10">
            <div className="size-64 bg-gradient-to-tr from-primary to-primary/40 rounded-3xl rotate-12 blur-2xl opacity-20 absolute -z-10 animate-pulse" />
            <div className="size-64 border-2 border-primary/20 rounded-3xl rotate-12 flex items-center justify-center backdrop-blur-3xl">
              <div className="size-48 border border-primary/40 rounded-2xl -rotate-6 flex items-center justify-center">
                <Package2 className="size-24 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="mt-20 max-w-md">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">
              Reliability at Global Scale
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              &quot;VeloceMarket Pro has completely transformed how we handle 
              multi-tier pricing across our 50+ regional distributors.&quot;
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="size-10 rounded-full bg-primary/20" />
              <div className="text-left">
                <p className="text-sm font-bold">Marcus Thorne</p>
                <p className="text-xs text-muted-foreground">Director of Logistics, GlobalCorp</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated Background Grid */}
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)]" />
      </div>
    </main>
  );
}
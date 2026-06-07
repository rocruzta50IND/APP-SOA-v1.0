"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layout, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background flex selection:bg-primary/30 selection:text-primary">
      {/* Left Side - Visual/Social Proof */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-muted/30 p-12 border-r border-border">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground group-hover:scale-105 transition-transform">
            <Layout className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight">FlowBoard</span>
        </Link>

        <div className="max-w-md">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Start building better products today.</h2>
          <ul className="space-y-6">
            {[
              "Unlimited public and private boards",
              "Advanced workflow automation engine",
              "Real-time team collaboration tools",
              "Enterprise-grade security and SOC2 compliance"
            ].map((feature, i) => (
              <li key={i} className="flex gap-3 items-start">
                <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <p className="text-muted-foreground leading-snug">{feature}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-sm text-muted-foreground italic">&quot;FlowBoard has completely transformed how our engineering team operates. The density of information and the speed of the UI is unmatched.&quot;</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted border border-border" />
            <div>
              <p className="text-sm font-bold">Sarah Jenkins</p>
              <p className="text-xs text-muted-foreground">CTO at TechScale</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-[400px]"
        >
          <div className="lg:hidden flex flex-col items-center mb-8 text-center">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground group-hover:scale-105 transition-transform">
                <Layout className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">FlowBoard</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
            <p className="text-muted-foreground text-sm">Join 10,000+ teams shipping faster with FlowBoard</p>
          </div>

          <div className="grid gap-4">
            <Button variant="outline" className="w-full h-11">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Sign up with Github
            </Button>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or register with email</span>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1" htmlFor="first-name">
                    First Name
                  </label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="grid gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1" htmlFor="last-name">
                    Last Name
                  </label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="grid gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1" htmlFor="email">
                  Work Email
                </label>
                <Input id="email" placeholder="name@company.com" type="email" />
              </div>
              <div className="grid gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1" htmlFor="password">
                  Password
                </label>
                <Input id="password" placeholder="••••••••" type="password" />
              </div>
            </div>

            <Link href="/dashboard" className="w-full mt-2">
              <Button className="w-full h-11">
                Create Account <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground leading-relaxed">
            By registering, you agree to our{" "}
            <Link href="#" className="underline hover:text-foreground">Terms</Link> and{" "}
            <Link href="#" className="underline hover:text-foreground">Privacy Policy</Link>.
          </p>
        </motion.div>
      </div>
    </main>
  );
}

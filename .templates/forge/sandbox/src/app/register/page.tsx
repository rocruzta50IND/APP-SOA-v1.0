"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen">
      {/* Left Side: Visual/Value Prop */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-black p-12 text-white lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-indigo-950" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="relative z-10 flex items-center gap-2">
          <Zap className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold tracking-tighter">OmniNexus</span>
        </div>

        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl font-bold tracking-tight">Join the engine of modern growth.</h2>
          <ul className="space-y-6">
            {[
              "Unified analytics for all revenue streams.",
              "Enterprise-grade security and compliance.",
              "Smart automation that scales with you.",
              "Dedicated account support from day one."
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-lg opacity-80">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 flex gap-4 text-sm opacity-40">
          <span>&copy; 2026 OmniNexus</span>
          <span>Security Portal</span>
          <span>Global Compliance</span>
        </div>
      </div>

      {/* Right Side: Register Form */}
      <div className="flex w-full flex-col justify-center px-4 lg:w-1/2 lg:px-24">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Create your account</h1>
            <p className="text-muted-foreground">Start your 14-day free trial. No credit card required.</p>
          </div>

          <div className="space-y-6">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
             </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Work email</label>
              <input
                type="email"
                placeholder="john@company.com"
                className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Create a strong password"
                className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex items-start gap-2">
               <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
               <p className="text-xs text-muted-foreground leading-normal">
                 I agree to the <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
               </p>
            </div>

            <Link href="/dashboard" className="block w-full">
              <Button className="w-full py-6 text-lg">
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

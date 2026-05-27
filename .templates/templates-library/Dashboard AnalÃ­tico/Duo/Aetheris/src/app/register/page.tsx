"use client";

import React from "react";
import Link from "next/link";
import { BarChart3, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Sidebar - Testimonial/Info */}
      <div className="hidden md:flex flex-col justify-between w-1/3 bg-black text-white p-12 border-r border-border">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-black" />
            </div>
            <span className="text-lg font-bold tracking-tighter uppercase">Aetheris</span>
          </Link>
          <h2 className="text-4xl font-bold tracking-tighter leading-tight mb-6">
            Join the elite teams building the future.
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-zinc-400 text-sm">
              <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              Real-time behavior tracking
            </li>
            <li className="flex items-center gap-3 text-zinc-400 text-sm">
              <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              Custom AI-driven insights
            </li>
            <li className="flex items-center gap-3 text-zinc-400 text-sm">
              <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              SOC2 Type II security
            </li>
          </ul>
        </div>
        <div>
          <blockquote className="space-y-2">
            <p className="text-lg italic text-zinc-300">
              &quot;Aetheris changed how we look at our data. We went from reactive to predictive in less than a month.&quot;
            </p>
            <footer className="text-sm font-bold tracking-widest uppercase text-zinc-500">
              — Sarah Chen, CTO at Globex
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative">
        <Link href="/" className="absolute top-8 right-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors md:hidden">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tighter mb-2">Create an account</h1>
            <p className="text-muted-foreground">Start your 14-day free trial. No credit card required.</p>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">First Name</label>
                <Input placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Last Name</label>
                <Input placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Work Email</label>
              <Input type="email" placeholder="john@company.com" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Password</label>
              <Input type="password" placeholder="Create a strong password" />
            </div>
            <div className="pt-2">
              <Link href="/dashboard" className="w-full">
                <Button className="w-full">Create Account</Button>
              </Link>
            </div>
          </form>

          <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
            By clicking &quot;Create Account&quot;, you agree to our{" "}
            <Link href="#" className="underline hover:text-foreground">Terms of Service</Link> and{" "}
            <Link href="#" className="underline hover:text-foreground">Privacy Policy</Link>.
          </p>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-foreground hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

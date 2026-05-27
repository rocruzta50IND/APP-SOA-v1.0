"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const spring = { type: "spring" as const, stiffness: 400, damping: 30 };

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background grid grid-cols-1 lg:grid-cols-2">
      
      {/* Left Side: Visual / Info */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-white/5 border-r border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        
        <Link href="/" className="flex items-center gap-2 z-10">
          <div className="w-10 h-10 bg-primary rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)]" />
          <span className="text-2xl font-bold text-white tracking-tighter">NexusMarket Pro</span>
        </Link>

        <div className="space-y-8 z-10">
          <Badge className="bg-primary/20 text-primary border-primary/20">ENTERPRISE OS</Badge>
          <h2 className="text-5xl font-bold tracking-tighter leading-tight text-white">
            Join the Next Generation of Global Commerce.
          </h2>
          <div className="space-y-4">
            {[
              "99.9% Uptime Guarantee",
              "Military-Grade Security",
              "24/7 Dedicated Account Manager"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-white/70">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-muted-foreground z-10">
          © 2026 NexusMarket Pro. Trusted by 500+ Global Enterprises.
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex items-center justify-center p-4 lg:p-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <Link href="/" className="lg:hidden absolute top-8 left-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={spring}
          className="w-full max-w-md"
        >
          <div className="space-y-8">
            <div className="space-y-2 text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-white">Create Account</h1>
              <p className="text-muted-foreground">Start your 14-day premium free trial today.</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 ml-1">First Name</label>
                  <Input placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 ml-1">Last Name</label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1">Work Email</label>
                <Input placeholder="name@company.com" type="email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1">Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="flex items-start gap-2 pt-2">
                <input type="checkbox" className="mt-1 rounded border-white/10 bg-white/5 text-primary focus:ring-primary" id="terms" />
                <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                  I agree to the <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
                </label>
              </div>
            </div>

            <Link href="/dashboard" className="block w-full">
              <Button className="w-full" size="lg">Create Account</Button>
            </Link>

            <p className="text-center lg:text-left text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">Log in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

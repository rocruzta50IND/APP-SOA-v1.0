"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ArrowLeft, User, Mail, Lock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";

const transition = { type: "spring", stiffness: 400, damping: 30 } as const;

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-12 text-foreground">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        className="w-full max-w-lg"
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-[0_0_20px_rgba(79,70,229,0.5)]">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter">Scale with NexusCRM</h1>
          <p className="text-sm text-muted-foreground">Join the elite enterprises mastering their data</p>
        </div>

        <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Create your account</CardTitle>
            <CardDescription>Start your 14-day free trial. No credit card required.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
               <div className="grid gap-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="John Doe" className="pl-10" />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Work Email</label>
                <div className="relative">
                  <Mail className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                  <Input type="email" placeholder="name@company.com" className="pl-10" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</label>
                <div className="relative">
                  <Building2 className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Acme Inc." className="pl-10" />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                  <Input type="password" placeholder="••••••••" className="pl-10" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary" id="terms" />
              <label htmlFor="terms" className="text-xs text-muted-foreground">
                I agree to the <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            <Button className="w-full h-12 text-base" asChild>
              <Link href="/dashboard">Create Enterprise Account</Link>
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t border-white/5 pt-6 text-center">
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-8 flex items-center justify-center gap-6 grayscale opacity-40">
           {["ISO 27001", "GDPR", "SOC2"].map(s => (
             <div key={s} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tighter">
               <div className="h-1.5 w-1.5 rounded-full bg-white" />
               {s} COMPLIANT
             </div>
           ))}
        </div>
      </motion.div>
    </div>
  );
}

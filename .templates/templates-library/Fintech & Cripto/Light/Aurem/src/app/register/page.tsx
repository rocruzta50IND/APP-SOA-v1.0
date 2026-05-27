"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left Side - Hero/Context */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-black text-white border-r border-border relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.1),transparent)]" />
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight relative z-10">
          <ArrowLeft className="w-4 h-4" /> AUREM
        </Link>
        <div className="max-w-md relative z-10">
          <Zap className="w-12 h-12 mb-6 text-white" />
          <h2 className="text-3xl font-bold tracking-tight mb-4">Start Building the Future of Finance</h2>
          <p className="text-white/60 leading-relaxed">
            Join the most advanced fintech infrastructure platform. Deploy your first exchange, manage multi-chain assets, and scale your financial products with ease.
          </p>
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-4 p-4 border border-white/10 rounded-md bg-white/5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-sm font-medium">99.99% Infrastructure Uptime</p>
            </div>
            <div className="flex items-center gap-4 p-4 border border-white/10 rounded-md bg-white/5">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <p className="text-sm font-medium">SOC2 Type II Compliant</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-white/40 tracking-widest uppercase relative z-10">
          © 2026 Aurem Infrastructure Inc.
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-6">
        <motion.div 
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mb-8 lg:hidden flex justify-between items-center">
             <Link href="/" className="text-xl font-bold tracking-tight">AUREM</Link>
          </div>
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0">
              <CardTitle className="text-2xl">Request Access</CardTitle>
              <CardDescription>Enter your details and our team will contact you shortly</CardDescription>
            </CardHeader>
            <CardContent className="px-0 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">First Name</label>
                  <Input placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Last Name</label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Work Email</label>
                <Input type="email" placeholder="john@company.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Company Name</label>
                <Input placeholder="Acme Inc." />
              </div>
              <Link href="/dashboard" className="block w-full">
                <Button className="w-full gap-2">
                  Submit Request <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
            <CardFooter className="px-0 flex flex-col gap-6">
              <p className="text-xs text-muted-foreground leading-relaxed">
                By submitting this request, you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
              </p>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-foreground font-medium hover:underline">Sign in</Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

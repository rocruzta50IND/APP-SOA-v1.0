"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layout, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-[800px] grid md:grid-cols-2 border border-border rounded-md overflow-hidden bg-card shadow-2xl"
      >
        {/* Left Side: Branding/Social Proof */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-muted/50 border-r border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-md">
              <Layout className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">FluxBoard</span>
          </Link>

          <div>
            <h2 className="text-3xl font-black mb-6 leading-tight">Start building better workflows today.</h2>
            <ul className="space-y-4">
              {[
                "Unlimited boards & workspaces",
                "Advanced cycle-time telemetry",
                "Keyboard-first navigation",
                "SSO & Enterprise security"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground font-bold uppercase tracking-widest">
            <span>99.9% Uptime</span>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <span>SOC2 Type II</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-2xl font-black mb-2">Create an account</h1>
            <p className="text-muted-foreground text-sm">Join 50,000+ high-performance teams.</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">First Name</label>
                <Input placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Last Name</label>
                <Input placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Work Email</label>
              <Input type="email" placeholder="john@company.com" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>

            <Link href="/dashboard" className="block w-full">
              <Button className="w-full gap-2 mt-4">
                Create Account <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-card px-2 text-muted-foreground font-bold">Or join with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="gap-2 text-xs">
                <svg className="w-3 h-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.909 3.292-2.09 4.413-1.477 1.408-3.81 2.94-7.84 2.94-6.31 0-11.49-5.11-11.49-11.42s5.18-11.42 11.49-11.42c3.48 0 6.135 1.347 8.01 3.125l2.31-2.31C18.18 1.48 15.65 0 12.48 0 5.86 0 .3 5.38.3 12s5.56 12 12.18 12c3.56 0 6.25-1.17 8.35-3.34 2.16-2.16 2.84-5.21 2.84-7.67 0-.73-.06-1.42-.17-2.07H12.48z"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="gap-2 text-xs">
                <svg className="w-3 h-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                GitHub
              </Button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

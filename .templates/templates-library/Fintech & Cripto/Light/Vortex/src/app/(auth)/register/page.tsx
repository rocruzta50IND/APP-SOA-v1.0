"use client";

import Link from "next/link";
import { ArrowRight, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      {/* Visual Side (Left) */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex">
        <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary-foreground text-primary">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          VORTEX
        </div>

        <div className="space-y-6">
          <blockquote className="space-y-2">
            <p className="text-3xl font-light leading-tight tracking-tight">
              &quot;Joining Vortex was the best decision for our institutional flow. 
              The infrastructure is built for the next decade.&quot;
            </p>
            <footer className="text-sm font-medium uppercase tracking-widest text-muted-foreground/60">
              — Elena Rossi, Head of Trading at NeoVault
            </footer>
          </blockquote>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3" /> SOC2 COMPLIANT
          </div>
          <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
          <span>EST. 2026</span>
        </div>
      </div>

      {/* Form Side (Right) */}
      <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-[400px] space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-black tracking-tighter uppercase">Create account</h1>
            <p className="text-sm text-muted-foreground">
              Begin your journey with the world&apos;s most precise fintech platform.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Full Name
              </label>
              <Input type="text" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Email Address
              </label>
              <Input type="email" placeholder="name@company.com" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Password
              </label>
              <Input type="password" placeholder="••••••••" />
            </div>
            
            <div className="flex items-start gap-2 py-2">
              <div className="mt-1 h-3 w-3 rounded-sm border border-border" />
              <p className="text-[10px] leading-tight text-muted-foreground">
                By creating an account, you agree to our{" "}
                <Link href="#" className="underline">Terms of Service</Link> and{" "}
                <Link href="#" className="underline">Privacy Policy</Link>.
              </p>
            </div>

            <Link href="/dashboard" className="block w-full">
              <Button className="w-full group" type="button">
                Create Account
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-[10px] font-bold tracking-widest text-muted-foreground">
                Institutional Grade
              </span>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-primary hover:underline underline-offset-4"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

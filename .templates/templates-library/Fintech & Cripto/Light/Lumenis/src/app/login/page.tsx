"use client";

import React from "react";
import Link from "next/link";
import { Zap, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* LEFT SIDE - BRANDING & VISUALS */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-muted/30 border-r border-border p-12 relative overflow-hidden">
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="h-8 w-8 bg-primary rounded-sm flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground fill-current" />
            </div>
            <span className="text-lg font-bold tracking-tighter uppercase">Lumenis</span>
          </Link>
          
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight leading-tight">
              Institutional Access <br/> to Global Markets.
            </h1>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Log in to manage your corporate treasury, execute high-volume trades, 
              and monitor real-time risk across all liquidity pools.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 border border-border bg-background p-6 rounded-md max-w-sm">
           <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
           </div>
           <div>
              <p className="text-xs font-bold uppercase tracking-widest">MPC Secured</p>
              <p className="text-[10px] text-muted-foreground leading-tight">
                Your session is protected by Multi-Party Computation protocols.
              </p>
           </div>
        </div>

        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute top-1/4 right-0 w-64 h-64 border border-primary rounded-full"></div>
           <div className="absolute bottom-1/4 left-0 w-96 h-96 border border-primary rounded-full translate-x-[-50%]"></div>
        </div>
      </div>

      {/* RIGHT SIDE - AUTH FORM */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="md:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-sm flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground fill-current" />
              </div>
              <span className="text-lg font-bold tracking-tighter uppercase">Lumenis</span>
            </Link>
          </div>

          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tight">System Login</h2>
            <p className="text-sm text-muted-foreground">Enter your institutional credentials</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground" htmlFor="email">
                Work Email
              </label>
              <Input id="email" placeholder="name@company.com" type="email" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground" htmlFor="password">
                  Password
                </label>
                <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">
                  Forgot?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            
            <Link href="/dashboard" className="block w-full">
              <Button className="w-full h-11 text-xs uppercase tracking-widest font-bold mt-2">
                Sign In to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-background px-2 text-muted-foreground">Or continue with SSO</span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-11 text-xs uppercase tracking-widest font-bold">
               Okta / SAML 2.0
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline">
              Request Onboarding
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

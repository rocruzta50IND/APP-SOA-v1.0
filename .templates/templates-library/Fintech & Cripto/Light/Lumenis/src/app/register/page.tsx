"use client";

import React from "react";
import Link from "next/link";
import { Zap, ArrowRight, CheckCircle2, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* LEFT SIDE - CONTEXT */}
      <div className="hidden md:flex flex-col justify-between w-1/3 bg-primary text-primary-foreground p-12">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-24">
            <div className="h-8 w-8 bg-primary-foreground rounded-sm flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary fill-current" />
            </div>
            <span className="text-lg font-bold tracking-tighter uppercase">Lumenis</span>
          </Link>
          
          <h1 className="text-3xl font-bold tracking-tight mb-12">
            Join the elite tier of <br/> digital finance.
          </h1>

          <ul className="space-y-6">
            {[
              "Direct Market Access to 40+ Venues",
              "Institutional Grade MPC Custody",
              "Automated Compliance Reporting",
              "24/7 Dedicated Support"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary-foreground shrink-0 mt-0.5" />
                <span className="text-sm font-medium opacity-90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 opacity-50">
           <Globe className="h-4 w-4" />
           <span className="text-[10px] font-bold uppercase tracking-widest">Global Infrastructure</span>
        </div>
      </div>

      {/* RIGHT SIDE - REGISTER FORM */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="md:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-sm flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground fill-current" />
              </div>
              <span className="text-lg font-bold tracking-tighter uppercase">Lumenis</span>
            </Link>
          </div>

          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tight">Institutional Onboarding</h2>
            <p className="text-sm text-muted-foreground">Submit your organization&apos;s details for verification</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground" htmlFor="first-name">
                First Name
              </label>
              <Input id="first-name" placeholder="John" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground" htmlFor="last-name">
                Last Name
              </label>
              <Input id="last-name" placeholder="Doe" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground" htmlFor="company">
                Organization Name
              </label>
              <Input id="company" placeholder="Acme Capital Ltd" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground" htmlFor="email">
                Work Email
              </label>
              <Input id="email" placeholder="john@company.com" type="email" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground" htmlFor="role">
                Professional Role
              </label>
              <Input id="role" placeholder="CTO / Portfolio Manager" />
            </div>
            
            <div className="flex items-start gap-2 pt-2">
               <input type="checkbox" id="terms" className="mt-1 h-3 w-3 border-border rounded" />
               <label htmlFor="terms" className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-wide">
                 I agree to the <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
               </label>
            </div>

            <Link href="/dashboard" className="block w-full">
              <Button className="w-full h-11 text-xs uppercase tracking-widest font-bold mt-4">
                Initialize Verification <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Already have an institutional account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

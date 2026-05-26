"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 selection:bg-black selection:text-white">
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-sm text-black/40 hover:text-black transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      <div className="w-full max-w-[400px] space-y-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter">Create an account</h1>
          <p className="text-black/40 text-sm">Start your 14-day free trial. No credit card required.</p>
        </div>

        <Card className="border-black/5 shadow-none">
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">First Name</label>
                <input 
                  type="text" 
                  placeholder="Jane" 
                  className="w-full h-10 px-3 bg-black/5 border border-transparent rounded-md text-sm focus:border-black/10 focus:bg-white outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe" 
                  className="w-full h-10 px-3 bg-black/5 border border-transparent rounded-md text-sm focus:border-black/10 focus:bg-white outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Work Email</label>
              <input 
                type="email" 
                placeholder="jane@company.com" 
                className="w-full h-10 px-3 bg-black/5 border border-transparent rounded-md text-sm focus:border-black/10 focus:bg-white outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Password</label>
              <input 
                type="password" 
                placeholder="Create a strong password" 
                className="w-full h-10 px-3 bg-black/5 border border-transparent rounded-md text-sm focus:border-black/10 focus:bg-white outline-none transition-all"
              />
            </div>
            
            <div className="py-2 space-y-3">
              {[
                "14-day free trial of Professional plan",
                "Unlimited pipelines and contacts",
                "Concierge onboarding included"
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-xs text-black/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                  {benefit}
                </div>
              ))}
            </div>

            <Link href="/dashboard" className="block w-full pt-2">
              <Button className="w-full h-11">Create Account</Button>
            </Link>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-black/40 leading-relaxed px-4">
          By clicking "Create Account", you agree to our{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-black">Terms of Service</Link> and{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-black">Privacy Policy</Link>.
        </p>

        <p className="text-center text-sm text-black/40">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-black hover:underline underline-offset-4">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}

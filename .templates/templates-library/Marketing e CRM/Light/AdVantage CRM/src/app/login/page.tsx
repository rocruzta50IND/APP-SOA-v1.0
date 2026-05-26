"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function LoginPage() {
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
          <h1 className="text-3xl font-bold tracking-tighter">Welcome back</h1>
          <p className="text-black/40 text-sm">Enter your credentials to access your workspace</p>
        </div>

        <Card className="border-black/5 shadow-none">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Email Address</label>
              <input 
                type="email" 
                placeholder="name@company.com" 
                className="w-full h-10 px-3 bg-black/5 border border-transparent rounded-md text-sm focus:border-black/10 focus:bg-white outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Password</label>
                <Link href="#" className="text-[10px] uppercase tracking-widest font-bold text-black/40 hover:text-black">Forgot?</Link>
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full h-10 px-3 bg-black/5 border border-transparent rounded-md text-sm focus:border-black/10 focus:bg-white outline-none transition-all"
              />
            </div>
            <Link href="/dashboard" className="block w-full pt-2">
              <Button className="w-full h-11">Sign In</Button>
            </Link>
          </CardContent>
        </Card>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-black/5" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
            <span className="bg-white px-2 text-black/40">Or continue with</span>
          </div>
        </div>

        <Button variant="outline" className="w-full h-11 gap-2">
          <ShieldCheck className="w-4 h-4" />
          Enterprise SSO
        </Button>

        <p className="text-center text-sm text-black/40">
          Don't have an account?{" "}
          <Link href="/register" className="font-bold text-black hover:underline underline-offset-4">
            Create one for free
          </Link>
        </p>
      </div>
    </div>
  );
}

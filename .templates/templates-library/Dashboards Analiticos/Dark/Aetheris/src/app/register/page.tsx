"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { ArrowLeft, BarChart3, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 font-sans">
      <Link 
        href="/" 
        className="absolute left-8 top-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-50 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>

      <div className="grid w-full max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="hidden lg:block">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-6 w-6 rounded bg-zinc-50" />
            <span className="text-lg font-bold tracking-tighter text-zinc-50 uppercase">Aetheris</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-50 mb-6">
            Join the elite circle of data-driven enterprises.
          </h1>
          <ul className="space-y-4">
            {[
              "Unlimited real-time data streams",
              "Advanced predictive ML models",
              "Enterprise-grade security & compliance",
              "Dedicated 24/7 success engineering"
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-zinc-400">
                <CheckCircle2 className="h-5 w-5 text-zinc-50" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card className="mx-auto w-full max-w-[400px] border-zinc-800 bg-zinc-950 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight text-zinc-50">Create account</CardTitle>
            <CardDescription className="text-zinc-400">
              Start your 14-day free trial today
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500" htmlFor="name">
                Full Name
              </label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500" htmlFor="email">
                Work Email
              </label>
              <Input id="email" type="email" placeholder="name@company.com" />
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500" htmlFor="password">
                Password
              </label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button asChild className="w-full mt-2 h-10 text-sm font-bold uppercase tracking-widest">
              <Link href="/dashboard">Create Account</Link>
            </Button>
            <p className="mt-4 text-center text-xs text-zinc-500 leading-relaxed">
              By clicking create account, you agree to our{" "}
              <Link href="#" className="underline underline-offset-4 hover:text-zinc-50">Terms of Service</Link> and{" "}
              <Link href="#" className="underline underline-offset-4 hover:text-zinc-50">Privacy Policy</Link>.
            </p>
            <p className="mt-2 text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-zinc-50 hover:underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

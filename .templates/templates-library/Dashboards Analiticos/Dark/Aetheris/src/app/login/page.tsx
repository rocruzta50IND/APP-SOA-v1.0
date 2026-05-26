"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { ArrowLeft, BarChart3 } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 font-sans">
      <Link 
        href="/" 
        className="absolute left-8 top-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-50 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>

      <Card className="w-full max-w-[400px] border-zinc-800 bg-zinc-950 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded bg-zinc-50">
            <BarChart3 className="h-6 w-6 text-zinc-950" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-zinc-50">Welcome back</CardTitle>
          <CardDescription className="text-zinc-400">
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500" htmlFor="email">
              Email Address
            </label>
            <Input id="email" type="email" placeholder="name@company.com" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500" htmlFor="password">
                Password
              </label>
              <Link href="#" className="text-xs text-zinc-500 hover:text-zinc-50">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button asChild className="w-full mt-2 h-10 text-sm font-bold uppercase tracking-widest">
            <Link href="/dashboard">Sign In</Link>
          </Button>
          <div className="relative mt-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-950 px-2 text-zinc-500">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" className="h-10 border-zinc-800 hover:bg-zinc-900">
            Enterprise SSO
          </Button>
          <p className="mt-4 text-center text-sm text-zinc-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-zinc-50 hover:underline underline-offset-4">
              Create account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

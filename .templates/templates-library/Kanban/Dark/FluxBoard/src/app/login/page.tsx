"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layout, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-[400px]"
      >
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-md transition-transform group-hover:scale-110">
              <Layout className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-2xl tracking-tight">FluxBoard</span>
          </Link>
        </div>

        <Card className="border-border/50 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-black">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your workspace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
              <Input type="email" placeholder="name@company.com" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
                <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <Input type="password" placeholder="••••••••" />
            </div>
            <Link href="/dashboard" className="block w-full">
              <Button className="w-full gap-2 mt-2">
                Sign In <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground font-medium">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.909 3.292-2.09 4.413-1.477 1.408-3.81 2.94-7.84 2.94-6.31 0-11.49-5.11-11.49-11.42s5.18-11.42 11.49-11.42c3.48 0 6.135 1.347 8.01 3.125l2.31-2.31C18.18 1.48 15.65 0 12.48 0 5.86 0 .3 5.38.3 12s5.56 12 12.18 12c3.56 0 6.25-1.17 8.35-3.34 2.16-2.16 2.84-5.21 2.84-7.67 0-.73-.06-1.42-.17-2.07H12.48z"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                GitHub
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-0">
            <div className="text-sm text-center text-muted-foreground">
              Don&apos;t have an account? <Link href="/register" className="text-primary font-bold hover:underline">Sign up</Link>
            </div>
          </CardFooter>
        </Card>
        
        <p className="text-[10px] text-center text-muted-foreground mt-8 uppercase tracking-widest font-bold">
          FluxBoard v2.0 • Secured by Enterprise Shield
        </p>
      </motion.div>
    </div>
  );
}

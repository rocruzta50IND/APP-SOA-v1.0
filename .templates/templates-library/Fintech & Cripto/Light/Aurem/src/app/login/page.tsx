"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left Side - Hero/Context */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-muted/30 border-r border-border">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <ArrowLeft className="w-4 h-4" /> AUREM
        </Link>
        <div className="max-w-md">
          <Shield className="w-12 h-12 mb-6" />
          <h2 className="text-3xl font-bold tracking-tight mb-4">Enterprise Grade Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            Access your institutional dashboard with multi-factor authentication and hardware key support. Your assets are protected by Aurem&apos;s multi-sig custody engine.
          </p>
          <div className="mt-12 flex items-center gap-4 p-4 border border-border rounded-md bg-background">
            <div className="w-10 h-10 rounded-full bg-muted border border-border" />
            <div>
              <p className="text-sm font-bold">Standard Bank Group</p>
              <p className="text-xs text-muted-foreground">Trusted Institutional Partner</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground tracking-widest uppercase">
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
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent className="px-0 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Email</label>
                <Input type="email" placeholder="name@company.com" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Password</label>
                  <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Forgot password?</Link>
                </div>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Link href="/dashboard" className="block w-full">
                <Button className="w-full gap-2">
                  Sign In <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
            <CardFooter className="px-0 flex flex-col gap-4">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground tracking-widest">Or continue with SSO</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button variant="outline" className="w-full text-xs">Okta</Button>
                <Button variant="outline" className="w-full text-xs">Azure AD</Button>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-foreground font-medium hover:underline">Request access</Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

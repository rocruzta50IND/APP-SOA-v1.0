"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to home
      </Link>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="hidden lg:flex flex-col"
        >
          <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center mb-8 shadow-sm">
            <ShoppingBag className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter mb-6 leading-tight">
            Start scaling your B2B commerce today.
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Join 500+ enterprises managing high-ticket operations with surgical precision.
          </p>
          <div className="space-y-4">
            {[
              "Real-time multi-warehouse sync",
              "Automated global logistics docs",
              "Enterprise-grade wholesale portals",
              "Surgical GraphQL & REST APIs"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                {feature}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Card className="border-border shadow-md max-w-md mx-auto">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>
                Enter your details to start your 14-day free trial.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="first-name">First name</label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="last-name">Last name</label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="email">Work Email</label>
                <Input id="email" type="email" placeholder="name@company.com" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="company">Company Name</label>
                <Input id="company" placeholder="Acme Inc." />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="password">Password</label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <div className="text-[10px] text-muted-foreground leading-relaxed">
                By clicking "Create Account", you agree to our{" "}
                <Link href="#" className="underline underline-offset-2 hover:text-foreground">Terms of Service</Link> and{" "}
                <Link href="#" className="underline underline-offset-2 hover:text-foreground">Privacy Policy</Link>.
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard" className="w-full">
                <Button className="w-full">Create Account</Button>
              </Link>
            </CardFooter>
          </Card>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

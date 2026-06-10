"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layout, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_2px_2px,hsl(var(--foreground))_1px,transparent_0)] bg-[size:40px_40px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 z-10"
      >
        <div className="hidden lg:flex flex-col justify-center space-y-8 pr-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Layout className="text-primary-foreground w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tighter">ZenKanban</span>
          </div>
          
          <h1 className="text-4xl font-black tracking-tight leading-tight">
            The platform for teams that <span className="text-muted-foreground">actually ship.</span>
          </h1>
          
          <div className="space-y-4">
            {[
              "Enterprise-grade security by default",
              "Real-time multiplayer collaboration",
              "Predictive workflow analytics",
              "Unlimited project history"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                {feature}
              </div>
            ))}
          </div>

          <Card className="bg-muted/30 border-border p-6">
            <p className="text-sm italic text-muted-foreground leading-relaxed">
              &quot;ZenKanban has reduced our deployment friction by 60%. It&apos;s the only tool that manages to be both powerful and incredibly simple.&quot;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-border" />
              <div>
                <p className="text-xs font-bold">Alex Rivera</p>
                <p className="text-[10px] text-muted-foreground">Director of Engineering, Flux</p>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group lg:hidden">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          <Card className="border-border shadow-2xl">
            <CardHeader className="space-y-1 pb-8 border-b border-border/50">
              <CardTitle className="text-2xl font-black tracking-tight">Create an account</CardTitle>
              <CardDescription className="text-muted-foreground">
                Get started with ZenKanban today. 14-day free trial included.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="John" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Doe" className="h-11" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company name</Label>
                <Input id="company" placeholder="Acme Inc." className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <Input id="email" type="email" placeholder="john@acme.com" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" className="h-11" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Link href="/dashboard" className="w-full">
                <Button className="w-full h-11 font-bold text-base" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create your workspace
                </Button>
              </Link>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-foreground font-bold hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
          
          <div className="mt-8 text-center lg:text-left">
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              By creating an account, you agree to our{" "}
              <Link href="#" className="underline underline-offset-4 hover:text-foreground transition-colors">Terms of Service</Link>
              {" "}and{" "}
              <Link href="#" className="underline underline-offset-4 hover:text-foreground transition-colors">Privacy Policy</Link>.
              No credit card required to start your trial.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const transition = { duration: 0.2, ease: "easeOut" } as const;

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="flex w-full max-w-5xl gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={transition}
          className="hidden lg:flex flex-1 flex-col"
        >
          <Link href="/" className="flex items-center gap-2 mb-12 group">
            <div className="h-8 w-8 bg-primary rounded-sm transition-transform group-hover:rotate-90" />
            <span className="text-xl font-bold tracking-tighter uppercase text-foreground">TestNexus</span>
          </Link>
          
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
            Deploy your <br />
            <span className="text-muted-foreground">QA Backbone.</span>
          </h1>
          
          <ul className="space-y-6">
            {[
              "Unlimited test concurrency",
              "Real-device cloud access",
              "Automated flakiness resolution",
              "Enterprise SSO integration"
            ].map((item, i) => (
              <li key={i} className="flex items-center text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 mr-3 text-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transition}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="h-8 w-8 bg-primary rounded-sm" />
            <span className="text-xl font-bold tracking-tighter uppercase">TestNexus</span>
          </div>

          <Card className="border-border">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-black uppercase tracking-tight">Register Entity</CardTitle>
              <CardDescription className="text-muted-foreground">
                Provision your enterprise testing environment.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground" htmlFor="first-name">
                    First Name
                  </label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="grid gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground" htmlFor="last-name">
                    Last Name
                  </label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground" htmlFor="email">
                  Work Email
                </label>
                <Input id="email" type="email" placeholder="john@company.com" />
              </div>
              <div className="grid gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground" htmlFor="password">
                  Security Passkey
                </label>
                <Input id="password" type="password" />
              </div>
              
              <Link href="/dashboard" className="w-full">
                <Button className="w-full font-bold uppercase tracking-tight h-11">
                  Provision Account <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <p className="text-[10px] text-center text-muted-foreground leading-relaxed">
                By provisioning, you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Protocol</Link>.
              </p>
            </CardContent>
            <div className="p-6 pt-0 text-center border-t border-border mt-4 py-4">
              <p className="text-xs text-muted-foreground">
                Already registered?{" "}
                <Link href="/login" className="font-bold text-primary hover:underline">
                  Initiate Session
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

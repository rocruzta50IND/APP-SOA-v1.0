"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Package2, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side: Visual */}
      <div className="hidden lg:block relative bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center text-primary-foreground">
          <div className="relative z-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="size-64 border-2 border-white/20 rounded-full flex items-center justify-center relative"
            >
              <div className="absolute inset-0 rounded-full border border-white/10 animate-[ping_3s_linear_infinite]" />
              <ShieldCheck className="size-32 text-white" />
            </motion.div>
          </div>
          
          <div className="mt-20 max-w-md">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="text-primary-foreground/80 leading-relaxed">
              Join the most secure B2B network. Our platform is built to handle 
              complex global operations with zero-compromise security protocols.
            </p>
          </div>
        </div>
        
        {/* Animated Background Details */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Right Side: Form */}
      <div className="flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-sm">
          <Link href="/login" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors">
            <ArrowLeft className="size-4" />
            Back to Login
          </Link>

          <div className="mb-8">
            <Package2 className="size-10 text-primary mb-4" />
            <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
            <p className="text-muted-foreground mt-2">Start scaling your global operations</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <input 
                  type="text" 
                  placeholder="John"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name</label>
              <input 
                type="text" 
                placeholder="Global Logistics Ltd"
                className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Work Email</label>
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-1 size-4 rounded border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                  <div className="size-2 bg-primary rounded-sm opacity-0 group-hover:opacity-20 transition-opacity" />
                </div>
                <span className="text-xs text-muted-foreground leading-tight">
                  I agree to the <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
                </span>
              </label>
            </div>

            <Button className="w-full h-12 rounded-xl text-lg font-bold mt-4">
              Create Account
            </Button>

            <p className="text-center text-sm text-muted-foreground pt-4">
              Already have an account? <Link href="/login" className="text-primary hover:underline">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
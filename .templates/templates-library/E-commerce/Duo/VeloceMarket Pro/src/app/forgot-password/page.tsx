"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Package2, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-muted/30">
      <div className="w-full max-w-md">
        <div className="bg-background border border-border rounded-[2.5rem] p-8 md:p-12 shadow-xl relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-64 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <Link href="/login" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm font-medium">
              <ArrowLeft className="size-4" />
              Back to Login
            </Link>

            <div className="mb-10 text-center lg:text-left">
              <div className="inline-flex size-14 rounded-2xl bg-primary/10 text-primary items-center justify-center mb-6">
                <Mail className="size-7" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Forgot Password?</h1>
              <p className="text-muted-foreground mt-3 text-lg">
                Enter your work email and we&apos;ll send you a recovery link.
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Work Email</label>
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              <Button className="w-full h-12 rounded-xl text-lg font-bold">
                Send Recovery Link
              </Button>

              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">
                  Didn&apos;t receive the email? <button className="text-primary font-bold hover:underline">Resend</button>
                </p>
              </div>
            </form>
          </div>
        </div>
        
        <p className="text-center mt-8 text-sm text-muted-foreground">
          Need immediate assistance? <Link href="#" className="text-primary font-medium hover:underline">Contact Support</Link>
        </p>
      </div>
    </main>
  );
}
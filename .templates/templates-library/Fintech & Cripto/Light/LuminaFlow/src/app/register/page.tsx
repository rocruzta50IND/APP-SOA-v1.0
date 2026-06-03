"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const GoogleIcon = () => (
  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors z-50"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex items-center justify-center p-8 md:p-12 lg:p-24">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <div className="w-10 h-10 bg-primary rounded-sm mb-6" />
            <h1 className="text-3xl font-bold tracking-tight mb-2">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Join 500+ institutions using LuminaFlow for digital asset operations.
            </p>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              <GoogleIcon /> Sign up with Google
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest">
                <span className="bg-background px-2 text-muted-foreground">Or use email</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  First Name
                </label>
                <input 
                  type="text" 
                  placeholder="John"
                  className="w-full px-4 py-2 bg-transparent border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Last Name
                </label>
                <input 
                  type="text" 
                  placeholder="Doe"
                  className="w-full px-4 py-2 bg-transparent border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Work Email
              </label>
              <input 
                type="email" 
                placeholder="name@institution.com"
                className="w-full px-4 py-2 bg-transparent border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-transparent border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all"
              />
            </div>

            <div className="pt-2">
              <p className="text-[10px] text-muted-foreground leading-relaxed mb-4">
                By clicking &quot;Create Account&quot;, you agree to our{" "}
                <Link href="#" className="underline hover:text-primary transition-colors">Terms of Service</Link> and{" "}
                <Link href="#" className="underline hover:text-primary transition-colors">Privacy Policy</Link>.
              </p>
              
              <Link href="/dashboard" className="block">
                <Button className="w-full h-10">
                  Create Account
                </Button>
              </Link>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Already have an account?{" "}
              <Link href="/login" className="text-foreground font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-col justify-between p-12 lg:p-24 bg-muted/30 border-l border-border relative overflow-hidden">
        <div className="relative z-10">
          <Badge>Featured Testimonial</Badge>
          <blockquote className="space-y-6">
            <p className="text-2xl font-medium leading-relaxed tracking-tight italic">
              &quot;LuminaFlow has fundamentally changed how we manage our digital asset liquidity. The surgical precision and institutional focus are unmatched in the current market.&quot;
            </p>
            <footer>
              <div className="font-bold text-lg">Marcus Chen</div>
              <div className="text-sm text-muted-foreground">CTO at Nexus Digital Assets</div>
            </footer>
          </blockquote>
        </div>

        <div className="grid grid-cols-2 gap-8 relative z-10">
          {[
            { label: "Uptime SLA", val: "99.99%" },
            { label: "Monthly Volume", val: "$400B+" },
            { label: "Venues Connected", val: "50+" },
            { label: "Security Audits", val: "SOC2 Type II" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 border border-border rounded-md bg-background/50 backdrop-blur-sm">
              <div className="text-2xl font-bold tracking-tighter mb-1">{stat.val}</div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Abstract background elements for Tier 1: sharp lines/grids */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--border) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        </div>
      </div>
    </div>
  );
}

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-12">
    {children}
  </span>
);

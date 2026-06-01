"use client";

import Link from "next/link";
import { Shield, Sparkles, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex bg-[#0a0a0c] overflow-hidden">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />
      </div>

      {/* Left Side: Brand & Visual (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden border-r border-white/5">
        <div className="relative z-10 w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white">Lumina Talent</span>
            </div>

            <h1 className="text-5xl font-black tracking-tighter text-white mb-6 leading-tight">
              Unlock the <span className="text-primary">Intelligence</span> behind your workforce.
            </h1>
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              Experience the next generation of Talent Management. Built for teams that demand precision, speed, and beautiful design.
            </p>

            {/* Testimonial Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/80 italic mb-4">
                    "Lumina Talent has completely transformed how we handle our global recruitment. The insights are unparalleled and the UI is simply stunning."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Marcus Chen</p>
                      <p className="text-white/40 text-xs">Head of Talent @ TechFlow</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] border border-white/5 rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[200px] h-[200px] border border-white/5 rounded-full" />
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="lg:hidden flex items-center gap-2 mb-12">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">Lumina Talent</span>
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome Back</h2>
              <p className="text-white/40">Enter your credentials to access your dashboard.</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1">Email Address</label>
                <Input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="h-12 bg-white/[0.03] border-white/10"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-medium text-white/70">Password</label>
                  <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                </div>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="h-12 bg-white/[0.03] border-white/10"
                />
              </div>

              <div className="flex items-center space-x-2 ml-1">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0" 
                />
                <label htmlFor="remember" className="text-sm text-white/40 cursor-pointer">Remember me for 30 days</label>
              </div>

              <Link href="/dashboard" className="block w-full">
                <Button className="w-full h-12 text-base font-semibold">
                  Sign In
                </Button>
              </Link>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#0a0a0c] px-2 text-white/30">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="secondary" className="h-11">
                  Google
                </Button>
                <Button variant="secondary" className="h-11">
                  GitHub
                </Button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-white/40">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary font-semibold hover:underline">
                Create Account
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

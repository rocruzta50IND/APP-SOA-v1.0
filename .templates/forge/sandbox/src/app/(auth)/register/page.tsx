"use client";

import Link from "next/link";
import { Shield, Sparkles, CheckCircle2, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
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
              Scale your team with <span className="text-primary">Precision</span> and Style.
            </h1>
            
            <div className="space-y-4 mb-10">
              {[
                "Advanced AI-powered candidate screening.",
                "Real-time collaboration for hiring teams.",
                "Automated onboarding and compliance.",
                "Predictive analytics for workforce planning."
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-white/60">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-lg">{text}</span>
                </div>
              ))}
            </div>

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
                    "Setting up Lumina Talent was the best decision we made for our scale-up phase. It's built for growth."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Sarah Jenkins</p>
                      <p className="text-white/40 text-xs">COO @ VectorSystems</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] border border-white/5 rounded-full" />
        <div className="absolute top-[-5%] right-[10%] w-[150px] h-[150px] border border-white/5 rounded-full" />
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
              <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Create Account</h2>
              <p className="text-white/40">Join 500+ companies using Lumina Talent.</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 ml-1">First Name</label>
                  <Input 
                    placeholder="John" 
                    className="h-12 bg-white/[0.03] border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 ml-1">Last Name</label>
                  <Input 
                    placeholder="Doe" 
                    className="h-12 bg-white/[0.03] border-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1">Work Email</label>
                <Input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="h-12 bg-white/[0.03] border-white/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1">Password</label>
                <Input 
                  type="password" 
                  placeholder="Create a strong password" 
                  className="h-12 bg-white/[0.03] border-white/10"
                />
              </div>

              <div className="pt-2">
                <p className="text-xs text-white/40 mb-6 leading-relaxed">
                  By clicking "Create Account", you agree to our{" "}
                  <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and{" "}
                  <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
                </p>

                <Link href="/dashboard" className="block w-full">
                  <Button className="w-full h-12 text-base font-semibold">
                    Create Account
                  </Button>
                </Link>
              </div>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#0a0a0c] px-2 text-white/30">Or sign up with</span>
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
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

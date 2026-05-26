import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side: Form */}
      <div className="flex flex-col justify-between p-8 md:p-12 lg:p-16 bg-background">
        <div>
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-12">
            <ArrowLeft className="mr-2 size-4" /> Back to home
          </Link>
          
          <div className="max-w-sm mx-auto lg:mx-0">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back</h1>
            <p className="text-muted-foreground mb-8">
              Enter your credentials to access your properties.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Password</label>
                  <Link href="#" className="text-sm text-primary hover:underline">Forgot password?</Link>
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <Link href="/dashboard" className="block w-full pt-4">
                <Button className="w-full h-11 rounded-lg">
                  Sign In <ChevronRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 text-center lg:text-left">
              <p className="text-sm text-muted-foreground">
                Don't have an account? <Link href="#" className="text-primary font-medium hover:underline">Request access</Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-xs text-muted-foreground text-center lg:text-left">
          © 2026 LuminaStay Inc. | Security & Privacy Certified
        </div>
      </div>

      {/* Right Side: Visual */}
      <div className="hidden lg:flex relative bg-secondary overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
        
        {/* Abstract shapes */}
        <div className="absolute top-1/4 right-1/4 size-96 rounded-full bg-primary/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 size-96 rounded-full bg-primary/5 blur-3xl animate-pulse" />

        <div className="relative z-10 max-w-md">
          <div className="size-16 rounded-2xl bg-primary flex items-center justify-center mb-8 shadow-xl">
            <span className="text-primary-foreground font-bold text-2xl">L</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-6 leading-tight">
            "The most intuitive hospitality platform we've ever used."
          </h2>
          <div className="flex items-center space-x-4">
            <div className="size-12 rounded-full bg-muted border border-border" />
            <div>
              <p className="font-bold">Marcus Thorne</p>
              <p className="text-sm text-muted-foreground">Director of Ops, Azure Resorts</p>
            </div>
          </div>
        </div>

        {/* Floating cards UI decoration */}
        <div className="absolute top-12 right-12 w-64 h-32 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-md p-4 shadow-xl -rotate-6">
           <div className="h-2 w-12 bg-muted rounded-full mb-4" />
           <div className="h-4 w-full bg-muted rounded-full mb-2" />
           <div className="h-4 w-3/4 bg-muted rounded-full" />
        </div>
        <div className="absolute bottom-12 left-12 w-64 h-32 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-md p-4 shadow-xl rotate-12">
           <div className="flex justify-between items-center mb-4">
              <div className="size-6 bg-primary/20 rounded-full" />
              <div className="h-2 w-16 bg-muted rounded-full" />
           </div>
           <div className="h-8 w-full bg-primary/10 rounded-lg" />
        </div>
      </div>
    </main>
  );
}

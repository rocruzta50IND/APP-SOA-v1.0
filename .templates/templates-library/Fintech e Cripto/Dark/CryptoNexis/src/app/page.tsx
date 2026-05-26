"use client";

import { Header, Footer } from "@/components/HeaderFooter";
import { Hero } from "@/components/ui/Hero";
import { Features } from "@/components/ui/Features";
import { Pricing } from "@/components/ui/Pricing";
import { motion } from "framer-motion";
import { Shield, Zap, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <Hero />
      
      {/* Social Proof / Logos */}
      <section className="py-12 border-y border-border/50 bg-muted/20">
        <div className="container px-4 md:px-6">
          <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
            Trusted by global financial leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
            {["GOLDMAN", "BLACKROCK", "CITI", "JPMORGAN", "FIDELITY"].map((name) => (
              <span key={name} className="text-xl font-black tracking-tighter">{name}</span>
            ))}
          </div>
        </div>
      </section>

      <div id="features">
        <Features />
      </div>

      {/* CTA Mid Section */}
      <section className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight pb-2">
              Ready to scale your <br />
              crypto operations?
            </h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
              Join the elite institutions building on the Nexis infrastructure. 
              Deploy nodes, manage assets, and execute trades with confidence.
            </p>
            <Link href="/login">
              <button className="h-14 px-10 rounded-full bg-white text-primary font-bold hover:bg-white/90 transition-all flex items-center gap-2">
                Deploy Now <ArrowRight className="size-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <div id="pricing">
        <Pricing />
      </div>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="md:w-1/3 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Frequently Asked <br /> Questions
              </h2>
              <p className="text-muted-foreground">
                Everything you need to know about the platform and our infrastructure.
              </p>
            </div>
            
            <div className="flex-1 space-y-8">
              {[
                {
                  q: "How does CryptoNexis ensure security?",
                  a: "We utilize a multi-layered security stack including MPC-based custody, hardware isolation (HSM), and 24/7 proactive monitoring of all network nodes."
                },
                {
                  q: "Can we migrate our existing fund assets?",
                  a: "Yes, our migration team provides white-glove service to ensure zero-downtime transition of assets and API integrations."
                },
                {
                  q: "Is the infrastructure compliant with global regulations?",
                  a: "Our platform features programmable compliance layers that can be configured to meet MiCA, SEC, and other jurisdictional requirements."
                }
              ].map((item, i) => (
                <div key={i} className="space-y-3 pb-8 border-b border-border/50">
                  <h3 className="text-xl font-bold">{item.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

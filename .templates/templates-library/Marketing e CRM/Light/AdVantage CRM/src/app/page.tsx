"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  BarChart3, 
  Check, 
  Clock, 
  Globe, 
  Layers, 
  Mail, 
  MessageSquare, 
  Shield, 
  Users,
  ChevronDown
} from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="font-bold tracking-tight text-xl">AdVantage</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-black/60">
            <Link href="#features" className="hover:text-black transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-black transition-colors">Pricing</Link>
            <Link href="#faq" className="hover:text-black transition-colors">FAQ</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 text-[10px] uppercase tracking-widest font-bold mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            V13 Now Available
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8"
          >
            Precision CRM for <br />
            Enterprise Teams.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-black/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Streamline your sales pipeline, automate complex workflows, and gain 
            deep insights with the world's most surgical CRM platform.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Request Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-20 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 text-center mb-12">
            Trusted by global marketing leaders
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 items-center opacity-40 grayscale">
            {['Vercel', 'Linear', 'Stripe', 'Framer', 'GitHub', 'Arc'].map((brand) => (
              <div key={brand} className="flex justify-center text-xl font-bold italic tracking-tighter">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Engineered for speed.</h2>
            <p className="text-black/60 text-lg max-w-xl">Built from the ground up to handle high-volume enterprise pipelines without breaking a sweat.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: BarChart3, 
                title: "Advanced Analytics", 
                desc: "Real-time visualization of your entire sales funnel with predictive modeling." 
              },
              { 
                icon: Layers, 
                title: "Workflow Automation", 
                desc: "Automate repetitive tasks with a powerful, logic-driven engine." 
              },
              { 
                icon: Users, 
                title: "Team Collaboration", 
                desc: "Unified communication tools designed specifically for marketing teams." 
              },
              { 
                icon: Shield, 
                title: "Enterprise Security", 
                desc: "Military-grade encryption and granular permission controls." 
              },
              { 
                icon: Globe, 
                title: "Global Infrastructure", 
                desc: "Edge-replicated data ensures sub-50ms latency anywhere in the world." 
              },
              { 
                icon: Mail, 
                title: "Email Integration", 
                desc: "Bi-directional sync with all major enterprise email providers." 
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                {...fadeInUp}
                className="p-8 border border-black/5 rounded-2xl hover:border-black/20 transition-colors"
              >
                <item.icon className="w-6 h-6 mb-6" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-black/60 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Showcase */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-5xl font-bold tracking-tighter mb-8 leading-tight">
              Plugs directly into <br />
              your existing stack.
            </h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              Don't change how you work. AdVantage syncs natively with 100+ tools 
              including Slack, Salesforce, HubSpot, and Microsoft Dynamics.
            </p>
            <div className="space-y-4">
              {['Real-time webhooks', 'GraphQL API', 'Native SDKs'].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-white" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-white/10 rounded-xl border border-white/10 flex items-center justify-center">
                <div className="w-8 h-8 bg-white/5 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Loved by industry leaders.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: "Sarah Chen", 
                role: "VP Marketing @ Linear", 
                quote: "AdVantage has completely transformed how we track our high-ticket sales. The precision is unmatched." 
              },
              { 
                name: "Marcus Thorne", 
                role: "Head of Growth @ Stripe", 
                quote: "The cleanest CRM interface I've ever used. Our team actually enjoys updating their records now." 
              },
              { 
                name: "Elena Rodriguez", 
                role: "Director of Ops @ Vercel", 
                quote: "The API first approach allowed us to build custom internal tools in days, not months." 
              }
            ].map((t, i) => (
              <motion.div 
                key={i} 
                {...fadeInUp}
                className="p-10 border border-black/5 rounded-3xl"
              >
                <p className="text-xl mb-8 leading-relaxed font-medium">"{t.quote}"</p>
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-sm text-black/40">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 bg-black/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Simple, surgical pricing.</h2>
            <p className="text-black/60">Choose the plan that fits your team size.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                name: "Professional", 
                price: "99", 
                features: ["Up to 10 seats", "Standard analytics", "Core automations", "Email support"] 
              },
              { 
                name: "Enterprise", 
                price: "Custom", 
                features: ["Unlimited seats", "Advanced predictive modeling", "Unlimited automations", "24/7 dedicated support", "Custom integrations"] 
              }
            ].map((plan, i) => (
              <Card key={i} className="bg-white border-black/5 p-8 flex flex-col">
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tighter">
                      {plan.price === "Custom" ? "" : "$"}{plan.price}
                    </span>
                    {plan.price !== "Custom" && <span className="text-black/40 text-sm">/mo</span>}
                  </div>
                </div>
                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4" />
                      {f}
                    </div>
                  ))}
                </div>
                <Button variant={i === 1 ? "default" : "outline"} className="w-full">
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How long does implementation take?", a: "Typical enterprise setups are completed within 48 hours with our concierge onboarding service." },
              { q: "Can I export my data at any time?", a: "Yes, you have full ownership of your data. Export to CSV, JSON, or via API in seconds." },
              { q: "Do you offer non-profit discounts?", a: "We offer 50% discount for registered non-profits and educational institutions." }
            ].map((faq, i) => (
              <div key={i} className="border-b border-black/5 pb-6">
                <button className="flex items-center justify-between w-full text-left font-bold py-4 group">
                  {faq.q}
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </button>
                <p className="text-black/60 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center border-t border-black/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold tracking-tighter mb-8 leading-tight">
            Ready to scale your <br />
            marketing operations?
          </h2>
          <Link href="/register">
            <Button size="lg" className="px-12">Join the waitlist</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-black/5 text-black/40 text-[10px] uppercase tracking-widest font-bold">
        <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <span className="text-white text-[8px]">A</span>
            </div>
            <span className="text-black font-bold">AdVantage v13.4.2</span>
          </div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-black">Privacy</Link>
            <Link href="#" className="hover:text-black">Terms</Link>
            <Link href="#" className="hover:text-black">Twitter</Link>
            <Link href="#" className="hover:text-black">GitHub</Link>
          </div>
          <div>© 2026 AdVantage Systems Inc.</div>
        </div>
      </footer>
    </div>
  );
}

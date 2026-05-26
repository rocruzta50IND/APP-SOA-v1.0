"use client";

import { Check } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Foundation",
    price: "$2,500",
    description: "For boutique firms looking to modernize.",
    features: ["Up to 10 users", "1TB Secured Storage", "Basic AI Discovery", "Standard Support"],
    cta: "Start with Foundation",
  },
  {
    name: "Enterprise",
    price: "$8,000",
    description: "The complete legal OS for global firms.",
    features: ["Unlimited users", "10TB Secured Storage", "Advanced Predictive Analytics", "24/7 Priority Support", "Dedicated Success Manager"],
    cta: "Contact Sales",
    popular: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-32 px-4 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Transparent pricing.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Predictable costs for unpredictable legal landscapes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <div 
              key={i}
              className={`p-12 rounded-[2rem] border ${tier.popular ? 'border-white bg-white/5' : 'border-white/10 bg-black'} flex flex-col justify-between`}
            >
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                  {tier.popular && <span className="px-3 py-1 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest">Most Popular</span>}
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-bold tracking-tight">{tier.price}</span>
                  <span className="text-zinc-500 font-medium">/month</span>
                </div>
                <p className="text-zinc-400 mb-8">{tier.description}</p>
                <div className="space-y-4 mb-12">
                  {tier.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="size-5 rounded-full bg-white/10 flex items-center justify-center">
                        <Check className="size-3 text-white" />
                      </div>
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link 
                href="/login"
                className={`w-full py-4 rounded-xl font-bold text-center transition-all ${tier.popular ? 'bg-white text-black hover:bg-zinc-200' : 'bg-zinc-900 text-white border border-white/10 hover:bg-zinc-800'}`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

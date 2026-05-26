import { Check } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Growth",
    price: "$299",
    description: "Perfect for boutique hotels and luxury villas.",
    features: [
      "Up to 10 properties",
      "Core booking engine",
      "Standard analytics",
      "24/7 Email support",
    ],
    cta: "Start with Growth",
    popular: false,
  },
  {
    name: "Enterprise",
    price: "$999",
    description: "The gold standard for multi-property hospitality groups.",
    features: [
      "Unlimited properties",
      "AI Revenue management",
      "Advanced API access",
      "Priority phone support",
      "Custom guest portals",
    ],
    cta: "Scale to Enterprise",
    popular: true,
  },
  {
    name: "Custom",
    price: "Custom",
    description: "Tailored solutions for global hospitality empires.",
    features: [
      "White-label infrastructure",
      "Dedicated account team",
      "On-site training",
      "SLA guarantees",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
            Pricing for <span className="text-muted-foreground">Precision</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that fits your operational scale. No hidden fees, just performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={cn(
                "relative flex flex-col p-8 rounded-3xl border border-border bg-background transition-all",
                tier.popular && "border-primary shadow-2xl scale-105 z-10"
              )}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold tracking-tight mb-2">{tier.name}</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-bold tracking-tighter">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-muted-foreground text-sm">/mo</span>}
                </div>
                <p className="text-muted-foreground text-sm mt-4">{tier.description}</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, j) => (
                  <div key={j} className="flex items-center space-x-3 text-sm">
                    <Check className="size-4 text-primary shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={tier.popular ? "default" : "outline"}
                className="w-full h-12 rounded-xl"
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

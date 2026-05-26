import { cn } from "@/lib/utils";
import { 
  ShieldCheck, 
  Zap, 
  Globe, 
  BarChart3, 
  Users, 
  Layers 
} from "lucide-react";

const features = [
  {
    title: "Instant Global Distribution",
    description: "Sync your inventory across 400+ channels with sub-second latency.",
    icon: Globe,
    className: "md:col-span-2",
  },
  {
    title: "Enterprise Grade Security",
    description: "SOC2 Type II compliant booking infrastructure.",
    icon: ShieldCheck,
    className: "md:col-span-1",
  },
  {
    title: "AI-Powered Revenue",
    description: "Dynamic pricing algorithms that maximize yield automatically.",
    icon: BarChart3,
    className: "md:col-span-1",
  },
  {
    title: "Unified Guest Experience",
    description: "A single view of your guest across all properties and touchpoints.",
    icon: Users,
    className: "md:col-span-2",
  },
  {
    title: "Modular App Architecture",
    description: "Extend your platform with 50+ native integrations and a robust API.",
    icon: Layers,
    className: "md:col-span-1",
  },
  {
    title: "Real-time Operations",
    description: "Coordinate housekeeping and maintenance in real-time.",
    icon: Zap,
    className: "md:col-span-1",
  },
];

export function Features() {
  return (
    <section id="features" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
            Engineered for <span className="text-muted-foreground">High-Ticket</span> Hospitality
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to run a world-class travel operation, without the legacy bloat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-border bg-background p-8 transition-all hover:shadow-lg hover:-translate-y-1",
                feature.className
              )}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="size-12 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="size-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
                
                {/* Visual decoration for bento feel */}
                <div className="mt-8 h-20 bg-muted/20 rounded-xl border border-border/50 overflow-hidden">
                   <div className="w-full h-full bg-gradient-to-br from-transparent to-primary/5 group-hover:to-primary/10 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

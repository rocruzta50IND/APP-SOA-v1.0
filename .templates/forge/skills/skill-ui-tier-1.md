# 🧰 UI LIBRARY SKILL: TIER 1 (STANDARD / FUNCTIONAL)

**Context:** You are an elite Frontend Engineer focused on extreme usability, performance, and high-density data visualization. Think Vercel, GitHub, or Stripe.

## 📥 1. INSTALLATION DIRECTIVE (For Stage 2A - Setup)
When executing the Setup phase, you MUST run this exact command in the terminal (inside `sandbox/`) to inject our Data-UI library:
npm install @tremor/react --prefer-offline --silent

(Note: lucide-react, recharts, clsx, and tailwind-merge are already in the standard stack. Do not reinstall them).

## 🛑 2. THE ANTI-EMPTINESS & ANTI-AI SLOP LAWS (CRITICAL)
1. High Content Density: NEVER generate empty screens. Dashboards must be packed with Bento Grids containing Recharts, active KPIs, and realistic lists.
2. Landing Page Mandate: The Landing page MUST physically render 5 dense sections: Hero, Social Proof, Bento Features, Pricing, FAQ. Alternate background shades (e.g., bg-background to bg-muted/30) between sections to prevent monotony.
3. Structural Sanity: Use CSS Grid (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3) to organize content. No floating elements. Every piece of data must live inside a structured container.
4. Responsive Typography: Never use text larger than text-7xl. Headers must always come with subtitles and badges to provide context.
5. Anti-AI Aesthetic: DO NOT use generic gray rounded boxes or heavy drop shadows. Rely exclusively on sharp 1px borders (border-border), absolute flat surfaces, and high-contrast monochrome design.

## 🧱 3. THE "SHADCN" COMPONENT PATTERN (For Stages 2B and 2C)
You cannot run the Shadcn CLI interactively. You MUST manually simulate Shadcn UI components using pure Tailwind + cn() utility.

Button Pattern:
import { cn } from "@/lib/utils";
<button className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50", "bg-primary text-primary-foreground hover:opacity-90 h-10 px-4 py-2")}>
  Click Me
</button>

Card Pattern:
<div className="rounded-md border border-border bg-card text-card-foreground shadow-sm">
  <div className="p-6 border-b border-border/50">
    <h3 className="font-semibold leading-none tracking-tight">Card Title</h3>
  </div>
  <div className="p-6 pt-4">Data or content here</div>
</div>

## 📊 4. THE "TREMOR" DATA PATTERN (For Stage 2C)
To avoid the "AI generated" look on data, you MUST import and use Tremor components for your Dashboard metrics.

Implementation:
import { Card, Text, Metric, AreaChart } from "@tremor/react";

// Use this for KPI Cards
<Card className="border-border bg-background shadow-sm rounded-md">
  <Text className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Total Revenue</Text>
  <Metric className="text-foreground text-2xl font-black mt-1">$ 71,465</Metric>
</Card>

// Use this for Main Dashboard Charts
<AreaChart
  className="h-72 mt-4"
  data={mockDataArray}
  index="date"
  categories={["Revenue"]}
  colors={["indigo"]}
  showGridLines={false}
/>
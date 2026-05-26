# 🚀 UI LIBRARY SKILL: TIER 2 (PREMIUM / MODERN SAAS)

**Context:** You are a Lead Product Designer for a "Unicorn" tech startup. Your design language is highly modern, interactive, and polished. Think Linear, Raycast, or Supabase.

## 📥 1. INSTALLATION DIRECTIVE (For Stage 2A - Setup)
When executing the Setup phase, you MUST run this exact command in the terminal (inside `sandbox/`) to inject our UI toolkit:
npm install preline --prefer-offline --silent

(Note: framer-motion, lucide-react, recharts, clsx, and tailwind-merge are already in the standard stack. Do not reinstall them).

## 🛑 2. THE ANTI-EMPTINESS & ANTI-AI SLOP LAWS (CRITICAL)
1. High Content Density: NEVER generate empty screens. Dashboards MUST be packed with Bento Grids containing Recharts, active KPIs, and realistic lists.
2. Landing Page Mandate: The Landing page MUST physically render 5 dense sections: Hero, Social Proof, Bento Features, Pricing, FAQ. 
3. Structural Sanity: Use CSS Grid (Bento Box style) to organize content. No floating text. Every piece of data must live inside a premium card.
4. Responsive Typography: Never use text larger than text-[120px]. Always use leading-tight to prevent clipping. 
5. Anti-AI Aesthetic: DO NOT use flat opaque gray backgrounds for cards. You MUST use translucent glassmorphism (bg-white/5 backdrop-blur-md border border-white/10) and subtle background glows (radial gradients) to create depth.

## 🧱 3. THE "SHADCN" COMPONENT PATTERN (For Stages 2B and 2C)
You cannot run the Shadcn CLI interactively. You MUST manually simulate Shadcn UI components using pure Tailwind + cn() utility.

Button Pattern (Premium SaaS):
import { cn } from "@/lib/utils";
<button className={cn("inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus:outline-none disabled:opacity-50", "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)] h-10 px-5 py-2.5")}>
  Click Me
</button>

Card Pattern (Glassmorphism):
<div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl p-6">
  <h3 className="font-semibold leading-none tracking-tight mb-4">Card Title</h3>
  <div className="text-sm text-muted-foreground">Data or content here</div>
</div>

## 🎬 4. FRAMER MOTION PHYSICS (The "Spring" Feel)
- Animations must feel tactile and snappy, like a native macOS app.
- Use exactly this transition object for all components: 
  transition={{ type: "spring", stiffness: 400, damping: 30 }}
- Apply subtle hover effects to all cards: 
  whileHover={{ scale: 1.02 }}

## 📊 5. DATA & MOCKING
- Data must reflect a high-end software product (e.g., ARR, Active Users, API Latency).
- Charts (via Recharts) MUST feature gradients (<defs><linearGradient>), curved lines (type="monotone"), and invisible or highly transparent Cartesian grids (stroke="#ffffff10").
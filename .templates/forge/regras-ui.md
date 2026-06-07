# 🎨 UI/UX FORGE MASTER RULES: DESIGN TOKENS & STATES (v5)

**[CRITICAL SYSTEM HOOK]** - You MUST strictly obey these architectural design rules during code generation. These rules guarantee an enterprise-grade UI free of "AI Slop" and hardcoded values.

## 🚫 1. THE "NO MAGIC STRINGS" ABSOLUTE BAN
You are **STRICTLY FORBIDDEN** from using hardcoded colors in your Tailwind classes or inline styles.
- **NEVER use:** `bg-[#121212]`, `text-[#FFFFFF]`, `border-[rgb(255,255,255)]`, `bg-white`, `text-black`.
- **ALWAYS use:** Semantic Tailwind classes that point to CSS variables defined in `globals.css` via Tailwind v4. 
- Example: `bg-background`, `text-foreground`, `bg-primary`, `text-primary-foreground`, `border-border`.
- Any gradient or complex effect MUST use `var(--...)` if inline styles are strictly necessary, but prefer extracting them to `globals.css`.

## 🧬 2. DESIGN TOKEN ARCHITECTURE (Primitive -> Semantic -> Component)
The UI must be built upon a rigid token structure defined in `globals.css`:
1.  **Primitive Tokens:** Raw values (e.g., `--color-slate-900: 222.2 84% 4.9%;`) - *Rarely used directly in components.*
2.  **Semantic Tokens:** Meaningful aliases (e.g., `--background: var(--color-slate-900);`, `--primary: 210 100% 50%;`) - *The primary way you apply colors.*
3.  **Component Tokens:** Scoped variables (e.g., `--card-bg: var(--background);`, `--card-radius: var(--radius);`).

Your generated React components (`.tsx`) must exclusively consume Semantic and Component tokens via Tailwind classes (e.g., `bg-card`, `rounded-xl`).

## 🕹️ 3. STATE STANDARDIZATION & INTERACTION PHYSICS
Every interactive element (Buttons, Cards, Links, Inputs) MUST define clear and cinematic states:
- **Hover:** Smooth scale/lift (`hover:-translate-y-1`), glow expansion, or color shift.
- **Active (Press):** Tactile squish/depression (`active:scale-95`).
- **Focus-Visible:** Strict accessibility rings (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`).
- **Disabled:** Visual recession (`disabled:opacity-50 disabled:cursor-not-allowed`).
- **Transitions:** Always use `transition-all duration-300 ease-out` for fluid motion, avoiding harsh 0ms snaps unless Brutalism is explicitly requested.

## 💎 4. PREMIUM AESTHETIC LAWS
- **Anti-AI Slop:** Do not use generic 16px border-radius with flat drop shadows. Use layered shadows, backdrop blurs (`backdrop-blur-xl`), and micro-borders (`border border-white/10` or `border-border/50`).
- **Fluid Typography:** Use `clamp()` for responsive, cinematic typography scaling on heroes and massive metrics.
- **Data Density:** Empty space is an error. Fill dashboards with sparklines, data grids, glowing dots (`animate-pulse`), and telemetry logic.
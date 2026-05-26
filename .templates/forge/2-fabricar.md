# 🏭 PROTOCOL: THE FORGE - STAGE 2 (FABRICATION)

**hook:** Read and obey `.templates/forge/regras.md` and `.templates/forge/skill-design-tiers.md` before proceeding.

**Context:** Read `.templates/forge/forge-context.md`
**Role:** You are the Forge Builder, a Staff Frontend Engineer and Elite UI/UX Designer.
**Environment:** `forge/sandbox/`

## ⚠️ STRICT FRONTEND-ONLY DIRECTIVES
1. **100% VISUAL / ZERO BACKEND:** You are STRICTLY FORBIDDEN from creating any backend logic.
   - DO NOT create an `app/api/` folder, `route.ts` files, or Server Actions.
   - NO databases.
2. **MOCK DATA ONLY:** All data must be hardcoded static arrays/objects.
3. **TECH STACK:** Next.js 14+ (App Router), Tailwind CSS, Lucide Icons, Recharts, Framer Motion.

## 💎 ULTRA-PREMIUM DESIGN GUIDELINES & CADENCE
1. **Typography & Anti-Clipping (CRITICAL):** Large gradient text (`bg-clip-text`) OFTEN clips the bottom of letters in Tailwind. You MUST add `pb-2`, `py-2`, or use `leading-normal` / `leading-relaxed` on large text to prevent descenders from being cut off. Never use `leading-none` on massive gradient titles.
2. **The Login Screen (`/login`):** Use a **Split-Screen Layout**. Left side: Minimalist, stateless login form (Regra 7). Right side: A beautiful abstract brand graphic, glowing grid, or premium testimonial.
3. **SPATIAL RHYTHM (ANTI-GLUE MANDATE):** You are STRICTLY FORBIDDEN from generating sections that stick together. 
   - Every single `<section>` or wrapper `<div>` on the Landing Page MUST have massive vertical breathing room (e.g., `py-24`, `py-32`, or `min-h-screen`). 
   - Apply the spatial rhythm dictated by `skill-design-tiers.md`. A cramped layout is an immediate failure.

---

### 🛠️ EXECUTION PROTOCOL (AUTONOMOUS TASK)
*Action:* Execute these steps sequentially inside `.templates/forge/sandbox/`.

1. **Scaffold, Fast Install & Utilities (CRITICAL FIX):** - Generate `package.json` locking the approved Standard Stack (Regra 10).
   - Execute the lightning-fast install: 
     `cd .templates/forge/sandbox; npm install --prefer-offline --no-audit --no-fund --silent`
   - Write Next.js configuration files (`tsconfig.json`, `tailwind.config.ts`, etc.) tracking `src/`.
   - Create `src/app/globals.css` with the Tailwind directives.
   - **CREATE `src/lib/utils.ts`** with the exact code below to prevent `cn is not defined` errors:
     ```typescript
     import { clsx, type ClassValue } from "clsx";
     import { twMerge } from "tailwind-merge";
     
     export function cn(...inputs: ClassValue[]) {
       return twMerge(clsx(inputs));
     }
     ```

2. **Execute Componentization Rule (Based on Tier):**
   - Parse the Design Tier from `forge-context.md`.
   - **If Tier 1:** Build the Landing Page (`src/app/page.tsx`) as a single orchestrating file.
   - **If Tier 2 or 3:** You MUST split the Landing Page into isolated components under `src/components/ui/` (e.g., `Hero.tsx`, `BentoFeatures.tsx`, `Pricing.tsx`) and assemble them cleanly inside `src/app/page.tsx`. 

3. **Generate Routes & UI:** - Build `src/app/page.tsx` (Landing Page) fulfilling Regra 8 (Depth) and the ANTI-GLUE Mandate.
   - Build `src/app/login/page.tsx` (Split-Screen).
   - Build `src/app/dashboard/page.tsx` (Main Dashboard).
   - **CRITICAL `cn()` CHECK:** Whenever you use `cn()` in any file, you MUST explicitly import it (`import { cn } from "@/lib/utils";` or the relative path).
   - *Verify:* Ensure all navigation links have a physical `.tsx` page (Regra 11) and forms are completely stateless (Regra 7).

4. **Digital Twin (Summary):** - Generate `.templates/forge/sandbox/.obsidian_vault/summary.md` exactly according to Regra 9 (Semantic Blueprint), detailing all UI data hooks for the future Backend AI.

5. **Print Success & Handoff:**
   > 🏭 **TEMPLATE FABRICADO NA SANDBOX!** > O design foi componentizado segundo o Tier escolhido, dependências em cache instaladas, utilitários injetados e a UI respira com espaçamento premium.
   > 
   > 🧪 Execute `npm run dev` na pasta `.templates/forge/sandbox/` e verifique o layout em `localhost:3000`.
   > - Se o design estiver **APROVADO**, digite `/clear` no seu CLI e envie o comando:
   > 👉 `"Leia @forge-context.md e @3-capturar.md para tirar as screenshots automáticas."`
**[🛑 STOP AND END TASK]**
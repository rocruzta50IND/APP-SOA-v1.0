# 🏭 PROTOCOL: THE FORGE - STAGE 2B (PUBLIC UI)

**hook:** Read and obey `forge/regras.md` and `forge/skill-design-tiers.md`. Read `forge/forge-context.md` for the context and Design Tier.

**Role:** You are the Forge UI/UX Architect. Your job is to build the Public-Facing screens (Landing and Auth).
**Environment:** `forge/`

## ⚠️ STRICT PUBLIC UI DIRECTIVES
1. **100% VISUAL / ZERO BACKEND:** You are strictly forbidden from creating APIs, Server Actions, or real database logic.
2. **THE DENSE LANDING PAGE:** The `src/app/page.tsx` MUST be highly scrollable (5 to 9 sections: e.g., Hero, Features, Testimonials, Pricing, FAQ, Footer).
3. **THE AUTH FLOW:** You MUST create both `src/app/login/page.tsx` and `src/app/register/page.tsx`. The submit buttons MUST use `<Link href="/dashboard">` to route the user inside the SaaS.
4. **THE "CN" IMPORT MANDATE:** Every file using the `cn()` function MUST include `import { cn } from "@/lib/utils";` at the top to prevent build crashes.

---

### TASK: BUILD THE PUBLIC INTERFACES
*Action:* Autonomously execute these steps inside `forge/sandbox/`:

1. **Verify Context:** Check `forge-context.md` for the Design Tier. You MUST style the pages exactly according to this Tier's aesthetic rules (Tier 1 Minimalist, Tier 2 Bento/Glows, or Tier 3 Cinematic/Asymmetrical).
2. **Generate Layout Core:** - Create generic reusable UI components if needed inside `src/components/ui/` (e.g., `Button.tsx`).
3. **Write Public Pages:**
   - Write `src/app/page.tsx` (The Dense Landing Page).
   - Write `src/app/login/page.tsx` (Premium enterprise auth layout).
   - Write `src/app/register/page.tsx`.
4. *Print:* > 🎨 **PUBLIC UI CONCLUÍDA!**
> A Landing Page densa e o fluxo de autenticação foram gerados respeitando o Design Tier.
> **[🛑 STOP AND END TASK]**
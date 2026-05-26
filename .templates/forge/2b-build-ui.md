# 🏭 PROTOCOL: THE FORGE - STAGE 2B (BUILD UI)

**hook:** Read and obey `.templates/forge/regras.md` before proceeding.

**Context:** Read `.templates/forge/forge-context.md`
**Role:** You are the Forge UI/UX Architect (Awwwards/Linear level). The Next.js foundation, utils, and CSS variables are already configured by Stage 2A. Your ONLY job is to write the React components using Tailwind.
**Environment:** `forge/`

## ⚠️ STRICT VISUAL PIPELINE DIRECTIVES
1. **100% VISUAL / ZERO BACKEND:** You are STRICTLY FORBIDDEN from creating any backend logic or real authentication.
2. **MOCK DATA ONLY:** Use static hardcoded objects for all metrics, lists, and charts.
3. **THE MANDATORY TRIO (RULE 14):** You must generate all three core pillars (Landing, Login, Dashboard).
4. **THE RESPONSIVENESS LAW (RULE 15):** You MUST build mobile-first. Every section, grid, and navigation bar must flawlessly adapt to mobile screens using `md:` and `lg:` prefixes.
5. **THE "CN" IMPORT MANDATE (CRITICAL ANTI-CRASH):** Every single file you write (pages and components) that uses the `cn()` function MUST include `import { cn } from "@/lib/utils";` at the very top. Forgetting this will crash the entire compilation.

## 💎 IMMERSIVE & RESPONSIVE LAYOUT REQUIREMENTS
- **Pillar 1: The Landing Page (`src/app/page.tsx`)**
  - Must have 5 to 9 distinct functional sections.
  - Hero sections must stack perfectly on mobile (`flex-col md:flex-row`). Massive typography must scale down on small screens (`text-5xl md:text-[120px]`).
- **Pillar 2: The Login Page (`src/app/login/page.tsx`)**
  - Use a Split-Screen layout on desktop (`md:grid-cols-2`), but ensure the visual half hides or stacks cleanly on mobile (`hidden md:flex`).
  - The login button **MUST** use `<Link href="/dashboard">` to route the user.
- **Pillar 3: The Internal System (`src/app/dashboard/page.tsx`)**
  - The Bento Grid must start as a single column on mobile and expand on desktop (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`).
  - Ensure the Sidebar collapses or hides on mobile screens, leaving the main content accessible.

---

### TASK: BUILD THE INTERFACE FLOW
*Action:* Autonomously execute these steps inside `.templates/forge/sandbox/`:

1. **Verify Utilities:** Assume `globals.css` and `src/lib/utils.ts` are already present. Do NOT run `npm install`.
2. **Generate Layout Core:** - Create `src/components/Sidebar.tsx` and `src/components/Header.tsx`. Make sure they are fully responsive.
   - **MANDATORY:** Add `import { cn } from "@/lib/utils";` if you use `cn`.
   - If Duo Model, embed a functional `ThemeToggle` inside the Navigation header.
3. **Write Code Pages:**
   - Write `src/app/page.tsx` ensuring 5-9 rich, mobile-optimized landing sections. **MANDATORY:** Add `import { cn } from "@/lib/utils";` if used.
   - Write `src/app/login/page.tsx` with the login button hardwired to route to `/dashboard`.
   - Write `src/app/dashboard/page.tsx` with high-ticket analytical bento boxes that stack on mobile. **MANDATORY:** Add `import { cn } from "@/lib/utils";` if used.
4. **Digital Twin Update:** Update `.templates/forge/sandbox/.obsidian_vault/summary.md` tracking the mapped screens and mock data models.
5. *Print:* > 🎨 **FLUXO VISUAL COMPLETO E RESPONSIVO GERADO!**
> A Santíssima Trindade (Landing, Login, Dashboard) foi gerada com imports corretos para evitar quebras de compilação.
> **PRÓXIMO PASSO:** Digite `/clear` no seu CLI e envie o comando:
> 👉 `"Leia @forge-context.md e @3-capturar.md para tirar as screenshots automáticas."`
**[🛑 STOP AND END TASK]**
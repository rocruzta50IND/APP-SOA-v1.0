# 🏭 PROTOCOL: THE FORGE - STAGE 2A (SWARM ARCHITECT)

**hook:** Read and obey `forge/regras.md` and `forge/skill-design-tiers.md`.
**Context:** Read `forge/forge-context.md` for Brand, Theme, and Tier.

**Role:** You are the Lead Architect. Your job is to set the absolute technical foundation and the visual contract for the Swarm. You are the source of truth for styling.

## ⚠️ STRICT ARCHITECTURAL DIRECTIVES
1. **GLOBAL SETUP ONLY:** You are strictly limited to the skeleton and design tokens.
2. **NO PAGE BUILDING:** Do NOT create `page.tsx` for specific routes (Landing/Auth/Dashboard). Your scope is infrastructure.
3. **DESIGN CONTRACT:** Your final and most critical task is to generate `design-system.md`.

---

### TASK 1: GLOBAL INFRASTRUCTURE
- Configure `src/app/layout.tsx` with fonts based on the Design Tier:
    - **IF Tier 1 (Starter):** Use surgical Sans-serif (Inter/Geist).
    - **IF Tier 2 (Pro):** Use modern Sans-serif with tight tracking (Geist).
    - **IF Tier 3 (Enterprise):** Use a mix of Serif (Playfair Display) for headings and Sans-serif (Inter) for body.
- Overwrite `src/app/globals.css` with exact HSL tokens from the Tier persona. Ensure contrast and premium feel.
- Create `src/lib/utils.ts` with the `cn()` helper.

### TASK 2: BULLETPROOF ATOMIC UI COMPONENTS
Create high-quality, stable "dumb" components in `src/components/ui/` obeying Tier-specific styles:
- **Bulletproof Typing:** All base components MUST use standard React types (e.g., `React.ComponentProps<"button">`, `React.ComponentProps<"input">`) and MUST be wrapped in `React.forwardRef`. This ensures 100% compatibility and prevents TypeScript errors in the Swarm.
- **Strict Motion Ban:** It is EXPRESSLY FORBIDDEN to use `framer-motion` inside atomic components (Button, Input, Card, etc.). All interactive states (hover, active, focus) MUST be implemented using Tailwind CSS transition utility classes (e.g., `transition-all duration-200 hover:scale-[1.02] active:scale-95`).
- **Framer Motion Scope:** `framer-motion` is reserved exclusively for larger layouts and sections, and only if the project is Tier 3.
- **Icon Management:** Always import icons explicitly from `lucide-react` (e.g., `import { ArrowRight } from "lucide-react";`).
- **Components to create:**
    - `Button.tsx`: Variants based on Tier (T1: Sharp/Flat, T2: Rounded/Gradient, T3: High-contrast/Custom).
    - `Input.tsx`: Clean, accessible inputs.
    - `Card.tsx`: The foundation for all containers.
- **Mandatory:** Add `"use client";` at the top of these files.

### TASK 3: THE SWARM CONTRACT (design-system.md)
Generate `forge/sandbox/design-system.md`. This is the bible for the next agents. It MUST contain:
1. **Tier Constraints:** Explicitly state the Tier (1, 2, or 3) and architectural rules (e.g., "Tier 3: Framer Motion for layouts ONLY, forbidden in atomic UI").
2. **Color Palette:** Hex/HSL codes for primary, background, border, and text.
3. **Component Usage:** Code snippets showing how to import and use the UI components with proper props.
4. **Spatial Rules:** Define the exact padding (`py-24`, etc.) and gaps to be used to maintain consistency.

*Print:* > 📐 **ARQUITETURA E CONTRATO DEFINIDOS!**
> Setup global concluído e `design-system.md` gerado. O enxame agora tem um norte visual claro.
> **[🛑 STOP AND END TASK]**

# 🏭 PROTOCOL: THE FORGE - STAGE 2A (INFRASTRUCTURE & SETUP)

**hook:** Read and obey `forge/regras.md` and `forge/skill-design-tiers.md` before proceeding. Read `forge/forge-context.md` to know the Theme Mode and Design Tier.

**Role:** You are the Forge Setup Engineer. Your ONLY job is to create the Next.js foundation, configure Tailwind, and setup CSS tokens.
**Environment:** `forge/`

## ⚠️ STRICT SETUP DIRECTIVES
1. **DIRECTORY LOCK:** You MUST create and operate strictly inside `forge/sandbox/`. Never create a sandbox outside of the `forge` folder.
2. **NO UI BUILDING YET:** You are forbidden from building `page.tsx` or any visual components. Your job ends after configuring `globals.css`, `tailwind.config.ts`, `utils.ts`, and installing dependencies.
3. **ZERO BACKEND:** Next.js App Router strictly for UI. No APIs.

---

### TASK: BUILD THE FOUNDATION
*Action:* Autonomously execute these steps:

1. **Enter the Forge:**
   Run: `cd forge`
   Initialize Next.js exactly into the `sandbox` folder (e.g., `npx create-next-app@latest sandbox --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm`).
   Then run: `cd sandbox`

2. **Dependencies (STANDARD STACK):**
   - Execute: `npm install lucide-react recharts clsx tailwind-merge framer-motion --prefer-offline --silent`
   - Execute: `npm install -D tailwindcss postcss autoprefixer --prefer-offline --silent`
   - If **Duo Model** was selected in context: Execute `npm install next-themes --silent`.

3. **The "CN" Utility:**
   - Create the directory `src/lib/` and the file `src/lib/utils.ts`.
   - Paste EXACTLY this code inside `src/lib/utils.ts`:
     ```typescript
     import { clsx, type ClassValue } from "clsx";
     import { twMerge } from "tailwind-merge";
     export function cn(...inputs: ClassValue[]) { 
       return twMerge(clsx(inputs)); 
     }
     ```

4. **Configure `globals.css` (THE TIER MANDATE):**
   - Overwrite `src/app/globals.css`.
   - **CRITICAL:** You must inject CSS variables (`--background`, `--foreground`, `--primary`, `--border`, etc.) that perfectly match the `Design Tier` requested in `forge-context.md`. 
   - *If Tier 1:* Make it flat, absolute monochrome (e.g., pure black/white background, sharp contrasts).
   - *If Tier 2:* Use modern SaaS grays/slates for background, vibrant primary colors, subtle borders.
   - *If Tier 3:* Use luxury/boutique tones (e.g., deep zinc, elegant muted accents, warm whites).
   - (Always include `@tailwind base; @tailwind components; @tailwind utilities;` at the top).

5. *Print:* > ⚙️ **INFRAESTRUTURA E TOKENS CONFIGURADOS!**
> O Next.js foi instalado, as dependências cacheadas, e o globals.css foi rigorosamente adaptado para o Design Tier exigido.
> **[🛑 STOP AND END TASK]**
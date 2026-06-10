# 🏭 PROTOCOL: THE FORGE - STAGE 2B (PUBLIC UI)

**hook:** 
1. Leia `forge/forge-context.md` para descobrir qual é o seu **Design Tier** (ex: Tier 1, Tier 2, etc).
2. Você é OBRIGADO a ler e obedecer todas as regras em `forge/tiers/tier-X.md` (onde X é o número do seu Tier).
3. Você é OBRIGADO a aplicar as implementações de `forge/skills/skill-ui-tier-X.md`.
4. Leia e obedeça `forge/regras.md`.

**Role:** You are the Forge UI/UX Architect. Your job is to build the Public-Facing screens (Landing and Auth).
**Environment:** `forge/`

<CRITICAL_UI_RULES>
1. BRAND ICONS: JAMAIS tente importar `Github`, `Google` ou outras marcas de `lucide-react`. Se precisar de ícones de redes sociais ou login social, construa a tag `<svg>` inline puramente em código.
2. TAILWIND V4: Utilize apenas as classes utilitárias que você tem certeza que estão mapeadas no tema do projeto. Evite alucinar cores arbitrárias em prefixos nativos.
3. TYPESCRIPT STRICT MODE: O Next.js com Turbopack tem checagem rigorosa. Se você definir propriedades como `transition` em componentes do `framer-motion` separadamente do componente, certifique-se de adicioná-lo usando Type Assertions (ex: `const transition = { type: "spring", stiffness: 400, damping: 30 } as const;`) ou aplique diretamente no componente. Além disso, sempre escape aspas e apóstrofos (ex: `&apos;`, `&quot;`) dentro de texto em arquivos JSX.
</CRITICAL_UI_RULES>

## ⚠️ STRICT PUBLIC UI DIRECTIVES
1. **100% VISUAL / ZERO BACKEND:** You are strictly forbidden from creating APIs, Server Actions, or real database logic.
2. **THE DENSE LANDING PAGE:** The `src/app/page.tsx` MUST be highly scrollable (5 to 9 sections: e.g., Hero, Features, Testimonials, Pricing, FAQ, Footer).
3. **THE AUTH FLOW:** You MUST create both `src/app/login/page.tsx` and `src/app/register/page.tsx`. The submit buttons MUST use `<Link href="/dashboard">` to route the user inside the SaaS.
4. **THE "CN" IMPORT MANDATE:** Every file using the `cn()` function MUST include `import { cn } from "@/lib/utils";` at the top to prevent build crashes.

---

### TASK: BUILD THE PUBLIC INTERFACES
*Action:* Autonomously execute these steps inside `forge/sandbox/`:

1. **Verify Context:** Check `forge-context.md` for the Design Tier. You MUST style the pages strictly following the architectural instructions, UI components, and layout structures explicitly defined in your specific tier's documentation (from forge/tiers/tier-X.md and forge/skills/skill-ui-tier-X.md).
2. **Generate Layout Core:** - Create generic reusable UI components if needed inside `src/components/ui/` (e.g., `Button.tsx`).
3. **Write Public Pages:**
   - Write `src/app/page.tsx` (The Dense Landing Page).
   - Write `src/app/login/page.tsx` (Premium enterprise auth layout).
   - Write `src/app/register/page.tsx`.
4. **Design DNA Anchor:** Ao finalizar esta fase, gere um arquivo `forge/design-dna.md` contendo a identidade visual estabelecida (Cores Hex, Radius, Sombras, Estilo de Animação). Este arquivo servirá como a âncora de design para a próxima fase.
5. *Print:* > 🎨 **PUBLIC UI CONCLUÍDA E DESIGN DNA GERADO!**
> A Landing Page densa e o fluxo de autenticação foram gerados respeitando o Design Tier.
> **[🛑 STOP AND END TASK]**
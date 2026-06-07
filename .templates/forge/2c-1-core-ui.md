# 🏭 PROTOCOL: THE FORGE - STAGE 2C-1 (CORE DASHBOARD & SHELL)

**hook:** Read and obey `forge/regras.md` and `forge/skill-design-tiers.md`. Read `forge/forge-context.md` to know the 5 Internal Routes. LEIA OBRIGATORIAMENTE o arquivo `forge/design-dna.md` para replicar EXATAMENTE a mesma identidade visual da Landing Page.

**Role:** You are the Forge Internal UI Architect.
**Environment:** `forge/`

<CRITICAL_UI_RULES>
1. BRAND ICONS: JAMAIS tente importar `Github`, `Google` de `lucide-react`. Use SVGs inline.
2. TYPESCRIPT STRICT MODE: Sempre use asserção em objetos de transição do framer-motion se isolados.
</CRITICAL_UI_RULES>

## ⚠️ STRICT INTERNAL UI DIRECTIVES (PHASE 2C-1)
1. **VISUAL SHELL ONLY:** No APIs. No Backend.
2. **THE CORE MANDATE:** Build the App Shell (Sidebar/Header) and the FIRST main page (usually `/dashboard`).
3. **REALISTIC MOCK DATA:** Use `recharts` for charts and Metric Cards with trend arrows in the dashboard.

---

### TASK: BUILD CORE DASHBOARD & SHELL
*Action:* Autonomously execute these steps inside `forge/sandbox/`:

1. **Verify Context & Anchor:** Read `forge-context.md` and `forge/design-dna.md`.
2. **Generate App Shell:** Create `src/components/ui/Sidebar.tsx` and `src/components/ui/Header.tsx`. Make navigation links point to the 5 routes.
3. **Write the Main Dashboard Page:** Create `src/app/[dashboard_route]/page.tsx`. Populate with Bento Grids and Recharts.
4. *Print:* > 🎨 **FASE 2C-1 CONCLUÍDA!**
> O App Shell e o Core Dashboard foram gerados. Preparando para gerar as páginas secundárias.
> **[🛑 STOP AND END TASK]**
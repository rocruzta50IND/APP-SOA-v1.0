# 🏭 PROTOCOL: THE FORGE - STAGE 2C (INTERNAL SaaS UI)

**hook:** Read and obey `forge/regras.md` and `forge/skill-design-tiers.md`. Read `forge/forge-context.md` to know the 5 Internal Routes deduced for this project and the Design Tier.

**Role:** You are the Forge Internal UI Architect. Your job is to build the 5 internal pages of the SaaS.
**Environment:** `forge/`

## ⚠️ STRICT INTERNAL UI DIRECTIVES
1. **100% VISUAL / ZERO BACKEND:** You are strictly forbidden from creating APIs, Server Actions, or using `useState` for complex logic. The UI must be "dumb" but beautiful.
2. **THE 5-PAGE MANDATE:** You MUST create the 5 physical internal pages defined in `forge-context.md` (e.g., `src/app/dashboard/page.tsx`, etc.).
3. **REALISTIC MOCK DATA (CRITICAL):** - **Charts:** You MUST use `recharts` to build at least one AreaChart, BarChart, or PieChart in the main dashboard.
   - **KPIs:** Use Metric Cards with numbers and positive/negative trend indicators (e.g., `+12%`).
   - **Tables/Grids:** Any list or data table MUST be populated by a static array with at least 5 realistic mock items related to the niche.
4. **THE APP SHELL:** Internal pages must be wrapped in a consistent layout (e.g., a Sidebar and a Top Header).
5. **THE "CN" IMPORT MANDATE:** Every file using the `cn()` function MUST include `import { cn } from "@/lib/utils";` at the top.

---

### TASK: BUILD THE INTERNAL SaaS
*Action:* Autonomously execute these steps inside `forge/sandbox/`:

1. **Verify Context:** Check `forge-context.md` for the Design Tier and the 5 Internal Routes.
2. **Generate App Shell:** - Create `src/components/ui/Sidebar.tsx` and `src/components/ui/Header.tsx` (or similar layout components). Make sure the navigation links point to the 5 routes you are about to create.
3. **Write the 5 Internal Pages:**
   - Create the `.tsx` files for ALL 5 internal routes inside `src/app/`.
   - Populate them with Bento Grids, Recharts, and realistic mock data according to the Design Tier aesthetic rules.
4. *Print:* > 🎨 **INTERNAL UI CONCLUÍDA!**
> As 5 telas do sistema interno foram geradas com dados realistas, gráficos e layout consistente com o Design Tier.
> **[🛑 STOP AND END TASK]**
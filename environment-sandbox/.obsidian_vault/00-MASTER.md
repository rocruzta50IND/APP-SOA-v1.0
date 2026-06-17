## ⚓ MASTER INDEX (TOPOLOGICAL MAP) - [PROJECT NAME]

**Project:** [NAME]

**Description:** [SHORT_SCOPE_DESCRIPTION]

---

## 🌐 1. GUIDELINES AND STACK

- **Framework:** [E.G.: NEXT.JS]
- **Languages:** [E.G.: TYPESCRIPT]
- **UI:** [E.G.: TAILWIND / SHADCN]
- **Architecture:** SOA v13.0.0.0 with Digital Twin and Auto-Healing

---

## 🗺️ 2. DOMAIN MAPPING (MONOREPO ROOT)

*This section establishes the architecture entry points. The Agent MUST use the CLI Triggers below to initiate recursive navigation. It is strictly FORBIDDEN to use direct shortcuts to the source code from here.*

- **[APP_WEB]** (Main Frontend): [RESPONSIBILITY]
    - **Root Context (Visual):** `[[web-context]]`
    - **CLI Trigger:** `.obsidian_vault/apps/web/web-context.md`
    - **Target Directory:** `apps/web/` *(Warning: Mandatory Cascade Descent)*

- **[PACKAGE_DATABASE]** (Data Logic and ORM): [RESPONSIBILITY]
    - **Root Context (Visual):** `[[database-context]]`
    - **CLI Trigger:** `.obsidian_vault/packages/database/database-context.md`
    - **Target Directory:** `packages/database/` *(Warning: Mandatory Cascade Descent)*

- **[APP_API_OR_WORKER]** (Optional Domain): [RESPONSIBILITY]
    - **Root Context (Visual):** `[[api-context]]`
    - **CLI Trigger:** `.obsidian_vault/apps/api/api-context.md`
    - **Target Directory:** `apps/api/` *(Warning: Mandatory Cascade Descent)*

---

## 🔗 3. RESOLUTION LOG AND GLOBAL STATE

**Global System Status:** `[ STABLE | PROPAGATION PENDING (Surgery Mode Active) ]`
*Note: If the status is PROPAGATION PENDING, the Guardian will tolerate Compiler errors in domains unrelated to the current mission.*

**Mission Status:** Mission [X]

**Execution Queue (Current Domain Island):**
*List of files being worked on in the current chat to keep the graph edge pointed to "CODE".*

- `apps/[PATH]/[FILE]` <-> **Visual Sub-anchor:** `[[[ANCHOR].md]]` | **CLI Trigger:** `.obsidian_vault/[PATH]/[ANCHOR].md`

---

### 💡 Maintenance Tips (Engine v12.0):

1. **Automatic Graph:** From v12.0, granular dependencies between files are managed by `01-TRACKS.md` via the `npm run sync-twin` command. This Master serves *only* for macro Entry Points and Global Status.
2. **Monorepo Sync:** Whenever creating a new app in `apps/` or package in `packages/`, add the corresponding root domain here.
3. **Visualization:** In Obsidian, you can color the `00-MASTER` node Red in the Graph View settings to serve as your visual "North".

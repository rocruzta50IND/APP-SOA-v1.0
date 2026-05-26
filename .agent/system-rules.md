# 3. GOLDEN RULES AND ABSOLUTE RESTRICTIONS (SOA v13.0.0 HIGH-TICKET)

**Memory Hygiene and Anti-Timeout Law (Context Management):**
To prevent cognitive engine stalling (Silent Timeouts) due to token excess, the Agent is REQUIRED to follow these 3 reading restrictions:
1. **Trust in Summary (Zero Speculative Reading):** It is FORBIDDEN to read (`cat`) physical code files (`.tsx`, `.ts`) just to "understand how they work". To understand what an Island does, trust EXCLUSIVELY in `summary.md` and the documented Public API.
2. **Restricted Surgical Reading:** The Agent ONLY HAS PERMISSION to read the internal content of a code file if it is REQUIRED to change that file in the immediately following step.
3. **Tactical Amnesia (Micro-clears):** If a mission requires deep editing of multiple heavy files, the Agent must not attempt to solve everything at once. It must edit the first files, save progress by overwriting `mission.md`, stop execution, and REQUEST A `/clear` to empty the cache before continuing with the rest of the mission.

**Skill Injection Law (Knowledge Cartridges):**
The system operates with Modular Skills. If the current task in `mission.md` has a skill tag (e.g.: `[SKILL: DESIGN]`), the Agent is **REQUIRED** to read the corresponding physical file (e.g.: `cat .agent/skills/skill-design.md`) via CLI BEFORE starting any coding. Domain restrictions (Write-Locks) and directives of the active Skill have absolute priority over default behavior.

**Anti-Teleportation Law (Strict Pathfinding):** It is STRICTLY FORBIDDEN to access, read (`cat`), or inject final code files (`src/app/page.tsx`) directly via CLI without FIRST performing the topological descent. The Agent must mandatory read `01-TRACKS.md`, proceed to the `context.md` of the parent directory, descend to the `context.md` of the target directory, and finally, read the `summary.md`.

**Elevator Technique (Batch Reading):** The Agent HAS PERMISSION to descend the context ladder in a single batch read command.
*Approved CLI example:* `cat .obsidian_vault/src/context.md .obsidian_vault/src/app/summary.md`. *(Always use correct folder paths, without '\' characters in the Digital Twin).*

**Expanded Cognitive Limit (Domain Flow):** The Agent operates by solving **1 Complete Domain Flow** at a time. It may edit as many files as necessary within that context "Island" so that the feature is born atomic.

**"Surgery" Mode v12.0 (Side Effect Bypass):** If global refactorings break files in *other* domains, activate the Global Status: `[PROPAGATION PENDING]`. During this state, code is accepted in "Controlled Exposed Fracture" and TypeScript errors outside the current scope will be IGNORED.

**Contract Summary Rule (Zero Code Bloat):** The `summary.md` file is the Public API. It is FORBIDDEN to paste the implementation (core) logic inside it.

**Full-Stack Law (Honest MVP Rule):** It is STRICTLY FORBIDDEN to create purely cosmetic UI components (UI Shells) with hardcoded data for the core features. Every MVP functionality MUST be delivered as a complete end-to-end CRUD flow: 1) Prisma Schema defined, 2) Server Action / API Route created, and 3) Interactive UI connected. "Mocked Data" must only be used as Seed data in the database, never hardcoded in the frontend components.

**The Supreme Inspector (Auto-Healing via Compiler):** It is MANDATORY to run static tracking (`npm run typecheck`) AFTER code modifications.
1. If it points to an error, open the file and correct it silently.
2. The Guardian can ONLY be invoked when the terminal does not spit out any TypeScript errors.

**CLI and Environment Stability Law (Anti-Chaos):**
1. **Terminal Syntax:** It is FORBIDDEN to chain commands using the `&&` operator in the CLI. Execute one at a time.
2. **TSConfig Hygiene:** NEVER invent fictional environments (such as `"desktop"`). Maintain the strict web standard.
3. **Database Lock (Anti-500 Error):** If the mission involves creating or altering Schemas in `prisma/`, it is MANDATORY to execute the local migration command (e.g.: `npm run db:push`) BEFORE testing the Web interface in the browser or running the server.
4. **Amnesia Lock:** If the Agent encounters serious infrastructure errors, it is FORBIDDEN to try to fix everything in the same chat. It must update the Mission, ask for `/clear`, and continue the repair with clean memory.

**Front-end Visibility Law (Anti-Orphan Code):** It is STRICTLY FORBIDDEN to create UI components, dashboards, or charts and leave them "hidden" in the architecture. If the mission involves building an interface, the Agent MUST mandatory import and render these components on the main page or corresponding route (e.g.: `src/app/page.tsx`) BEFORE executing `npm run snap`. The visual print must prove that the feature is accessible to the end user.

**Runtime Sensor Law (Server Auto-Healing):** During the execution of `npm run snap`, internal server logs are automatically saved in the file `.obsidian_vault/server-log.txt`. If the visual audit (the `dom-tree.txt` file) presents white error screens, texts like "Server error", "500", or "Unhandled Runtime Error", The Agent IS REQUIRED to use the `cat .obsidian_vault/server-log.txt` command to read the real cause of the failure in the backend (e.g.: missing variables in `.env`, database connection failures, missing NextAuth keys). The Agent must correct the infrastructure configuration reported in the log, run `snap` again, and confirm the cure BEFORE invoking the Guardian.

**New Frontier Rule:** ALWAYS when a new folder is created, instantly create the `context.md` and `summary.md` files in the Digital Twin.

# 4. EXECUTION LOGIC (ATOMIC LOOP v12.0)

- **PHASE 1: INVESTIGATION AND DESCENT (THE SONAR + SKILL LOADER)**
Read `mission.md` and `00-MASTER.md`. **Check immediately if there is a SKILL TAG in the Current Mission. If so, read the corresponding file in `.agent/skills/`**. Consult `01-TRACKS.md` to find the Domain Entry Point. Apply the "Elevator Technique" in the CLI.

- **PHASE 2: CONSTRUCTION AND AUTO-HEALING**
Code the complete flow via terminal, **strictly respecting Write-Locks and the directives of the loaded Skill**. Upon completion, run the Compiler (`npm run typecheck`). If the code broke another island, apply Auto-Healing. If the break is massive, trigger `[PROPAGATION PENDING]`.

- **PHASE 3: SYNCHRONY AND AUDIT**
Update `summary.md`. Run the visual Snap ensuring the Visibility Law and validating the Runtime Sensor. Invoke the Guardian. Overwrite the mission and request `/clear`.

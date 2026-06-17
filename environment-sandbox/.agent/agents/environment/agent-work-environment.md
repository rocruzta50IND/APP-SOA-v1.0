# 🏗️ PROTOCOL: AGENT WORK ENVIRONMENT (SOA v13.0.0 - THE SURGEON)

**Type:** Universal Scaffolding and Environment Setup Engineer.
**Entry Trigger:** Reading `.agent/agents/environment/context-work-environment.md`.

## 1. PERSONA AND MULTIPLATFORM RULE

You are the physical "Labor Force". **It is STRICTLY FORBIDDEN to generate `.bat` or Shell Script files.** To ensure fail-safe execution on any system, you must write a script exclusively in **Node.js (`setup.mjs`)** using native `fs` and `child_process` modules.

## 2. THE UNIVERSAL SCRIPT (`setup.mjs`) AND THE CLONING PROTOCOL

You must generate the `setup.mjs` file in the current root containing Javascript code that executes sequentially.

**CRITICAL ROUTING:** Your `setup.mjs` logic MUST branch based on the existence of a selected template.

### ▶️ PATH A: THE TEMPLATE CLONE (If `.agent/selected-template.json` exists)
Your `setup.mjs` script MUST:
1. **Read Template Name:** Parse `.agent/selected-template.json` to get the chosen template name.
2. **Directory Setup:** Create the new project folder (e.g., `./[project-name]`).
3. **Clone Template:** Use `fs.cpSync` to recursively copy the ENTIRE content of `templates-library/[template-name]/` INTO the new project folder. (This includes `src`, `package.json`, and `.obsidian_vault`).
4. **Brain Transplant (CRITICAL):** Use `fs.cpSync` to copy the CURRENT `.agent` folder INTO the new project folder.
5. **Dependency Installation:** Add `execSync` to run `npm install --silent` INSIDE the new project folder.
6. **Self-Destruct (Cleanup):** Add `fs.unlinkSync('./setup.mjs')` at the very end of the script to delete the script itself and leave no trace.

### ▶️ PATH B: CUSTOM BUILD (If `.agent/selected-template.json` DOES NOT exist)
Your `setup.mjs` script MUST fallback to the monolithic setup:
1. **Base Folders:** Create the folder for the new project, and within it: `src/app`, `src/components/ui`, `src/lib`, `prisma`, and `scripts`.
2. **App Core Setup:** Generate `package.json` forcing strict versions for Next.js, Tailwind, Prisma, and Playwright.
3. **Data Foundation:** Generate `prisma/schema.prisma` with local SQLite.
4. **Vital Configurations:** Generate `tsconfig.json`, `tailwind.config.ts`, and `playwright.config.ts`.
5. **Brain Transplant (CRITICAL):** Use `fs.cpSync` to fully copy the `.agent` and `.obsidian_vault` folders INSIDE the new folder.
6. **Dependency Installation:** Add `execSync` to run `npm install --silent` INSIDE the new project folder.
7. **Self-Destruct (Cleanup):** Add `fs.unlinkSync('./setup.mjs')` at the very end of the script to keep the workspace clean.

---

## 3. AUTONOMOUS EXECUTION (THE TRIGGER)

Once the `setup.mjs` is written, you MUST NOT wait for the human. **You must autonomously execute the script** in your CLI using:
`node setup.mjs`

Wait for the process to finish completely. (The script will automatically delete itself at the end).

---

## 4. HANDOFF PROTOCOL (THE WINDOW JUMP)

After the autonomous execution is complete, print:

> 🏗️ **FACTORY SETUP COMPLETE (v13.0)!**
> The infrastructure has been cloned, dependencies installed, and the setup script has self-destructed.
> 
> **👉 EXECUTE THE DIRECTORY JUMP TO START MISSION 01:**
> 1. Open the new workspace by typing in your terminal: `code ./[created-folder-name]`
> 2. In the **new VS Code window**, open the AI CLI, type `/clear` and paste:
> **"Awaken. Read .agent/instructions.md, activate Cascade Navigation, and start the Execution of Mission 01."**
---
type: "Sub-anchor"
target: "[apps|packages]/[real_path]/[file.ext]"
parent_context: "[[[FOLDER_NAME]context]]"
status: "production"
tags:
  - "domain/[domain-name]"
  - "layer/[ui | server | db | config]"
---

# [File_Name]

## 1. OPERATIONAL CONTRACT

- **Responsibility:** [Clear 1 to 2 line technical explanation of this file's purpose in the system].
- **Main Exports:** [Functions, Interfaces, Hooks, or Types exposed to the rest of the project].
- **Inputs/Props:** [Payloads, Arguments, or Props expected by this component/function].

## 2. DEPENDENCY GRAPH (AST Radar)

> 🤖 **Note v12.0 (Auto-Healing):** The upstream and downstream branches of this file are managed and mapped automatically by AST Parsing in the `.obsidian_vault/01-TRACKS.json` file. It is forbidden to list dependencies manually here. Use the CLI to read the JSON if you need to predict the deep impact of this change.

## 3. IMPACT VECTOR AND SURGERY MODE

> ⚠️ **Attention:** Before applying any structural change, validate:

1. **Contracts and Compilation:** Does the change in exports break typing in other files? Did the compiler (`typecheck`) report an error in neighboring folders?
2. **Propagation Assessment:** If the change breaks multiple files in **other domains**, you MUST trigger the `[PROPAGATION PENDING]` status in the `00-MASTER.md` file and delegate the external repair to the next cycle.
3. **Local Side Effects:** [Describe specific risks of this file: e.g., infinite re-renders, write concurrency, cache leakage].

## 4. STATE LOG AND FIDELITY

- **Last Mission:** [Mission ID or Name]
- **Digital Twin:** [X] Folder mirroring verified in `.obsidian_vault/[apps|packages]/[path]`.
- **Automatic Sync:** The `npm run sync-twin` command was scheduled for the Mission Checkpoint.
- **Observations:** [Technical debts, security notes, or critical architectural decisions that must persist after /clear].

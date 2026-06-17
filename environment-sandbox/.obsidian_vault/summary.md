# TYPE: RAM MEMORY / FOLDER PUBLIC API (v12.0)

**target_folder:** `[apps|packages]/[workspace_name]/src/[folder_path]`
**last_sync:** [DATE TIME]
**last_janitor_snapshot:** [DATE TIME OR "PENDING"]

## 🧠 BUSINESS VISION (WHAT THIS ISLAND DOES)

> [Macro summary. E.g.: "Abstracts registration and password reset Server Actions communicating with the repo/database Island."]

---

## 📜 PUBLIC CONTRACTS AND SIGNATURES (API)

**Agent Attention (Anti-Bloat):** It is STRICTLY FORBIDDEN to paste the implementation (the "core" with loops and logic) of functions here. Store ONLY the Contracts for the next memory cycle. The actual source code must always be read via CLI.

```tsx
// --- SEMANTIC DUMP (Always update when changing exports) --- //

// 1. Zod Schemas & DTO Typings
export const AuthSchema: z.ZodObject<...>;
export type AuthDTO = z.infer<typeof AuthSchema>; 

// 2. Signatures of PUBLIC Hooks, Actions, and Components
export async function authenticateUser(data: AuthDTO): Promise<SessionToken>;
export const LoginForm: React.FC<{ callbackUrl: string }>; 
```

📦 ARCHITECTURE SNAPSHOT (BLACK BOX AND JANITOR)
Register only decisions that are not obvious reading the exported types above.

🧹 Garbage Collector's Note (v12.0): To avoid "Morbid Token Obesity" causing AI amnesia, `.agent/agents/janitor/agent-janitor.md` will scan here at every Roadmap Phase turn. The Janitor will condense old logs and keep only the "Prevailing Truth".

[DATE] - Mission [ID]: [E.g.: We chose not to use JWT in localStorage, delegating to the external provider (Clerk).]

(Status: You have read the Contracts. Coding action directly in the source files via terminal is authorized).

⚙️ SKILL: BACKEND, DATA ENGINEERING & SERVER ACTIONS (SOA v13.0.0)
Type: Logic, Persistence, and API Engineering Skill.
Persona: You are a Staff Backend Engineer building high-concurrency SaaS. You despise messy code, data leaks, and slow queries.
Trigger: Invoked when the task in the roadmap or mission contains the [SKILL: BACKEND] or [SKILL: DATABASE] tag.

🛑 ABSOLUTE DIRECTIVES (THE LEAN BACKEND STANDARD)
When operating under this skill, you must strictly follow the Next.js 14+ App Router paradigms combined with Prisma ORM.

1. The Server Action Mandate (No Legacy APIs)
Prohibition: NEVER create traditional API routes inside src/app/api/... for internal frontend-to-backend communication.

The Standard: All internal data mutations MUST be done using React Server Actions.

Location: Server Actions must be isolated in dedicated files (e.g., src/lib/actions/[domain].actions.ts) with the "use server" directive at the top. NEVER write inline server actions inside UI components.

2. The Universal Response Contract
Every Server Action must return a predictable, typed object. NEVER throw raw errors to the client UI.

Mandatory Signature:
type ActionResponse<T> = { success: boolean; data?: T; error?: string; }

Error Handling: Use try/catch in all actions. If a database operation fails, log the real error using console.error (for the Runtime Sensor to catch) and return { success: false, error: "Human readable message" } to the frontend.

3. Zod Gateway (Absolute Validation)
NEVER trust inputs. Every Server Action must receive its payload validated by a Zod Schema defined in the summary.md public API.

If validation fails, return { success: false, error: "Invalid payload format" }.

4. Prisma Mastery & Data Fetching
No Data Over-fetching: NEVER return a full Prisma object to the client if the UI only needs 2 fields. Always use the select: { ... } object in Prisma queries to strictly fetch what is needed.

N+1 Prevention: If fetching a list of items and their relations, use Prisma's include appropriately. Do not run queries inside loops.

Indexes: If the mission involves editing schema.prisma, you MUST add @@index([column_name]) for any column that will be frequently used in where clauses (e.g., userId, email, status).

5. Next.js Cache Invalidation
The App Router aggressively caches data.

Whenever a Server Action performs a CREATE, UPDATE, or DELETE operation, it MUST call revalidatePath('/path-to-update') or revalidateTag('tag-name') before returning the success response. Failure to do so will result in stale UI (Ghost State).

6. Separation of Concerns (The Controller Rule)
UI Components .tsx call Server Actions.

Server Actions orchestrate the validation and call Database Services.

Prisma calls should be modularized if they are complex, keeping the Server Action file focused on the request/response lifecycle.

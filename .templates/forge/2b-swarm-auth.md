# 🏭 PROTOCOL: THE FORGE - STAGE 2B (SWARM: AUTHENTICATION)

**hook:** Read and obey `forge/regras.md`.
**Contract:** Read `forge/sandbox/design-system.md` for styling and component usage.
**Context:** Read `forge/forge-context.md`.

**Role:** You are the Identity & Access UI Designer. Your goal is to create a secure-feeling, premium entry point to the SaaS.

## ⚠️ SWARM RESTRICTIONS
1. **ISOLATION:** Do not touch global CSS, root layout, or components outside of `(auth)`.
2. **SCOPE:** Build strictly `src/app/(auth)/login/page.tsx` and `src/app/(auth)/register/page.tsx`.
3. **REUSE:** Use the buttons, inputs, and cards defined in `src/components/ui/`.

---

### TASK: BUILD THE AUTHENTICATION FLOW
- **Login Screen:** Use a premium Split-Screen layout (One side for a visual/brand testimonial, one side for the clean form).
- **Register Screen:** Maintain absolute visual consistency with the login page.
- **DUMB UI:** Do NOT use `useState`. Forms must be stateless. Use placeholders for inputs.
- **Linking:** The "Sign In" or "Create Account" buttons MUST use `<Link href="/dashboard">` to simulate successful entry.
- **Responsive:** Ensure the visual side of the split-screen hides or stacks elegantly on mobile.

*Print:* > 🔐 **AUTH FLOW (SWARM) CONCLUÍDO!**
> Telas de Login e Registro geradas isoladamente no grupo `(auth)`. A porta de entrada está pronta.
> **[🛑 STOP AND END TASK]**

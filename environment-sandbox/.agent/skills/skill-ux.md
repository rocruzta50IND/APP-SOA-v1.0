# 🧠 SKILL: USER EXPERIENCE & COGNITIVE LOGIC (v12)

**Type:** Logical Flow and Interaction Skill.
**Persona:** You are a Senior Product Designer (UI/UX). Your goal is to ensure the software is not just beautiful, but "Invisible" – so intuitive that the user doesn't have to think.
**Trigger:** Invoked during UI development alongside `[SKILL: DESIGN]`.

---

## 🛑 THE 4 LAWS OF FRICTIONLESS UX

Every screen and component you build MUST respect these four states:

### 1. The Law of the 4 States
- **Empty State:** If there is no data in the database, do NOT show an empty white screen. Show an illustration or a clear message with a "Call to Action" (e.g., "No projects found. Create your first project now").
- **Loading State:** Use Skeleton Loaders (`animate-pulse`) that match the layout of the final content to avoid visual jumps.
- **Error State:** Use humanized error messages. Instead of "Error 500", use "We couldn't load your projects. Try again in a few seconds."
- **Success State:** Every destructive or critical action (Delete, Save, Update) MUST trigger a visual confirmation (Sonner Toast or checkmark animation).

### 2. The Breadcrumb & Wayfinding Rule
- The user must never ask "Where am I?".
- Implement active states in the Sidebar (Highlight the current route).
- Use Breadcrumbs at the top of deep pages (e.g., `Settings > Workspace > Permissions`).

### 3. Fitts's Law (Accessibility & Accuracy)
- Critical buttons (Delete, Save) must have a minimum hit area of 44x44px.
- Use "Destructive" colors (Red/Rose) only for permanent actions and always ask for confirmation via Modal for "Delete" actions.

### 4. Semantic Routing
- Ensure that every link in the App Shell points to a valid file.
- If a route is under construction, it must show a "Coming Soon" badge or a 404-friendly page, but never a dead link.

### 5. The "Zero Ghost Buttons" Law (Absolute Prohibition)
- É **ESTRITAMENTE PROIBIDO** criar botões, links de menu ou CTAs com navegação morta (ex: `href="#"`, `href=""`, ou `onClick={() => console.log('todo')}`).
- Se um botão existe na tela (desde a Landing Page até o Dashboard), ele DEVE apontar para uma rota física funcional.
- Se a funcionalidade ainda não estiver pronta, o botão deve estar oculto ou bloqueado com um atributo `disabled` e um `tooltip` de "Em breve", mas NUNCA realizar uma navegação falsa.
  
---

## 🔒 EXECUTION MANDATE
- Read the `roadmap.md` and `PRD.md` to understand the user's intent.
- When building forms, use `Zod` for client-side validation to provide instant feedback before the server action is even called.

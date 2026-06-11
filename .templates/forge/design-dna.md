# 🧬 DESIGN DNA: FLOWSPRINT (v1.0)

**Project Name:** FlowSprint
**Category:** Marketing & CRM (Enterprise B2B)
**Design Tier:** Tier 1 (Standard / Functional)
**Persona:** Elite Frontend Engineer

---

## 🎨 COLOR PALETTE (Light Mode Only)
Strictly monochrome, high-contrast palette. No `dark:` classes permitted.

| Token | HSL | Hex (Approx) | Usage |
| :--- | :--- | :--- | :--- |
| **Background** | `0 0% 100%` | `#FFFFFF` | Main surface area |
| **Foreground** | `0 0% 3.9%` | `#09090B` | Primary text |
| **Primary** | `0 0% 9%` | `#171717` | CTAs, core accents |
| **Primary-FG** | `0 0% 98%` | `#FAFAFA` | Text on primary |
| **Border** | `0 0% 89.8%` | `#E4E4E7` | 1px sharp strokes |
| **Muted** | `0 0% 96.1%` | `#F4F4F5` | Secondary backgrounds |
| **Muted-FG** | `0 0% 45.1%` | `#71717A` | De-emphasized text |

---

## 📐 CORE STYLES
- **Radius:** `0.3rem` (Sharp, functional corners)
- **Borders:** `1px` solid, high-contrast
- **Shadows:** `none` (Strictly flat aesthetic)
- **Surfaces:** Flat, using `bg-muted/30` for section differentiation
- **Interaction:** Cinematic states (hover: scale-105, active: scale-95)

---

## 🎬 ANIMATION PHYSICS
- **Engine:** Framer Motion
- **Style:** Snappy, high-velocity transitions
- **Default:** `transition={{ duration: 0.2, ease: "easeOut" }}`
- **Entrance:** Vertical fade-in (20px y-offset)

---

## 🧱 COMPONENT ARCHITECTURE
- **Layout:** Dense, high-information content
- **Navigation:** Fixed header with blurred backdrop (`backdrop-blur-sm`)
- **Typography:** 
  - **Sans:** Inter / Geist (tracking-tight)
  - **Mono:** JetBrains Mono (metrics/data)
  - **Headers:** Black (900) weights, uppercase, often italicized
  - **Badges:** Uppercase, tracking-widest, bold

---

## 📊 DATA VISUALIZATION
- **Stack:** Recharts + Tremor
- **Style:** Clean, gridless, high-contrast bars/lines
- **Colors:** Primary (`#171717`) and Muted (`#E4E4E7`)

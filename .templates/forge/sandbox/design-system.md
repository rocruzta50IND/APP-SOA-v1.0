# 📐 DESIGN SYSTEM CONTRACT: LUMINA TALENT (TIER 2)

This document is the absolute source of truth for the **Lumina Talent** UI. All subsequent agents MUST strictly follow these rules to maintain visual and technical consistency.

## 🏛️ ARCHITECTURAL CONSTRAINTS (TIER 2: MODERN FINTECH)

1.  **Aesthetic Persona:** Modern, interactive, and polished. Think Linear or Raycast.
2.  **Layout Law:** Use **Bento Box grids** (`grid`) for all dashboard content.
3.  **Glassmorphism:** All containers MUST use the `.glass` utility (`bg-white/5 backdrop-blur-md border border-white/10`).
4.  **The "Use Client" Law:** Any file using `framer-motion`, `lucide-react`, or React Hooks **MUST** have `"use client";` on Line 1.
5.  **Atomic Component Ban:** NEVER use `framer-motion` inside `Button.tsx`, `Input.tsx`, or `Card.tsx`. Use Tailwind transitions only.
6.  **Typography:**
    - **Sans:** `Inter` (UI/Body) - variable: `--font-sans`.
    - **Mono:** `JetBrains Mono` (Data/Numbers) - variable: `--font-mono`.
    - **Headings:** MUST use `tracking-tighter` and the `.text-gradient` utility.

## 🎨 COLOR PALETTE (HSL)

| Role | HSL Value | Description |
| :--- | :--- | :--- |
| **Background** | `240 10% 3.9%` | Deep obsidian background |
| **Foreground** | `0 0% 98%` | Near-white text |
| **Primary** | `226.3 70.6% 58.2%` | Vibrant Indigo accent |
| **Card** | `240 10% 3.9%` | Same as background (uses glass for depth) |
| **Border** | `240 3.7% 15.9%` | Subtle dark border |
| **Muted** | `240 3.7% 15.9%` | De-emphasized elements |

## 🧱 COMPONENT USAGE

### Button
```tsx
import { Button } from "@/components/ui/Button";

<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Glass Action</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Card (Glassmorphism Foundation)
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

<Card>
  <CardHeader>
    <CardTitle>Total Candidates</CardTitle>
    <CardDescription>Monthly growth over time</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content or Chart here */}
  </CardContent>
</Card>
```

### Input
```tsx
import { Input } from "@/components/ui/Input";

<Input type="email" placeholder="Enter your email" />
```

## 📐 SPATIAL RULES & METRICS

-   **Section Padding:** `py-24` or `py-32` for landing page sections.
-   **Container Max-Width:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
-   **Grid Gaps:** `gap-4` for small items, `gap-8` for major layout sections.
-   **Border Radius:** Standard is `1rem` (`rounded-2xl` for cards, `rounded-xl` for buttons/inputs).

## ✨ VISUAL EFFECTS

-   **Ambient Glow:** Use `<div className="glow-orb w-[400px] h-[400px] top-0 right-0" />` to add depth behind sections.
-   **Hover States:** All interactive elements must have smooth transitions (minimum `duration-200`).
-   **KPI Typography:** Metric numbers MUST use `font-mono tracking-tighter font-black`.

---
> 📐 **ARQUITETURA E CONTRATO DEFINIDOS!**
> Setup global concluído e `design-system.md` gerado. O enxame agora tem um norte visual claro.

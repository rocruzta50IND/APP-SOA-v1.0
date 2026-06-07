# 🧬 DESIGN DNA: FluxBoard (Tier 1)

**Status:** Established
**Tier:** 1 (Minimalist / Functional)
**Primary Mode:** Dark

## 🎨 1. COLOR PALETTE (Hex Mapped)
| Token | HSL | Hex Equivalent | Usage |
| :--- | :--- | :--- | :--- |
| **Background** | `0 0% 3.9%` | `#0a0a0a` | Main app background |
| **Foreground** | `0 0% 98%` | `#fafafa` | Primary text |
| **Border** | `0 0% 14.9%` | `#262626` | 1px surgical borders |
| **Primary** | `0 0% 98%` | `#fafafa` | Buttons & active states |
| **Primary-FG** | `0 0% 9%` | `#171717` | Text on primary |
| **Muted** | `0 0% 14.9%` | `#262626` | Secondary surfaces |
| **Muted-FG** | `0 0% 63.9%` | `#a3a3a3` | De-emphasized text |

## 📐 2. LAYOUT & GEOMETRY
- **Radius:** `0.3rem` (4.8px) - Sharp, professional corners.
- **Borders:** Strict 1px `border-border` usage. No double borders.
- **Surface:** Absolute flat surfaces. No gradients or glassmorphism.
- **Shadows:** `shadow-sm` only on interactive elements. Zero heavy drop shadows.

## 🎬 3. INTERACTION PHYSICS (Framer Motion)
- **Entrance:** Fast, snappy translate and fade.
- **Transition:** `duration: 0.2`, `ease: "easeOut"`.
- **Hover:** Subtle scale or border-color shift (`border-primary/50`).
- **Active:** Tactile scale-down (`active:scale-95`).

## 🔡 4. TYPOGRAPHY (Geist / Inter)
- **Headers:** `tracking-tighter`, `font-black` or `font-bold`.
- **Labels:** `text-[10px] font-bold uppercase tracking-[0.2em]`.
- **Body:** `text-sm`, `leading-relaxed`.

## 🧩 5. COMPONENT PATTERNS
- **Cards:** `bg-background border border-border rounded-md`.
- **Buttons:** Sharp rectangles with high contrast.
- **Inputs:** `bg-transparent border-border focus:border-primary`.

---
*This file serves as the visual anchor for all subsequent UI development in Stage 2C.*
# 🧬 DESIGN DNA: LeadPulse CRM (Tier 2)

## 🎨 COLOR PALETTE (Semantic Tokens)
- **Background:** `hsl(240 10% 3.9%)` (#09090b) - Deep Obsidian.
- **Foreground:** `hsl(0 0% 98%)` (#fafafa) - Ghost White.
- **Primary:** `hsl(226.3 70.6% 58.2%)` (#4f46e5) - Electric Indigo.
- **Secondary:** `hsl(240 3.7% 15.9%)` (#27272a) - Zinc Dark.
- **Muted:** `hsl(240 5% 64.9%)` (#a1a1aa) - Cool Gray.
- **Accent Glow:** `primary/20` with `blur-[100px]`.

## 📐 CORE GEOMETRY
- **Radius:** `1rem` (16px) - Modern rounded aesthetic.
- **Borders:** `1px border-white/10` - Micro-borders for depth.
- **Cards:** Glassmorphism (`bg-white/5 backdrop-blur-md`).
- **Shadows:** `shadow-[0_0_20px_rgba(79,70,229,0.3)]` for primary elements.

## 🎬 INTERACTION PHYSICS
- **Physics:** Spring-based transitions.
- **Spring Config:** `stiffness: 400, damping: 30`.
- **States:** 
  - Hover: `scale-102`, `translate-y-1`, border-glow.
  - Active: `scale-0.95`.
  - Transitions: `300ms ease-out`.

## Typography
- **Sans:** Inter (Variable) - Tight tracking on headings (`tracking-tighter`).
- **Mono:** JetBrains Mono - Used for data, SKUs, and metrics.
- **Gradients:** `bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60`.

## 📊 DATA VISUALIZATION STYLE
- **Charts:** Monotone curves, area gradients (`stopOpacity: 0.3` to `0`).
- **Grids:** Horizontal only, transparent stroke (`#ffffff10`).
- **Density:** High - Bento Grid structures (3-column layout).

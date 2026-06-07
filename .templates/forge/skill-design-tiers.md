# 🎨 SKILL: VISUAL ARCHITECTURE & DESIGN TIERS (v4)

**Type:** Design System Engine & Layout Validator.
**Role:** Ensure the generated UI exactly matches the requested Design Tier, creating distinct and breathtaking aesthetics.

---

## 🏛️ THE 5 DESIGN TIERS ARCHITECTURE
When the orchestrator requests a specific "Design Tier", you MUST radically alter your Tailwind CSS choices to match the descriptions below:

### 🔹 TIER 1: THE VERCEL/LINEAR WAY (Ultra-Minimalist)
* **Vibe:** Developer-focused, clinical, extreme precision, space is the design.
* **Aesthetic:** Monochrome palettes (Absolute Black `bg-black` or Pure White `bg-white`). 
* **Rules:** - Surgical typography using Inter/Geist.
  - Very thin, subtle 1px borders (`border-border/50`).
  - Heavy use of whitespace and padding (`py-32`).
  - NO heavy shadows, NO radial gradients, NO glassmorphism. Keep it flat and razor-sharp.

### 🔹 TIER 2: THE MODERN FINTECH (Bento Grids & Glassmorphism)
* **Vibe:** High-ticket SaaS, Stripe/Apple style, information-dense but organized.
* **Aesthetic:** Translucent surfaces, rich gradients, and structured boxes.
* **Rules:**
  - Intensive use of Bento Box grids (`grid-cols-1 md:grid-cols-3 lg:grid-cols-4`).
  - Frosted glass containers (`bg-background/50 backdrop-blur-xl border-border`).
  - Ambient radial glows behind important elements (`bg-[radial-gradient(...)] blur-[100px]`).
  - Dual-tone text gradients on main headings (`bg-clip-text text-transparent bg-gradient-to-r`).

### 🔹 TIER 3: THE AWWWARDS BOUTIQUE (Immersive & Cinematic)
* **Vibe:** High-end agency, luxury brand, jaw-dropping visual impact.
* **Aesthetic:** Editorial, asymmetrical, motion-heavy.
* **Rules:**
  - **Mixed Typography:** You MUST mix Serif fonts (like Playfair Display) for giant headings with Sans-serif (Inter) for readable body text.
  - Asymmetrical grid layouts (staggered masonry style, overlapping elements).
  - Heavy micro-interactions using Framer Motion (staggered reveals, hover effects).
  - Edge-to-edge images and bold background color blocking.

### 🔹 TIER 4: THE CYBER-BOUTIQUE (Futuristic & Data-Dense)
* **Vibe:** Avant-garde tech, AI platforms, cyberpunk interfaces.
* **Aesthetic:** Mesh gradients, noise textures, extreme glassmorphism, neon accents.
* **Rules:**
  - **Fluid Typography:** Monospace-adjacent (Space Grotesk) mixed with fluid sizing (`clamp()`).
  - Strict CSS Grid HUD-like structures for dense data displays.
  - Glowing lines and grid overlays in charts and backgrounds.

### 🔹 TIER 5: THE SPATIAL EXPERIENCE (Immersive 3D)
* **Vibe:** WebGL art, spatial journeys, cutting-edge creative tech.
* **Aesthetic:** Infinite depth, 3D elements, scroll-driven narratives.
* **Rules:**
  - **3D Canvas:** Full-bleed WebGL backgrounds using React Three Fiber.
  - Cinematic scroll animations using GSAP ScrollTrigger.
  - Typography and UI panels floating as layers in a Z-axis space.

---

## 🎬 MICRO-INTERACTION STANDARD
- Todo botão deve ter `whileHover={{ scale: 1.02 }}` e `whileTap={{ scale: 0.98 }}`.
- Grids e listas DEVEM usar `framer-motion` com 'Staggered Children' para entradas fluidas.

## 📐 THE LAW OF MICRO-TYPOGRAPHY & METRICS
Regardless of the Tier, you are building High-Ticket software. 
- **Data Tables & Labels:** Column headers, status badges, and small labels MUST use micro-typography: `text-[10px] uppercase tracking-widest font-bold text-muted-foreground`.
- **KPIs:** Large metric numbers must use `tracking-tighter font-black`.

---
**ACKNOWLEDGE SILENTLY:** Enforce the exact styling rules of the requested Tier.
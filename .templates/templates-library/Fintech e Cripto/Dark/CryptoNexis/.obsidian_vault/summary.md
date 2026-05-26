# 💎 DIGITAL TWIN: CRYPTONEXIS

## 1. Global Vibe & Niche
- **Niche:** Fintech & Crypto Infrastructure (Institutional B2B).
- **Aesthetic:** "Linear-app" minimalist dark mode. High-contrast typography, frosted glass surfaces, and ambient radial glows.
- **Tier:** 2 (High-Ticket SaaS) - Modular components with bento grid architecture.

## 2. Route Map
- `/` -> **Landing Page:** High-conversion experience with 7 sections (Hero, Social Proof, Bento Features, Mid-CTA, Pricing, FAQ, Footer).
- `/login` -> **Authentication:** Split-screen enterprise gateway with visual abstract graphic.
- `/dashboard` -> **Control Center:** High-density analytical bento grid with real-time (mocked) performance metrics and asset allocation.

## 3. UI Data Hooks (For Backend AI)
- **Performance Chart:** `AreaChart` component expecting `[{ name: string, value: number }]`.
- **Asset Allocation:** Progress bars expecting `[{ name: string, symbol: string, value: string, color: string }]`.
- **Transaction Table:** Data grid expecting `[{ id: string, type: string, amount: string, status: string, time: string }]`.
- **Pricing Plans:** Object array expecting `[{ name: string, price: string, features: string[], highlight: boolean }]`.
- **Feature Grid:** Bento mapping expecting `[{ title: string, description: string, icon: LucideIcon, className: string }]`.

## 4. Implicit Entities (Database Schema)
- `Users`: Profile data, admin roles, and authentication hooks.
- `Vaults`: Asset balances, historical performance, and allocation percentages.
- `Transactions`: Ledger entries for inbound, execution, staking, and outbound movements.
- `Nodes`: Health status and performance metrics for the edge network.
- `Plans`: Subscription tiers and feature flags.

## 5. Technical Stack
- Next.js 14 (App Router)
- Tailwind CSS (Semantic tokens)
- Framer Motion (Entrance animations)
- Recharts (Performance visualization)
- Lucide React (Standardized iconography)

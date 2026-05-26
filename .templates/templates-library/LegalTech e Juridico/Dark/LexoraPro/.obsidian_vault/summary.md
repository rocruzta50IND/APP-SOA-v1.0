# 📜 LexoraPro: Semantic Blueprint

## 🌌 Global Vibe & Niche
- **Niche:** LegalTech e Jurídico (Enterprise).
- **Aesthetic:** Linear-app inspired, high-performance, premium minimalist.
- **Color Palette:** Pure Dark Mode (Black/Zinc) with subtle white accents and glassmorphism.
- **Typography:** Inter (Sans-serif) with high-contrast weights for surgical hierarchy.

## 🗺️ Route Map
- `/`: High-conversion Landing Page (Hero, Bento Features, Pricing, Footer).
- `/login`: Split-screen enterprise authentication gateway.
- `/dashboard`: High-density analytical command center with Bento Grid layout.

## ⚓ UI Data Hooks (For Backend AI)
- **Matters Data Table:** Used in `/dashboard` to list active cases (ID, Title, Status, Priority).
- **Analytical Stats:** High-level metrics for Matters, AI Discovery, Compliance, and Resolution Time.
- **AI Insights Component:** Dedicated card for Lexora AI findings and automated consistency checks.
- **Pricing Tiers:** Dynamic pricing model (Foundation vs Enterprise) with distinct feature sets.
- **Bento Features:** Grid-based feature showcase with semantic iconography.

## 🗄️ Implicit Entities (Database Schema Reference)
- `Matter`: id, title, description, status (enum), priority (enum), client_id, created_at.
- `Client`: id, name, firm_email, logo_url.
- `Jurisdiction`: id, name, country, compliance_status.
- `DiscoveryDocument`: id, matter_id, metadata, ai_analysis_status.
- `StorageMetric`: firm_id, total_capacity, used_capacity.

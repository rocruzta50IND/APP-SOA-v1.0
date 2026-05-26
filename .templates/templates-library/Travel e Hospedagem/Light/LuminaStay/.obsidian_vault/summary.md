# 🏗️ SEMANTIC BLUEPRINT: LuminaStay

## 🌟 Global Vibe & Niche
- **Niche:** Travel e Hospedagem (High-end Enterprise / B2B)
- **Vibe:** Premium, Minimalist, Linear-app aesthetic. Focus on high-performance operational layers.
- **Color Palette:** Light Mode (Clean white, subtle slate/zinc grays, high-contrast black primary).

## 🗺️ Route Map
- `/` -> Landing Page (Hero, Stats, Features Bento, Pricing, CTA, Footer).
- `/login` -> Split-screen Enterprise Authentication gateway.
- `/dashboard` -> Analytical Command Center (Bento Grid interface, Revenue charts, Property status).

## 🔗 UI Data Hooks (For Backend AI)
- **Revenue Distribution Chart:** Needs time-series data (array of revenue values per month/day).
- **Occupancy Status List:** Needs an array of objects `{ name: string, occupancy: number (0-100), trend: 'up' | 'down' }`.
- **Recent Bookings Table:** Needs an array of objects `{ id: string, guestName: string, property: string, checkIn: date, amount: number, status: 'confirmed' | 'pending' | 'cancelled' }`.
- **Pricing Tiers:** Needs configuration for `{ name, price, description, features[], isPopular }`.
- **Stats Overview:** Needs real-time counters for `Total Revenue`, `Active Bookings`, `ADR`, and `Satisfaction Score`.

## 🗄️ Implicit Entities (Database Schema)
- `Properties`: Name, Type, Location, Base Rate.
- `Bookings`: GuestID, PropertyID, CheckIn, CheckOut, Amount, Status.
- `Guests`: Name, Email, LoyaltyTier, TotalSpent.
- `Users`: Staff access, Role (Admin/Manager), AssignedProperties.
- `RevenueLogs`: Date, Amount, PropertyID.

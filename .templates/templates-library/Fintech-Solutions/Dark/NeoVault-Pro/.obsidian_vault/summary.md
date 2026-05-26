
# 💎 Digital Twin: NeoVault Pro

## 🏗️ UI Architecture
- **Root (Landing Page):** `src/app/page.tsx` (Premium Hero, Features, Pricing)
- **Login:** `src/app/login/page.tsx` (Institutional Access Gateway)
- **Dashboard:** `src/app/dashboard/page.tsx` (Main Terminal with Bento Box)
- **Navigation Components:** 
    - `src/components/Sidebar.tsx` (Dashboard Sidebar)
    - `src/components/Header.tsx` (Dashboard Header)

## 📊 Data Models (DTOs)

### Metric
```typescript
interface Metric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}
```

### Settlement Data
```typescript
interface SettlementPoint {
  time: string;
  volume: number;
  latency: number;
}
```

### Asset Allocation
```typescript
interface AssetAllocation {
  name: string;
  value: number;
  color: string;
}
```

### Transaction
```typescript
interface Transaction {
  id: string;
  type: string;
  asset: string;
  amount: string;
  status: 'Completed' | 'Processing' | 'Failed';
  counterparty: string;
}
```

## 🧩 Exported Components
- `LandingPage`: High-conversion entry point.
- `LoginPage`: Secure authentication interface.
- `Dashboard`: Core management terminal.
- `Charts`: Recharts implementations (Area, Pie, Bar).

## 🔌 Backend Wiring Strategy
To replace mock data:
1. Replace `import { ... } from '@/lib/mock-data'` with API fetches.
2. Implement Auth logic in `src/app/login/page.tsx` connecting to an Auth provider.
3. Use SWR or React Query for real-time polling of settlement metrics in the Dashboard.
4. Map backend DTOs to the interfaces defined above.

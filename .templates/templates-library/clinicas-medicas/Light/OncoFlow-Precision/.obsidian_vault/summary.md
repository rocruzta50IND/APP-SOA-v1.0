# 🧪 BLUEPRINT SUMMARY: ONCOFLOW PRECISION

## 📋 GERAL
- **Niche:** SaaS Premium para Clínicas de Oncologia e Centros de Infusão.
- **Global Vibe:** Clean, Professional, High-Precision, Clinical.
- **Color Palette:** Slate-50 (BG), White (Cards), Emerald-600 (Primary), Slate-900 (Text).

## 🗺️ ROUTE MAP
- `/`: Landing Page (Immersive, 5 sections).
- `/login`: Split-screen Login with brand visual.
- `/dashboard`: Main Bento Box Dashboard.
- `/pacientes`: Patient list and clinical status.
- `/infusoes`: Bed/Chair map and scheduling.
- `/farmacia`: Oncology drug inventory control.
- `/relatorios`: Clinical and financial analytics.

## 💎 UI DATA HOOKS
- **Infusion Agenda:** Real-time tracking of patients, drugs, and prep status.
- **Bed/Chair Map:** Visual grid of infusion spots with occupancy status.
- **Critical Alerts:** Dark-mode notification card for urgent clinical/pharmacy events.
- **Performance Area Chart:** Financial and operational growth visualization.
- **Oncology Inventory Table:** Specialized drug tracking with stability and dosage info.

## 🏗️ IMPLICIT ENTITIES
- `Patient`: { id, name, age, clinicalStatus, lastVisit, nextInfusion }
- `InfusionSession`: { id, patientId, drug, time, status, bedId }
- `OncologyDrug`: { id, name, manufacturer, dosage, quantityInStock, stabilityStatus }
- `AnalyticsData`: { date, revenue, sessionVolume, pathologyDistribution }

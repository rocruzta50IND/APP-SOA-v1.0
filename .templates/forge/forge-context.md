# ⚙️ FORGE CONTEXT: FlowSlate

## 1. Core Identity
- **Name:** FlowSlate
- **Category:** Kanban
- **Target Audience:** Enterprise B2B / High-ticket.

## 2. Technical Setup
- **Color Mode:** Light Mode
- **Design Tier:** Tier 2
- **Framework:** Next.js (App Router), Tailwind CSS, Lucide, Recharts, Framer Motion.

## 3. The 8-Page Mandate
- **Public Routes:** `/`, `/login`, `/register`.
- **Internal Routes:** `/dashboard`, `/boards`, `/backlog`, `/analytics`, `/settings`

## 4. Business Core Logic
- **Regras Visuais Primárias:** Quadro Kanban com colunas dinâmicas e cartões interativos animados via Framer Motion com física de mola (spring transition com stiffness: 400 e damping: 30). Layouts em Bento Grid integrando gráficos de ciclo de entrega e velocidade via Recharts. Elementos em Light Mode puro, sem classes "dark:", utilizando exclusivamente tokens semânticos de cor baseados em variáveis CSS para evitar magic strings (ex: bg-background, text-foreground, border-border), com bordas micro-finas e sombras em camadas para estética premium (Tier 2).
- **Mock Data Theme:** Métricas de desenvolvimento de produto e entrega contínua (ex: Cycle Time, Burndown, Throughput, Sprint Velocity) e tarefas de desenvolvimento reais de times de tecnologia e design de alto desempenho com tags de prioridade, responsáveis e estimativas em pontos de esforço.

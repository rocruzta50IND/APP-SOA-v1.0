# 🛠️ FORGE CONTEXT: Vektra

## 1. Core Identity
- **Name:** Vektra
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
- **Regras Visuais Primárias:** Quadro Kanban interativo com colunas de fluxo dinâmicas e cartões animados via Framer Motion com física de mola (spring transition com stiffness: 400 e damping: 30) e efeito hover de escala suave (`scale-102`). Bento Grid para visualização de métricas e gráficos de produtividade (Ciclo de Entrega e Velocidade da Sprint) usando Recharts com gradientes lineares. UI moderna e premium em Light Mode com cantos arredondados de `1rem` (`rounded-2xl`), sombras em camadas sutis e bordas micro-finas (`border-border/60`). Todo o estilo deve usar exclusivamente variáveis semânticas de cor do globals.css (ex: `bg-background`, `text-foreground`, `border-border`, `bg-primary`, `text-primary-foreground`) sem cores hardcoded ("magic strings").
- **Mock Data Theme:** Dados e telemetria de desenvolvimento de alta performance focados em produtos SaaS corporativos. Os cartões de tarefas devem exibir títulos reais de engenharia (ex: "Refatorar middleware de autenticação JWT", "Otimizar tempo de renderização do Recharts", "Implementar layout bento conforme especificação Tier 2"). Cada tarefa deve conter tags de prioridade estilizadas com cores pastel semânticas, pontuação de esforço (Story Points) em JetBrains Mono, avatar de responsável e estimativas realistas.

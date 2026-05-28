<h1 align="center">Control Center (SOA v1.0)</h1>

<p align="center">
  <strong>O Maestro da Forja de Templates: Orquestração Inteligente para SaaS de Alto Padrão.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Electron-42.3-47848F?style=for-the-badge&logo=electron" alt="Electron" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Framer_Motion-v12-FF0055?style=for-the-badge&logo=framer" alt="Framer Motion" />
</p>

---

## ⚡️ Visão Geral e Arquitetura (Deep Dive)

O **Control Center (SOA v1.0)** não é apenas uma interface; é o núcleo operacional de um ecossistema projetado para a fabricação em massa de templates SaaS de nível enterprise. O sistema utiliza uma arquitetura orientada a serviços (SOA) que integra uma interface desktop robusta (Electron + Next.js) a um motor de automação alimentado por IA (Gemini CLI).

### O Motor de Forja (The Template Forge)
A "Forja" opera em um pipeline de 4 fases críticas:
1.  **Iniciação:** Definição de Persona, Categoria (Fintech, HealthTech, etc.) e Design Tier.
2.  **Fabricação:** Setup do ambiente sandbox e construção da UI (Landing Pages + 5 páginas internas).
3.  **Captura:** Validação visual automatizada via Puppeteer.
4.  **Empacotamento:** Distribuição para a `templates-library` com integridade de dados e limpeza de resíduos.

> **Nota Arquitetônica:** O sistema implementa o padrão "Digital Twin & Memory Integrity", onde cada mudança é registrada em um vault descentralizado (.obsidian_vault), garantindo que a inteligência do sistema evolua sem perda de contexto (Anti-Bloat).

---

## 🗺️ Mapa do Ecossistema

```text
SOA v1.0/
├── apps/
│   └── control-center/          # Interface Desktop (Next.js + Electron)
├── .agent/                      # Cérebro do Projeto (Agentes Especializados)
│   ├── agents/                  # Guardian, Janitor, Architect, QA...
│   └── mission.md               # Fila de execução atômica atual
├── .scripts/                    # Core de Automação
│   └── auto-forge.mjs           # Orquestrador do Pipeline de Fabricação
├── .templates/                  # Biblioteca de Blueprints e Regras
│   ├── forge/                   # Regras de Negócio e Tiers de Design
│   └── templates-library/       # Templates gerados (E-commerce, CRM, etc.)
└── .obsidian_vault/             # Base de Conhecimento e Memória do Projeto
```

---

## 🛡️ Tech Stack (O Arsenal)

| Domínio | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Core** | Electron | Wrapper Desktop e Orquestração de Processos |
| **Frontend** | Next.js 16 (App Router) | Interface de usuário de alta performance |
| **Styling** | Tailwind CSS v4 | Estilização utilitária ultra-rápida |
| **Animações** | Framer Motion | Micro-interações e transições fluidas |
| **Terminal** | xterm.js + node-pty | Integração de logs em tempo real |
| **Automação** | Gemini CLI + Puppeteer | Geração de código e captura de previews |
| **Gestão** | Obsidian (Vault) | Documentação viva e sincronia de contexto |

---

## ✨ Funcionalidades Principais (Key Features)

*   **⚡️ Automação Zero-Touch:** Geração completa de aplicações SaaS (Landing Page + Dashboard) em minutos.
*   **⚙️ Orquestração via Electron:** Controle total sobre processos do sistema, terminais integrados e sistemas de arquivos.
*   **🛡️ Design Tiers:** Três níveis de refinamento visual, garantindo desde MVPs rápidos até interfaces Ultra-Premium.
*   **💎 Glassmorphism UI:** Interface moderna baseada em tons de Zinc/Slate, com efeitos de transparência e foco em densidade de informação (Bento-box).
*   **🤖 Agentes Especializados:** Sistema de agentes (Guardian, Janitor) que auditam o código e mantêm a higiene do repositório.
*   **📸 Snapshot Engine:** Captura automatizada de previews em múltiplos temas (Light/Dark) para a galeria.

---

## 🚀 Guia de Instalação e Execução

### Pré-requisitos
*   Node.js (v20+)
*   npm (v10+)
*   Gemini CLI (configurado globalmente para a Forja)

### Passos para Instalação

1. **Clonar o Repositório:**
   ```bash
   git clone [url-do-repositorio]
   cd "SOA v1.0"
   ```

2. **Instalar Dependências (Control Center):**
   ```bash
   cd apps/control-center
   npm install
   ```

3. **Rodar em Modo Desenvolvimento:**
   ```bash
   npm run dev:desktop
   ```

---

## ⚙️ Automação e Scripts

| Comando | Descrição |
| :--- | :--- |
| `npm run dev:desktop` | Inicia o Next.js e o Electron simultaneamente. |
| `npm run electron` | Inicia apenas o wrapper do Electron. |
| `npm run build` | Gera o build de produção do Next.js. |
| `node .scripts/auto-forge.mjs` | Executa o motor de forja manualmente via CLI. |

---

<p align="center">
  <sub>Construído com precisão para a nova era da automação de software. <strong>SOA v1.0</strong></sub>
</p>

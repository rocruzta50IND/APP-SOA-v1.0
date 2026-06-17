# 📖 REGRAS DE ARQUITETURA E DOMÍNIO (Control Center)

Bem-vindo ao projeto **Control Center** (SOA v1.0). Estas são as regras absolutas que os agentes (Orquestrador e Analista) devem seguir ao planejar e codificar soluções neste repositório.

---

## 🛠️ 1. STACK TECNOLÓGICA (The Core)
*   **Framework Frontend:** Next.js 14 (App Router) + React 19.
*   **Framework Desktop:** Electron 42.
*   **Linguagem Principal:** TypeScript (`.tsx` e `.ts`) para o frontend, e JavaScript (`.js` / `.mjs`) para configurações e processos do Electron (`main.js`, `preload.js`).
*   **Estilização:** Tailwind CSS v4.
*   **Bibliotecas Chave:** `framer-motion` (animações), `recharts` (gráficos), `lucide-react` (ícones), `@xterm/xterm` e `node-pty` (emulação de terminal).

---

## 🏛️ 2. ARQUITETURA DO SISTEMA (Desktop + Web)
Este é um aplicativo híbrido. Respeite estritamente a separação de processos:

1.  **Processo Principal (Main Process - Node.js):**
    *   Arquivo central: `main.js`.
    *   Aqui rodam as APIs nativas do sistema operacional, controle de janelas e processos pesados. NÃO importe bibliotecas do React ou de UI aqui.
2.  **Ponte de Comunicação (Preload / IPC):**
    *   Arquivo central: `preload.js`.
    *   A comunicação entre o frontend e o backend Node deve OBRIGATORIAMENTE ser feita via `contextBridge` e `ipcRenderer/ipcMain`.
3.  **Processo de Renderização (Renderer Process - Next.js):**
    *   Fica dentro de `src/` (provavelmente `src/app/` ou `src/components/`).
    *   **Regra de Ouro:** Por ser Next.js 14, assuma que todos os componentes são **Server Components** por padrão. Se precisar usar `useState`, `useEffect`, ou componentes como o `xterm` e `recharts`, lembre-se de adicionar a diretiva `'use client'` no topo do arquivo.

---

## ⚠️ 3. AVISOS CRÍTICOS E CONVENÇÕES
*   **Next.js 14 Breaking Changes:** Este projeto usa versões recentes do Next.js e React. Não assuma convenções antigas do Pages Router (`pages/`). Use a pasta `app/`. Em caso de dúvida sobre rotas ou APIs, limite-se ao padrão oficial do App Router.
*   **Estilos:** Não use arquivos CSS puros para estilização local, a menos que seja para configuração global. Use estritamente as classes utilitárias do Tailwind CSS.
*   **Gestão de Estado Terminal:** Como o app usa `node-pty` e `xterm`, lembre-se que o pty (pseudo-terminal) deve rodar no Main Process (via `main.js` ou scripts Node de suporte) e a renderização (xterm) no Renderer (Frontend), comunicando-se via eventos IPC através do `preload.js`.

---
*Lembrete ao Orquestrador/Analista: Seus planos de correção e códigos devem seguir rigorosamente o delineado acima.*

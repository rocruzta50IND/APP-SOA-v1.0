<div align="center">
  <h1>SOA Control Center (SOA v1.0)</h1>
  <p><em>Motor autônomo de forja de templates orquestrado por Inteligência Artificial.</em></p>

  ![Electron](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)
  ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
  ![Gemini CLI](https://img.shields.io/badge/Gemini_CLI-000000?style=for-the-badge&logo=google-gemini&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
</div>

---

## 🏛️ A Arquitetura da Fábrica (Visão Técnica)

O SOA Control Center opera como uma "Fábrica Industrial" de software, desacoplando a interface visual do processamento pesado. A arquitetura segue um fluxo de orquestração rigoroso:

1. **UI (Interface Next.js):** Localizada em `page.tsx`, fornece a experiência imersiva e reativa (Framer Motion). Envia parâmetros de forja (Categoria, Tema, Tier) de forma isolada.
2. **Core (Electron `main.js`):** Atua como o cérebro da operação. Recebe os comandos via IPC (Inter-Process Communication), instancia terminais virtuais (`node-pty`) e garante a segurança do sistema de arquivos (ex: blindagem de exclusão na galeria).
3. **Motor de Forja (`auto-forge.mjs`):** O processo *heavy-lifter* executado em background. Ele prepara a infraestrutura, gerencia o cache e invoca a Inteligência Artificial iterativamente para construir o template do zero até o empacotamento final.

---

## ⚡ Engenharia de Performance & Segurança (Destaques)

### 🚀 Zero-Latency Caching (I/O Blindado)
O maior gargalo de tempo em aplicações Node/Next.js no Windows (NTFS) é o I/O de milhares de pequenos arquivos (ex: `node_modules`).
O motor implementa uma arquitetura de "Base Template Cache": na primeira forja, os artefatos base são cacheados. Nas forjas seguintes, o sistema utiliza **Directory Junctions / Symlinks** no nível do S.O. para linkar o `node_modules` de forma instantânea. Isso reduz o tempo de setup inicial de minutos para menos de 3 segundos, prevenindo cenários de *Out of Memory (OOM)*.

### 🛡️ YOLO Harness & Sandboxing (Coleira de IA)
A automação utiliza a CLI do Gemini operando em modo executivo autônomo (`--yolo`). Para evitar que a IA tome decisões destrutivas no host:
- **CWD Isolation:** O processo do Gemini é "preso" no diretório `.templates/forge/sandbox`. Caminhos relativos externos falham em caso de manipulação maliciosa.
- **Prompt Injection (Harness):** Todo comando principal é precedido por uma injeção de código inegociável (`<ABSOLUTE_RESTRICTIONS>`). A IA é expressamente proibida de recriar a infraestrutura (`package.json`) ou rodar comandos de instalação, sendo o seu escopo limitado estritamente aos diretórios `src/app/` e `src/components/`.

### 🖥️ TTY Passthrough e UX Imersiva
O feedback visual da automação não é um mero log de texto sem formatação. O `auto-forge.mjs` é spawnado com `stdio: ['pipe', 'inherit', 'inherit']` acoplado ao `FORCE_COLOR: '1'`. O Electron captura essa saída rica em detalhes via `node-pty` e a transmite via WebSockets (IPC) diretamente para o componente `xterm.js` no frontend. O resultado é a preservação de cores ANSI originais, spinners dinâmicos e latência zero na interface premium.

---

## 🗺️ Mapa do Ecossistema

```text
📦 SOA Control Center (SOA v1.0)
├── 📂 apps/
│   └── 📂 control-center/   # Frontend Next.js envelopado em Electron (A UI)
├── 📂 .scripts/
│   └── 📄 auto-forge.mjs    # O Motor de Orquestração Sequencial da IA
├── 📂 .templates/
│   ├── 📂 forge/            # O "Chão de Fábrica". Contém prompts, sandbox e regras
│   └── 📂 templates-library/# A Galeria final onde os lingotes forjados são armazenados
└── 📂 .agent/               # O Cérebro Sistêmico. Contém as Skills (UX, Security, Design) e Regras Híbridas
```

---

## 🚀 Guia de Ignição (Setup)

Siga os passos abaixo para dar partida na caldeira:

```bash
# 1. Certifique-se de possuir o antigravity CLI configurado no sistema e autenticado.
# agy login

# 2. Navegue até o aplicativo principal do Control Center
cd apps/control-center

# 3. Instale as dependências da interface e do core do Electron
npm install

# 4. Inicie o SOA Control Center no ambiente de desenvolvimento
npm run dev
```

> **Aviso:** Certifique-se de estar em um ambiente com permissões convencionais; a utilização inteligente de *Directory Junctions* elimina a necessidade de executar o sistema como Administrador no Windows.
# 🗺️ PLANO ESTRATÉGICO: DEFINIÇÃO NATIVA DE WORKSPACE DA CLI

## 1. Contexto e Problema
O usuário deseja uma solução nativa e definitiva: que a CLI reconheça automaticamente a pasta `sandbox` como seu espaço de trabalho (Workspace) oficial ao ser iniciada, descartando de vez o fallback para a pasta `scratch` e dispensando o envio de mensagens ou prompts forçados de instrução inicial.

## 2. Alinhamento com a Arquitetura
- As CLIs de agente, por padrão, utilizam marcadores de estrutura para identificar a raiz de um workspace local. No caso do sistema utilizado (Antigravity/`agy`), a presença do diretório `.agents` (Workspace Customizations Root) indica nativamente à CLI que aquele é um workspace ativo.

## 3. Missão do Analista
1. **Implementação do Marcador de Workspace:**
   - A solução técnica mais limpa é criar fisicamente o diretório de customização de workspace (ex: `.agents`) dentro do diretório alvo.
   - Assim que o diretório for detectado na inicialização, a CLI assumirá o controle tendo a sandbox como base.

2. **Ajuste no Backend (Node.js / `main.js`):**
   - Inspecione a rotina que cria ou inicializa a pasta da sandbox e dispara o `node-pty`.
   - Requisite que seja injetado um código via módulo `fs` (File System) do Node para assegurar que a pasta `.agents` exista **antes** do PTY ser spawnado:
     `fs.mkdirSync(path.join(sandboxPath, '.agents'), { recursive: true });`

3. **Instruções para o Integrador:**
   - Elabore no `@gemini/INTEGRADOR.md` o plano de injeção no código.
   - Forneça o `TargetContent` exato de onde o PTY é instanciado no `main.js` e o `ReplacementContent` incluindo a instrução de criação do diretório `.agents` e confirmando que o `cwd` do `ptyProcess` esteja apontando estritamente para a sandbox.

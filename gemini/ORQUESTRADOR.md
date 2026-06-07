# RELATÓRIO DE AUTÓPSIA TÉCNICA E MAPEAMENTO ARQUITETURAL - PATHOLOGIST-AUDITOR

## 1. Diagnóstico Arquitetural (A Encruzilhada da Jornada)
A bifurcação de jornada deve ocorrer no exato momento em que o ambiente local reporta prontidão (quando a UI atinge `automationState === 'awaiting-input'`). O sistema deve funcionar como um "Gateway de Intenção". 

No estado atual, o contexto React (`@apps\control-center\src\context\ProductionContext.tsx`) não possui memória semântica sobre *qual* fluxo o usuário deseja seguir, assumindo implicitamente que todo input de texto é um comando avulso. 

Além disso, existe uma **fratura arquitetural silenciosa no Backend**: se o deploy inicial for feito via Galeria (`@apps\control-center\src\main\templateManager.js`), o sistema ativa a flag `isProductionRunning`, mas **não inicia o processo do motor** (`auto-production.mjs` no `@apps\control-center\src\main\productionRunner.js`). Se a escolha do usuário na UI simplesmente enviasse o antigo comando IPC de texto, a mensagem seria despachada para um processo fantasma (nulo) e a interface congelaria sem feedback.

A arquitetura exige:
1. **Camada de Contexto (React):** Uma variável de estado unificada para reter a intenção do usuário (`journeyMode`).
2. **Camada Visual (UI):** Uma barreira visual (Gate) substituindo a caixa de texto livre por uma tela de seleção de fluxo.
3. **Ponte IPC e Backend:** Separação estrita de roteamento. O "Fluxo MVP" exige o acionamento do loop guiado de roadmap, enquanto o "Fluxo Livre" requer injeção direta de prompts contornando o processo fantasma.

## 2. Relatório de Impacto (Risco de Contaminação Cruzada)
Se não isolarmos rigorosamente os estados da UI e os manipuladores do backend, enfrentaremos os seguintes colapsos estruturais:
- **Corrupção de Estado do Agente (Amnésia Arquitetural):** O motor atual lê e reage ao arquivo `@.agent\mission.md`. Se o "Fluxo Livre" continuar sobrescrevendo este mesmo arquivo via o handler legado `manual-mission-command`, ele destruirá ou corromperá o histórico e o roteiro seqüencial do "Fluxo MVP". Um modo apagará o cérebro do outro.
- **Descarte de Mensagens (Void Routing):** Pela fratura mencionada, comandos livres enviados após um carregamento via Galeria falharão silenciosamente se tentarem utilizar a comunicação com a variável `productionProcess` (nula neste cenário).
- **Condição de Corrida (Race Condition):** Se o modo MVP for ativado (e a esteira começar a trabalhar sozinha), a UI não pode mais permitir inputs livres simultâneos, caso contrário o Gemini tentará manipular os mesmos arquivos corrompendo os locks de I/O (Win32).

## 3. Plano de Ação Cirúrgico
Um roteiro passo a passo estrito para o Integrador executar, respeitando integralmente a blindagem e não modificando nada nos diretórios `@.agent` e `@.obsidian_vault`:

**Passo 1: Ampliação do Contexto React (Frontend)**
- No arquivo `@apps\control-center\src\context\ProductionContext.tsx`, crie o estado `const [journeyMode, setJourneyMode] = useState<'mvp' | 'freeform' | null>(null);`.
- Exponha `journeyMode` e `setJourneyMode` no Provider para que a UI possa consumir e alterar a intenção.
- Modifique a função `handleReset` para garantir que `journeyMode` seja redefinido para `null` ao parar a produção.

**Passo 2: Inserção da Bifurcação Visual (UI)**
- No arquivo `@apps\control-center\src\app\(orchestrator)\production\page.tsx`, localize a renderização do painel interativo (no trecho onde se checa `automationState === 'awaiting-input'`).
- Envolva o formulário (a caixa de texto original do Chatbot `<form>`) em uma renderização condicional: ele **só deve ser exibido** se `journeyMode === 'freeform'`.
- Se `journeyMode === null`, renderize dois grandes botões de escolha na área do chat:
  1. **"Modo Esteira MVP"**: Ao clicar, invoca `setJourneyMode('mvp')` e dispara um novo IPC `window.electronAPI.startMVPLoop()`. Oculta o chat e mostra um painel de "Automação Guiada em Andamento".
  2. **"Modo Sandbox Livre"**: Ao clicar, invoca `setJourneyMode('freeform')`. O chat padrão é exibido permitindo o input.

**Passo 3: Criação de Novas Pontes IPC Estritas (Preload)**
- No arquivo `@apps\control-center\preload.js`, adicione e exponha duas novas chamadas na API do Electron:
  - `startMVPLoop: () => ipcRenderer.send('production.start-mvp')`
  - `sendFreeformCommand: (cmd) => ipcRenderer.send('production.run-freeform', cmd)`
- Substitua a chamada legada `sendManualProductionCommand` (no disparo do Enter do chat) pela nova `sendFreeformCommand`.

**Passo 4: Resolução da Fratura e Isolamento (Backend)**
- No arquivo `@apps\control-center\src\main\productionRunner.js`, crie os dois novos listeners IPC para tratar o roteamento:
  - `ipcMain.on('production.start-mvp', ...)`: Este handler fica responsável por instanciar a automação MVP. Se o ambiente subiu via Galeria (processo nulo), ele deve executar um fork do motor direcionando-o exclusivamente à leitura da esteira e ignorando as fases de setup de ambiente (Discovery/Env).
  - `ipcMain.on('production.run-freeform', (event, cmd) ...)`: Para erradicar a contaminação cruzada com `mission.md` e contornar o processo fantasma, este manipulador deve invocar o `gemini --yolo "{cmd}"` diretamente (via `pty` ou `spawn`) ou gerar um script transiente (`freeform-mission.md`), assegurando que o roteiro do agente principal no `.agent` jamais seja afetado pelo fluxo Sandbox.
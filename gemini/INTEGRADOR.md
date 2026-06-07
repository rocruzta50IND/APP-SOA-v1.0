Atue como o SURGICAL-INTEGRATION-ENGINEER, o braço executivo de elite da SOA v1.0. Você é o ÚNICO agente autorizado a gerar, escrever e alterar código em toda a arquitetura. Sua responsabilidade é aplicar o Plano de Ação gerado pelo Analista com precisão milimétrica.

**Plano de Ação para Execução: Bifurcação de Jornada (MVP vs. Livre)**

A arquitetura atual possui uma fratura onde o input do chatbot pode cair em um processo fantasma caso o template seja carregado via Galeria. Além disso, precisamos dar a escolha ao usuário (Modo Esteira MVP vs. Modo Sandbox Livre) para não corromper o estado do Agente (`.agent/mission.md`). 

**RESTRIÇÃO ABSOLUTA E INEGOCIÁVEL:** Nenhuma alteração pode ser realizada nos diretórios `@.agent` ou `@.obsidian_vault`.

Execute as seguintes etapas cirúrgicas:

**Passo 1: Ampliação do Contexto React (Frontend)**
- **Alvo:** `@apps\control-center\src\context\ProductionContext.tsx`
- **Ação:** 
  - Adicione um novo estado: `const [journeyMode, setJourneyMode] = useState<'mvp' | 'freeform' | null>(null);`.
  - Exponha `journeyMode` e `setJourneyMode` na interface do Context e no `ProductionContext.Provider`.
  - Modifique a função `handleReset` (ou similar de limpeza de estado) para garantir que `setJourneyMode(null)` seja invocado ao parar a produção.

**Passo 2: Inserção da Bifurcação Visual (UI)**
- **Alvo:** `@apps\control-center\src\app\(orchestrator)\production\page.tsx`
- **Ação:** 
  - Acesse o `journeyMode` a partir do `useProduction()`.
  - Onde atualmente a caixa de texto/formulário livre é renderizada para o estado `automationState === 'awaiting-input'`, envolva-a numa renderização condicional.
  - Se `journeyMode === null` (e `automationState === 'awaiting-input'`), não mostre a caixa de texto. Em vez disso, renderize dois botões grandes e claros:
    1. **"Modo Esteira MVP"**: Ao clicar, chama `setJourneyMode('mvp')` e invoca a nova ponte IPC `window.electronAPI.startMVPLoop()`.
    2. **"Modo Sandbox Livre"**: Ao clicar, chama `setJourneyMode('freeform')`.
  - Se `journeyMode === 'freeform'`, renderize o formulário normal do Chatbot (o input livre de comandos), que deverá invocar `window.electronAPI.sendFreeformCommand(comando)` no submit.
  - Se `journeyMode === 'mvp'`, renderize uma indicação visual de que a automação guiada está em andamento (ocultando o input de texto).

**Passo 3: Criação de Novas Pontes IPC Estritas (Preload)**
- **Alvo:** `@apps\control-center\preload.js`
- **Ação:** Adicione as duas novas funções no `contextBridge`:
  - `startMVPLoop: () => ipcRenderer.send('production.start-mvp')`
  - `sendFreeformCommand: (cmd) => ipcRenderer.send('production.run-freeform', cmd)`
  - Certifique-se de substituir a chamada legada na UI que envia comandos textuais pela nova função `sendFreeformCommand`.

**Passo 4: Resolução da Fratura e Isolamento (Backend)**
- **Alvo:** `@apps\control-center\src\main\productionRunner.js` (ou arquivo que centralize os listeners IPC referentes à produção)
- **Ação:** 
  - Crie o listener `ipcMain.on('production.start-mvp', (event) => { ... })`. Se `productionProcess` for nulo, inicie o motor (`auto-production.mjs` ou script equivalente) isolado para a esteira MVP.
  - Crie o listener `ipcMain.on('production.run-freeform', (event, cmd) => { ... })`. Este comando **não deve** escrever no arquivo `@.agent\mission.md`. Para evitar corrupção cruzada e o erro de processo nulo, invoque o processo CLI do Gemini (via node-pty ou child_process) usando um arquivo transiente (ex: `.agent/freeform-mission.md`, garantindo que seja deletado após uso, ou passando o prompt diretamente via string) para que a IA atue no diretório de projeto de forma independente.

**Seu Protocolo de Execução:**

Blindagem de Tipagem: Ao editar arquivos `.tsx` ou `.ts`, mantenha a tipagem estrita (adicione `journeyMode` nas interfaces corretas).

Consistência de Stack: As chamadas IPC no backend devem espelhar a estrutura atual, despachando logs para a UI via `window.electronAPI.onProductionLog` ou eventos equivalentes para que o usuário receba feedback no terminal ou chat.

Integridade Visual: Utilize classes do Tailwind CSS v4 para garantir que os dois novos botões na página de produção sigam a estética "Premium Dark".

O que você deve entregar:

Log de Alterações: Resumo de cada replace ou write_file realizado, citando os arquivos com @.

Relatório de Validação: Confirme que a máquina de estado do React opera limpidamente, que a ponte IPC está conectada, e que o fluxo Sandbox Livre NUNCA reescreve a missão principal da automação.

REGRAS:

Use a ferramenta replace preferencialmente para manter o código original intacto, limitando-se aos trechos precisos alterados. 
Toda referência de arquivo DEVE começar com @.

FLUXO DE SAÍDA (I/O): Ao terminar suas execuções e gerar o seu relatório final, você DEVE obrigatoriamente salvar todo o conteúdo do seu relatório dentro do arquivo @gemini/ORQUESTRADOR.md. Você deve sempre limpar o que tinha antes e colocar o conteúdo novo (sobrepondo o arquivo).
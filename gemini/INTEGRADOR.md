Atue como o SURGICAL-INTEGRATION-ENGINEER, o braço executivo de elite da SOA v1.0. A missão de hoje é corrigir uma regressão grave de UX: a tela de Produção não persiste o estado quando o usuário navega entre abas, diferentemente da tela de Forja.

O Diagnóstico revelou dois erros na tentativa anterior de persistência:
1. O Contexto de Produção está no layout errado (um layout aninhado que é destruído em trocas de aba maiores).
2. A UI da Produção não possui "Hidratação IPC" na montagem inicial (não pergunta ao backend o estado atual).

Seu Protocolo de Execução:
- O objetivo é espelhar a arquitetura da Forja.
- Mantenha a tipagem rígida no TypeScript (.tsx / .ts) e o padrão CommonJS no Backend Electron (.js).
- NÃO quebre a atual lógica de polling e de estados de Hotfix já existentes.

PLANO DE AÇÃO CIRÚRGICO:

1. Elevação de Layout (Root Layout):
- Abra `apps/control-center/src/app/(orchestrator)/layout.tsx` e REMOVA a injeção do `<ProductionProvider>`.
- Abra `apps/control-center/src/app/layout.tsx` (Root Layout). Importe o `<ProductionProvider>` e enrole o componente `<DashboardShell>` de forma similar ao `<ForgeProvider>`. Assim, o estado sobreviverá a qualquer mudança de aba.

2. Memória no Backend e Endpoint de Hidratação:
- No Main Process (`apps/control-center/main.js` ou no arquivo responsável pela gestão do script `auto-production`), crie variáveis para reter o status atual (ex: `let isProductionRunning = false; let currentTemplate = null;`).
- Registre o handler: `ipcMain.handle('get-production-status', () => { return { isProductionRunning, currentTemplate, ... } })`.

3. Atualizar o Preload (`apps/control-center/preload.js`):
- Exponha o novo handler de hidratação na API do Electron, adicionando `getProductionStatus: () => ipcRenderer.invoke('get-production-status')`.
- (Certifique-se de adicionar a tipagem no `global.d.ts` correspondente da sua UI).

4. Hidratação da UI (`apps/control-center/src/context/ProductionContext.tsx`):
- No `useEffect` principal que monta os listeners, adicione uma chamada assíncrona `init()` que invoca `window.electronAPI.getProductionStatus()`.
- Se a resposta indicar que o servidor ESTÁ rodando (`isProductionRunning: true`), atualize imediatamente os estados locais do Contexto (set logs passados, defina viewMode para terminal, ative os indicadores booleanos) para parear com a realidade.

O que você deve entregar:
- Log de Alterações citando os arquivos mexidos e as injeções de IPC.
- Relatório de Validação confirmando que após essas mudanças, é possível iniciar a produção, ir para outra aba (Galeria ou Vault), voltar, e encontrar tudo (logs e iframe) intacto.

REGRAS:
- Salve o relatório detalhado SOBREESCREVENDO COMPLETAMENTE o arquivo `gemini/ORQUESTRADOR.md`.
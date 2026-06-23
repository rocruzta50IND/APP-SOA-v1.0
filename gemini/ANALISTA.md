# Plano Estratégico de Investigação Técnica e Integração: Comunicação Script-UI (Forja)

**Problema Reportado:** O processo da Forja não está rodando perfeitamente pois o script (`sequential-orchestrator.mjs`) não está se comunicando com a UI da Forja. A IA/CLI deve criar o arquivo `BRAINSTORM.json` na raiz da pasta forge (`.templates/forge/`), e a UI precisa ler e entender esse arquivo para dar continuidade ao fluxo.

**Arquitetura do Fluxo:**
1. **Motor (Orquestrador invisível):** `@.scripts/sequential-orchestrator.mjs` -> Roda o CLI e aguarda a criação do `BRAINSTORM.json`.
2. **Ponte (Electron):** `@apps/control-center/src/electron/forgeRunner.js` -> Liga o React ao Orquestrador.
3. **Estado (React):** `@apps/control-center/src/context/ForgeContext.tsx` -> Mantém as opções do Brainstorm em memória.
4. **UI (React):** `@apps/control-center/src/app/page.tsx` -> Exibe caixas de seleção baseadas no JSON.

---

## 🎯 OBJETIVOS DA ANÁLISE E IMPLEMENTAÇÃO (Pipeline do Analista)

### Fase 1: Análise da Geração do JSON pelo Motor
1. **Verificar `@.scripts/sequential-orchestrator.mjs`:**
   - Inspecione se o orquestrador está efetivamente garantindo que a CLI escreva o arquivo `BRAINSTORM.json` no caminho correto (`@.templates/forge/BRAINSTORM.json`).
   - Avalie como o script avisa que o JSON está pronto (ex: evento emitido, `stdout`, mensagem IPC). O orquestrador precisa despachar um sinal claro de que o arquivo existe e pode ser lido.
   - Verifique a etapa de "limpeza" descrita pelo usuário para garantir que o JSON não está sendo deletado precocemente antes da UI lê-lo.

### Fase 2: Análise da Ponte e Transmissão de Dados
2. **Inspecionar `@apps/control-center/src/electron/forgeRunner.js`:**
   - Verifique como o evento do orquestrador é capturado.
   - Analise se o arquivo `BRAINSTORM.json` está sendo lido pelo `fs.readFile` (ou similar) no lado do Node.js/Electron.
   - Garanta que o conteúdo (parseado ou em string pura) seja enviado via ponte IPC para o frontend (ex: `webContents.send('forge-brainstorm-ready', jsonData)`).

### Fase 3: Análise do Frontend e Injeção de Estado
3. **Inspecionar `@apps/control-center/src/context/ForgeContext.tsx`:**
   - Procure pelos listeners de IPC (ex: `window.api.on('forge-brainstorm-ready', ...)`).
   - Verifique se a atualização de estado (ex: `setBrainstormOptions(jsonData)`) está sendo disparada corretamente após o recebimento do JSON.

4. **Inspecionar `@apps/control-center/src/app/page.tsx`:**
   - Verifique se o componente está reagindo à atualização do estado do `ForgeContext`.
   - Assegure-se de que a lógica condicional de carregamento ("Analisando") é desligada corretamente e as caixas de seleção (checkboxes) são renderizadas após o JSON estar disponível no contexto.

### Fase 4: Sincronia e Tratamento de Falhas (Checkpoints)
- Identifique em que parte exata do "telefone sem fio" (Orquestrador -> Ponte -> Contexto -> UI) a informação do JSON está sendo perdida.
- Corrija o mecanismo de sincronia. Se o arquivo demora a ser escrito, implemente verificadores ou "File Watchers" (`fs.watch` ou similar) no Electron ou no Orquestrador para ter certeza de que a UI só é avisada quando o JSON de brainstorm estiver totalmente salvo no disco.

**🚨 REGRAS CRÍTICAS (LEMBRETE):**
- Mantenha a separação rígida: APIs de leitura de arquivo (FS) e execução de processos (`node-pty`/`spawn`) pertencem ao **Electron/Node**. A UI no React (Next.js) **NÃO** deve tentar ler o `BRAINSTORM.json` diretamente do disco.
- Todo o tráfego de dados entre o arquivo recém-criado e a UI deve transitar pela ponte (`forgeRunner.js` e `preload.js`).

**Inicie a leitura dos códigos nestes arquivos para localizar e consertar o gargalo de comunicação.**

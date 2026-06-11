PROMPT PARA O ANALISTA (Persona: Pathologist-Auditor):

Atue como o PATHOLOGIST-AUDITOR, um especialista em depuração de sistemas distribuídos e orquestração Electron/Next.js. O Arquiteto-Chefe iniciou o teste E2E na Tela de Produção, mas o Frontend (Next.js) quebrou com um erro crítico de renderização na linha 232 do arquivo `page.tsx`.

Sintoma Relatado (Erro de Compilação/Runtime):
`src\app\(orchestrator)\production\page.tsx (232:75) @ journeyMode`
Linha do erro: `{isProductionRunning && automationState === 'awaiting-input' && journeyMode === null ? (`

Diretrizes de Análise para o Analista:

1. Rastreio da Variável Fantasma (`journeyMode`):
   - Inspecione o arquivo `@apps\control-center\src\app\(orchestrator)\production\page.tsx` e o contexto `@apps\control-center\src\context\ProductionContext.tsx`.
   - A variável `journeyMode` não está definida no escopo onde está sendo usada (linha 232). Ela deveria ser um `useState` local do componente `page.tsx` ou ela deveria vir desestruturada do `useProduction()` (o Contexto)?
   - Pelo contexto da arquitetura, o Backend (Runner) possui uma variável chamada `ptyJourneyMode` (que pode ser 'mvp' ou 'freeform'). O frontend tentou criar um estado equivalente visual (`journeyMode`) para controlar qual UI mostrar, mas esqueceu de declará-lo no destructuring ou no hook?

2. Impacto no Fluxo de UI:
   - O que essa linha 232 está tentando renderizar? Provavelmente os botões "Construir até o MVP" vs "Modo Livre", correto?
   - Se o Frontend não sabe qual é o `journeyMode`, a Esteira Fase 2 nunca poderá ser engatilhada pelo usuário.

O que você deve entregar (salvar em `@gemini/ORQUESTRADOR.md`):

Diagnóstico do Erro Frontend: Explique por que o Next.js não encontra a variável `journeyMode`. Faltou importar do Contexto? Faltou declarar o `useState` no componente?
Plano de Ação Estratégico: O que o Integrador deve adicionar (uma linha de código simples) no `page.tsx` ou no `ProductionContext.tsx` para definir o estado de `journeyMode` e resolver esse erro de referência sem quebrar os tipos TypeScript.

REGRAS ESTABELECIDAS:
LIMITAÇÃO RESTRITA: Você NUNCA gera código e NUNCA executa scripts ou comandos. O seu papel é unica e exclusivamente ANALISAR a arquitetura.
Use `@` para referenciar arquivos.
FLUXO DE SAÍDA (I/O): Ao terminar sua análise, SOBREESCREVA o arquivo `@gemini/ORQUESTRADOR.md` com o seu relatório.
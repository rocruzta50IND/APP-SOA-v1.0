PROMPT PARA O INTEGRADOR (Persona: Surgical-Integration-Engineer):

Atue como o SURGICAL-INTEGRATION-ENGINEER. A autópsia do Frontend confirmou um simples erro de desestruturação que está causando o crash da Tela de Produção (`ReferenceError: journeyMode is not defined`).

Plano de Execução Cirúrgico:

1. Correção de Desestruturação:
   * Alvo: `@apps\control-center\src\app\(orchestrator)\production\page.tsx`
   * Localize a chamada do hook principal do componente: `const { ... } = useProduction();`
   * Inspecione a lista de propriedades sendo extraídas.
   * Adicione as propriedades `journeyMode` e `setJourneyMode` a essa lista.

Protocolo de Execução:
Manutenção de Estilo: Mantenha a formatação/indentação local do objeto.

O que você deve entregar:
Log de Alterações: Confirmação de que o destructuring foi atualizado e que a tela compila sem erros.

REGRAS:
Toda referência de arquivo DEVE começar com `@`.
FLUXO DE SAÍDA (I/O): Ao terminar suas execuções e gerar o seu relatório final, SOBREESCREVA todo o conteúdo do arquivo `@gemini/ORQUESTRADOR.md` com o seu relatório.
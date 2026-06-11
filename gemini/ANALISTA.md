PROMPT PARA O ANALISTA (Persona: Pathologist-Auditor):

Atue como o PATHOLOGIST-AUDITOR. O Arquiteto-Chefe declarou a missão final de UX de hoje: O Chatbot da Tela de Produção deve deixar de ser apenas um "cuspidor de strings" e se tornar uma interface conversacional profissional, dinâmica e elegante, mascarando completamente o fato de que rodamos o CLI em `--yolo` no backend.

Sua missão é auditar a renderização atual do Chatbot e projetar as melhorias de UX/UI para atingirmos o nível de plataformas state-of-the-art.

Diretrizes de Análise para o Analista:

1. Renderização de Markdown e Código (A Estética):
   - Avalie `@apps\control-center\src\app\(orchestrator)\production\page.tsx`. Atualmente, iteramos `chatLogs` e, presumivelmente, apenas jogamos `log.text` dentro de uma div. O Gemini CLI responde em Markdown (com blocos de código, negritos, listas).
   - O projeto possui bibliotecas como `react-markdown` ou `marked` instaladas no `package.json`? Se não, como o Integrador deve introduzi-las no componente para renderizar as falas da IA com perfeição tipográfica (incluindo syntax highlighting se possível)?

2. O Feedback de Ação (O Estado "Thinking"):
   - Quando rodamos a Esteira MVP ou o Modo Livre, a IA pode demorar segundos (ou minutos) lendo arquivos e usando ferramentas antes de imprimir o resultado final.
   - Como o `ProductionContext.tsx` pode sinalizar para o `page.tsx` que a IA está "pensando"? O backend já emite eventos de início de processo que podemos usar para engatilhar um `<TypingIndicator />` ou um balão temporário com animação de "..."?
   - O usuário NUNCA deve ficar olhando para uma tela estática sem saber se a máquina travou ou se a IA está processando.

3. Fluidez Visual (Auto-Scroll e Transições):
   - O Chatbot atual faz "Auto-Scroll" suave para a última mensagem quando o `chatLogs` atualiza? 
   - Analise se precisamos de um `useRef` atrelado ao final da lista para garantir que a visão do usuário sempre acompanhe a linha de frente do diálogo.
   - As mensagens aparecem secas ou usam o `framer-motion` (que já vi estar no projeto) para surgirem de forma suave (Fade In / Slide Up)?

4. Sanitização do CLI (O Ocultamento da Ferramenta):
   - O Gemini CLI no modo `--yolo` imprime na tela o uso de ferramentas (ex: `Tool Call: read_file...`). 
   - Deveríamos adicionar um Regex no backend (`productionRunner.js`) ou no frontend para envelopar essas chamadas de ferramentas em mini-tags visuais (ex: ⚡ `Lendo arquivo...`) em vez de mostrar o JSON bruto da tool no meio do chat?

O que você deve entregar (salvar em `@gemini/ORQUESTRADOR.md`):

Diagnóstico da UX Conversacional: Aponte as deficiências atuais da renderização crua.
Plano de Ação Estratégico (O Toque de Mestre): O passo a passo estruturado para o Integrador: (1) Instalação/Configuração do renderizador Markdown. (2) Adição do Auto-scroll e Animações. (3) Lógica de Estado "Pensando" e/ou formatação visual de uso de ferramentas do CLI.

REGRAS ESTABELECIDAS:
LIMITAÇÃO RESTRITA: Você NUNCA gera código e NUNCA executa scripts ou comandos. O seu papel é unica e exclusivamente ANALISAR a arquitetura.
Use `@` para referenciar arquivos.
FLUXO DE SAÍDA (I/O): Ao terminar sua análise, SOBREESCREVA o arquivo `@gemini/ORQUESTRADOR.md` com o seu relatório.
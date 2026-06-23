# ANÁLISE DE FALHAS E POSSÍVEIS ERROS - FORJA UI/UX PRO MAX

Ao tentar rodar a Forja UI/UX Pro Max, o processo não retornou os checkboxes (opções de brainstorm), resultando numa volta silenciosa para o estado "Forge Ready" (Idle).

Aqui está a lista rigorosa de possíveis erros e falhas mapeados no fluxo que devem ser verificados e tratados após o reset:

## 1. Sujeira de ANSI Escape Codes no Output do `node-pty`
- **Problema:** O script `.scripts/auto-forge.mjs` passou a usar o `node-pty` para evitar o travamento do motor no Windows (ausência de TTY interativo). Porém, o `node-pty` captura a saída bruta do terminal, que **inclui códigos ANSI de cores** (ex: `\x1b[32m`, `\x1b[0m`).
- **Impacto:** Mesmo que a Regex consiga capturar o bloco ` ```json `, o conteúdo da string virá poluído com caracteres invisíveis do terminal. Quando a UI tenta rodar `JSON.parse(data.json)` no frontend (`page.tsx` ou `ForgeContext.tsx`), o parser quebra silenciosamente e a tela volta para "Forge Ready" no bloco `catch`.
- **Solução:** Implementar uma função de limpeza de ANSI (ex: `output.replace(/\x1b\[[0-9;]*m/g, '')`) logo antes de executar a expressão regular (Regex) no `.scripts/auto-forge.mjs`. Remover também a flag `FORCE_COLOR: '1'` das variáveis de ambiente daquele processo para mitigar cores extras.

## 2. Quebra de Concorrência e "Workspace Lock" do Antigravity CLI (`agy`)
- **Problema:** O `auto-forge.mjs` dispara instâncias de `agy --print` que competem pelo "workspace lock" (trava de pasta). Se a Forja for testada simultaneamente enquanto o Agente de Chat estiver ativo/respondendo na mesma pasta de trabalho, o script ficará bloqueado.
- **Impacto:** O comando trava sem saída visual, causando uma espera infinita se o timeout não estiver configurado perfeitamente no script.
- **Solução:** Utilizar scripts Node com a biblioteca oficial `@google/genai` (ou requisições `fetch` genéricas) ao invés de depender de subprocessos CLI para gerar brainstorms assíncronos onde ferramentas de arquivo (`view_file`) não são estritamente necessárias. 

## 3. Comportamento Multi-etapas Ocultas (Tool Calls no modo `--print`)
- **Problema:** Ao instruir o `agy` com "Leia rigorosamente as instruções do arquivo forge/BRAINSTORM_BOT.md", o modelo do Antigravity CLI resolve invocar uma _Tool Call_ (`read_file` ou `run_command`) antes de responder de fato.
- **Impacto:** O fluxo de stdout no terminal virtual pode não ser apenas o texto de resposta, mas também um emaranhado de logs de raciocínio da IA ("thought", "I will start by checking..."). 
- **Solução:** O Regex e a extração do payload devem prever lixo conversacional e forçar a extração do último chunk `{...}` limpo.

## PRÓXIMOS PASSOS PÓS-RESET
Forneça as diretrizes contidas neste documento para o seu próximo agente Antigravity, pedindo-lhe especificamente para:
1. Remover o `FORCE_COLOR: '1'` do `node-pty`.
2. Criar a string-stripper para limpeza de ANSI no `auto-forge.mjs`.
3. Validar de perto o `JSON.parse` no React.

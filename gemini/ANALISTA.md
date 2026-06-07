PROMPT PARA O ANALISTA (Persona: Pathologist-Auditor / UI-UX Architectural Analyst):
Atue como o PATHOLOGIST-AUDITOR. Temos uma missão dupla: depurar um crash crítico no sistema e projetar um layout de "Alta Produtividade" estilo Emergent/Artifacts para a Fábrica MVP.

Problemas e Objetivos Relatados:
1. Crash no Deploy: Ao clicar em um template na Galeria (botão '+'), o aplicativo "crasha" (quebra/fecha ou trava). A causa raiz deve estar no frontend (falha de estado) ou no backend (falha no IPC `template.deploy` em `templateManager.js`, erros de Node-pty, falha de FS, ou erro não tratado derrubando o Main Process).
2. O Layout 'Emergent': Ao invés de o chat sumir e dar lugar apenas ao Terminal, o usuário quer que o Chat deslize para a lateral esquerda (como uma barra conversacional), e a área central/direita seja ocupada pela visualização de Produção do MVP (que inclui o Preview em Iframe do localhost:3000 e o Terminal de logs).

Diretrizes de Análise:

1. Rastreio do Crash (Autópsia Backend/Frontend):
   - Audite mentalmente o que ocorre em `page.tsx` ao clicar no card: `window.electronAPI.deployTemplate(path)` é disparado. O que acontece se o `templateManager.js` tentar apagar/copiar a sandbox e ocorrer um erro? Ele está envolvido em um `try/catch` adequado?
   - O `pty.spawn` pode quebrar a aplicação inteira se o binário do terminal (ex: `powershell.exe`) estiver falhando ou não for encontrado. Identifique o elo fraco.

2. Desenho Arquitetural da UI (O Layout 'Emergent'):
   - Analise como estruturar o `viewMode` no `@apps\control-center\src\app\(orchestrator)\production\page.tsx`.
   - Estado `IDLE`: O Chat está no centro, grande.
   - Estado `PRODUCING`: Usando `framer-motion` (`layout` prop é ideal aqui), o contêiner do Chat deve encolher horizontalmente e encostar na esquerda (ex: `w-1/3`).
   - A área à direita (`w-2/3`) revela o Palco de Produção.
   - O que é o Palco de Produção? Uma composição elegante contendo um `iframe` (apontando para `http://localhost:3000` - a porta padrão onde o `npm run dev` do sandbox vai subir) e abas ou um painel inferior contendo o `TerminalView`.

O que você deve entregar:
Diagnóstico do Crash: Qual foi a falha lógica que derrubou o app ao acionar o Deploy do Template.
Blueprint do Layout: Uma explicação clara de como a grid flexível ou CSS Grid mudará na transição de estados.
Plano de Ação Cirúrgico (Sem código):
- Passo a passo para o Integrador blindar o Backend contra o crash do `template.deploy`.
- Passo a passo para o Integrador reformular o `page.tsx` usando propriedades `layout` do Framer Motion para deslizar o chat para a esquerda e montar a área de Preview.

REGRAS ESTABELECIDAS:
LIMITAÇÃO RESTRITA: Você NUNCA gera código e NUNCA altera o sistema.
Use @ para referenciar caminhos de arquivo.
FLUXO DE SAÍDA (I/O): Ao terminar sua análise, salve todo o conteúdo dentro do arquivo @gemini/ORQUESTRADOR.md, limpando e sobrepondo o conteúdo antigo.
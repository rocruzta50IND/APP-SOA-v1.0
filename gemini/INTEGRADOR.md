PROMPT PARA O INTEGRADOR (Persona: Surgical-Integration-Engineer):
Atue como o SURGICAL-INTEGRATION-ENGINEER. Houve uma falha de isolamento de domínio. Atualmente, o deploy de templates de Produção está utilizando a pasta `sandbox` pertencente ao domínio da Forja (`@.templates\forge\sandbox`). A Produção (Fábrica MVP) deve possuir um ambiente totalmente separado.

Plano de Ação a Executar (Refatoração de Isolamento de Domínio):

ALVO: `@apps\control-center\src\main\templateManager.js`

Passos para Implementação:

1. Criação do Domínio de Produção:
   - Em vez de usar a pasta da Forja, os templates de Produção devem ser trabalhados em um diretório dedicado.
   - Localize a variável que define o `sandboxPath` (geralmente `path.join(projectRoot, '.templates', 'forge', 'sandbox')`).
   - Altere essa variável para apontar para um novo diretório exclusivo da produção.
   - Novo Caminho: `path.join(projectRoot, '.agent', 'work-environment')` (ou crie um diretório `.production` na raiz, ex: `path.join(projectRoot, '.production', 'workspace')`). Baseado na instrução do usuário ("clonar para uma pasta do work-environment"), utilize a pasta `.agent\work-environment`.

2. Ajuste do Handler `template.deploy`:
   - Atualize a lógica para que:
     a) O sistema limpe a pasta `.agent\work-environment` (removendo `EBUSY` se necessário).
     b) Faça o `fs.cpSync` do template de origem (`templates-library`) para este novo `.agent\work-environment`.
     c) O `node-pty` inicie o processo `npm install; npm run dev` usando EXATAMENTE este novo caminho (`.agent\work-environment`) como CWD.

O que você deve entregar:
Log de Alterações: O nome da variável alterada e o novo caminho estabelecido no CJS.
Relatório de Validação: Confirmação de que a string de roteamento foi substituída (via `replace`) e que não há menção à Forja no handler de deploy da Produção.

REGRAS:
Use `replace` cirurgicamente.
FLUXO DE SAÍDA (I/O): Salve o relatório no arquivo @gemini/ORQUESTRADOR.md, limpando e sobrepondo o conteúdo anterior.
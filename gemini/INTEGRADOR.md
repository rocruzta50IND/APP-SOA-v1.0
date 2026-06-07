Atue como o SURGICAL-INTEGRATION-ENGINEER, o braço executivo de elite da SOA v1.0. Sua responsabilidade é aplicar o Plano de Ação gerado pelo Analista com precisão milimétrica, resolvendo de vez o conflito de portas do Next.js e o caminho quebrado das imagens de preview no estado de Standby.

O PROBLEMA/REQUISITO ATUAL:
1. O aplicativo principal já roda na porta 3000, logo, o `npm run dev` da sandbox falha ou assume outra porta, quebrando a comunicação com o Iframe e a validação do script.
2. A imagem ofuscada do template em "Standby" não carrega, pois a URL está sendo montada pela concatenação incorreta das strings das pastas (theme, category, etc.) e ignorando a chave absoluta `path`.

O PLANO DE AÇÃO CIRÚRGICO A SER EXECUTADO:

Passo 1: Correção no Motor de Produção (@.scripts\auto-production.mjs)
- Encontre onde é disparado o `child_process.spawn('npm', ['run', 'dev'], ...)` ou similar, após a instalação de dependências.
- Altere a chamada do `spawn` para injetar a variável de ambiente forçando a porta `3001`. Exemplo:
  `env: { ...process.env, PORT: '3001' }`
- Localize a expressão regular que verifica se o Next.js foi iniciado com sucesso (o trecho que faz `output.match(...)` ou `.test(...)` para a porta 3000). Modifique-a para suportar ou forçar especificamente a porta 3001, por exemplo: `/Ready in|started server on .*(3000|3001)|ready started server on/i.test(output)`

Passo 2: Atualização do Apontamento do Iframe (@apps\control-center\src\app\(orchestrator)\production\page.tsx)
- Utilize as ferramentas de pesquisa para achar onde o `<iframe` está renderizado.
- Modifique a prop `src` de `http://localhost:3000` (ou qualquer outro valor atual) para `http://localhost:3001`.

Passo 3: Correção do Path das Imagens Standby e Preview (@apps\control-center\src\app\(orchestrator)\production\page.tsx)
- Localize a tag de imagem ou background que renderiza a imagem ofuscada (Standby). Ela provavelmente usa o protocolo `forge://`.
- Atualmente, ela concatena `activeTemplate.category`, `activeTemplate.theme` e `activeTemplate.name`. Substitua esse caminho longo e frágil pelo uso direto da propriedade `activeTemplate.path`.
- O resultado deve ficar aproximadamente assim:
  `src={"forge://" + activeTemplate.path + "/preview/" + activeTemplate.images[0]}`
- Caso existam outras partes do arquivo (como a renderização da grade de templates em outro estado/modo) sofrendo do mesmo problema, aplique a refatoração ali também.

Seu Protocolo de Execução:
- Você é o único autorizado a modificar os arquivos listados.
- Utilize a ferramenta `replace` com base no `read_file` e `grep_search`.
- Revise a montagem de strings em JavaScript para evitar chaves nulas ou erros de barra (`/`).

O que você deve entregar:
- Log de Alterações documentando cada trecho editado usando @.
- Relatório de Validação confirmando a aplicação do 'PORT: 3001' e o recarregamento das imagens.

REGRAS ESTABELECIDAS:
- Use @ para referenciar arquivos.
- FLUXO DE SAÍDA (I/O): Ao terminar sua integração, salve TODO O SEU RELATÓRIO final no arquivo @gemini/ORQUESTRADOR.md e limpe o que havia antes.
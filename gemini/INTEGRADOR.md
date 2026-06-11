PROMPT PARA O INTEGRADOR (Persona: Surgical-Integration-Engineer):

Atue como o SURGICAL-INTEGRATION-ENGINEER. A autópsia do código revelou que as flags de silenciamento `--no-progress` foram ignoradas/omitidas na última alteração do `templateManager.js`, e que o terminal PTY está forçando o NPM a ser "interativo".

Sua missão agora é aplicar a "Bala de Prata" para silenciar o NPM de forma absoluta usando as Variáveis de Ambiente, além de corrigir as strings.

Plano de Execução Cirúrgico:

1. A Bala de Prata (Variáveis de Ambiente PTY):
   * Alvo: `@apps\control-center\src\main\templateManager.js`
   * Localize a declaração do PTY: `activePtyProcess = pty.spawn(...)`
   * No objeto de configuração, localize a chave `env: { ...process.env, FORCE_COLOR: '1', PORT: '3001' }`.
   * Injete as variáveis de ambiente que enganam o Node.js e desativam a interatividade. O bloco deve ficar rigorosamente assim:
     `env: { ...process.env, FORCE_COLOR: '1', PORT: '3001', NPM_CONFIG_PROGRESS: 'false', NPM_CONFIG_FUND: 'false', NPM_CONFIG_AUDIT: 'false', CI: 'true' }`

2. Redundância de Linha de Comando:
   * Alvo: `@apps\control-center\src\main\templateManager.js`
   * Localize as strings do `npmCmd`.
   * Você DEVE reescrevê-las incluindo as flags corretas.
   * Modifique a string do Win32 para:
     `$env:PORT=3001; npm install --legacy-peer-deps --no-progress --no-audit --no-fund; npm run dev -- -p 3001\r`
   * Modifique a string do fallback Unix para:
     `PORT=3001 npm install --legacy-peer-deps --no-progress --no-audit --no-fund && npm run dev -- -p 3001\n`

Protocolo de Execução:
Preservação Assíncrona: Mantenha as quebras de linha essenciais (`\r`, `\n`) inalteradas.

O que você deve entregar:
Log de Alterações: Um resumo de onde as variáveis de ambiente (`CI: 'true'`, etc) foram inseridas e confirmando a atualização das strings `npmCmd`.

REGRAS:
Toda referência de arquivo DEVE começar com `@`.
FLUXO DE SAÍDA (I/O): Ao terminar suas execuções e gerar o seu relatório final, SOBREESCREVA todo o conteúdo do arquivo `@gemini/ORQUESTRADOR.md` com o seu relatório.
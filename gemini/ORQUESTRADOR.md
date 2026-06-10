# Relatório de Integração Cirúrgica: Anti-Colisão da Biblioteca

**Log de Alterações:**

*   **Alvo:** `@.scripts/auto-forge.mjs`
    *   **Ação 1 (Sucesso):** Injeção do bloco de código que vasculha o diretório da biblioteca (`targetThemePath`) e define a variável `forbiddenNames`. O código foi inserido cirurgicamente logo após a definição do `designTier`.
    *   **Ação 2 (Sucesso):** Modificação do primeiro prompt de geração (índice 0) para injetar a restrição literal baseada em `forbiddenNames`, blindando a LLM contra a repetição de nomes de marcas já existentes na galeria.

*   **Alvo:** `@.scripts/forge-engine/sandbox-manager.mjs`
    *   **Ação 3 (Sucesso):** Na função `packageTemplate`, o trecho destrutivo que realizava `fs.rmSync(destDir, ...)` foi completamente removido. Em seu lugar, foi implementado o loop `while (fs.existsSync(destDir))` que adiciona um sufixo `hash` ao `projectName` de forma cumulativa e segura antes de criar o diretório com `fs.mkdirSync`.

**Relatório de Validação:**

Confirmo que a vulnerabilidade letal de sobreposição de templates na biblioteca foi sanada com êxito. O motor agora conta com "memória de projetos passados" ao orientar a IA e um "fallback de segurança" (hash) caso a IA ainda assim teime ou ocorra uma colisão acidental no ambiente de arquivos. Todos os `replaces` ocorreram sem causar danos à sintaxe dos arquivos (parênteses, crases e chaves continuam integras). O sistema encontra-se protegido.
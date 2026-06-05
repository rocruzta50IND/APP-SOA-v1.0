PROMPT PARA O INTEGRADOR (Persona: Surgical-Integration-Engineer):
"Atue como o SURGICAL-INTEGRATION-ENGINEER, o executor de elite da SOA v1.0. Sua missão é realizar um transplante técnico no motor @.scripts/auto-forge.mjs para implementar a 'Matriz de Seleção V3: Fronteira Gemini 3'. Você deve garantir que a forja opere com eficiência máxima de tokens e latência mínima.

Protocolo de Implante (Execução):

1. Refatoração da Função `executeGeminiPhase`:
   - Altere a assinatura para: `function executeGeminiPhase(promptText, stepName, model = 'gemini-1.5-flash', icon = '🤖')`.
   - Modifique o comando `spawn` para incluir a injeção dinâmica da flag `--model`.
   - Comando resultante no spawn: `${cmdStr} --yolo --model ${model}`.

2. Reconfiguração do Ciclo de Vida (Fim do arquivo):
   Atualize as chamadas de `executeGeminiPhase` com os seguintes modelos da Família 3:
   - Fase 1 (Contexto): `gemini-3.1-flash-lite`
   - Fase 2B (Public UI): `gemini-3-flash-preview`
   - Fase 2C (Internal UI): `gemini-3.1-pro-preview`
   - Fase 3 (Fotografias): `gemini-3.1-flash-lite`

3. Otimização do Quality Gate:
   - Localize a chamada de reparo dentro de `runQualityGate`.
   - Injete o modelo `gemini-3.1-pro-preview` para garantir que a auto-cura seja resolutiva na primeira tentativa.

Critérios de Aceite:
- Tipagem implícita mantida e sintaxe de ESM (`.mjs`) respeitada.
- Preservação de cores ANSI e logs de sistema.
- Zero quebras no fluxo de IPC com o Control Center.

REGRAS:
- Use @ para referenciar arquivos.
- NUNCA simplifique a lógica original de `activeProcesses` ou `stdio`.
- FLUXO DE SAÍDA (I/O): Ao terminar, salve o log detalhado das alterações em @gemini/ORQUESTRADOR.md."

# 🗺️ PLANO ESTRATÉGICO: TERMINAL READ-ONLY E INPUT VIA CHATBOT

## 1. Contexto e Problema
A Forja agora possui um terminal integrado e isolado no backend. A nova requisição define o fluxo de interação do usuário:
1. O terminal (Xterm) deve atuar estritamente como uma tela de "visualização" (Read-Only). O usuário não pode digitar diretamente nele.
2. A interação com a CLI (`agy`) será terceirizada para o Chatbot (no lado esquerdo). Tudo o que o usuário digitar e enviar pelo Chatbot deve ser capturado e transmitido para o script da CLI rodando no backend.

## 2. Alinhamento com `@gemini/RULES.md`
- **Arquitetura de Mão Dupla (IPC):** Para enviar dados do frontend para o processo do terminal no backend, deve-se criar um canal reverso passando pelo `preload.js`.
- **Desacoplamento Visual:** Travar a entrada do Xterm no frontend não impede o `node-pty` de receber comandos via IPC. Isso preserva a regra de negócio onde a "UI envia parâmetros de forja de forma isolada".

## 3. Missão do Analista
1. **Blindagem do Xterm (Read-Only):** Inspecione o componente `TerminalView`. Na instanciação do objeto `Terminal` (do pacote `@xterm/xterm`), adicione a configuração `{ disableStdin: true }` (ou intercepte o evento `onKey` para suprimir inputs manuais). Isso tornará o terminal imune a digitações diretas.
2. **Criação do Canal de Input (`preload.js` e `main.js`):**
   - No `preload.js`, exponha uma função na bridge, por exemplo: `sendTerminalInput: (data) => ipcRenderer.send('terminal-input', data)`.
   - No `main.js`, crie um listener `ipcMain.on('terminal-input', (event, data) => { ... })`. Dentro deste listener, invoque o método `write(data + '\r')` da instância do `ptyProcess` ativa (adicionando o Carriage Return `\r` para simular o "Enter").
3. **Acoplamento do Chatbot:** Analise o componente do Chatbot. No evento de `onSubmit` ou clique de envio da mensagem, capture o valor do input, exiba-o visualmente na tela do chat (se necessário para UX) e dispare `window.electron.sendTerminalInput(mensagem)`.
4. **Instruções para o Integrador:** Redija no `@gemini/INTEGRADOR.md` os blocos `TargetContent` e `ReplacementContent` definitivos para atualizar o `main.js`, `preload.js`, o `TerminalView.tsx` e o componente do Chatbot com essa nova dinâmica de input.

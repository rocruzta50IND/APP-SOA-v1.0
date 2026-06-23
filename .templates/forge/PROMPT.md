# Instrução Mestra: Projeto Kanban - Gestão de Tarefas e Projetos

Você é o agente desenvolvedor encarregado de criar a aplicação descrita abaixo.

## 1. Arquitetura e Escopo ("Zero Backend")
Você deve criar um projeto "Pure Frontend", estritamente visual, utilizando **React/Next.js e TailwindCSS**. 
Não crie nenhum banco de dados, nem implemente requisições HTTP reais. Todo o foco é na UI/UX e estado local.

## 2. Estrutura e Árvore de Componentes
- **Foco:** Gestão de Tarefas e Projetos.
- O aplicativo deve conter uma estrutura de navegação robusta:
  - **AppShell**: Container principal.
  - **Sidebar**: Navegação global.
  - **Header**: Área de busca, avatar do usuário, notificações.
  - **Main**:
    - **KanbanBoard**: Componente principal da área de trabalho.
    - **KanbanColumn**: Colunas de status (ex: Backlog, To Do, In Progress, Review, Done).
    - **KanbanCard**: Componente individual das tarefas.

## 3. Estilo Visual (UI/UX Pro Max)
- **Visual:** "Moderno e Clean com sombras suaves". O design deve ser minimalista, elegante e com um uso refinado de elevação (sombras) e espaços em branco.
- **Interações:** "Drag and Drop fluido de cartões". Utilize `framer-motion` para animações, transições suaves de layout e micro-interações.
- **Regras de Estilo:**
  - Siga rigorosamente as configurações do agente (se houver `.agent`).
  - **É terminantemente proibido injetar cores hexadecimais soltas no código.** Use estritamente o sistema de design ou as paletas do TailwindCSS de forma semântica.
  - Foco absoluto na experiência e encantamento do usuário.

## 4. Dados Mockados
- **Nível de Detalhe:** "Realista com responsáveis, etiquetas, datas e anexos."
- Exija que a UI seja populada com dados mockados hardcoded altamente complexos e bem estruturados. Os cartões do Kanban devem exibir avatares reais (placeholders bonitos), múltiplas tags/labels coloridas, indicadores de data de entrega (com status de atraso ou no prazo), contadores de comentários e anexos.

## 5. REQUISITO CRÍTICO: Local de Destino (Sandbox)
Instrução expressa e sem margem para dúvidas:
**TODOS** os arquivos criados, alterados ou gerados (seja código, configurações, arquivos package.json, assets, etc.) devem ser colocados **EXCLUSIVAMENTE** dentro da pasta relativa:
`./forge/sandbox/`

**É PROIBIDO** ler ou escrever qualquer arquivo fora desta sandbox. Inicie o projeto e crie toda a estrutura de pastas diretamente dentro de `./forge/sandbox/`.

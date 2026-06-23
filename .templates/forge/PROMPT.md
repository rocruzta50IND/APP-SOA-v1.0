# 🎯 Projeto Kanban - Pure Frontend

## 📌 Visão Geral
Construir um sistema Kanban puramente visual (Pure Frontend) focado em uma experiência de usuário premium (UX/UI Pro Max). O sistema não possuirá backend, banco de dados ou requisições HTTP reais; toda a interatividade será gerenciada na memória do cliente.

## 🎨 Design e UI/UX (Pro Max)
- **Estilo Visual:** Minimalista e Limpo, com suporte fluido a Modo Claro e Escuro.
- **Stack Tecnológico:** React / Next.js com TailwindCSS.
- **Animações e Micro-UI:** É OBRIGATÓRIO o uso de `framer-motion` para garantir interações suaves (ex: transições de tema, drag & drop de cards, hover states, modais).
- **Consistência:** Utilize as configurações de design do agente (`.agent`). É proibido injetar cores hexadecimais soltas; utilize sempre as classes e variáveis de tema do TailwindCSS.

## 📊 Estrutura e Navegação
A interface deve ser encapsulada em um **AppShell** estruturado com:
1. **Sidebar:** Para navegação rápida (ex: visão geral, quadros recentes, configurações).
2. **Header:** Com barra de busca, alternador de tema (Claro/Escuro), botão de notificações e avatar do perfil.
3. **Board View (Tela Principal):**
   - **Colunas:** Padrão - *A Fazer*, *Em Progresso* e *Concluído*.
   - **Cards (Complexidade):** Cada cartão deve exibir Título, Tags coloridas, Avatar do Responsável e Data de Entrega.

## 🗃️ Dados Mockados (Mock Data)
- O sistema DEVE ser inicializado com dados mockados hardcoded altamente realistas, para que o sistema pareça vivo e interativo.
- **Requisito de Mock:** Inclua vários quadros disponíveis na sidebar, diversos membros com avatares visíveis, e etiquetas variadas. As tarefas devem ter títulos críveis (ex: "Refatorar componente de botão", "Entrevista com usuário", "Ajuste no pipeline CI/CD").

## ⚠️ DIRETRIZ CRÍTICA DE DESTINO (SANDBOX)
**TODOS** os arquivos criados, alterados ou gerados (seja código, arquivos de configuração, componentes, ou assets) devem ser colocados **EXCLUSIVAMENTE** dentro da pasta relativa `./forge/sandbox/`.
**É ESTRITAMENTE PROIBIDO** ler ou escrever arquivos fora desta sandbox.

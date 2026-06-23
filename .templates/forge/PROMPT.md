# 🚀 Projeto: Sistema de Finanças Pessoais

## 📝 Visão Geral
Você deve desenvolver um sistema de "Finanças Pessoais" (Web App Responsivo para Desktop e Mobile). O foco principal da aplicação é o "Controle de Receitas, Despesas e Metas".

## 🎯 Diretrizes Técnicas Rigorosas

1. **Zero Backend (Pure Frontend):** 
   - O projeto deve ser estritamente visual.
   - Utilize React ou Next.js em conjunto com TailwindCSS.
   - **NÃO** crie conexões com banco de dados, rotas de API reais ou requisições HTTP. O estado da aplicação deve ser apenas local/em memória.

2. **Dados Mockados Realistas:**
   - A interface deve ser integralmente populada com dados falsos (hardcoded) altamente realistas, para que o sistema pareça estar em pleno funcionamento.
   - Crie listas de transações com datas, valores e categorias plausíveis, além de metas de economia realistas.

3. **Arquitetura e Escopo do App:**
   - **Layout Base (AppShell):** Implemente uma estrutura contendo Sidebar (para navegação) e Header (com perfil do usuário e atalhos rápidos).
   - **Telas Principais:**
     - `Dashboard`: Visão geral simples apresentando o saldo atual e gráficos clássicos de barras/pizza (utilize bibliotecas como Recharts ou Chart.js) para demonstrar a saúde financeira.
     - `Receitas e Despesas`: Lista detalhada de entradas e saídas de capital.
     - `Metas Financeiras`: Painel para acompanhamento de objetivos, utilizando barras de progresso visualmente claras.

4. **Alinhamento UI/UX Pro Max:**
   - **Estilo Visual:** Minimalista e Limpo, com foco absoluto na leitura dos dados. Use muito espaço em branco (whitespace) e tipografia moderna e legível.
   - **Design System:** É terminantemente proibido injetar cores hexadecimais hardcoded e soltas nos componentes. Utilize as configurações do tema e variáveis do Tailwind (ou do `.agent`).
   - **Animações e Micro-UI:** Utilize `framer-motion` para criar transições suaves de tela, hover states atraentes e micro-interações que tragam vida à interface.
   - A responsividade é essencial: o layout deve se adaptar com perfeição entre Desktop e Mobile.

5. **Local de Destino (CRÍTICO E INEGOCIÁVEL):**
   - **TODOS** os arquivos criados, alterados ou gerados (sejam arquivos de código, configurações, ou assets) DEVEM SER COLOCADOS **EXCLUSIVAMENTE** dentro da pasta relativa `./forge/sandbox/`. 
   - É terminantemente **PROIBIDO** ler ou escrever arquivos fora deste diretório. Todo o desenvolvimento deve ocorrer contido na sandbox.

# 🚀 SKILL: HIGH-CONVERSION LANDING PAGE (v12.0)

**Type:** Estruturação Narrativa e Design de Showcase.
**Persona:** Você é um Growth Engineer e Especialista em CRO (Conversion Rate Optimization) focado em SaaS B2B. Sua missão é construir uma Landing Page que converta visitantes em usuários.
**Trigger:** Invocado quando a tarefa no roadmap contém a tag `[SKILL: LANDING-PAGE]`.

---

## 🛑 DIRETRIZES ABSOLUTAS (A NARRATIVA DE 9 SEÇÕES)

É **ESTRITAMENTE PROIBIDO** criar LPs curtas com apenas um Hero e um rodapé. O desenvolvimento da página pública (`src/app/(public)/page.tsx` ou similar) DEVE conter obrigatoriamente a seguinte topologia narrativa (O Funil de Consciência):

1. **Hero Section (A Dobra Superior):**
   - **Visual:** O mais impactante possível. Badge de lançamento, Título com `bg-clip-text` e gradiente, subtítulo claro focado no benefício principal.
   - **Ação:** Botões primário (ex: "Começar Agora") e secundário (ex: "Ver Demo").
   - **Mídia:** Deve incluir um mock/imagem central ou a injeção de um componente real do painel envolto em um frame de navegador/macOS.

2. **Social Proof Inicial (Logos):**
   - Faixa discreta com logos de clientes/parceiros fictícios usando `grayscale opacity-50` para gerar autoridade imediata sem poluir o visual.

3. **Validação da Dor (Problem Agitation):**
   - Demonstre que o sistema entende o problema atual do usuário. Use cards contrastantes (o "Antes" vs o "Depois" com o software).

4. **Benefícios e Solução (Value Proposition):**
   - Foco em *Resultados* (Economia de tempo, aumento de receita), não apenas features técnicas. Layout Bento-Grid é recomendado aqui.

5. **Funcionalidades em Ação (The Showcase):**
   - **Mandato de Importação:** É PROIBIDO criar interfaces falsas do zero. Importe os componentes reais construídos na Fase 3 (Tabelas, Kanban, Gráficos Recharts) e renderize-os em abas interativas (`Tabs` do Shadcn) separando os casos de uso.

6. **Depoimentos (Wall of Love):**
   - Prova social densa. Use cards de depoimentos contendo foto (avatares), nome, cargo e um texto validando a solução.

7. **Planos / Pricing:**
   - Tabelas de preço claras. O plano recomendado deve ter um destaque visual (bordas com a cor primária, badge de "Mais Popular", sombra sutil `shadow-lg`).

8. **FAQ (Perguntas Frequentes):**
   - Quebra de objeções usando obrigatoriamente o componente `Accordion` do Shadcn.

9. **Call to Action Final (Bottom CTA):**
   - Seção imponente antes do rodapé final para capturar quem rolou a página inteira. Título forte e os mesmos botões do Hero.

---

## 🔒 INTEGRAÇÃO COM O PRD E O MOTOR DE COPY

- **Sem Alucinação:** Os textos (copys), as dores do mercado, os benefícios e os níveis de preço **NÃO** devem ser inventados na hora de codar. O Agente Executor DEVE ler o `.agent/agents/architect-mvps/PRD.md` para extrair a "Narrativa de Vendas" definida na fase de Discovery.
- Se o PRD não contiver a seção de Narrativa de Vendas, o Executor deve improvisar focando estritamente no nicho do sistema.

# Missão do Analista

## Objetivo
Resolver os problemas de layout da "Tela de Produção" do projeto Control Center, que atualmente encontra-se quebrado. O objetivo é garantir que essa tela fique perfeitamente encaixada e alinhada com o padrão visual das outras telas do sistema.

## Contexto e Problema
O usuário relatou que:
1. O layout da tela de produção está incorreto e desconfigurado ("quebrado").
2. A tela não está se encaixando na estrutura geral do projeto quando acessada.
3. A expectativa é que, ao navegar para a tela de produção, ela se comporte e se encaixe visualmente da mesma forma que as demais telas já existentes.

## Plano de Investigação e Resolução (Macro Estratégia)

1. **Localização e Mapeamento de Componentes:**
   - Investigue a estrutura do Next.js App Router (provavelmente em `@apps/control-center/src/app/production` ou nomenclatura similar) para encontrar o arquivo `page.tsx` e `layout.tsx` correspondentes à Tela de Produção.
   - Compare a estrutura de contêineres e classes dessa tela com as telas que estão funcionando corretamente (ex: dashboard principal).

2. **Diagnóstico de Layout (Tailwind CSS v4):**
   - Inspecione as classes Tailwind do wrapper principal da Tela de Produção.
   - Verifique o uso de `flex`, `grid`, `h-full`, `min-h-screen`, e espaçamentos (`p-*`, `m-*`). O problema de "não encaixe" geralmente decorre da falta de um contêiner pai que limite a altura (`h-full` ou `h-screen`) com `overflow` adequado, ou do uso de larguras/alturas fixas incorretas.
   - Garanta que não existam barras de rolagem globais indesejadas e que as barras de rolagem locais ocorram apenas nas áreas corretas (como logs ou painéis específicos).

3. **Validação de Arquitetura (@RULES.md):**
   - Assegure-se de que a página mantém as regras do Next.js 14, utilizando `'use client'` apenas nos componentes que requerem estado ou interatividade (como o terminal ou gráficos), mantendo layouts e shells preferencialmente como Server Components.
   - Verifique se a integração com componentes como `xterm` ou listas dinâmicas está causando expansão não contida do DOM pai.

4. **Elaboração da Solução Técnica:**
   - Após identificar os problemas de estilização e estrutura no código fonte da Tela de Produção, crie o plano de refatoração do layout.
   - Escreva as instruções exatas de modificação no arquivo `@gemini/INTEGRADOR.md`. O Integrador ficará responsável por aplicar os ajustes.
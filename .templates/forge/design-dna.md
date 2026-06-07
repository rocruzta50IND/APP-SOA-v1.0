# 🧬 DESIGN DNA: FluxBoard (Tier 1)

Este documento âncora define a identidade visual e as regras de construção para o **FluxBoard**, garantindo consistência entre as interfaces públicas e internas.

## 🎨 1. PALETA DE CORES (MONOCHROME HIGH-CONTRAST)
Utilizamos uma abordagem cirúrgica, focada em legibilidade e densidade de dados.

| Token | HSL | Hex (Aprox.) | Uso Principal |
| :--- | :--- | :--- | :--- |
| `--background` | `0 0% 3.9%` | `#0a0a0a` | Superfície principal (Dark) |
| `--foreground` | `0 0% 98%` | `#fafafa` | Texto principal |
| `--primary` | `0 0% 98%` | `#fafafa` | CTAs, Botões principais |
| `--primary-foreground` | `0 0% 9%` | `#171717` | Texto em botões primários |
| `--border` | `0 0% 14.9%` | `#262626` | Divisores, Bordas de Cards/Inputs |
| `--muted-foreground` | `0 0% 63.9%` | `#a3a3a3` | Texto secundário, Labels |

## 📐 2. GEOMETRIA E SUPERFÍCIES
- **Radius:** `0.3rem` (Sharp/Surgical). Evitamos bordas excessivamente arredondadas para manter o aspecto "Enterprise".
- **Borders:** `1px solid var(--border)`. Bordas nítidas em todos os elementos interativos.
- **Surfaces:** Flat. Não utilizamos glassmorphism ou gradientes complexos. A separação de camadas é feita via contraste de fundos (`bg-muted/30`).
- **Shadows:** `shadow-sm`. Sombras extremamente sutis, apenas para leve elevação de cards em hover.

## 🎬 3. CINEMÁTICA (MOTION PHYSICS)
As animações devem ser funcionais e não-distrativas.
- **Timing:** `0.2s` a `0.3s`.
- **Easing:** `easeOut` ou `cubic-bezier(0.16, 1, 0.3, 1)`.
- **States:** 
  - `Hover`: Leve tradução negativa (`-translate-y-0.5`) ou mudança sutil de brilho.
  - `Active`: Escala táctil (`scale-95`) para feedback de clique.

## 🖋️ 4. TIPOGRAFIA
- **Font-Family:** `Inter` ou `Geist` (Sans-serif).
- **Scale:** Uso de `tracking-tight` em headers grandes.
- **Labels:** `uppercase tracking-widest text-[10px]` para labels de inputs e headers de tabelas.

---
🎨 **PUBLIC UI CONCLUÍDA E DESIGN DNA GERADO!**
> A Landing Page densa e o fluxo de autenticação foram gerados respeitando o Design Tier 1.
> **[🛑 STOP AND END TASK]**

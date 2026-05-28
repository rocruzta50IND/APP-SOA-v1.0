# States and Variants
(Extracted from .claude/skills/design-system/references/states-and-variants.md)

## Interactive States
- Priority: Disabled > Loading > Active > Focus > Hover > Default.
- Focus Ring: 2px width, 2px offset, Primary color.
- Transitions: 150ms for colors/bg, 200ms for transform/shadow.

## Visual Treatment
- Disabled: 50% opacity, `pointer-events: none`.
- Error: Border color red-500, ring red/20%, helper text red-600.
- Loading: 70% opacity, spinner overlay, `pointer-events: none`.

## Variant Patterns
- Color Variants: Using CSS variables `--component-bg` and `--component-fg`.
- Size Variants: Using CSS variables `--component-height`, `--component-padding`, `--component-font`.

[Full content available in original source]

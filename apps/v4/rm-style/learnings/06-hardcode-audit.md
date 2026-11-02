# Hardcode and broken-variable audit

Scope: `rm-style/**` and `stories/**` (`.tsx`, `.ts`, `.css`). Checked: raw colours, px literals, arbitrary Tailwind values, default Tailwind palette classes, numeric Tailwind scale on design properties, `--ds-*` primitives used outside `tokens/`, inline styles with px, and every `var(--x)` reference against the declared tokens.

## Clean
- Palette classes (`bg-red-500`, `text-blue-600`, ...): 0.
- `--ds-*` primitives used outside the token layer: 0.
- Raw px in `className` outside tokens: 0.
- Numeric Tailwind scale on design properties (`p-4`, `gap-3`, ...): 0. Hits such as `min-w-0`, `top-1`, `inset-0`, `m-0` are structural resets, not design values.

## Hardcoded (to fix)
- `stories/figma/component-set.tsx:24-25`: px in an inline grid template (`labelWidth`, `cellWidth`, `cellHeight` numbers). Figma export helper; the story arguments should be token-backed or documented.

## Fixed
- `rm-style/ui/bubble.tsx`: `max-w-[80%]` now `max-w-(--size-share-max)`, a generic role (`--size-share-max`) over a primitive (`--ds-size-share-80`).

## Acceptable (documented exceptions)
- `rm-style/theme.css:189-197`: Recharts selectors match its built-in `stroke="#ccc"` and `#fff` attributes. The values applied are semantic tokens; the hex appears only in the selector.
- Figma hex in comments (`alert.tsx:15`, `shell-header.tsx:88`): documentation only.
- Arbitrary structural values such as `grid-rows-[auto_1fr]` and `[&_svg]` selectors: layout, not design values.

## Variables: none broken
The 56 undefined references are all set at runtime by a library, not by our tokens: Base UI (`--anchor-width`, `--available-height`, `--accordion-panel-height`, `--transform-origin`, `--popup-*`, `--positioner-*`), Vaul drawer (`--drawer-*`, `--stack-*`, `--nested-drawers`, `--peek`), Sonner (`--normal-bg`, `--normal-text`, `--normal-border`), react-day-picker (`--cell-size`, `--cell-radius`), toast swipe (`--toast-*`, `--offset-y`, `--swipe-*`), aspect-ratio (`--ratio`). Two are set inline by the component itself: `--gap` (toggle-group) and `--set-line` (figma component-set).

## Not an issue
- Duplicate Storybook titles: none. `Clients` and `Leads` matches came from ShellHeader props in pattern files.

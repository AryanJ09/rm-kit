# scroll-area

Component file: `rm-style/ui/scroll-area.tsx`

Imports: `react`, `@base-ui/react/scroll-area`, `cn`

Gaps (value not coming from an RM `--ds-*` primitive): **8** of 10

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `bg-border` | color | --color-border | --border | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `data-horizontal:border-t-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `data-vertical:border-l-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `focus-visible:ring-ring/50` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:ring-[3px]` | hardcoded |  |  |  | ring-[3px] | component file | yes |
| `rounded-[inherit]` | hardcoded |  |  |  | rounded-[inherit] | component file | yes |
| `transition-[color,box-shadow]` | hardcoded |  |  |  | transition-[color,box-shadow] | component file | yes |
| `rounded-full` | radius |  |  |  | Tailwind default (full) | node_modules/tailwindcss/theme.css | yes |
| `data-horizontal:h-2.5` | spacing | --spacing |  |  | Tailwind default (2.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-vertical:w-2.5` | spacing | --spacing |  |  | Tailwind default (2.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |

# slider

Component file: `rm-style/ui/slider.tsx`

Imports: `@base-ui/react/slider`, `cn`

Gaps (value not coming from an RM `--ds-*` primitive): **8** of 12

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `bg-primary` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `bg-white` | color |  |  |  | Tailwind default (white) | node_modules/tailwindcss/theme.css | yes |
| `border-ring` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `ring-ring/50` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `transition-[color,box-shadow]` | hardcoded |  |  |  | transition-[color,box-shadow] | component file | yes |
| `rounded-full` | radius |  |  |  | Tailwind default (full) | node_modules/tailwindcss/theme.css | yes |
| `after:-inset-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-horizontal:h-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-vertical:min-h-40` | spacing | --spacing |  |  | Tailwind default (40 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-vertical:w-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `size-3` | spacing | --spacing |  |  | Tailwind default (3 x --spacing) | node_modules/tailwindcss/theme.css | yes |

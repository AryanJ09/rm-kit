# card

Component file: `rm-style/ui/card.tsx`

Imports: `react`, `cn`

Gaps (value not coming from an RM `--ds-*` primitive): **17** of 22

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `bg-card` | color | --color-card | --card | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `bg-muted/50` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `ring-foreground/10` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-card-foreground` | color | --color-card-foreground | --card-foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `group-data-[size=sm]/card:text-sm` | font-size | --text-sm |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `text-base` | font-size | --text-base |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `text-sm` | font-size | --text-sm |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `font-medium` | font-weight | --font-weight-medium |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `[--card-spacing:--spacing(4)]` | hardcoded |  |  |  | [--card-spacing:--spacing(4)] | component file | yes |
| `data-[size=sm]:[--card-spacing:--spacing(3)]` | hardcoded |  |  |  | [--card-spacing:--spacing(3)] | component file | yes |
| `has-data-[slot=card-action]:grid-cols-[1fr_auto]` | hardcoded |  |  |  | grid-cols-[1fr_auto] | component file | yes |
| `has-data-[slot=card-description]:grid-rows-[auto_auto]` | hardcoded |  |  |  | grid-rows-[auto_auto] | component file | yes |
| `*:[img:first-child]:rounded-t-xl` | radius | --radius-xl |  |  | calc(var(--radius) * 1.4) | app/globals.css | yes |
| `*:[img:last-child]:rounded-b-xl` | radius | --radius-xl |  |  | calc(var(--radius) * 1.4) | app/globals.css | yes |
| `rounded-b-xl` | radius | --radius-xl |  |  | calc(var(--radius) * 1.4) | app/globals.css | yes |
| `rounded-t-xl` | radius | --radius-xl |  |  | calc(var(--radius) * 1.4) | app/globals.css | yes |
| `rounded-xl` | radius | --radius-xl |  |  | calc(var(--radius) * 1.4) | app/globals.css | yes |
| `data-[size=sm]:has-data-[slot=card-footer]:pb-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `has-[>img:first-child]:pt-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `has-data-[slot=card-footer]:pb-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |

# popover

Component file: `rm-style/ui/popover.tsx`

Imports: `react`, `@base-ui/react/popover`, `cn`

Gaps (value not coming from an RM `--ds-*` primitive): **6** of 11

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `bg-popover` | color | --color-popover | --popover | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `ring-foreground/10` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `text-popover-foreground` | color | --color-popover-foreground | --popover-foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `font-medium` | font-weight | --font-weight-medium |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `rounded-lg` | radius | --radius-lg | --radius | --ds-radius-8 | 8px | app/globals.css -> rm-style/theme.css |  |
| `gap-0.5` | spacing | --spacing |  |  | Tailwind default (0.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-2.5` | spacing | --spacing |  |  | Tailwind default (2.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `p-2.5` | spacing | --spacing |  |  | Tailwind default (2.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `w-72` | spacing | --spacing |  |  | Tailwind default (72 x --spacing) | node_modules/tailwindcss/theme.css | yes |

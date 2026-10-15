# progress

Component file: `rm-style/ui/progress.tsx`

Imports: `@base-ui/react/progress`, `cn`

Gaps (value not coming from an RM `--ds-*` primitive): **1** of 8

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `bg-primary` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  | --ds-typography-font-size-14 | 14px | rm-style/theme.css |  |
| `font-medium` | font-weight | --font-weight-medium |  | --ds-typography-font-weight-medium | 500 | rm-style/theme.css |  |
| `rounded-full` | radius |  |  |  | Tailwind default (full) | node_modules/tailwindcss/theme.css | yes |
| `gap-3` | spacing | --spacing |  | --ds-spacing-4 | 3 x --spacing = 4px | rm-style/theme.css |  |
| `h-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |

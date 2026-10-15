# breadcrumb

Component file: `rm-style/ui/breadcrumb.tsx`

Imports: `react`, `@base-ui/react/merge-props`, `@base-ui/react/use-render`, `cn`, `lucide-react`

Gaps (value not coming from an RM `--ds-*` primitive): **7** of 10

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `hover:text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `font-normal` | font-weight | --font-weight-normal |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `[&>svg]:size-3.5` | spacing | --spacing |  |  | Tailwind default (3.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `[&>svg]:size-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-1.5` | spacing | --spacing |  |  | Tailwind default (1.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `size-5` | spacing | --spacing |  |  | Tailwind default (5 x --spacing) | node_modules/tailwindcss/theme.css | yes |

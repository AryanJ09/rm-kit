# marker

Component file: `rm-style/ui/marker.tsx`

Imports: `react`, `@base-ui/react/merge-props`, `@base-ui/react/use-render`, `class-variance-authority`, `cn`

Gaps (value not coming from an RM `--ds-*` primitive): **11** of 17

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `[a]:hover:text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `*:[a]:hover:text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `after:bg-border` | color | --color-border | --border | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `before:bg-border` | color | --color-border | --border | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `border-border` | color | --color-border | --border | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `[&_svg:not([class*='size-'])]:size-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `after:min-w-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `after:ml-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `before:min-w-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `before:mr-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `min-h-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `min-w-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `pb-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `size-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |

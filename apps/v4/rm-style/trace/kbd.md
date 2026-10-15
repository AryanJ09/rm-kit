# kbd

Component file: `rm-style/ui/kbd.tsx`

Imports: `cn`

Gaps (value not coming from an RM `--ds-*` primitive): **8** of 14

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `dark:in-data-[slot=tooltip-content]:bg-background/10` | color | --color-background | --background | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `in-data-[slot=tooltip-content]:bg-background/20` | color | --color-background | --background | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `in-data-[slot=tooltip-content]:text-background` | color | --color-background | --background | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `font-sans` | font-family | --font-sans | --typography-body-md-font-family | --ds-typography-font-family-base | 'Roboto', system-ui, sans-serif | rm-style/theme.css |  |
| `text-xs` | font-size | --text-xs |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `font-medium` | font-weight | --font-weight-medium |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `rounded-sm` | radius | --radius-sm |  |  | calc(var(--radius) * 0.6) | app/globals.css | yes |
| `[&_svg:not([class*='size-'])]:size-3` | spacing | --spacing |  |  | Tailwind default (3 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `h-5` | spacing | --spacing |  |  | Tailwind default (5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `min-w-5` | spacing | --spacing |  |  | Tailwind default (5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `px-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |

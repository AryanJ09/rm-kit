# dialog

Component file: `rm-style/ui/dialog.tsx`

Imports: `react`, `@base-ui/react/dialog`, `cn`, `@/rm-style/ui/button`, `lucide-react`

Gaps (value not coming from an RM `--ds-*` primitive): **19** of 25

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `*:[a]:hover:text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `bg-black/10` | color |  |  |  | Tailwind default (black) | node_modules/tailwindcss/theme.css | yes |
| `bg-muted/50` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `bg-popover` | color | --color-popover | --popover | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `ring-foreground/10` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `text-popover-foreground` | color | --color-popover-foreground | --popover-foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-base` | font-size | --text-base |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `text-sm` | font-size | --text-sm |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `font-medium` | font-weight | --font-weight-medium |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `max-w-[calc(100%-2rem)]` | hardcoded |  |  |  | max-w-[calc(100%-2rem)] | component file | yes |
| `rounded-b-xl` | radius | --radius-xl |  |  | calc(var(--radius) * 1.4) | app/globals.css | yes |
| `rounded-xl` | radius | --radius-xl |  |  | calc(var(--radius) * 1.4) | app/globals.css | yes |
| `-mb-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `-mx-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `-translate-x-1/2` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `-translate-y-1/2` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `inset-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `left-1/2` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `p-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `right-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `top-1/2` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `top-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |

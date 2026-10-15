# toggle

Component file: `rm-style/ui/toggle.tsx`

Imports: `@base-ui/react/toggle`, `class-variance-authority`, `cn`

Gaps (value not coming from an RM `--ds-*` primitive): **20** of 31

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `aria-invalid:border-destructive` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `aria-invalid:ring-destructive/20` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `aria-pressed:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `bg-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `border-input` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `dark:aria-invalid:ring-destructive/40` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `data-[state=on]:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:border-ring` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:ring-ring/50` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `hover:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `hover:text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `font-medium` | font-weight | --font-weight-medium |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `focus-visible:ring-[3px]` | hardcoded |  |  |  | ring-[3px] | component file | yes |
| `rounded-[min(var(--radius-md),12px)]` | hardcoded |  |  |  | rounded-[min(var(--radius-md),12px)] | component file | yes |
| `text-[0.8rem]` | hardcoded |  |  |  | text-[0.8rem] | component file | yes |
| `rounded-lg` | radius | --radius-lg | --radius | --ds-radius-8 | 8px | app/globals.css -> rm-style/theme.css |  |
| `[&_svg:not([class*='size-'])]:size-3.5` | spacing | --spacing |  |  | Tailwind default (3.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `[&_svg:not([class*='size-'])]:size-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `h-7` | spacing | --spacing |  |  | Tailwind default (7 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `h-8` | spacing | --spacing |  |  | Tailwind default (8 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `h-9` | spacing | --spacing |  |  | Tailwind default (9 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `has-data-[icon=inline-end]:pr-1.5` | spacing | --spacing |  |  | Tailwind default (1.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `has-data-[icon=inline-end]:pr-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `has-data-[icon=inline-start]:pl-1.5` | spacing | --spacing |  |  | Tailwind default (1.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `has-data-[icon=inline-start]:pl-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `min-w-7` | spacing | --spacing |  |  | Tailwind default (7 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `min-w-8` | spacing | --spacing |  |  | Tailwind default (8 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `min-w-9` | spacing | --spacing |  |  | Tailwind default (9 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `px-2.5` | spacing | --spacing |  |  | Tailwind default (2.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |

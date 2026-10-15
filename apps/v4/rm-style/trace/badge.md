# badge

Component file: `rm-style/ui/badge.tsx`

Imports: `@base-ui/react/merge-props`, `@base-ui/react/use-render`, `class-variance-authority`, `cn`

Gaps (value not coming from an RM `--ds-*` primitive): **11** of 36

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `[a]:hover:bg-destructive/20` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `[a]:hover:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `[a]:hover:bg-primary/80` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `[a]:hover:bg-secondary/80` | color | --color-secondary | --secondary | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `[a]:hover:text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `aria-invalid:border-destructive` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `aria-invalid:ring-destructive/20` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `bg-destructive/10` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `bg-primary` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `bg-secondary` | color | --color-secondary | --secondary | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `border-border` | color | --color-border | --border | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `border-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `dark:aria-invalid:ring-destructive/40` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `dark:bg-destructive/20` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `dark:focus-visible:ring-destructive/40` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `dark:hover:bg-muted/50` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:border-ring` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:ring-destructive/20` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:ring-ring/50` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `hover:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `hover:text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `text-destructive` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-primary` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `text-primary-foreground` | color | --color-primary-foreground | --primary-foreground | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `text-secondary-foreground` | color | --color-secondary-foreground | --secondary-foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-xs` | font-size | --text-xs |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `font-medium` | font-weight | --font-weight-medium |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `focus-visible:ring-[3px]` | hardcoded |  |  |  | ring-[3px] | component file | yes |
| `rounded-4xl` | radius | --radius-4xl |  |  | calc(var(--radius) * 2.6) | app/globals.css | yes |
| `gap-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `h-5` | spacing | --spacing |  |  | Tailwind default (5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `has-data-[icon=inline-end]:pr-1.5` | spacing | --spacing |  |  | Tailwind default (1.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `has-data-[icon=inline-start]:pl-1.5` | spacing | --spacing |  |  | Tailwind default (1.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `px-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `py-0.5` | spacing | --spacing |  |  | Tailwind default (0.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |

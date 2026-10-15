# field

Component file: `rm-style/ui/field.tsx`

Imports: `react`, `class-variance-authority`, `cn`, `@/rm-style/ui/label`, `@/rm-style/ui/separator`

Gaps (value not coming from an RM `--ds-*` primitive): **26** of 39

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `[&>a:hover]:text-primary` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `bg-background` | color | --color-background | --background | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `dark:has-data-checked:bg-primary/10` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `dark:has-data-checked:border-primary/20` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `data-[invalid=true]:text-destructive` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `has-[>[data-slot=field]]:has-[:focus-visible]:border-ring` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring/50` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-muted/50` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `has-data-checked:bg-primary/5` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `has-data-checked:border-primary/30` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `text-destructive` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `data-[variant=label]:text-sm` | font-size | --text-sm |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `data-[variant=legend]:text-base` | font-size | --text-base |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `text-sm` | font-size | --text-sm |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `font-medium` | font-weight | --font-weight-medium |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `font-normal` | font-weight | --font-weight-normal |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `has-[>[data-slot=field]]:rounded-lg` | radius | --radius-lg | --radius | --ds-radius-8 | 8px | app/globals.css -> rm-style/theme.css |  |
| `-my-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `[[data-variant=legend]+&]:-mt-1.5` | spacing | --spacing |  |  | Tailwind default (1.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `*:data-[slot=field-group]:gap-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `*:data-[slot=field]:p-2.5` | spacing | --spacing |  |  | Tailwind default (2.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[slot=checkbox-group]:gap-3` | spacing | --spacing |  |  | Tailwind default (3 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-0.5` | spacing | --spacing |  |  | Tailwind default (0.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-5` | spacing | --spacing |  |  | Tailwind default (5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `group-data-[variant=outline]/field-group:-mb-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `h-5` | spacing | --spacing |  |  | Tailwind default (5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `has-[>[data-slot=checkbox-group]]:gap-3` | spacing | --spacing |  |  | Tailwind default (3 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `has-[>[data-slot=radio-group]]:gap-3` | spacing | --spacing |  |  | Tailwind default (3 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `inset-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `last:mt-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `mb-1.5` | spacing | --spacing |  |  | Tailwind default (1.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `ml-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `nth-last-2:-mt-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `px-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `top-1/2` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |

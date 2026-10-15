# input-group

Component file: `rm-style/ui/input-group.tsx`

Imports: `react`, `class-variance-authority`, `cn`, `@/rm-style/ui/button`, `@/rm-style/ui/input`, `@/rm-style/ui/textarea`

Gaps (value not coming from an RM `--ds-*` primitive): **42** of 53

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `bg-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `border-input` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `dark:bg-input/30` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `dark:bg-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `dark:disabled:bg-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `dark:has-disabled:bg-input/80` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `disabled:bg-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `has-[[data-slot][aria-invalid=true]]:border-destructive` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `has-[[data-slot][aria-invalid=true]]:ring-destructive/20` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `has-[[data-slot=input-group-control]:focus-visible]:border-ring` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `has-disabled:bg-input/50` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `in-data-[slot=combobox-content]:focus-within:border-inherit` | color |  |  |  | Tailwind default (inherit) | node_modules/tailwindcss/theme.css | yes |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `font-medium` | font-weight | --font-weight-medium |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `[&>kbd]:rounded-[calc(var(--radius)-5px)]` | hardcoded |  |  |  | rounded-[calc(var(--radius)-5px)] | component file | yes |
| `has-[>button]:ml-[-0.3rem]` | hardcoded |  |  |  | ml-[-0.3rem] | component file | yes |
| `has-[>button]:mr-[-0.3rem]` | hardcoded |  |  |  | mr-[-0.3rem] | component file | yes |
| `has-[>kbd]:ml-[-0.15rem]` | hardcoded |  |  |  | ml-[-0.15rem] | component file | yes |
| `has-[>kbd]:mr-[-0.15rem]` | hardcoded |  |  |  | mr-[-0.15rem] | component file | yes |
| `rounded-[calc(var(--radius)-3px)]` | hardcoded |  |  |  | rounded-[calc(var(--radius)-3px)] | component file | yes |
| `rounded-lg` | radius | --radius-lg | --radius | --ds-radius-8 | 8px | app/globals.css -> rm-style/theme.css |  |
| `rounded-none` | radius |  |  |  | Tailwind default (none) | node_modules/tailwindcss/theme.css | yes |
| `[.border-b]:pb-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `[.border-t]:pt-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `[&_svg:not([class*='size-'])]:size-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `[&>svg:not([class*='size-'])]:size-3.5` | spacing | --spacing |  |  | Tailwind default (3.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `[&>svg:not([class*='size-'])]:size-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `group-has-[>input]/input-group:pb-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `group-has-[>input]/input-group:pt-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `h-6` | spacing | --spacing |  |  | Tailwind default (6 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `h-8` | spacing | --spacing |  |  | Tailwind default (8 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `has-[>[data-align=block-end]]:[&>input]:pt-3` | spacing | --spacing |  |  | Tailwind default (3 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `has-[>[data-align=block-start]]:[&>input]:pb-3` | spacing | --spacing |  |  | Tailwind default (3 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `has-[>[data-align=inline-end]]:[&>input]:pr-1.5` | spacing | --spacing |  |  | Tailwind default (1.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `has-[>[data-align=inline-start]]:[&>input]:pl-1.5` | spacing | --spacing |  |  | Tailwind default (1.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `has-[>svg]:p-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `min-w-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `p-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `pb-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `pl-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `pr-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `pt-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `px-1.5` | spacing | --spacing |  |  | Tailwind default (1.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `px-2.5` | spacing | --spacing |  |  | Tailwind default (2.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `py-1.5` | spacing | --spacing |  |  | Tailwind default (1.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `py-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `size-6` | spacing | --spacing |  |  | Tailwind default (6 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `size-8` | spacing | --spacing |  |  | Tailwind default (8 x --spacing) | node_modules/tailwindcss/theme.css | yes |

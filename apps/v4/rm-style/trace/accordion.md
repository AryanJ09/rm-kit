# accordion

Component file: `rm-style/ui/accordion.tsx`

Imports: `@base-ui/react/accordion`, `cn`, `lucide-react`

Gaps (value not coming from an RM `--ds-*` primitive): **10** of 16

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `[&_a]:hover:text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `**:data-[slot=accordion-trigger-icon]:text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `border-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `focus-visible:after:border-ring` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:border-ring` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:ring-ring/50` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `font-medium` | font-weight | --font-weight-medium |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `rounded-lg` | radius | --radius-lg | --radius | --ds-radius-8 | 8px | app/globals.css -> rm-style/theme.css |  |
| `[&_p:not(:last-child)]:mb-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `**:data-[slot=accordion-trigger-icon]:size-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-ending-style:h-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-starting-style:h-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `pb-2.5` | spacing | --spacing |  |  | Tailwind default (2.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `pt-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `py-2.5` | spacing | --spacing |  |  | Tailwind default (2.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |

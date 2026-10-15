# switch

Component file: `rm-style/ui/switch.tsx`

Imports: `@base-ui/react/switch`, `cn`

Gaps (value not coming from an RM `--ds-*` primitive): **15** of 27

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `aria-invalid:border-destructive` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `aria-invalid:ring-destructive/20` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `bg-background` | color | --color-background | --background | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `border-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `dark:aria-invalid:border-destructive/50` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `dark:aria-invalid:ring-destructive/40` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `dark:data-checked:bg-primary-foreground` | color | --color-primary-foreground | --primary-foreground | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `dark:data-unchecked:bg-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `dark:data-unchecked:bg-input/80` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `data-checked:bg-primary` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `data-unchecked:bg-input` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:border-ring` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:ring-ring/50` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `group-has-[:focus-visible]/field-label:border-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `data-[size=default]:h-[18.4px]` | hardcoded |  |  |  | h-[18.4px] | component file | yes |
| `data-[size=default]:w-[32px]` | hardcoded |  |  |  | w-[32px] | component file | yes |
| `data-[size=sm]:h-[14px]` | hardcoded |  |  |  | h-[14px] | component file | yes |
| `data-[size=sm]:w-[24px]` | hardcoded |  |  |  | w-[24px] | component file | yes |
| `group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)]` | hardcoded |  |  |  | translate-x-[calc(100%-2px)] | component file | yes |
| `group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)]` | hardcoded |  |  |  | translate-x-[calc(100%-2px)] | component file | yes |
| `rounded-full` | radius |  |  |  | Tailwind default (full) | node_modules/tailwindcss/theme.css | yes |
| `after:-inset-x-3` | spacing | --spacing |  |  | Tailwind default (3 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `after:-inset-y-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `group-data-[size=default]/switch:data-unchecked:translate-x-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `group-data-[size=default]/switch:size-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `group-data-[size=sm]/switch:data-unchecked:translate-x-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `group-data-[size=sm]/switch:size-3` | spacing | --spacing |  |  | Tailwind default (3 x --spacing) | node_modules/tailwindcss/theme.css | yes |

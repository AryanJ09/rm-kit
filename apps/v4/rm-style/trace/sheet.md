# sheet

Component file: `rm-style/ui/sheet.tsx`

Imports: `react`, `@base-ui/react/dialog`, `cn`, `@/rm-style/ui/button`, `lucide-react`

Gaps (value not coming from an RM `--ds-*` primitive): **29** of 33

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `bg-black/10` | color |  |  |  | Tailwind default (black) | node_modules/tailwindcss/theme.css | yes |
| `bg-popover` | color | --color-popover | --popover | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `text-popover-foreground` | color | --color-popover-foreground | --popover-foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-base` | font-size | --text-base |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `text-sm` | font-size | --text-sm |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `font-medium` | font-weight | --font-weight-medium |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `data-[side=bottom]:data-ending-style:translate-y-[2.5rem]` | hardcoded |  |  |  | translate-y-[2.5rem] | component file | yes |
| `data-[side=bottom]:data-starting-style:translate-y-[2.5rem]` | hardcoded |  |  |  | translate-y-[2.5rem] | component file | yes |
| `data-[side=left]:data-ending-style:translate-x-[-2.5rem]` | hardcoded |  |  |  | translate-x-[-2.5rem] | component file | yes |
| `data-[side=left]:data-starting-style:translate-x-[-2.5rem]` | hardcoded |  |  |  | translate-x-[-2.5rem] | component file | yes |
| `data-[side=right]:data-ending-style:translate-x-[2.5rem]` | hardcoded |  |  |  | translate-x-[2.5rem] | component file | yes |
| `data-[side=right]:data-starting-style:translate-x-[2.5rem]` | hardcoded |  |  |  | translate-x-[2.5rem] | component file | yes |
| `data-[side=top]:data-ending-style:translate-y-[-2.5rem]` | hardcoded |  |  |  | translate-y-[-2.5rem] | component file | yes |
| `data-[side=top]:data-starting-style:translate-y-[-2.5rem]` | hardcoded |  |  |  | translate-y-[-2.5rem] | component file | yes |
| `data-[side=bottom]:bottom-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=bottom]:inset-x-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=left]:inset-y-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=left]:left-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=left]:w-3/4` | spacing | --spacing |  |  | Tailwind default (3 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=right]:inset-y-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=right]:right-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=right]:w-3/4` | spacing | --spacing |  |  | Tailwind default (3 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=top]:inset-x-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=top]:top-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-0.5` | spacing | --spacing |  |  | Tailwind default (0.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `inset-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `p-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `right-3` | spacing | --spacing |  |  | Tailwind default (3 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `top-3` | spacing | --spacing |  |  | Tailwind default (3 x --spacing) | node_modules/tailwindcss/theme.css | yes |

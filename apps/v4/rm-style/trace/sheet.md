# sheet

Component file: `rm-style/ui/sheet.tsx`

Imports: `react`, `@base-ui/react/dialog`, `cn`, `@/rm-style/ui/button`, `lucide-react`

Gaps (value not coming from an RM `--ds-*` primitive): **9** of 33

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `bg-black/10` | color |  |  |  | Tailwind default (black) | node_modules/tailwindcss/theme.css | yes |
| `bg-popover` | color | --color-popover | --popover | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `text-popover-foreground` | color | --color-popover-foreground | --popover-foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-base` | font-size | --text-base |  | --ds-typography-font-size-16 | 16px | rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  | --ds-typography-font-size-14 | 14px | rm-style/theme.css |  |
| `font-medium` | font-weight | --font-weight-medium |  | --ds-typography-font-weight-medium | 500 | rm-style/theme.css |  |
| `data-[side=bottom]:data-ending-style:translate-y-[2.5rem]` | hardcoded |  |  |  | translate-y-[2.5rem] | component file | yes |
| `data-[side=bottom]:data-starting-style:translate-y-[2.5rem]` | hardcoded |  |  |  | translate-y-[2.5rem] | component file | yes |
| `data-[side=left]:data-ending-style:translate-x-[-2.5rem]` | hardcoded |  |  |  | translate-x-[-2.5rem] | component file | yes |
| `data-[side=left]:data-starting-style:translate-x-[-2.5rem]` | hardcoded |  |  |  | translate-x-[-2.5rem] | component file | yes |
| `data-[side=right]:data-ending-style:translate-x-[2.5rem]` | hardcoded |  |  |  | translate-x-[2.5rem] | component file | yes |
| `data-[side=right]:data-starting-style:translate-x-[2.5rem]` | hardcoded |  |  |  | translate-x-[2.5rem] | component file | yes |
| `data-[side=top]:data-ending-style:translate-y-[-2.5rem]` | hardcoded |  |  |  | translate-y-[-2.5rem] | component file | yes |
| `data-[side=top]:data-starting-style:translate-y-[-2.5rem]` | hardcoded |  |  |  | translate-y-[-2.5rem] | component file | yes |
| `data-[side=bottom]:bottom-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-[side=bottom]:inset-x-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-[side=left]:inset-y-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-[side=left]:left-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-[side=left]:w-3/4` | spacing | --spacing |  | --ds-spacing-4 | 3 x --spacing = 4px | rm-style/theme.css |  |
| `data-[side=right]:inset-y-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-[side=right]:right-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-[side=right]:w-3/4` | spacing | --spacing |  | --ds-spacing-4 | 3 x --spacing = 4px | rm-style/theme.css |  |
| `data-[side=top]:inset-x-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-[side=top]:top-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `gap-0.5` | spacing | --spacing |  | --ds-spacing-4 | 0.5 x --spacing = 4px | rm-style/theme.css |  |
| `gap-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `gap-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `inset-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `p-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `right-3` | spacing | --spacing |  | --ds-spacing-4 | 3 x --spacing = 4px | rm-style/theme.css |  |
| `top-3` | spacing | --spacing |  | --ds-spacing-4 | 3 x --spacing = 4px | rm-style/theme.css |  |

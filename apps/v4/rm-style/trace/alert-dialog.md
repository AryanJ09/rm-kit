# alert-dialog

Component file: `rm-style/ui/alert-dialog.tsx`

Imports: `react`, `@base-ui/react/alert-dialog`, `cn`, `@/rm-style/ui/button`

Gaps (value not coming from an RM `--ds-*` primitive): **4** of 32

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `*:[a]:hover:text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `bg-black/10` | color |  |  |  | Tailwind default (black) | node_modules/tailwindcss/theme.css | yes |
| `bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `bg-muted/50` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `bg-popover` | color | --color-popover | --popover | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `ring-foreground/10` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `text-popover-foreground` | color | --color-popover-foreground | --popover-foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-base` | font-size | --text-base |  | --ds-typography-font-size-16 | 16px | rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  | --ds-typography-font-size-14 | 14px | rm-style/theme.css |  |
| `font-medium` | font-weight | --font-weight-medium |  | --ds-typography-font-weight-medium | 500 | rm-style/theme.css |  |
| `grid-rows-[auto_1fr]` | hardcoded |  |  |  | grid-rows-[auto_1fr] | component file | yes |
| `has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr]` | hardcoded |  |  |  | grid-rows-[auto_auto_1fr] | component file | yes |
| `sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]` | hardcoded |  |  |  | grid-rows-[auto_1fr] | component file | yes |
| `rounded-b-xl` | radius | --radius-xl |  | --ds-radius-12 | 12px | rm-style/theme.css |  |
| `rounded-md` | radius | --radius-md |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `rounded-xl` | radius | --radius-xl |  | --ds-radius-12 | 12px | rm-style/theme.css |  |
| `-mb-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `-mx-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `-translate-x-1/2` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `-translate-y-1/2` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `*:[svg:not([class*='size-'])]:size-6` | spacing | --spacing |  | --ds-spacing-4 | 6 x --spacing = 4px | rm-style/theme.css |  |
| `gap-1.5` | spacing | --spacing |  | --ds-spacing-4 | 1.5 x --spacing = 4px | rm-style/theme.css |  |
| `gap-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `gap-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `has-data-[slot=alert-dialog-media]:gap-x-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `inset-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `left-1/2` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `mb-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `p-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `size-10` | spacing | --spacing |  | --ds-spacing-4 | 10 x --spacing = 4px | rm-style/theme.css |  |
| `top-1/2` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |

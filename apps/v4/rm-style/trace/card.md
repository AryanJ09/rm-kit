# card

Component file: `rm-style/ui/card.tsx`

Imports: `react`, `cn`

Gaps (value not coming from an RM `--ds-*` primitive): **4** of 22

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `bg-card` | color | --color-card | --card | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `bg-muted/50` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `ring-foreground/10` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-card-foreground` | color | --color-card-foreground | --card-foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `group-data-[size=sm]/card:text-sm` | font-size | --text-sm |  | --ds-typography-font-size-14 | 14px | rm-style/theme.css |  |
| `text-base` | font-size | --text-base |  | --ds-typography-font-size-16 | 16px | rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  | --ds-typography-font-size-14 | 14px | rm-style/theme.css |  |
| `font-medium` | font-weight | --font-weight-medium |  | --ds-typography-font-weight-medium | 500 | rm-style/theme.css |  |
| `[--card-spacing:--spacing(4)]` | hardcoded |  |  |  | [--card-spacing:--spacing(4)] | component file | yes |
| `data-[size=sm]:[--card-spacing:--spacing(3)]` | hardcoded |  |  |  | [--card-spacing:--spacing(3)] | component file | yes |
| `has-data-[slot=card-action]:grid-cols-[1fr_auto]` | hardcoded |  |  |  | grid-cols-[1fr_auto] | component file | yes |
| `has-data-[slot=card-description]:grid-rows-[auto_auto]` | hardcoded |  |  |  | grid-rows-[auto_auto] | component file | yes |
| `*:[img:first-child]:rounded-t-xl` | radius | --radius-xl |  | --ds-radius-12 | 12px | rm-style/theme.css |  |
| `*:[img:last-child]:rounded-b-xl` | radius | --radius-xl |  | --ds-radius-12 | 12px | rm-style/theme.css |  |
| `rounded-b-xl` | radius | --radius-xl |  | --ds-radius-12 | 12px | rm-style/theme.css |  |
| `rounded-t-xl` | radius | --radius-xl |  | --ds-radius-12 | 12px | rm-style/theme.css |  |
| `rounded-xl` | radius | --radius-xl |  | --ds-radius-12 | 12px | rm-style/theme.css |  |
| `data-[size=sm]:has-data-[slot=card-footer]:pb-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `gap-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `has-[>img:first-child]:pt-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `has-data-[slot=card-footer]:pb-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |

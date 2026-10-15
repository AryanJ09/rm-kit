# combobox

Component file: `rm-style/ui/combobox.tsx`

Imports: `react`, `@base-ui/react`, `cn`, `@/rm-style/ui/button`, `@/rm-style/ui/input-group`, `lucide-react`

Gaps (value not coming from an RM `--ds-*` primitive): **6** of 65

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `*:data-[slot=input-group]:bg-input/30` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `*:data-[slot=input-group]:border-input/30` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `**:data-[slot$=-item]:data-highlighted:bg-foreground/10` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `**:data-[slot$=-item]:focus:bg-foreground/10` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `**:data-[slot$=-separator]:bg-foreground/5` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10!` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `**:data-[slot$=-trigger]:focus:bg-foreground/10` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `**:data-[variant=destructive]:focus:bg-foreground/10!` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `bg-border` | color | --color-border | --border | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `bg-popover` | color | --color-popover | --popover | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `bg-popover/70` | color | --color-popover | --popover | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `bg-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `border-input` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `dark:bg-input/30` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `dark:has-aria-invalid:border-destructive/50` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `dark:has-aria-invalid:ring-destructive/40` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `data-highlighted:bg-accent` | color | --color-accent | --accent | --ds-color-brand-100 | #a5b3fc | app/globals.css -> rm-style/theme.css |  |
| `data-highlighted:text-accent-foreground` | color | --color-accent-foreground | --accent-foreground | --ds-color-neutral-950 | #0b1220 | app/globals.css -> rm-style/theme.css |  |
| `data-pressed:bg-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `focus-within:border-ring` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `focus-within:ring-ring/50` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `has-aria-invalid:border-destructive` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `has-aria-invalid:ring-destructive/20` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground` | color | --color-accent-foreground | --accent-foreground | --ds-color-neutral-950 | #0b1220 | app/globals.css -> rm-style/theme.css |  |
| `ring-foreground/10` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `text-popover-foreground` | color | --color-popover-foreground | --popover-foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  | --ds-typography-font-size-14 | 14px | rm-style/theme.css |  |
| `text-xs` | font-size | --text-xs |  | --ds-typography-font-size-12 | 12px | rm-style/theme.css |  |
| `font-medium` | font-weight | --font-weight-medium |  | --ds-typography-font-weight-medium | 500 | rm-style/theme.css |  |
| `before:rounded-[inherit]` | hardcoded |  |  |  | rounded-[inherit] | component file | yes |
| `h-[calc(--spacing(5.25))]` | hardcoded |  |  |  | h-[calc(--spacing(5.25))] | component file | yes |
| `max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))]` | hardcoded |  |  |  | max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] | component file | yes |
| `min-w-[calc(var(--anchor-width)+--spacing(7))]` | hardcoded |  |  |  | min-w-[calc(var(--anchor-width)+--spacing(7))] | component file | yes |
| `rounded-lg` | radius | --radius-lg |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `rounded-md` | radius | --radius-md |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `rounded-sm` | radius | --radius-sm |  | --ds-radius-4 | 4px | rm-style/theme.css |  |
| `-ml-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `-mx-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `[&_svg:not([class*='size-'])]:size-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `*:data-[slot=input-group]:h-8` | spacing | --spacing |  | --ds-spacing-4 | 8 x --spacing = 4px | rm-style/theme.css |  |
| `*:data-[slot=input-group]:m-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `*:data-[slot=input-group]:mb-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `before:inset-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-empty:p-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `gap-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `gap-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `has-data-[slot=combobox-chip-remove]:pr-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `has-data-[slot=combobox-chip]:px-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `min-h-8` | spacing | --spacing |  | --ds-spacing-4 | 8 x --spacing = 4px | rm-style/theme.css |  |
| `min-w-16` | spacing | --spacing |  | --ds-spacing-4 | 16 x --spacing = 4px | rm-style/theme.css |  |
| `my-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `p-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `pl-1.5` | spacing | --spacing |  | --ds-spacing-4 | 1.5 x --spacing = 4px | rm-style/theme.css |  |
| `pr-8` | spacing | --spacing |  | --ds-spacing-4 | 8 x --spacing = 4px | rm-style/theme.css |  |
| `px-1.5` | spacing | --spacing |  | --ds-spacing-4 | 1.5 x --spacing = 4px | rm-style/theme.css |  |
| `px-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `px-2.5` | spacing | --spacing |  | --ds-spacing-4 | 2.5 x --spacing = 4px | rm-style/theme.css |  |
| `py-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `py-1.5` | spacing | --spacing |  | --ds-spacing-4 | 1.5 x --spacing = 4px | rm-style/theme.css |  |
| `py-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `right-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `size-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |

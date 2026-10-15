# menubar

Component file: `rm-style/ui/menubar.tsx`

Imports: `react`, `@base-ui/react/menu`, `@base-ui/react/menubar`, `cn`, `@/rm-style/ui/dropdown-menu`, `lucide-react`

Gaps (value not coming from an RM `--ds-*` primitive): **3** of 51

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `**:data-[slot$=-item]:data-highlighted:bg-foreground/10` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `**:data-[slot$=-item]:focus:bg-foreground/10` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `**:data-[slot$=-separator]:bg-foreground/5` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10!` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `**:data-[slot$=-trigger]:focus:bg-foreground/10` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `**:data-[variant=destructive]:focus:bg-foreground/10!` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `aria-expanded:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `bg-border` | color | --color-border | --border | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `bg-popover` | color | --color-popover | --popover | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `bg-popover/70` | color | --color-popover | --popover | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `dark:data-[variant=destructive]:focus:bg-destructive/20` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `data-[variant=destructive]:focus:bg-destructive/10` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `data-[variant=destructive]:focus:text-destructive` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `data-[variant=destructive]:text-destructive` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `data-open:bg-accent` | color | --color-accent | --accent | --ds-color-brand-100 | #a5b3fc | app/globals.css -> rm-style/theme.css |  |
| `data-open:text-accent-foreground` | color | --color-accent-foreground | --accent-foreground | --ds-color-neutral-950 | #0b1220 | app/globals.css -> rm-style/theme.css |  |
| `focus:**:text-accent-foreground` | color | --color-accent-foreground | --accent-foreground | --ds-color-neutral-950 | #0b1220 | app/globals.css -> rm-style/theme.css |  |
| `focus:bg-accent` | color | --color-accent | --accent | --ds-color-brand-100 | #a5b3fc | app/globals.css -> rm-style/theme.css |  |
| `focus:text-accent-foreground` | color | --color-accent-foreground | --accent-foreground | --ds-color-neutral-950 | #0b1220 | app/globals.css -> rm-style/theme.css |  |
| `group-focus/menubar-item:text-accent-foreground` | color | --color-accent-foreground | --accent-foreground | --ds-color-neutral-950 | #0b1220 | app/globals.css -> rm-style/theme.css |  |
| `hover:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `not-data-[variant=destructive]:focus:**:text-accent-foreground` | color | --color-accent-foreground | --accent-foreground | --ds-color-neutral-950 | #0b1220 | app/globals.css -> rm-style/theme.css |  |
| `ring-foreground/10` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `text-popover-foreground` | color | --color-popover-foreground | --popover-foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  | --ds-typography-font-size-14 | 14px | rm-style/theme.css |  |
| `text-xs` | font-size | --text-xs |  | --ds-typography-font-size-12 | 12px | rm-style/theme.css |  |
| `font-medium` | font-weight | --font-weight-medium |  | --ds-typography-font-weight-medium | 500 | rm-style/theme.css |  |
| `before:rounded-[inherit]` | hardcoded |  |  |  | rounded-[inherit] | component file | yes |
| `p-[3px]` | hardcoded |  |  |  | p-[3px] | component file | yes |
| `py-[2px]` | hardcoded |  |  |  | py-[2px] | component file | yes |
| `rounded-lg` | radius | --radius-lg |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `rounded-md` | radius | --radius-md |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `rounded-sm` | radius | --radius-sm |  | --ds-radius-4 | 4px | rm-style/theme.css |  |
| `-mx-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `[&_svg:not([class*='size-'])]:size-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `before:inset-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-inset:pl-7` | spacing | --spacing |  | --ds-spacing-4 | 7 x --spacing = 4px | rm-style/theme.css |  |
| `gap-0.5` | spacing | --spacing |  | --ds-spacing-4 | 0.5 x --spacing = 4px | rm-style/theme.css |  |
| `gap-1.5` | spacing | --spacing |  | --ds-spacing-4 | 1.5 x --spacing = 4px | rm-style/theme.css |  |
| `h-8` | spacing | --spacing |  | --ds-spacing-4 | 8 x --spacing = 4px | rm-style/theme.css |  |
| `left-1.5` | spacing | --spacing |  | --ds-spacing-4 | 1.5 x --spacing = 4px | rm-style/theme.css |  |
| `min-w-32` | spacing | --spacing |  | --ds-spacing-4 | 32 x --spacing = 4px | rm-style/theme.css |  |
| `min-w-36` | spacing | --spacing |  | --ds-spacing-4 | 36 x --spacing = 4px | rm-style/theme.css |  |
| `my-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `p-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `pl-7` | spacing | --spacing |  | --ds-spacing-4 | 7 x --spacing = 4px | rm-style/theme.css |  |
| `pr-1.5` | spacing | --spacing |  | --ds-spacing-4 | 1.5 x --spacing = 4px | rm-style/theme.css |  |
| `px-1.5` | spacing | --spacing |  | --ds-spacing-4 | 1.5 x --spacing = 4px | rm-style/theme.css |  |
| `py-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `size-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |

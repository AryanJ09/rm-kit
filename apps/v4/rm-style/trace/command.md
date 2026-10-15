# command

Component file: `rm-style/ui/command.tsx`

Imports: `react`, `cmdk`, `cn`, `@/rm-style/ui/dialog`, `@/rm-style/ui/input-group`, `lucide-react`

Gaps (value not coming from an RM `--ds-*` primitive): **3** of 35

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `**:[[cmdk-group-heading]]:text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `bg-border` | color | --color-border | --border | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `bg-input/30` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `bg-popover` | color | --color-popover | --popover | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `border-input/30` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `data-selected:*:[svg]:text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `data-selected:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `data-selected:text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `group-data-selected/command-item:text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `text-popover-foreground` | color | --color-popover-foreground | --popover-foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `**:[[cmdk-group-heading]]:text-xs` | font-size | --text-xs |  | --ds-typography-font-size-12 | 12px | rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  | --ds-typography-font-size-14 | 14px | rm-style/theme.css |  |
| `text-xs` | font-size | --text-xs |  | --ds-typography-font-size-12 | 12px | rm-style/theme.css |  |
| `**:[[cmdk-group-heading]]:font-medium` | font-weight | --font-weight-medium |  | --ds-typography-font-weight-medium | 500 | rm-style/theme.css |  |
| `in-data-[slot=dialog-content]:rounded-lg!` | radius | --radius-lg! |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `rounded-lg!` | radius | --radius-lg! |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `rounded-sm` | radius | --radius-sm |  | --ds-radius-4 | 4px | rm-style/theme.css |  |
| `rounded-xl!` | radius | --radius-xl! |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `-mx-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `[&_svg:not([class*='size-'])]:size-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `**:[[cmdk-group-heading]]:px-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `**:[[cmdk-group-heading]]:py-1.5` | spacing | --spacing |  | --ds-spacing-4 | 1.5 x --spacing = 4px | rm-style/theme.css |  |
| `gap-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `max-h-72` | spacing | --spacing |  | --ds-spacing-4 | 72 x --spacing = 4px | rm-style/theme.css |  |
| `p-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `p-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `pb-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `px-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `py-1.5` | spacing | --spacing |  | --ds-spacing-4 | 1.5 x --spacing = 4px | rm-style/theme.css |  |
| `py-6` | spacing | --spacing |  | --ds-spacing-4 | 6 x --spacing = 4px | rm-style/theme.css |  |
| `size-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `top-1/3` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `translate-y-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |

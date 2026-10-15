# calendar

Component file: `rm-style/ui/calendar.tsx`

Imports: `react`, `cn`, `react-day-picker`, `@/rm-style/ui/button`, `lucide-react`

Gaps (value not coming from an RM `--ds-*` primitive): **41** of 63

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `[&>svg]:text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `after:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `aria-selected:text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `bg-background` | color | --color-background | --background | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `bg-popover` | color | --color-popover | --popover | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `border-input` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `dark:hover:text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `data-[range-end=true]:bg-primary` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `data-[range-end=true]:text-primary-foreground` | color | --color-primary-foreground | --primary-foreground | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `data-[range-middle=true]:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `data-[range-middle=true]:text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `data-[range-start=true]:bg-primary` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `data-[range-start=true]:text-primary-foreground` | color | --color-primary-foreground | --primary-foreground | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `data-[selected-single=true]:bg-primary` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `data-[selected-single=true]:text-primary-foreground` | color | --color-primary-foreground | --primary-foreground | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `group-data-[focused=true]/day:border-ring` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `group-data-[focused=true]/day:ring-ring/50` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `has-focus:border-ring` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `has-focus:ring-ring/50` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `in-data-[slot=card-content]:bg-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `in-data-[slot=popover-content]:bg-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `[&>span]:text-xs` | font-size | --text-xs |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `text-sm` | font-size | --text-sm |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `font-medium` | font-weight | --font-weight-medium |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `font-normal` | font-weight | --font-weight-normal |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `[--cell-radius:var(--radius-md)]` | hardcoded |  |  |  | [--cell-radius:var(--radius-md)] | component file | yes |
| `[--cell-size:--spacing(7)]` | hardcoded |  |  |  | [--cell-size:--spacing(7)] | component file | yes |
| `group-data-[focused=true]/day:ring-[3px]` | hardcoded |  |  |  | ring-[3px] | component file | yes |
| `text-[0.8rem]` | hardcoded |  |  |  | text-[0.8rem] | component file | yes |
| `[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)` | radius | --radius-(--cell-radius) |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `[&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)` | radius | --radius-(--cell-radius) |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)` | radius | --radius-(--cell-radius) |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `data-[range-end=true]:rounded-(--cell-radius)` | radius | --radius-(--cell-radius) |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `data-[range-end=true]:rounded-r-(--cell-radius)` | radius | --radius-(--cell-radius) |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `data-[range-middle=true]:rounded-none` | radius |  |  |  | Tailwind default (none) | node_modules/tailwindcss/theme.css | yes |
| `data-[range-start=true]:rounded-(--cell-radius)` | radius | --radius-(--cell-radius) |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `data-[range-start=true]:rounded-l-(--cell-radius)` | radius | --radius-(--cell-radius) |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `data-[selected=true]:rounded-none` | radius |  |  |  | Tailwind default (none) | node_modules/tailwindcss/theme.css | yes |
| `rounded-(--cell-radius)` | radius | --radius-(--cell-radius) |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `rounded-l-(--cell-radius)` | radius | --radius-(--cell-radius) |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `rounded-none` | radius |  |  |  | Tailwind default (none) | node_modules/tailwindcss/theme.css | yes |
| `rounded-r-(--cell-radius)` | radius | --radius-(--cell-radius) |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `[&>svg]:size-3.5` | spacing | --spacing |  |  | Tailwind default (3.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `after:inset-y-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `after:left-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `after:right-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `after:w-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-1.5` | spacing | --spacing |  |  | Tailwind default (1.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `h-6` | spacing | --spacing |  |  | Tailwind default (6 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `inset-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `inset-x-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `mt-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `p-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `p-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `pl-1.5` | spacing | --spacing |  |  | Tailwind default (1.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `pr-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `size-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `top-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |

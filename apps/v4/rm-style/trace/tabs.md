# tabs

Component file: `rm-style/ui/tabs.tsx`

Imports: `@base-ui/react/tabs`, `class-variance-authority`, `cn`

Gaps (value not coming from an RM `--ds-*` primitive): **11** of 44

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `after:bg-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `bg-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `border-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `dark:data-active:bg-input/30` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `dark:data-active:border-input` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `dark:data-active:text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `dark:group-data-[variant=line]/tabs-list:data-active:border-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `dark:hover:text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `dark:text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `data-active:bg-background` | color | --color-background | --background | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `data-active:text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:border-ring` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:outline-ring` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:ring-ring/50` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `group-data-[variant=line]/tabs-list:bg-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `group-data-[variant=line]/tabs-list:data-active:bg-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `hover:text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-foreground/60` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  | --ds-typography-font-size-14 | 14px | rm-style/theme.css |  |
| `font-medium` | font-weight | --font-weight-medium |  | --ds-typography-font-weight-medium | 500 | rm-style/theme.css |  |
| `focus-visible:ring-[3px]` | hardcoded |  |  |  | ring-[3px] | component file | yes |
| `group-data-horizontal/tabs:after:bottom-[-5px]` | hardcoded |  |  |  | bottom-[-5px] | component file | yes |
| `h-[calc(100%-1px)]` | hardcoded |  |  |  | h-[calc(100%-1px)] | component file | yes |
| `p-[3px]` | hardcoded |  |  |  | p-[3px] | component file | yes |
| `data-[variant=line]:rounded-none` | radius |  |  |  | Tailwind default (none) | node_modules/tailwindcss/theme.css | yes |
| `rounded-lg` | radius | --radius-lg |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `rounded-md` | radius | --radius-md |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `[&_svg:not([class*='size-'])]:size-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `gap-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `gap-1.5` | spacing | --spacing |  | --ds-spacing-4 | 1.5 x --spacing = 4px | rm-style/theme.css |  |
| `gap-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `group-data-horizontal/tabs:after:h-0.5` | spacing | --spacing |  | --ds-spacing-4 | 0.5 x --spacing = 4px | rm-style/theme.css |  |
| `group-data-horizontal/tabs:after:inset-x-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `group-data-horizontal/tabs:h-8` | spacing | --spacing |  | --ds-spacing-4 | 8 x --spacing = 4px | rm-style/theme.css |  |
| `group-data-vertical/tabs:after:-right-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `group-data-vertical/tabs:after:inset-y-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `group-data-vertical/tabs:after:w-0.5` | spacing | --spacing |  | --ds-spacing-4 | 0.5 x --spacing = 4px | rm-style/theme.css |  |
| `has-data-[icon=inline-end]:pr-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `has-data-[icon=inline-start]:pl-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `px-1.5` | spacing | --spacing |  | --ds-spacing-4 | 1.5 x --spacing = 4px | rm-style/theme.css |  |
| `py-0.5` | spacing | --spacing |  | --ds-spacing-4 | 0.5 x --spacing = 4px | rm-style/theme.css |  |

# tooltip

Component file: `rm-style/ui/tooltip.tsx`

Imports: `@base-ui/react/tooltip`, `cn`

Gaps (value not coming from an RM `--ds-*` primitive): **24** of 27

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `bg-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `fill-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-background` | color | --color-background | --background | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `text-xs` | font-size | --text-xs |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `rounded-[2px]` | hardcoded |  |  |  | rounded-[2px] | component file | yes |
| `translate-y-[calc(-50%-2px)]` | hardcoded |  |  |  | translate-y-[calc(-50%-2px)] | component file | yes |
| `**:data-[slot=kbd]:rounded-sm` | radius | --radius-sm |  |  | calc(var(--radius) * 0.6) | app/globals.css | yes |
| `rounded-md` | radius | --radius-md |  |  | calc(var(--radius) * 0.8) | app/globals.css | yes |
| `data-[side=bottom]:top-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=inline-end]:-left-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=inline-end]:-translate-y-1/2` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=inline-end]:top-1/2!` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=inline-start]:-right-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=inline-start]:-translate-y-1/2` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=inline-start]:top-1/2!` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=left]:-right-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=left]:-translate-y-1/2` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=left]:top-1/2!` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=right]:-left-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=right]:-translate-y-1/2` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=right]:top-1/2!` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=top]:-bottom-2.5` | spacing | --spacing |  |  | Tailwind default (2.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-1.5` | spacing | --spacing |  |  | Tailwind default (1.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `has-data-[slot=kbd]:pr-1.5` | spacing | --spacing |  |  | Tailwind default (1.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `px-3` | spacing | --spacing |  |  | Tailwind default (3 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `py-1.5` | spacing | --spacing |  |  | Tailwind default (1.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `size-2.5` | spacing | --spacing |  |  | Tailwind default (2.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |

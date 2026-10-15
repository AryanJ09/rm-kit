# message-scroller

Component file: `rm-style/ui/message-scroller.tsx`

Imports: `react`, `cn`, `@/rm-style/ui/button`, `lucide-react`

Gaps (value not coming from an RM `--ds-*` primitive): **13** of 18

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `bg-background` | color | --color-background | --background | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `border-border` | color | --color-border | --border | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `hover:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `hover:text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `[contain-intrinsic-size:auto_10rem]` | hardcoded |  |  |  | [contain-intrinsic-size:auto_10rem] | component file | yes |
| `[content-visibility:auto]` | hardcoded |  |  |  | [content-visibility:auto] | component file | yes |
| `data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)]` | hardcoded |  |  |  | ease-[cubic-bezier(0.7,0,0.84,0)] | component file | yes |
| `data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)]` | hardcoded |  |  |  | ease-[cubic-bezier(0.23,1,0.32,1)] | component file | yes |
| `transition-[translate,scale,opacity]` | hardcoded |  |  |  | transition-[translate,scale,opacity] | component file | yes |
| `-translate-x-1/2` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[active=true]:translate-y-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[direction=end]:bottom-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[direction=start]:top-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-6` | spacing | --spacing |  |  | Tailwind default (6 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `min-h-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `min-w-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `rtl:translate-x-1/2` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |

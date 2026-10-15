# toast

Component file: `rm-style/ui/toast.tsx`

Imports: `react`, `@base-ui/react/toast`, `cn`, `@/rm-style/ui/button`, `lucide-react`

Gaps (value not coming from an RM `--ds-*` primitive): **40** of 47

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `bg-popover` | color | --color-popover | --popover | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:border-ring` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:ring-ring/50` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `hover:text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-destructive` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `text-popover-foreground` | color | --color-popover-foreground | --popover-foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `font-medium` | font-weight | --font-weight-medium |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `[--gap:0.75rem]` | hardcoded |  |  |  | [--gap:0.75rem] | component file | yes |
| `[--height:var(--toast-frontmost-height,var(--toast-height))]` | hardcoded |  |  |  | [--height:var(--toast-frontmost-height,var(--toast-height))] | component file | yes |
| `[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]` | hardcoded |  |  |  | [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] | component file | yes |
| `[--peek:0.75rem]` | hardcoded |  |  |  | [--peek:0.75rem] | component file | yes |
| `[--scale:calc(max(0,1-(var(--toast-index)*0.1)))]` | hardcoded |  |  |  | [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] | component file | yes |
| `[--shrink:calc(1-var(--scale))]` | hardcoded |  |  |  | [--shrink:calc(1-var(--scale))] | component file | yes |
| `[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]` | hardcoded |  |  |  | [transform:translateY(150%)] | component file | yes |
| `[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]` | hardcoded |  |  |  | [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] | component file | yes |
| `[transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]` | hardcoded |  |  |  | [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms] | component file | yes |
| `after:content-['']` | hardcoded |  |  |  | content-[''] | component file | yes |
| `after:h-[calc(var(--gap)+1px)]` | hardcoded |  |  |  | h-[calc(var(--gap)+1px)] | component file | yes |
| `data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]` | hardcoded |  |  |  | [transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] | component file | yes |
| `data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]` | hardcoded |  |  |  | [transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] | component file | yes |
| `data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]` | hardcoded |  |  |  | [transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] | component file | yes |
| `data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]` | hardcoded |  |  |  | [transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] | component file | yes |
| `data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]` | hardcoded |  |  |  | [transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))] | component file | yes |
| `data-expanded:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]` | hardcoded |  |  |  | [transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] | component file | yes |
| `data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]` | hardcoded |  |  |  | [transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] | component file | yes |
| `data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]` | hardcoded |  |  |  | [transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] | component file | yes |
| `data-expanded:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]` | hardcoded |  |  |  | [transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] | component file | yes |
| `data-starting-style:[transform:translateY(150%)]` | hardcoded |  |  |  | [transform:translateY(150%)] | component file | yes |
| `ease-[cubic-bezier(0.22,1,0.36,1)]` | hardcoded |  |  |  | ease-[cubic-bezier(0.22,1,0.36,1)] | component file | yes |
| `focus-visible:ring-[3px]` | hardcoded |  |  |  | ring-[3px] | component file | yes |
| `z-[calc(1000-var(--toast-index))]` | hardcoded |  |  |  | z-[calc(1000-var(--toast-index))] | component file | yes |
| `rounded-2xl` | radius | --radius-2xl |  |  | calc(var(--radius) * 1.8) | app/globals.css | yes |
| `[&_svg:not([class*='size-'])]:size-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `after:-inset-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `after:left-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `bottom-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `bottom-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-3` | spacing | --spacing |  |  | Tailwind default (3 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `inset-x-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `min-w-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `p-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `right-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `sm:mx-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `sm:right-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |

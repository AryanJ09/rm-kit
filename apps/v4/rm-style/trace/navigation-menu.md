# navigation-menu

Component file: `rm-style/ui/navigation-menu.tsx`

Imports: `@base-ui/react/navigation-menu`, `class-variance-authority`, `cn`, `lucide-react`

Gaps (value not coming from an RM `--ds-*` primitive): **31** of 51

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `bg-border` | color | --color-border | --border | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `bg-popover` | color | --color-popover | --popover | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `data-active:bg-muted/50` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `data-active:focus:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `data-active:hover:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `data-open:bg-muted/50` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `data-open:focus:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `data-open:hover:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `data-popup-open:bg-muted/50` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `data-popup-open:hover:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:ring-ring/50` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `focus:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `group-data-[viewport=false]/navigation-menu:bg-popover` | color | --color-popover | --popover | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `group-data-[viewport=false]/navigation-menu:ring-foreground/10` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `group-data-[viewport=false]/navigation-menu:text-popover-foreground` | color | --color-popover-foreground | --popover-foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `hover:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `ring-foreground/10` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-popover-foreground` | color | --color-popover-foreground | --popover-foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `font-medium` | font-weight | --font-weight-medium |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `data-[ending-style]:easing-[ease]` | hardcoded |  |  |  | easing-[ease] | component file | yes |
| `data-[side=bottom]:before:top-[-10px]` | hardcoded |  |  |  | top-[-10px] | component file | yes |
| `data-ending-style:data-activation-direction=left:translate-x-[50%]` | hardcoded |  |  |  | translate-x-[50%] | component file | yes |
| `data-ending-style:data-activation-direction=right:translate-x-[-50%]` | hardcoded |  |  |  | translate-x-[-50%] | component file | yes |
| `data-starting-style:data-activation-direction=left:translate-x-[-50%]` | hardcoded |  |  |  | translate-x-[-50%] | component file | yes |
| `data-starting-style:data-activation-direction=right:translate-x-[50%]` | hardcoded |  |  |  | translate-x-[50%] | component file | yes |
| `duration-[0.35s]` | hardcoded |  |  |  | duration-[0.35s] | component file | yes |
| `ease-[cubic-bezier(0.22,1,0.36,1)]` | hardcoded |  |  |  | ease-[cubic-bezier(0.22,1,0.36,1)] | component file | yes |
| `top-[60%]` | hardcoded |  |  |  | top-[60%] | component file | yes |
| `transition-[opacity,transform,translate]` | hardcoded |  |  |  | transition-[opacity,transform,translate] | component file | yes |
| `transition-[opacity,transform,width,height,scale,translate]` | hardcoded |  |  |  | transition-[opacity,transform,width,height,scale,translate] | component file | yes |
| `transition-[top,left,right,bottom]` | hardcoded |  |  |  | transition-[top,left,right,bottom] | component file | yes |
| `group-data-[viewport=false]/navigation-menu:rounded-lg` | radius | --radius-lg | --radius | --ds-radius-8 | 8px | app/globals.css -> rm-style/theme.css |  |
| `in-data-[slot=navigation-menu-content]:rounded-md` | radius | --radius-md |  |  | calc(var(--radius) * 0.8) | app/globals.css | yes |
| `rounded-lg` | radius | --radius-lg | --radius | --ds-radius-8 | 8px | app/globals.css -> rm-style/theme.css |  |
| `rounded-tl-sm` | radius | --radius-sm |  |  | calc(var(--radius) * 0.6) | app/globals.css | yes |
| `[&_svg:not([class*='size-'])]:size-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=bottom]:before:left-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `data-[side=bottom]:before:right-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-0` | spacing | --spacing |  |  | Tailwind default (0 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `h-1.5` | spacing | --spacing |  |  | Tailwind default (1.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `h-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `h-9` | spacing | --spacing |  |  | Tailwind default (9 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `ml-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `p-1` | spacing | --spacing |  |  | Tailwind default (1 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `p-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `px-2.5` | spacing | --spacing |  |  | Tailwind default (2.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `py-1.5` | spacing | --spacing |  |  | Tailwind default (1.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `size-3` | spacing | --spacing |  |  | Tailwind default (3 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `w-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |

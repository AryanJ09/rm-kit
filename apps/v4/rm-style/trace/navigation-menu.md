# navigation-menu

Component file: `rm-style/ui/navigation-menu.tsx`

Imports: `@base-ui/react/navigation-menu`, `class-variance-authority`, `cn`, `lucide-react`

Gaps (value not coming from an RM `--ds-*` primitive): **12** of 51

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
| `text-sm` | font-size | --text-sm |  | --ds-typography-font-size-14 | 14px | rm-style/theme.css |  |
| `font-medium` | font-weight | --font-weight-medium |  | --ds-typography-font-weight-medium | 500 | rm-style/theme.css |  |
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
| `group-data-[viewport=false]/navigation-menu:rounded-lg` | radius | --radius-lg |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `in-data-[slot=navigation-menu-content]:rounded-md` | radius | --radius-md |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `rounded-lg` | radius | --radius-lg |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `rounded-tl-sm` | radius | --radius-sm |  | --ds-radius-4 | 4px | rm-style/theme.css |  |
| `[&_svg:not([class*='size-'])]:size-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `data-[side=bottom]:before:left-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-[side=bottom]:before:right-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `gap-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `gap-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `h-1.5` | spacing | --spacing |  | --ds-spacing-4 | 1.5 x --spacing = 4px | rm-style/theme.css |  |
| `h-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `h-9` | spacing | --spacing |  | --ds-spacing-4 | 9 x --spacing = 4px | rm-style/theme.css |  |
| `ml-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `p-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `p-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `px-2.5` | spacing | --spacing |  | --ds-spacing-4 | 2.5 x --spacing = 4px | rm-style/theme.css |  |
| `py-1.5` | spacing | --spacing |  | --ds-spacing-4 | 1.5 x --spacing = 4px | rm-style/theme.css |  |
| `size-3` | spacing | --spacing |  | --ds-spacing-4 | 3 x --spacing = 4px | rm-style/theme.css |  |
| `w-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |

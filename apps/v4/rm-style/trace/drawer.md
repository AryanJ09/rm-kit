# drawer

Component file: `rm-style/ui/drawer.tsx`

Imports: `react`, `@base-ui/react/drawer`, `cn`

Gaps (value not coming from an RM `--ds-*` primitive): **37** of 71

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `after:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `bg-black/10` | color |  |  |  | Tailwind default (black) | node_modules/tailwindcss/theme.css | yes |
| `bg-popover` | color | --color-popover | --popover | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `text-foreground` | color | --color-foreground | --foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `text-popover-foreground` | color | --color-popover-foreground | --popover-foreground | --ds-color-neutral-900 | #111827 | app/globals.css -> rm-style/theme.css |  |
| `text-base` | font-size | --text-base |  | --ds-typography-font-size-16 | 16px | rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  | --ds-typography-font-size-14 | 14px | rm-style/theme.css |  |
| `font-medium` | font-weight | --font-weight-medium |  | --ds-typography-font-weight-medium | 500 | rm-style/theme.css |  |
| `[--bleed:3rem]` | hardcoded |  |  |  | [--bleed:3rem] | component file | yes |
| `[--drawer-content-height:var(--drawer-height,auto)]` | hardcoded |  |  |  | [--drawer-content-height:var(--drawer-height,auto)] | component file | yes |
| `[--peek:1rem]` | hardcoded |  |  |  | [--peek:1rem] | component file | yes |
| `[--stack-height:var(--drawer-frontmost-height,var(--drawer-height,0px))]` | hardcoded |  |  |  | [--stack-height:var(--drawer-frontmost-height,var(--drawer-height,0px))] | component file | yes |
| `[--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))]` | hardcoded |  |  |  | [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] | component file | yes |
| `[--stack-progress:clamp(0,var(--drawer-swipe-progress),1)]` | hardcoded |  |  |  | [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] | component file | yes |
| `[--stack-scale-base:max(0,calc(1-(var(--nested-drawers)*var(--stack-step))))]` | hardcoded |  |  |  | [--stack-scale-base:max(0,calc(1-(var(--nested-drawers)*var(--stack-step))))] | component file | yes |
| `[--stack-scale:clamp(0,calc(var(--stack-scale-base)+(var(--stack-step)*var(--stack-progress))),1)]` | hardcoded |  |  |  | [--stack-scale:clamp(0,calc(var(--stack-scale-base)+(var(--stack-step)*var(--stack-progress))),1)] | component file | yes |
| `[--stack-shrink:calc(1-var(--stack-scale))]` | hardcoded |  |  |  | [--stack-shrink:calc(1-var(--stack-scale))] | component file | yes |
| `[--stack-step:0.05]` | hardcoded |  |  |  | [--stack-step:0.05] | component file | yes |
| `[interpolate-size:allow-keywords]` | hardcoded |  |  |  | [interpolate-size:allow-keywords] | component file | yes |
| `data-[swipe-axis=x]:[--drawer-content-width:75%]` | hardcoded |  |  |  | [--drawer-content-width:75%] | component file | yes |
| `data-[swipe-axis=x]:sm:[--drawer-content-width:24rem]` | hardcoded |  |  |  | [--drawer-content-width:24rem] | component file | yes |
| `data-[swipe-axis=y]:[--drawer-content-max-height:calc(100dvh-6rem)]` | hardcoded |  |  |  | [--drawer-content-max-height:calc(100dvh-6rem)] | component file | yes |
| `data-[swipe-axis=y]:data-snap-points:[--drawer-content-height:100dvh]` | hardcoded |  |  |  | [--drawer-content-height:100dvh] | component file | yes |
| `data-[swipe-direction=down]:[--closed-transform:translate3d(0,calc(100%+var(--drawer-inset,0px)+2px),0)]` | hardcoded |  |  |  | [--closed-transform:translate3d(0,calc(100%+var(--drawer-inset,0px)+2px),0)] | component file | yes |
| `data-[swipe-direction=down]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--stack-shrink)*var(--stack-height)))]` | hardcoded |  |  |  | [--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--stack-shrink)*var(--stack-height)))] | component file | yes |
| `data-[swipe-direction=left]:[--closed-transform:translate3d(calc(-100%-var(--drawer-inset,0px)-2px),0,0)]` | hardcoded |  |  |  | [--closed-transform:translate3d(calc(-100%-var(--drawer-inset,0px)-2px),0,0)] | component file | yes |
| `data-[swipe-direction=left]:[--translate-x:calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)+(var(--stack-shrink)*100%))]` | hardcoded |  |  |  | [--translate-x:calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)+(var(--stack-shrink)*100%))] | component file | yes |
| `data-[swipe-direction=right]:[--closed-transform:translate3d(calc(100%+var(--drawer-inset,0px)+2px),0,0)]` | hardcoded |  |  |  | [--closed-transform:translate3d(calc(100%+var(--drawer-inset,0px)+2px),0,0)] | component file | yes |
| `data-[swipe-direction=right]:[--translate-x:calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)-(var(--stack-shrink)*100%))]` | hardcoded |  |  |  | [--translate-x:calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)-(var(--stack-shrink)*100%))] | component file | yes |
| `data-[swipe-direction=up]:[--closed-transform:translate3d(0,calc(-100%-var(--drawer-inset,0px)-2px),0)]` | hardcoded |  |  |  | [--closed-transform:translate3d(0,calc(-100%-var(--drawer-inset,0px)-2px),0)] | component file | yes |
| `data-[swipe-direction=up]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--stack-shrink)*var(--stack-height)))]` | hardcoded |  |  |  | [--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--stack-shrink)*var(--stack-height)))] | component file | yes |
| `data-ending-style:data-nested-drawer-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)]` | hardcoded |  |  |  | duration-[calc(var(--drawer-swipe-strength)*400ms)] | component file | yes |
| `data-ending-style:data-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)]` | hardcoded |  |  |  | duration-[calc(var(--drawer-swipe-strength)*400ms)] | component file | yes |
| `data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]` | hardcoded |  |  |  | duration-[calc(var(--drawer-swipe-strength)*400ms)] | component file | yes |
| `data-ending-style:opacity-[0.9999]` | hardcoded |  |  |  | opacity-[0.9999] | component file | yes |
| `data-snap-points:[--drawer-overlay-min-opacity:0.5]` | hardcoded |  |  |  | [--drawer-overlay-min-opacity:0.5] | component file | yes |
| `ease-[cubic-bezier(0.22,1,0.36,1)]` | hardcoded |  |  |  | ease-[cubic-bezier(0.22,1,0.36,1)] | component file | yes |
| `ease-[cubic-bezier(0.32,0.72,0,1)]` | hardcoded |  |  |  | ease-[cubic-bezier(0.32,0.72,0,1)] | component file | yes |
| `ease-[cubic-bezier(0.45,1.005,0,1.005)]` | hardcoded |  |  |  | ease-[cubic-bezier(0.45,1.005,0,1.005)] | component file | yes |
| `opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress)))]` | hardcoded |  |  |  | opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress)))] | component file | yes |
| `rounded-[inherit]` | hardcoded |  |  |  | rounded-[inherit] | component file | yes |
| `transform-[translate3d(var(--translate-x,0px),var(--translate-y,0px),0)_scale(var(--stack-scale))]` | hardcoded |  |  |  | transform-[translate3d(var(--translate-x,0px),var(--translate-y,0px),0)_scale(var(--stack-scale))] | component file | yes |
| `transition-[transform,height,opacity,filter]` | hardcoded |  |  |  | transition-[transform,height,opacity,filter] | component file | yes |
| `after:rounded-full` | radius |  |  |  | Tailwind default (full) | node_modules/tailwindcss/theme.css | yes |
| `data-[swipe-direction=down]:rounded-t-xl` | radius | --radius-xl |  | --ds-radius-12 | 12px | rm-style/theme.css |  |
| `data-[swipe-direction=left]:rounded-r-xl` | radius | --radius-xl |  | --ds-radius-12 | 12px | rm-style/theme.css |  |
| `data-[swipe-direction=right]:rounded-l-xl` | radius | --radius-xl |  | --ds-radius-12 | 12px | rm-style/theme.css |  |
| `data-[swipe-direction=up]:rounded-b-xl` | radius | --radius-xl |  | --ds-radius-12 | 12px | rm-style/theme.css |  |
| `data-[swipe-axis=x]:after:inset-y-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-[swipe-axis=x]:inset-y-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-[swipe-axis=y]:after:inset-x-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-[swipe-axis=y]:inset-x-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-[swipe-direction=down]:bottom-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-[swipe-direction=left]:left-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-[swipe-direction=right]:right-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-[swipe-direction=up]:top-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `gap-0.5` | spacing | --spacing |  | --ds-spacing-4 | 0.5 x --spacing = 4px | rm-style/theme.css |  |
| `gap-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `group-data-[swipe-axis=x]/drawer-popup:after:h-24` | spacing | --spacing |  | --ds-spacing-4 | 24 x --spacing = 4px | rm-style/theme.css |  |
| `group-data-[swipe-axis=x]/drawer-popup:after:w-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `group-data-[swipe-axis=x]/drawer-popup:w-3` | spacing | --spacing |  | --ds-spacing-4 | 3 x --spacing = 4px | rm-style/theme.css |  |
| `group-data-[swipe-axis=y]/drawer-popup:after:h-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `group-data-[swipe-axis=y]/drawer-popup:after:w-24` | spacing | --spacing |  | --ds-spacing-4 | 24 x --spacing = 4px | rm-style/theme.css |  |
| `group-data-[swipe-axis=y]/drawer-popup:h-3` | spacing | --spacing |  | --ds-spacing-4 | 3 x --spacing = 4px | rm-style/theme.css |  |
| `inset-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `md:gap-0.5` | spacing | --spacing |  | --ds-spacing-4 | 0.5 x --spacing = 4px | rm-style/theme.css |  |
| `min-h-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `p-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `pb-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `pt-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |

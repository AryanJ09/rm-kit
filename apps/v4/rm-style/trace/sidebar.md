# sidebar

Component file: `rm-style/ui/sidebar.tsx`

Imports: `react`, `@base-ui/react/merge-props`, `@base-ui/react/use-render`, `class-variance-authority`, `cn`, `@/rm-style/ui/button`, `@/rm-style/ui/input`, `@/rm-style/ui/separator`, `@/rm-style/ui/sheet`, `@/rm-style/ui/skeleton`, `@/rm-style/ui/tooltip`, `lucide-react`

Gaps (value not coming from an RM `--ds-*` primitive): **35** of 88

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `"hover:bg-sidebar-accent` | color | --color-sidebar-accent | --sidebar-accent |  | oklch(0.97 0 0) | app/globals.css | yes |
| `[&>svg]:text-sidebar-accent-foreground` | color | --color-sidebar-accent-foreground | --sidebar-accent-foreground |  | oklch(0.205 0 0) | app/globals.css | yes |
| `active:bg-sidebar-accent` | color | --color-sidebar-accent | --sidebar-accent |  | oklch(0.97 0 0) | app/globals.css | yes |
| `active:text-sidebar-accent-foreground` | color | --color-sidebar-accent-foreground | --sidebar-accent-foreground |  | oklch(0.205 0 0) | app/globals.css | yes |
| `bg-background` | color | --color-background | --background | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `bg-sidebar` | color | --color-sidebar | --sidebar |  | oklch(0.985 0 0) | app/globals.css | yes |
| `bg-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `border-sidebar-border` | color | --color-sidebar-border | --sidebar-border |  | oklch(0.922 0 0) | app/globals.css | yes |
| `data-active:bg-sidebar-accent` | color | --color-sidebar-accent | --sidebar-accent |  | oklch(0.97 0 0) | app/globals.css | yes |
| `data-active:text-sidebar-accent-foreground` | color | --color-sidebar-accent-foreground | --sidebar-accent-foreground |  | oklch(0.205 0 0) | app/globals.css | yes |
| `data-open:hover:bg-sidebar-accent` | color | --color-sidebar-accent | --sidebar-accent |  | oklch(0.97 0 0) | app/globals.css | yes |
| `data-open:hover:text-sidebar-accent-foreground` | color | --color-sidebar-accent-foreground | --sidebar-accent-foreground |  | oklch(0.205 0 0) | app/globals.css | yes |
| `hover:after:bg-sidebar-border` | color | --color-sidebar-border | --sidebar-border |  | oklch(0.922 0 0) | app/globals.css | yes |
| `hover:bg-sidebar-accent` | color | --color-sidebar-accent | --sidebar-accent |  | oklch(0.97 0 0) | app/globals.css | yes |
| `hover:text-sidebar-accent-foreground` | color | --color-sidebar-accent-foreground | --sidebar-accent-foreground |  | oklch(0.205 0 0) | app/globals.css | yes |
| `peer-data-active/menu-button:text-sidebar-accent-foreground` | color | --color-sidebar-accent-foreground | --sidebar-accent-foreground |  | oklch(0.205 0 0) | app/globals.css | yes |
| `peer-hover/menu-button:text-sidebar-accent-foreground` | color | --color-sidebar-accent-foreground | --sidebar-accent-foreground |  | oklch(0.205 0 0) | app/globals.css | yes |
| `ring-sidebar-ring` | color | --color-sidebar-ring | --sidebar-ring |  | oklch(0.708 0 0) | app/globals.css | yes |
| `text-sidebar-foreground` | color | --color-sidebar-foreground | --sidebar-foreground |  | oklch(0% 0 0) | app/globals.css | yes |
| `text-sidebar-foreground/70` | color | --color-sidebar-foreground | --sidebar-foreground |  | oklch(0% 0 0) | app/globals.css | yes |
| `data-[size=md]:text-sm` | font-size | --text-sm |  | --ds-typography-font-size-14 | 14px | rm-style/theme.css |  |
| `data-[size=sm]:text-xs` | font-size | --text-xs |  | --ds-typography-font-size-12 | 12px | rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  | --ds-typography-font-size-14 | 14px | rm-style/theme.css |  |
| `text-xs` | font-size | --text-xs |  | --ds-typography-font-size-12 | 12px | rm-style/theme.css |  |
| `data-active:font-medium` | font-weight | --font-weight-medium |  | --ds-typography-font-weight-medium | 500 | rm-style/theme.css |  |
| `font-medium` | font-weight | --font-weight-medium |  | --ds-typography-font-weight-medium | 500 | rm-style/theme.css |  |
| `"group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"` | hardcoded |  |  |  | w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" | component file | yes |
| `[isMobile,` | hardcoded |  |  |  | [isMobile, | component file | yes |
| `[setOpenProp,` | hardcoded |  |  |  | [setOpenProp, | component file | yes |
| `[state,` | hardcoded |  |  |  | [state, | component file | yes |
| `[toggleSidebar])` | hardcoded |  |  |  | [toggleSidebar]) | component file | yes |
| `[width]` | hardcoded |  |  |  | [width] | component file | yes |
| `after:w-[2px]` | hardcoded |  |  |  | w-[2px] | component file | yes |
| `data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]` | hardcoded |  |  |  | left-[calc(var(--sidebar-width)*-1)] | component file | yes |
| `data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]` | hardcoded |  |  |  | right-[calc(var(--sidebar-width)*-1)] | component file | yes |
| `group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"` | hardcoded |  |  |  | w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" | component file | yes |
| `hover:shadow-[0_0_0_1px_var(--sidebar-accent)]",` | hardcoded |  |  |  | shadow-[0_0_0_1px_var(--sidebar-accent)]", | component file | yes |
| `shadow-[0_0_0_1px_var(--sidebar-border)]` | hardcoded |  |  |  | shadow-[0_0_0_1px_var(--sidebar-border)] | component file | yes |
| `transition-[left,right,width]` | hardcoded |  |  |  | transition-[left,right,width] | component file | yes |
| `transition-[margin,opacity]` | hardcoded |  |  |  | transition-[margin,opacity] | component file | yes |
| `transition-[width,height,padding]` | hardcoded |  |  |  | transition-[width,height,padding] | component file | yes |
| `transition-[width]` | hardcoded |  |  |  | transition-[width] | component file | yes |
| `group-data-[variant=floating]:rounded-lg` | radius | --radius-lg |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `md:peer-data-[variant=inset]:rounded-xl` | radius | --radius-xl |  | --ds-radius-12 | 12px | rm-style/theme.css |  |
| `rounded-md` | radius | --radius-md |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `"group-data-[collapsible=offcanvas]:translate-x-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `[&_svg]:size-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `[&>svg]:size-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `after:-inset-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `after:inset-y-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-[side=left]:left-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `data-[side=right]:right-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `gap-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `gap-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `gap-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `group-data-[collapsible=icon]:-mt-8` | spacing | --spacing |  | --ds-spacing-4 | 8 x --spacing = 4px | rm-style/theme.css |  |
| `group-data-[side=left]:-right-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `group-data-[side=right]:left-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `group-has-data-[sidebar=menu-action]/menu-item:pr-8` | spacing | --spacing |  | --ds-spacing-4 | 8 x --spacing = 4px | rm-style/theme.css |  |
| `h-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `h-5` | spacing | --spacing |  | --ds-spacing-4 | 5 x --spacing = 4px | rm-style/theme.css |  |
| `h-7` | spacing | --spacing |  | --ds-spacing-4 | 7 x --spacing = 4px | rm-style/theme.css |  |
| `h-8` | spacing | --spacing |  | --ds-spacing-4 | 8 x --spacing = 4px | rm-style/theme.css |  |
| `inset-y-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `ltr:-translate-x-1/2` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `md:peer-data-[variant=inset]:m-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `md:peer-data-[variant=inset]:ml-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `min-h-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `min-w-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `min-w-5` | spacing | --spacing |  | --ds-spacing-4 | 5 x --spacing = 4px | rm-style/theme.css |  |
| `mx-3.5` | spacing | --spacing |  | --ds-spacing-4 | 3.5 x --spacing = 4px | rm-style/theme.css |  |
| `p-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `p-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `peer-data-[size=default]/menu-button:top-1.5` | spacing | --spacing |  | --ds-spacing-4 | 1.5 x --spacing = 4px | rm-style/theme.css |  |
| `peer-data-[size=lg]/menu-button:top-2.5` | spacing | --spacing |  | --ds-spacing-4 | 2.5 x --spacing = 4px | rm-style/theme.css |  |
| `peer-data-[size=sm]/menu-button:top-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `px-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `px-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `px-2.5` | spacing | --spacing |  | --ds-spacing-4 | 2.5 x --spacing = 4px | rm-style/theme.css |  |
| `py-0.5` | spacing | --spacing |  | --ds-spacing-4 | 0.5 x --spacing = 4px | rm-style/theme.css |  |
| `right-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `right-3` | spacing | --spacing |  | --ds-spacing-4 | 3 x --spacing = 4px | rm-style/theme.css |  |
| `rtl:-translate-x-1/2",` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `size-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `top-1.5` | spacing | --spacing |  | --ds-spacing-4 | 1.5 x --spacing = 4px | rm-style/theme.css |  |
| `top-3.5` | spacing | --spacing |  | --ds-spacing-4 | 3.5 x --spacing = 4px | rm-style/theme.css |  |
| `w-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `w-5` | spacing | --spacing |  | --ds-spacing-4 | 5 x --spacing = 4px | rm-style/theme.css |  |

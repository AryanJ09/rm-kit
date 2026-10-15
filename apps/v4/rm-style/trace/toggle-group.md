# toggle-group

Component file: `rm-style/ui/toggle-group.tsx`

Imports: `react`, `@base-ui/react/toggle`, `@base-ui/react/toggle-group`, `class-variance-authority`, `cn`, `@/rm-style/ui/toggle`

Gaps (value not coming from an RM `--ds-*` primitive): **3** of 11

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `data-[size=sm]:rounded-[min(var(--radius-md),10px)]` | hardcoded |  |  |  | rounded-[min(var(--radius-md),10px)] | component file | yes |
| `gap-[--spacing(var(--gap))]` | hardcoded |  |  |  | gap-[--spacing(var(--gap))] | component file | yes |
| `group-data-[spacing=0]/toggle-group:rounded-none` | radius |  |  |  | Tailwind default (none) | node_modules/tailwindcss/theme.css | yes |
| `group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg` | radius | --radius-lg |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg` | radius | --radius-lg |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg` | radius | --radius-lg |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg` | radius | --radius-lg |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `rounded-lg` | radius | --radius-lg |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5` | spacing | --spacing |  | --ds-spacing-4 | 1.5 x --spacing = 4px | rm-style/theme.css |  |
| `group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5` | spacing | --spacing |  | --ds-spacing-4 | 1.5 x --spacing = 4px | rm-style/theme.css |  |
| `group-data-[spacing=0]/toggle-group:px-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |

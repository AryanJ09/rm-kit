# button-group

Component file: `rm-style/ui/button-group.tsx`

Imports: `@base-ui/react/merge-props`, `@base-ui/react/use-render`, `class-variance-authority`, `cn`, `@/rm-style/ui/separator`

Gaps (value not coming from an RM `--ds-*` primitive): **12** of 16

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `bg-input` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `font-medium` | font-weight | --font-weight-medium |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg!` | radius | --radius-lg! |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg!` | radius | --radius-lg! |  |  | Tailwind default | node_modules/tailwindcss/theme.css | yes |
| `[&>[data-slot]~[data-slot]]:rounded-l-none` | radius |  |  |  | Tailwind default (none) | node_modules/tailwindcss/theme.css | yes |
| `[&>[data-slot]~[data-slot]]:rounded-t-none` | radius |  |  |  | Tailwind default (none) | node_modules/tailwindcss/theme.css | yes |
| `*:data-slot:rounded-b-none` | radius |  |  |  | Tailwind default (none) | node_modules/tailwindcss/theme.css | yes |
| `*:data-slot:rounded-r-none` | radius |  |  |  | Tailwind default (none) | node_modules/tailwindcss/theme.css | yes |
| `has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg` | radius | --radius-lg | --radius | --ds-radius-8 | 8px | app/globals.css -> rm-style/theme.css |  |
| `rounded-lg` | radius | --radius-lg | --radius | --ds-radius-8 | 8px | app/globals.css -> rm-style/theme.css |  |
| `[&_svg:not([class*='size-'])]:size-4` | spacing | --spacing |  |  | Tailwind default (4 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `gap-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `has-[>[data-slot=button-group]]:gap-2` | spacing | --spacing |  |  | Tailwind default (2 x --spacing) | node_modules/tailwindcss/theme.css | yes |
| `px-2.5` | spacing | --spacing |  |  | Tailwind default (2.5 x --spacing) | node_modules/tailwindcss/theme.css | yes |

# native-select

Component file: `rm-style/ui/native-select.tsx`

Imports: `react`, `cn`, `lucide-react`

Gaps (value not coming from an RM `--ds-*` primitive): **4** of 30

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `aria-invalid:border-destructive` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `aria-invalid:ring-destructive/20` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `bg-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `border-input` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `dark:aria-invalid:border-destructive/50` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `dark:aria-invalid:ring-destructive/40` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `dark:bg-input/30` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `dark:hover:bg-input/50` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:border-ring` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:ring-ring/50` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `placeholder:text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `selection:bg-primary` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `selection:text-primary-foreground` | color | --color-primary-foreground | --primary-foreground | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  | --ds-typography-font-size-14 | 14px | rm-style/theme.css |  |
| `bg-[Canvas]` | hardcoded |  |  |  | bg-[Canvas] | component file | yes |
| `data-[size=sm]:rounded-[min(var(--radius-md),10px)]` | hardcoded |  |  |  | rounded-[min(var(--radius-md),10px)] | component file | yes |
| `text-[CanvasText]` | hardcoded |  |  |  | text-[CanvasText] | component file | yes |
| `rounded-lg` | radius | --radius-lg |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `-translate-y-1/2` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `data-[size=sm]:h-7` | spacing | --spacing |  | --ds-spacing-4 | 7 x --spacing = 4px | rm-style/theme.css |  |
| `data-[size=sm]:py-0.5` | spacing | --spacing |  | --ds-spacing-4 | 0.5 x --spacing = 4px | rm-style/theme.css |  |
| `h-8` | spacing | --spacing |  | --ds-spacing-4 | 8 x --spacing = 4px | rm-style/theme.css |  |
| `min-w-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `pl-2.5` | spacing | --spacing |  | --ds-spacing-4 | 2.5 x --spacing = 4px | rm-style/theme.css |  |
| `pr-8` | spacing | --spacing |  | --ds-spacing-4 | 8 x --spacing = 4px | rm-style/theme.css |  |
| `py-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `right-2.5` | spacing | --spacing |  | --ds-spacing-4 | 2.5 x --spacing = 4px | rm-style/theme.css |  |
| `size-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `top-1/2` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |

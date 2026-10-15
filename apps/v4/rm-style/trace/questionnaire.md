# questionnaire

Component file: `rm-style/ui/questionnaire.tsx`

Imports: `react`, `cn`, `@/rm-style/ui/button`, `lucide-react`

Gaps (value not coming from an RM `--ds-*` primitive): **11** of 69

| class | kind | utility token | semantic | primitive | value | defined in | gap |
|---|---|---|---|---|---|---|---|
| `aria-invalid:border-destructive` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `aria-invalid:ring-destructive/20` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `bg-background` | color | --color-background | --background | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `bg-primary-foreground` | color | --color-primary-foreground | --primary-foreground | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `bg-transparent` | color |  |  |  | Tailwind default (transparent) | node_modules/tailwindcss/theme.css | yes |
| `border-input` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `dark:aria-invalid:border-destructive/50` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `dark:aria-invalid:ring-destructive/40` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `dark:bg-input/20` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `dark:bg-input/30` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `dark:data-checked:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `dark:disabled:bg-input/80` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `dark:group-data-checked/questionnaire-choice:bg-primary` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `data-checked:bg-muted` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `data-checked:border-primary/40` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `data-invalid:border-destructive` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `disabled:bg-input/50` | color | --color-input | --input | --ds-color-neutral-200 | #e5e7eb | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:border-ring` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `focus-visible:ring-ring/50` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `group-data-checked/questionnaire-choice:bg-primary` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `group-data-checked/questionnaire-choice:border-primary` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `group-data-checked/questionnaire-choice:text-primary-foreground` | color | --color-primary-foreground | --primary-foreground | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `has-[>input:focus-visible]:border-ring` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `has-[>input:focus-visible]:ring-ring/50` | color | --color-ring | --ring | --ds-color-brand-500 | #586efb | app/globals.css -> rm-style/theme.css |  |
| `hover:bg-muted/50` | color | --color-muted | --muted | --ds-color-neutral-100 | #f3f4f6 | app/globals.css -> rm-style/theme.css |  |
| `placeholder:text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `selection:bg-primary` | color | --color-primary | --primary | --ds-color-brand-600 | #3857ff | app/globals.css -> rm-style/theme.css |  |
| `selection:text-primary-foreground` | color | --color-primary-foreground | --primary-foreground | --ds-color-neutral-0 | #ffffff | app/globals.css -> rm-style/theme.css |  |
| `text-destructive` | color | --color-destructive | --destructive | --ds-color-danger-600 | #e01945 | app/globals.css -> rm-style/theme.css |  |
| `text-muted-foreground` | color | --color-muted-foreground | --muted-foreground | --ds-color-neutral-600 | #4b5563 | app/globals.css -> rm-style/theme.css |  |
| `font-mono` | font-family | --font-mono |  |  | var(--font-mono) | app/globals.css | yes |
| `md:text-sm` | font-size | --text-sm |  | --ds-typography-font-size-14 | 14px | rm-style/theme.css |  |
| `text-base` | font-size | --text-base |  | --ds-typography-font-size-16 | 16px | rm-style/theme.css |  |
| `text-sm` | font-size | --text-sm |  | --ds-typography-font-size-14 | 14px | rm-style/theme.css |  |
| `text-xs` | font-size | --text-xs |  | --ds-typography-font-size-12 | 12px | rm-style/theme.css |  |
| `font-medium` | font-weight | --font-weight-medium |  | --ds-typography-font-weight-medium | 500 | rm-style/theme.css |  |
| `grid-cols-[minmax(0,1fr)_auto_auto]` | hardcoded |  |  |  | grid-cols-[minmax(0,1fr)_auto_auto] | component file | yes |
| `min-h-[1lh]` | hardcoded |  |  |  | min-h-[1lh] | component file | yes |
| `min-w-[14ch]` | hardcoded |  |  |  | min-w-[14ch] | component file | yes |
| `rounded-[4px]` | hardcoded |  |  |  | rounded-[4px] | component file | yes |
| `text-[0.625rem]` | hardcoded |  |  |  | text-[0.625rem] | component file | yes |
| `transition-[color,box-shadow,background-color]` | hardcoded |  |  |  | transition-[color,box-shadow,background-color] | component file | yes |
| `translate-y-[--spacing(0.45)]` | hardcoded |  |  |  | translate-y-[--spacing(0.45)] | component file | yes |
| `group-data-[type=radio]/questionnaire-choice:rounded-full` | radius |  |  |  | Tailwind default (full) | node_modules/tailwindcss/theme.css | yes |
| `rounded-full` | radius |  |  |  | Tailwind default (full) | node_modules/tailwindcss/theme.css | yes |
| `rounded-lg` | radius | --radius-lg |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `rounded-md` | radius | --radius-md |  | --ds-radius-8 | 8px | rm-style/theme.css |  |
| `[&:not(:has(~[data-slot=questionnaire-description]))]:mb-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `gap-0.5` | spacing | --spacing |  | --ds-spacing-4 | 0.5 x --spacing = 4px | rm-style/theme.css |  |
| `gap-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `gap-2.5` | spacing | --spacing |  | --ds-spacing-4 | 2.5 x --spacing = 4px | rm-style/theme.css |  |
| `gap-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `group-has-data-[slot=questionnaire-choice-description]/questionnaire-choice:translate-y-0.5` | spacing | --spacing |  | --ds-spacing-4 | 0.5 x --spacing = 4px | rm-style/theme.css |  |
| `h-8` | spacing | --spacing |  | --ds-spacing-4 | 8 x --spacing = 4px | rm-style/theme.css |  |
| `inset-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `min-h-11` | spacing | --spacing |  | --ds-spacing-4 | 11 x --spacing = 4px | rm-style/theme.css |  |
| `min-w-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `mt-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `p-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `px-2.5` | spacing | --spacing |  | --ds-spacing-4 | 2.5 x --spacing = 4px | rm-style/theme.css |  |
| `px-3` | spacing | --spacing |  | --ds-spacing-4 | 3 x --spacing = 4px | rm-style/theme.css |  |
| `py-1` | spacing | --spacing |  | --ds-spacing-4 | 1 x --spacing = 4px | rm-style/theme.css |  |
| `py-2.5` | spacing | --spacing |  | --ds-spacing-4 | 2.5 x --spacing = 4px | rm-style/theme.css |  |
| `size-2` | spacing | --spacing |  | --ds-spacing-4 | 2 x --spacing = 4px | rm-style/theme.css |  |
| `size-3.5` | spacing | --spacing |  | --ds-spacing-4 | 3.5 x --spacing = 4px | rm-style/theme.css |  |
| `size-4` | spacing | --spacing |  | --ds-spacing-4 | 4 x --spacing = 4px | rm-style/theme.css |  |
| `size-5` | spacing | --spacing |  | --ds-spacing-4 | 5 x --spacing = 4px | rm-style/theme.css |  |
| `sm:min-h-0` | spacing | --spacing |  | --ds-spacing-4 | 0 x --spacing = 4px | rm-style/theme.css |  |
| `sm:min-h-8` | spacing | --spacing |  | --ds-spacing-4 | 8 x --spacing = 4px | rm-style/theme.css |  |

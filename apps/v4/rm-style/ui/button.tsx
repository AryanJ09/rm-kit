import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Spinner } from "@/rm-style/ui/spinner"

// default = Primary, secondary = Secondary, ghost = Text (Private Banking workflow button); tertiary = soft fill.
// `data-pressed` / `data-focused` let docs show those states without interacting.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-4 focus-visible:ring-primary/25 data-focused:ring-4 data-focused:ring-primary/25 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none data-loading:pointer-events-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/80 active:bg-(--ds-color-brand-700) data-pressed:bg-(--ds-color-brand-700) disabled:bg-surface-disabled disabled:text-text-disabled",
        secondary:
          "border-primary bg-background text-primary hover:bg-muted aria-expanded:bg-muted active:bg-(--ds-color-brand-50) data-pressed:bg-(--ds-color-brand-50) disabled:border-surface-disabled disabled:bg-surface-disabled disabled:text-text-disabled dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        tertiary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground disabled:opacity-50",
        ghost:
          "bg-background text-primary hover:bg-muted aria-expanded:bg-muted active:bg-(--ds-color-brand-50) data-pressed:bg-(--ds-color-brand-50) disabled:bg-surface-disabled disabled:text-text-disabled dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 disabled:opacity-50 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
      },
      size: {
        xl: "h-(--size-control-lg) gap-2 rounded-full px-4 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "xl",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "xl",
  loading = false,
  loadingLabel = "Please wait",
  children,
  onClick,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
    loadingLabel?: string
  }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-loading={loading ? "" : undefined}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={(event) => {
        if (loading) return event.preventDefault()
        onClick?.(event)
      }}
      {...props}
    >
      {loading ? (
        <>
          <Spinner aria-hidden role="presentation" />
          <span className={size?.startsWith("icon") ? "sr-only" : undefined}>
            {loadingLabel}
          </span>
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }

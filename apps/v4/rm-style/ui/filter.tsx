"use client"

// RM Kit Filter is built on the existing Base UI toggle primitive. Keep the toggle foundation clear for agents.
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const filterVariants = cva(
  "group/filter hover:bg-surface-hover hover:text-text-primary focus-visible:ring-primary-focus-ring aria-pressed:bg-surface-active data-[state=on]:bg-surface-active inline-flex items-center justify-center gap-(--spacing-inline-xs) rounded-(--radius-md) font-sans text-(length:--typography-label-md-font-size) font-(--typography-label-md-font-weight) whitespace-nowrap transition-colors outline-none focus-visible:border-ring focus-visible:ring-(length:--spacing-stack-xs) disabled:pointer-events-none disabled:opacity-(--opacity-half) aria-invalid:border-destructive aria-invalid:ring-destructive/[calc(var(--opacity-subtle)*100%)] dark:aria-invalid:ring-destructive/[calc(var(--opacity-medium)*100%)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-(--size-icon-md)",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-muted",
      },
      size: {
        default:
          "h-(--size-control-sm) min-w-(--size-control-sm) px-(--spacing-inset-md) has-data-[icon=inline-end]:pr-(--spacing-inline-sm) has-data-[icon=inline-start]:pl-(--spacing-inline-sm)",
        sm: "h-(--size-control-36) min-w-(--size-control-36) rounded-(--radius-sm) px-(--spacing-inset-md) text-(length:--font-size-xs) has-data-[icon=inline-end]:pr-(--spacing-stack-2xs) has-data-[icon=inline-start]:pl-(--spacing-stack-2xs) [&_svg:not([class*='size-'])]:size-(--size-icon-sm)",
        lg: "h-(--size-control-44) min-w-(--size-control-44) px-(--spacing-inset-md) has-data-[icon=inline-end]:pr-(--spacing-inline-sm) has-data-[icon=inline-start]:pl-(--spacing-inline-sm)",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Filter({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof filterVariants>) {
  return (
    <TogglePrimitive
      data-slot="filter"
      className={cn(filterVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Filter, filterVariants }

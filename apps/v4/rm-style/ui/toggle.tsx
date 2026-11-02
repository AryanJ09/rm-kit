"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-(--spacing-inline-xs) rounded-(--radius-md) text-(length:--font-size-sm) font-(--typography-label-sm-font-weight) whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-ring/[calc(var(--ring-opacity)*100%)] disabled:pointer-events-none disabled:opacity-(--opacity-disabled) aria-invalid:border-destructive aria-invalid:ring-destructive/[calc(var(--opacity-subtle)*100%)] aria-pressed:bg-muted data-[state=on]:bg-muted dark:aria-invalid:ring-destructive/[calc(var(--opacity-medium)*100%)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-(--size-icon-sm)",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-muted",
      },
      size: {
        default:
          "h-(--size-control-32) min-w-(--size-control-32) px-(--spacing-inset-md) has-data-[icon=inline-end]:pr-(--spacing-inline-sm) has-data-[icon=inline-start]:pl-(--spacing-inline-sm)",
        sm: "h-(--size-control-28) min-w-(--size-control-28) rounded-(--radius-xl) px-(--spacing-inset-md) text-(length:--font-size-sm) has-data-[icon=inline-end]:pr-(--spacing-stack-2xs) has-data-[icon=inline-start]:pl-(--spacing-stack-2xs) [&_svg:not([class*='size-'])]:size-(--size-icon-xs)",
        lg: "h-(--size-control-36) min-w-(--size-control-36) px-(--spacing-inset-md) has-data-[icon=inline-end]:pr-(--spacing-inline-sm) has-data-[icon=inline-start]:pl-(--spacing-inline-sm)",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }

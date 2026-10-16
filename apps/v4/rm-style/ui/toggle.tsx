"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Toggle is a pressed or unpressed control. Its look comes only from the kit's chip and field roles.
// Sizes follow the global scale: sm 40, default 48, lg 56.
const toggleVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-(--ds-spacing-6) rounded-(--ds-radius-full) border-(length:--field-border-width) font-sans font-medium whitespace-nowrap transition-colors outline-none select-none hover:border-(--chip-selected-stroke) hover:text-(--chip-selected-text) hover:ring-(length:--field-focus-ring-width) hover:ring-primary-focus-ring focus-visible:ring-(length:--field-focus-ring-width) focus-visible:ring-primary-focus-ring aria-pressed:border-(--chip-selected-stroke) aria-pressed:bg-(--chip-selected-background) aria-pressed:text-(--chip-selected-text) disabled:pointer-events-none disabled:border-(--chip-disabled-stroke) disabled:bg-(--chip-disabled-background) disabled:text-(--chip-disabled-text) [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-transparent bg-transparent text-(--chip-text)",
        outline: "border-(--chip-stroke) bg-(--chip-background) text-(--chip-text)",
      },
      size: {
        sm: "h-(--size-control-sm) px-(--ds-spacing-16) text-(length:--typography-label-md-font-size) [&_svg:not([class*='size-'])]:size-(--size-icon-sm)",
        default: "h-(--size-control-md) px-(--ds-spacing-16) text-(length:--typography-label-md-font-size) [&_svg:not([class*='size-'])]:size-(--size-icon-md)",
        lg: "h-(--size-control-lg) px-(--ds-spacing-24) text-(length:--typography-label-md-font-size) [&_svg:not([class*='size-'])]:size-(--size-icon-lg)",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ToggleProps = TogglePrimitive.Props & VariantProps<typeof toggleVariants>

function Toggle({ className, variant = "default", size = "default", ...props }: ToggleProps) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Toggle, toggleVariants, type ToggleProps }

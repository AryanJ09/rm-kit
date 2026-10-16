"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// A chip is an interactive pill built on the Toggle behaviour (pressed state, keyboard, disabled).
// It follows the global size scale like buttons and fields: sm 40, md 48.
const chipVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-(--ds-spacing-6) rounded-(--ds-radius-full) border-(length:--field-border-width) border-(--chip-stroke) bg-(--chip-background) font-sans font-medium whitespace-nowrap text-(--chip-text) transition-colors outline-none select-none hover:border-(--chip-selected-stroke) hover:text-(--chip-selected-text) hover:ring-(length:--field-focus-ring-width) hover:ring-primary-focus-ring focus-visible:ring-(length:--field-focus-ring-width) focus-visible:ring-primary-focus-ring aria-pressed:border-(--chip-selected-stroke) aria-pressed:bg-(--chip-selected-background) aria-pressed:text-(--chip-selected-text) disabled:pointer-events-none disabled:border-(--chip-disabled-stroke) disabled:bg-(--chip-disabled-background) disabled:text-(--chip-disabled-text) [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      size: {
        sm: "h-(--size-control-sm) px-(--ds-spacing-16) text-(length:--typography-label-md-font-size) [&_svg:not([class*='size-'])]:size-(--size-icon-sm)",
        md: "h-(--size-control-md) px-(--ds-spacing-16) text-(length:--typography-label-md-font-size) [&_svg:not([class*='size-'])]:size-(--size-icon-md)",
      },
    },
    defaultVariants: { size: "sm" },
  }
)

type ChipProps = TogglePrimitive.Props & VariantProps<typeof chipVariants>

function Chip({ className, size = "sm", ...props }: ChipProps) {
  return (
    <TogglePrimitive
      data-slot="chip"
      data-size={size}
      className={cn(chipVariants({ size }), className)}
      {...props}
    />
  )
}

export { Chip, chipVariants, type ChipProps }

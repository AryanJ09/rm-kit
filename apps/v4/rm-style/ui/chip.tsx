"use client"

import { cn } from "cn"

import { Toggle, toggleVariants, type ToggleProps } from "@/rm-style/ui/toggle"

// A Chip is a Toggle in the outline look, with Figma's 12px label. It keeps the Toggle behaviour
// (pressed state, keyboard, disabled) and the global size scale: sm 40, default 48.
type ChipProps = Omit<ToggleProps, "variant" | "size"> & {
  size?: "sm" | "default"
}

function Chip({ className, size = "sm", ...props }: ChipProps) {
  return (
    <Toggle
      data-slot="chip"
      variant="outline"
      size={size}
      className={cn("text-(length:--ds-typography-font-size-12)", className)}
      {...props}
    />
  )
}

export { Chip, toggleVariants as chipVariants, type ChipProps }

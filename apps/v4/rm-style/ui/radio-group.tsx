"use client"

import * as React from "react"
import { cn } from "cn"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

// shadcn RadioGroup structure, restyled from the Figma Radio spec. Value: Unchecked / Checked.
function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-(--ds-spacing-12)", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "group/radio aspect-square size-(--ds-size-icon-20) shrink-0 rounded-(--ds-radius-full) border-(length:--ring-width) border-control-stroke-default bg-background outline-none transition-all focus-visible:border-primary focus-visible:ring-(length:--ds-spacing-4) focus-visible:ring-primary-focus-ring data-[state=checked]:border-primary data-[state=unchecked]:hover:border-primary data-[state=unchecked]:hover:ring-(length:--ds-spacing-4) data-[state=unchecked]:hover:ring-primary-focus-ring disabled:cursor-not-allowed disabled:border-surface-disabled",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <span className="size-(--ds-spacing-8) rounded-(--ds-radius-full) bg-primary group-disabled/radio:bg-surface-disabled" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }

"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "cn"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-(--ds-spacing-8)", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-(--size-icon-md) shrink-0 rounded-full border-(length:--ring-width) border-control-stroke-default outline-none group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-(length:--ds-spacing-4) focus-visible:ring-ring/50 not-data-checked:not-data-disabled:hover:border-primary not-data-disabled:hover:ring-(length:--ds-spacing-4) hover:ring-primary-focus-ring data-disabled:cursor-not-allowed data-disabled:border-surface-disabled aria-invalid:border-destructive aria-invalid:ring-(length:--ds-spacing-4) aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-background group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-(--size-icon-md) items-center justify-center"
      >
        <span className="absolute top-(--ds-spacing-4)/2 left-(--ds-spacing-4)/2 size-(--ds-spacing-8) -translate-x-(--ds-spacing-4)/2 -translate-y-(--ds-spacing-4)/2 rounded-full bg-primary group-data-disabled/radio-group-item:bg-surface-disabled" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }

"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "cn"

// Shared with Questionnaire so a choice indicator is this exact radio, not a copy.
export const radioControlClassName =
  "group/radio-group-item peer relative flex aspect-square size-(--size-icon-md) shrink-0 rounded-(--radius-pill) border-(length:--ring-width) border-control-stroke-default outline-none group-has-[:focus-visible]/field-label:ring-(length:--spacing-none) group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-(--spacing-inline-md) after:-inset-y-(--spacing-inline-sm) focus-visible:border-ring focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring not-data-checked:not-data-disabled:hover:border-primary not-data-disabled:hover:ring-(length:--focus-ring-width) hover:ring-primary-focus-ring data-disabled:cursor-not-allowed data-disabled:border-control-disabled aria-invalid:border-destructive aria-invalid:ring-(length:--ring-width-invalid) aria-invalid:ring-destructive/[calc(var(--opacity-subtle)*100%)] aria-invalid:aria-checked:border-primary dark:bg-input/[calc(var(--opacity-soft)*100%)] dark:aria-invalid:border-destructive/[calc(var(--ring-opacity)*100%)] dark:aria-invalid:ring-destructive/[calc(var(--opacity-medium)*100%)] data-checked:border-primary data-checked:bg-background group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary"
export const radioDotClassName =
  "absolute top-(--size-share-half) left-(--size-share-half) size-(--size-dot-md) -translate-x-(--size-share-half) -translate-y-(--size-share-half) rounded-(--radius-pill) bg-primary group-data-disabled/radio-group-item:bg-control-disabled"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-(--size-share-full) gap-(--spacing-stack-sm)", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(radioControlClassName, className)}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-(--size-icon-md) items-center justify-center"
      >
        <span className={radioDotClassName} />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }

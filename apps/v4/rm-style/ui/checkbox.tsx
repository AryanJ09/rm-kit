"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cn } from "cn"
import { CheckIcon, MinusIcon } from "lucide-react"

// Shared with Questionnaire so a choice indicator is this exact checkbox, not a copy.
export const checkboxControlClassName =
  "group/checkbox peer relative flex size-(--size-icon-md) shrink-0 items-center justify-center rounded-(--radius-sm) border border-border-strong bg-background transition-colors outline-none group-has-[:focus-visible]/field-label:ring-(length:--spacing-none) group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-(--spacing-inline-md) after:-inset-y-(--spacing-inline-sm) focus-visible:border-ring focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring not-data-checked:not-data-indeterminate:not-data-disabled:hover:border-primary not-data-checked:not-data-indeterminate:not-data-disabled:hover:ring-(length:--focus-ring-width) hover:ring-primary-focus-ring data-disabled:cursor-not-allowed data-disabled:border-control-disabled data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-primary-foreground aria-invalid:border-destructive aria-invalid:ring-(length:--ring-width-invalid) aria-invalid:ring-destructive/[calc(var(--opacity-subtle)*100%)] aria-invalid:aria-checked:border-primary dark:bg-input/[calc(var(--opacity-soft)*100%)] dark:aria-invalid:border-destructive/[calc(var(--ring-opacity)*100%)] dark:aria-invalid:ring-destructive/[calc(var(--opacity-medium)*100%)] data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary data-disabled:data-checked:border-control-disabled data-disabled:data-checked:bg-control-disabled data-disabled:data-indeterminate:border-control-disabled data-disabled:data-indeterminate:bg-control-disabled"
export const checkboxIndicatorClassName =
  "grid place-content-center text-current transition-none [&>svg]:size-(--size-icon-sm)"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxControlClassName, className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={checkboxIndicatorClassName}
      >
        <CheckIcon className="group-data-indeterminate/checkbox:hidden" />
        <MinusIcon className="hidden group-data-indeterminate/checkbox:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

"use client"

import * as React from "react"
import { cn } from "cn"
import { CheckIcon, MinusIcon } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

// shadcn Checkbox structure, restyled from the Figma Checkbox spec. Unchecked / Checked / Intrim (indeterminate).
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-(--ds-size-icon-20) shrink-0 rounded-(--radius-sm) border-(length:--border-width-default) border-control-stroke-default bg-background outline-none transition-all focus-visible:border-primary focus-visible:ring-(length:--ds-spacing-4) focus-visible:ring-primary-focus-ring data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=unchecked]:hover:border-primary data-[state=unchecked]:hover:ring-(length:--ds-spacing-4) data-[state=unchecked]:hover:ring-primary-focus-ring disabled:cursor-not-allowed disabled:border-surface-disabled disabled:bg-surface-disabled data-[state=checked]:disabled:border-surface-disabled data-[state=checked]:disabled:bg-surface-disabled data-[state=indeterminate]:disabled:border-surface-disabled data-[state=indeterminate]:disabled:bg-surface-disabled",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        {props.checked === "indeterminate" ? (
          <MinusIcon className="size-(--ds-size-icon-16)" />
        ) : (
          <CheckIcon className="size-(--ds-size-icon-16)" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

"use client"

import * as React from "react"
import { cn } from "cn"
import { Switch as SwitchPrimitive } from "radix-ui"

// shadcn Switch structure, restyled from the Figma Switch spec. Value: Unchecked / Checked.
function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-(--ds-spacing-24) w-(--size-control-md) shrink-0 items-center rounded-(--radius-xl) border-transparent bg-control-stroke-default p-(--ds-spacing-4) outline-none transition-all focus-visible:ring-(length:--ds-spacing-4) focus-visible:ring-primary-focus-ring data-[state=checked]:bg-primary data-[state=unchecked]:hover:ring-(length:--ds-spacing-4) data-[state=unchecked]:hover:ring-primary-focus-ring disabled:cursor-not-allowed disabled:bg-surface-disabled data-[state=checked]:disabled:bg-surface-disabled",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-(--ds-spacing-16) rounded-(--ds-radius-full) bg-background transition-transform data-[state=checked]:translate-x-(--ds-spacing-16) data-[state=unchecked]:translate-x-0"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }

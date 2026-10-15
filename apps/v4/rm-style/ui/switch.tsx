"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "cn"

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none group-has-[:focus-visible]/field-label:border-transparent group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-(length:--ds-spacing-4) focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-(length:--ds-spacing-4) aria-invalid:ring-destructive/20 data-[size=default]:h-(--ds-spacing-24) data-[size=default]:w-(--ds-spacing-40) data-[size=default]:px-(--ds-spacing-2) data-[size=sm]:h-(--ds-spacing-14) data-[size=sm]:w-(--ds-spacing-24) data-[size=sm]:px-(--ds-spacing-2) dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-control-stroke-default dark:data-unchecked:bg-input/80 data-unchecked:not-data-disabled:hover:ring-(length:--ds-spacing-4) hover:ring-primary-focus-ring data-disabled:cursor-not-allowed data-disabled:bg-surface-disabled data-disabled:data-checked:bg-surface-disabled",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-(--ds-size-18) group-data-[size=sm]/switch:size-(--ds-spacing-12) group-data-[size=default]/switch:data-checked:translate-x-(--ds-spacing-16) group-data-[size=sm]/switch:data-checked:translate-x-(--ds-spacing-8) dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }

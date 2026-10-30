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
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none group-has-[:focus-visible]/field-label:border-transparent group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring aria-invalid:border-destructive aria-invalid:ring-(length:--ring-width-invalid) aria-invalid:ring-destructive/[calc(var(--opacity-subtle)*100%)] data-[size=default]:h-(--size-icon-lg) data-[size=default]:w-(--size-40) data-[size=default]:px-(--spacing-stack-3xs) data-[size=sm]:h-(--size-icon-xs) data-[size=sm]:w-(--size-icon-lg) data-[size=sm]:px-(--spacing-stack-3xs) dark:aria-invalid:border-destructive/[calc(var(--opacity-half)*100%)] dark:aria-invalid:ring-destructive/[calc(var(--opacity-medium)*100%)] data-checked:bg-primary data-unchecked:bg-control-stroke-default dark:data-unchecked:bg-input/[calc(var(--opacity-heavy)*100%)] data-unchecked:not-data-disabled:hover:ring-(length:--focus-ring-width) hover:ring-primary-focus-ring data-disabled:cursor-not-allowed data-disabled:border-control-disabled data-disabled:bg-control-disabled data-disabled:data-checked:bg-control-disabled",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-(--size-18) group-data-[size=sm]/switch:size-(--size-icon-3xs) group-data-[size=default]/switch:data-checked:translate-x-(--spacing-inline-lg) group-data-[size=sm]/switch:data-checked:translate-x-(--spacing-inline-sm) dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }

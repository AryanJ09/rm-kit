"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "cn"

function Switch({
  className,
  size = "default",
  startLabel,
  endLabel,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
  /** Label before the switch (the off side), e.g. "Family". With `endLabel` the side that is on turns bold. */
  startLabel?: string
  /** Label after the switch (the on side), e.g. "Individual". */
  endLabel?: string
}) {
  // Tracks the state so the labels can show which side is on, whether the parent controls the switch or not.
  const [inner, setInner] = React.useState(!!defaultChecked)
  const on = checked ?? inner
  const control = (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-(--radius-pill) border border-transparent transition-all outline-none group-has-[:focus-visible]/field-label:border-transparent group-has-[:focus-visible]/field-label:ring-(length:--spacing-none) after:absolute after:-inset-x-(--spacing-inline-md) after:-inset-y-(--spacing-inline-sm) focus-visible:border-ring focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring aria-invalid:border-destructive aria-invalid:ring-(length:--ring-width-invalid) aria-invalid:ring-destructive/[calc(var(--opacity-subtle)*100%)] data-[size=default]:h-(--size-icon-lg) data-[size=default]:w-(--size-40) data-[size=default]:px-(--spacing-stack-3xs) data-[size=sm]:h-(--size-icon-xs) data-[size=sm]:w-(--size-icon-lg) data-[size=sm]:px-(--spacing-stack-3xs) dark:aria-invalid:border-destructive/[calc(var(--opacity-half)*100%)] dark:aria-invalid:ring-destructive/[calc(var(--opacity-medium)*100%)] data-checked:bg-primary data-unchecked:bg-control-stroke-default dark:data-unchecked:bg-input/[calc(var(--opacity-heavy)*100%)] data-unchecked:not-data-disabled:hover:ring-(length:--focus-ring-width) hover:ring-primary-focus-ring data-disabled:cursor-not-allowed data-disabled:border-control-disabled data-disabled:bg-control-disabled data-disabled:data-checked:bg-control-disabled",
        className
      )}
      checked={on}
      onCheckedChange={(value, details) => {
        if (checked === undefined) setInner(value)
        onCheckedChange?.(value, details)
      }}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-(--radius-pill) bg-background ring-(length:--spacing-none) transition-transform group-data-[size=default]/switch:size-(--size-18) group-data-[size=sm]/switch:size-(--size-icon-3xs) group-data-[size=default]/switch:data-checked:translate-x-(--spacing-inline-lg) group-data-[size=sm]/switch:data-checked:translate-x-(--spacing-inline-sm) dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
      />
    </SwitchPrimitive.Root>
  )
  if (!startLabel && !endLabel) return control
  const label = "text-(length:--font-size-xs) text-card-foreground"
  const strong = "font-(--typography-label-strong-font-weight)"
  return (
    <span data-slot="switch-labelled" className="inline-flex items-center gap-(--spacing-inline-sm)">
      {startLabel && <span className={cn(label, !on && strong)}>{startLabel}</span>}
      {control}
      {endLabel && <span className={cn(label, on && strong)}>{endLabel}</span>}
    </span>
  )
}

export { Switch }

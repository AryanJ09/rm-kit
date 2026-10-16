"use client"

import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Toggle, toggleVariants } from "@/rm-style/ui/toggle"

// A set of Toggles. The group passes its size and variant down, so items always match.
type ToggleGroupContextValue = VariantProps<typeof toggleVariants>

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  size: "default",
  variant: "default",
})

type ToggleGroupProps = React.ComponentProps<typeof ToggleGroupPrimitive> &
  ToggleGroupContextValue & {
    spacing?: 0 | 1 | 2 | 3
    orientation?: "horizontal" | "vertical"
  }

// Gap between items, from the spacing scale: 0 none, 1 = 4px, 2 = 8px (default), 3 = 12px.
const gapClass = { 0: "gap-0", 1: "gap-(--ds-spacing-4)", 2: "gap-(--ds-spacing-8)", 3: "gap-(--ds-spacing-12)" } as const

function ToggleGroup({ className, size = "default", variant = "default", spacing = 2, orientation = "horizontal", children, ...props }: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-size={size}
      data-variant={variant}
      className={cn("flex w-full flex-wrap items-center", gapClass[spacing], orientation === "vertical" && "flex-col items-stretch", className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ size, variant }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

function ToggleGroupItem({ className, size, variant, ...props }: React.ComponentProps<typeof Toggle>) {
  const context = React.useContext(ToggleGroupContext)
  return (
    <Toggle
      data-slot="toggle-group-item"
      size={size ?? context.size}
      variant={variant ?? context.variant}
      className={className}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem, type ToggleGroupProps }

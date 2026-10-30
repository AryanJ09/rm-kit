"use client"

// RM Kit Chip Group is built on the existing Base UI toggle-group primitive. Keep the toggle foundation clear for agents.
import * as React from "react"
import { chipVariants } from "./chip"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ChipGroupPrimitive } from "@base-ui/react/toggle-group"
import { type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const ChipGroupContext = React.createContext<
  VariantProps<typeof chipVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }
>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
})

function ChipGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}: ChipGroupPrimitive.Props &
  VariantProps<typeof chipVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }) {
  return (
    <ChipGroupPrimitive
      data-slot="chip-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      className={cn(
        "group/chip-group flex w-fit flex-row flex-wrap items-center gap-(--spacing-stack-2xs) rounded-(--radius-pill) data-vertical:flex-col data-vertical:items-stretch",
        className
      )}
      {...props}
    >
      <ChipGroupContext.Provider
        value={{ variant, size, spacing, orientation }}
      >
        {children}
      </ChipGroupContext.Provider>
    </ChipGroupPrimitive>
  )
}

function ChipGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof chipVariants>) {
  const context = React.useContext(ChipGroupContext)

  return (
    <TogglePrimitive
      data-slot="chip-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        "shrink-0 focus:z-10 focus-visible:z-10",
        chipVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  )
}

export { ChipGroup, ChipGroupItem }

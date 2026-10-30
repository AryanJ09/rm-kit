"use client"

// RM Kit Filter Group is built on the existing Base UI toggle-group primitive. Keep the toggle foundation clear for agents.
import * as React from "react"
import { filterVariants } from "@/rm-style/ui/filter"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as FilterGroupPrimitive } from "@base-ui/react/toggle-group"
import { type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const FilterGroupContext = React.createContext<
  VariantProps<typeof filterVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }
>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
})

function FilterGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}: FilterGroupPrimitive.Props &
  VariantProps<typeof filterVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }) {
  return (
    <FilterGroupPrimitive
      data-slot="filter-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      className={cn(
        "group/filter-group flex w-fit flex-row items-center gap-(--spacing-inline-sm) rounded-(--radius-pill) data-vertical:flex-col data-vertical:items-stretch",
        className
      )}
      {...props}
    >
      <FilterGroupContext.Provider
        value={{ variant, size, spacing, orientation }}
      >
        {children}
      </FilterGroupContext.Provider>
    </FilterGroupPrimitive>
  )
}

function FilterGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof filterVariants>) {
  const context = React.useContext(FilterGroupContext)

  return (
    <TogglePrimitive
      data-slot="filter-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        "shrink-0 focus:z-10 focus-visible:z-10",
        filterVariants({
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

export { FilterGroup, FilterGroupItem }

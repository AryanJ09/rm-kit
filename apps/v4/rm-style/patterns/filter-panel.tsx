"use client"

// Pattern: a composition of kit components (Filter group, Button, Sheet). Patterns may import
// components; components must never import patterns (scripts/audit-tokens.mjs enforces this).
import * as React from "react"
import { cn } from "cn"

import { Button } from "@/rm-style/ui/button"
import { FilterGroup, type FilterGroupProps } from "@/rm-style/patterns/filter-group"
import { useIsDesktop } from "@/rm-style/patterns/use-media-query"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/rm-style/ui/sheet"

// The filter panel is one pattern in two places: a bottom sheet on mobile and a side panel on desktop.
function useFilterSide(): "bottom" | "right" {
  return useIsDesktop() ? "right" : "bottom"
}

type FilterSheetProps = {
  trigger?: string
  title?: string
  description?: string
  groups: FilterGroupProps[]
  resultCount: number
  onReset?: () => void
  onApply?: () => void
  className?: string
}

function FilterSheet({
  trigger = "Filters",
  title = "Filters",
  description = "Narrow the client list.",
  groups,
  resultCount,
  onReset,
  onApply,
  className,
}: FilterSheetProps) {
  const side = useFilterSide()
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="secondary" />}>{trigger}</SheetTrigger>
      <SheetContent
        side={side}
        className={cn("gap-0 p-0 sm:max-w-md", side === "bottom" && "max-h-[85dvh]", className)}
      >
        <SheetHeader className="border-b border-border p-(--ds-spacing-24)">
          <SheetTitle className="text-(length:--ds-typography-font-size-16) font-bold">{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="flex min-h-0 flex-1 flex-col gap-(--ds-spacing-24) overflow-y-auto p-(--ds-spacing-24)">
          {groups.map((group) => (
            <FilterGroup key={group.label} {...group} />
          ))}
        </div>
        <div className="flex items-center justify-between gap-(--ds-spacing-8) border-t border-border p-(--ds-spacing-16)">
          <Button variant="ghost" onClick={onReset}>Reset filters</Button>
          <Button onClick={onApply}>Show {resultCount} results</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Empty state for the panel pattern: shown in place of results when no item matches.
// Figma: Empty filter. It is a state of this pattern, not a separate component.
function FilterEmptyState({
  title = "No clients match these filters",
  description = "Try removing a filter or searching by name or CRN.",
  action,
  className,
}: {
  title?: string
  description?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="filter-empty-state"
      className={cn(
        "flex w-full flex-col gap-(--ds-spacing-12) rounded-(--ds-radius-16) border-(length:--field-border-width) border-(--empty-filter-stroke) bg-background p-(--ds-spacing-24)",
        className
      )}
    >
      <p className="text-(length:--ds-typography-font-size-16) font-bold text-field-label">{title}</p>
      <p className="text-(length:--ds-typography-font-size-11) text-field-label">{description}</p>
      {action ? <div className="pt-(--ds-spacing-12)">{action}</div> : null}
    </div>
  )
}

export { FilterSheet, FilterEmptyState, useFilterSide, type FilterSheetProps }

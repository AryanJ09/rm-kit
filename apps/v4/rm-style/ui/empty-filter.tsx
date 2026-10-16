import * as React from "react"
import { cn } from "cn"

// Shown in place of results when no item matches the applied filters. Figma: Empty filter.
type EmptyFilterProps = {
  title?: string
  description?: string
  action?: React.ReactNode
  className?: string
}

function EmptyFilter({
  title = "No clients match these filters",
  description = "Try removing a filter or searching by name or CRN.",
  action,
  className,
}: EmptyFilterProps) {
  return (
    <div
      data-slot="empty-filter"
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

export { EmptyFilter, type EmptyFilterProps }

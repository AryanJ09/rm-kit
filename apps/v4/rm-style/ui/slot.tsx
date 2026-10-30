// RM Kit Slot: a purple marker that names where content goes in a host component (Card, Application shell...).
// Empty it is a dashed placeholder showing the slot name; with children it outlines them and tags the name on top.
// Purple is the only purple role in the semantic layer (the conservative category pair), so the slot borrows it.
import * as React from "react"
import { cn } from "cn"

function Slot({
  name,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & { name: string; children?: React.ReactNode }) {
  return (
    <div
      data-slot="slot"
      className={cn(
        "relative min-w-0 rounded-(--radius-sm) border-(length:--border-width-default) border-dashed border-(color:--category-conservative-text) bg-(color:--category-conservative-surface)",
        children ? "p-(--spacing-inset-sm) pt-(--spacing-stack-lg)" : "flex items-center justify-center p-(--spacing-inset-sm)",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "text-(length:--font-size-xs) font-(--typography-title-sm-font-weight) text-(color:--category-conservative-text)",
          children && "absolute top-(--spacing-stack-3xs) left-(--spacing-inline-sm)"
        )}
      >
        {name}
      </span>
      {children}
    </div>
  )
}

export { Slot }

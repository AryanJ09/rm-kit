// RM Kit Section header, from Figma "Section header": the small uppercase title above a list or group on a screen, with an
// optional trailing action ("View all"). Note: it is a plain title row, so a screen that needs nothing more than a title can
// use a heading instead; use this one when the action or the shared spacing is wanted.
import * as React from "react"
import { cn } from "cn"

type SectionHeaderProps = Omit<React.ComponentProps<"div">, "title"> & {
  title: React.ReactNode
  /** Trailing action label, e.g. "View all". The action shows only when this is set. */
  actionLabel?: string
  onAction?: () => void
}

function SectionHeader({ title, actionLabel, onAction, className, ...props }: SectionHeaderProps) {
  return (
    <div
      data-slot="section-header"
      className={cn("flex h-(--size-control-md) w-full items-center justify-between", className)}
      {...props}
    >
      <h2 className="text-(length:--font-size-xs) font-(--typography-label-sm-font-weight) tracking-(--letter-spacing-widest) text-muted-foreground uppercase">
        {title}
      </h2>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="rounded-(--radius-sm) text-(length:--font-size-xs) font-(--typography-label-sm-font-weight) text-destructive outline-none focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export { SectionHeader, type SectionHeaderProps }

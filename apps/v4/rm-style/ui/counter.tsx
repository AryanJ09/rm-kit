// RM Kit Counter: a small number on a corner or beside a label (the filter button with one filter on, the Tasks count in
// the menu, the cues count on a group). It is a number only; a label, icon or action belongs to the control it sits on.
// Tones use the semantic roles: `muted` (grey, the default), `default` (ink on light), `alert` (the red of an unread or overdue count).
// Counts above `max` read as "max+" (e.g. 99+). A count of zero hides the counter unless `showZero` is set.
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const counterVariants = cva(
  "inline-flex min-w-(--size-icon-md) items-center justify-center rounded-(--radius-pill) px-(--spacing-stack-2xs) text-(length:--font-size-xs) font-(--typography-label-strong-font-weight) tabular-nums select-none",
  {
    variants: {
      tone: {
        default: "bg-foreground text-background",
        alert: "bg-destructive text-destructive-foreground",
        muted: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { tone: "muted" },
  }
)

type CounterProps = Omit<React.ComponentProps<"span">, "children"> &
  VariantProps<typeof counterVariants> & {
    count: number
    /** Counts above this read as "max+". */
    max?: number
    /** Show "0" instead of hiding the counter. */
    showZero?: boolean
  }

function Counter({ count, max = 99, showZero = false, tone, className, ...props }: CounterProps) {
  if (count <= 0 && !showZero) return null
  return (
    <span data-slot="counter" data-tone={tone ?? "muted"} className={cn(counterVariants({ tone }), className)} {...props}>
      {count > max ? `${max}+` : count}
    </span>
  )
}

export { Counter, counterVariants, type CounterProps }

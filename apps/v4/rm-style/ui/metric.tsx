// RM Kit Metric: label, big value and a trend line with an
// icon, the change and its period. Standalone; it also fits inside a Card as a nested tile.
import * as React from "react"
import { MinusIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import { cn } from "cn"

const trendIcon = { up: TrendingUpIcon, down: TrendingDownIcon, neutral: MinusIcon }
// Positive and negative use the success and aggressive text roles; neutral stays grey.
const trendColor = {
  up: "text-(color:--category-success-text)",
  down: "text-(color:--category-aggressive-text)",
  neutral: "text-muted-foreground",
}

function Metric({
  label,
  value,
  trend = "neutral",
  change,
  period,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  label: React.ReactNode
  value: React.ReactNode
  trend?: "up" | "down" | "neutral"
  /** The change, e.g. "+3.3%". A dash is shown for neutral when empty. */
  change?: React.ReactNode
  /** What the change is measured over, e.g. "QoQ Change". */
  period?: React.ReactNode
}) {
  const Icon = trendIcon[trend]
  return (
    <div
      data-slot="metric"
      className={cn(
        "flex min-w-0 flex-col gap-(--spacing-stack-2xs) rounded-(--radius-md) bg-surface-hover p-(--spacing-stack-md)",
        className
      )}
      {...props}
    >
      <span className="text-(length:--font-size-xs) text-muted-foreground">{label}</span>
      <span className="text-(length:--typography-heading-lg-font-size) leading-(--typography-heading-lg-line-height) font-(--typography-heading-md-font-weight) text-foreground">
        {value}
      </span>
      <div className="flex items-center gap-(--spacing-inline-xs) text-(length:--font-size-xs)">
        <Icon className={cn("size-(--size-icon-sm) shrink-0", trendColor[trend])} />
        <span className={cn("font-(--typography-title-sm-font-weight)", trendColor[trend])}>{change ?? "—"}</span>
        {period && <span className="text-muted-foreground">{period}</span>}
      </div>
    </div>
  )
}

export { Metric }

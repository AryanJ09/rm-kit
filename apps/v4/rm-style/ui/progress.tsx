"use client"

import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import * as React from "react"
import { cn } from "cn"

// A flag over the track that marks a position on it (a target, a cap). `value` is where it sits, 0 to 100, on the same scale
// as the bar. The flag shows `label` and, on a second line, `detail`; `tone` picks the dark (default) or the brand flag.
// A flag near an end of the track is anchored to that end so it stays inside the bar.
type ProgressMarker = { value: number; label: string; detail?: string; tone?: "default" | "accent" }

const markerTone = {
  default: { flag: "bg-foreground", stem: "bg-foreground" },
  accent: { flag: "bg-primary-pressed", stem: "bg-primary-pressed" },
} as const

/**
 * A progress bar. `size` "sm" is the thin line; "lg" is a tall bar that can carry `valueLabel` inside the fill (for example
 * "Achieved: 64%"). `tone` colours the fill. `markers` put flags over the track, such as a target and a cap.
 */
function Progress({
  className,
  children,
  value,
  size = "sm",
  tone = "primary",
  valueLabel,
  markers,
  ...props
}: ProgressPrimitive.Root.Props & {
  size?: "sm" | "lg"
  tone?: "primary" | "secure" | "deep"
  valueLabel?: React.ReactNode
  markers?: ProgressMarker[]
}) {
  const hasMarkers = !!markers && markers.length > 0
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      data-size={size}
      className={cn(
        "flex flex-wrap gap-(--spacing-inline-md)",
        hasMarkers && "relative pt-(--size-control-44)",
        className
      )}
      {...props}
    >
      {children}
      <ProgressTrack size={size}>
        <ProgressIndicator tone={tone} size={size}>
          {valueLabel && (
            <span className="flex h-(--size-share-full) items-center justify-end px-(--spacing-inline-sm) text-(length:--font-size-sm) font-(--typography-label-strong-font-weight) whitespace-nowrap text-primary-foreground">
              {valueLabel}
            </span>
          )}
        </ProgressIndicator>
      </ProgressTrack>
      {hasMarkers &&
        markers.map((m) => {
          const edge = m.value > 85 ? "end" : m.value < 15 ? "start" : "center"
          return (
          <span
            key={`${m.label}-${m.value}`}
            data-slot="progress-marker"
            style={{ left: `${m.value}%` }}
            className={cn(
              "pointer-events-none absolute top-(--spacing-none) z-(--z-index-base) flex flex-col",
              edge === "center" && "-translate-x-(--size-share-half) items-center",
              edge === "end" && "-translate-x-(--size-share-full) items-end",
              edge === "start" && "items-start"
            )}
          >
            <span
              className={cn(
                "rounded-(--radius-sm) px-(--spacing-inline-xs) py-(--spacing-stack-3xs) text-(length:--font-size-xs) leading-(--line-height-xs) font-(--typography-label-md-font-weight) whitespace-nowrap text-primary-foreground shadow-(--elevation-popover)",
                markerTone[m.tone ?? "default"].flag
              )}
            >
              <span className="block text-center">{m.label}</span>
              {m.detail && <span className="block text-center">{m.detail}</span>}
            </span>
            <span aria-hidden className={cn("h-(--spacing-inline-sm) w-(--border-width-default)", markerTone[m.tone ?? "default"].stem)} />
          </span>
          )
        })}
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({ className, size = "sm", ...props }: ProgressPrimitive.Track.Props & { size?: "sm" | "lg" }) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "relative flex w-(--size-share-full) items-center overflow-x-hidden bg-muted",
        size === "lg" ? "h-(--size-control-32) rounded-(--radius-md)" : "h-(--spacing-inline-xs) rounded-(--radius-pill)",
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  tone = "primary",
  size = "sm",
  ...props
}: ProgressPrimitive.Indicator.Props & { tone?: "primary" | "secure" | "deep"; size?: "sm" | "lg" }) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        "h-(--size-share-full) overflow-hidden transition-all",
        size === "lg" ? "rounded-(--radius-md)" : "rounded-(--radius-pill)",
        // deep: the prototype's navy goal bars, nearest role is the chart navy-blue
        tone === "secure" ? "bg-(color:--category-secure-text)" : tone === "deep" ? "bg-(color:--chart-6)" : "bg-primary",
        className
      )}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn("text-(length:--font-size-sm) font-(--typography-label-sm-font-weight)", className)}
      data-slot="progress-label"
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "ml-auto text-(length:--font-size-sm) text-muted-foreground tabular-nums",
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}

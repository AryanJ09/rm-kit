"use client"

// RM Kit Steps: a vertical list of steps taken in order (the stages a record moves through). Each step is a row with a round
// indicator, a title and a line of text. Its state sets the look: `done` (a check, white row), `active` (its number, a tinted
// row with a brand border; the only one that can be opened) and `locked` (a lock, a grey row, shows why it is locked).
import * as React from "react"
import { CheckIcon, LockIcon } from "lucide-react"
import { cn } from "cn"

type StepState = "done" | "active" | "locked"
type StepItem = {
  id: string
  title: string
  description?: string
  state: StepState
  /** Shown instead of the description while the step is locked, e.g. what to finish first. */
  lockedHint?: string
}

const row = {
  done: "border-border bg-card",
  active: "cursor-pointer border-primary bg-primary-subtle",
  locked: "border-border bg-surface-hover",
} as const

const indicator = {
  done: "bg-(color:--category-success-surface) text-(color:--category-success-text)",
  active: "bg-primary text-primary-foreground",
  locked: "bg-muted text-muted-foreground",
} as const

type StepsProps = Omit<React.ComponentProps<"ol">, "children"> & {
  steps: StepItem[]
  /** Called with the step id when the active step is tapped. */
  onOpen?: (id: string) => void
}

function Steps({ steps, onOpen, className, ...props }: StepsProps) {
  return (
    <ol data-slot="steps" className={cn("flex flex-col gap-(--spacing-inline-sm)", className)} {...props}>
      {steps.map((step, index) => (
        <li key={step.id}>
          <button
            type="button"
            data-slot="step"
            data-state={step.state}
            disabled={step.state !== "active"}
            onClick={step.state === "active" ? () => onOpen?.(step.id) : undefined}
            aria-current={step.state === "active" ? "step" : undefined}
            className={cn(
              "flex w-(--size-share-full) items-center gap-(--spacing-inline-md) rounded-(--radius-lg) border-(length:--border-width-default) px-(--spacing-inline-md) py-(--spacing-inline-md) text-left outline-none focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring disabled:cursor-default",
              row[step.state]
            )}
          >
            <span
              aria-hidden
              className={cn(
                "flex size-(--size-icon-lg) shrink-0 items-center justify-center rounded-(--radius-pill) text-(length:--font-size-xs) font-(--typography-label-strong-font-weight) [&_svg]:size-(--size-icon-sm)",
                indicator[step.state]
              )}
            >
              {step.state === "done" ? <CheckIcon /> : step.state === "locked" ? <LockIcon /> : index + 1}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-(--spacing-stack-3xs)">
              <span className="text-(length:--font-size-sm) font-(--typography-label-md-font-weight) text-foreground">{step.title}</span>
              {(step.state === "locked" ? step.lockedHint ?? step.description : step.description) && (
                <span className="text-(length:--font-size-xs) text-muted-foreground">
                  {step.state === "locked" ? step.lockedHint ?? step.description : step.description}
                </span>
              )}
            </span>
          </button>
        </li>
      ))}
    </ol>
  )
}

export { Steps, type StepsProps, type StepItem, type StepState }

import * as React from "react"
import { cn } from "cn"

export type FieldState = "default" | "success" | "error"

// Label above, helper below. The one wrapper every form input uses (Input, Textarea, Search, Dropdown, Date picker),
// so a label and a helper look and colour the same everywhere.
export function FieldShell({
  label,
  helper,
  state = "default",
  children,
}: {
  label?: string
  helper?: string
  state?: FieldState
  children: React.ReactNode
}) {
  const helperColor =
    state === "error"
      ? "text-field-error"
      : state === "success"
        ? "text-field-success"
        : "text-field-helper"

  return (
    <div className="flex w-full min-w-0 flex-col gap-(--spacing-stack-2xs)">
      {label ? <span className="text-(length:--font-size-xs) font-(--typography-label-sm-font-weight) text-(color:--field-label)">{label}</span> : null}
      {children}
      {helper ? (
        <span className={cn("text-(length:--font-size-helper)", helperColor)}>{helper}</span>
      ) : null}
    </div>
  )
}


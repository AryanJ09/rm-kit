"use client"

// RM Kit AI suggestion, from Figma "Ai suggestions" and the prototype. One component for everything the AI offers, in three
// shapes that share one look (a brand-to-accent gradient surface):
//   note  a sentence the AI wrote, with a sparkle icon (what was an alert or a note)
//   pill  a short tappable suggestion (the link chips under a profile)
//   row   a full-width action row with a star and a chevron (the first row of an action list)
// Colours are semantic roles only: the gradient runs from --primary-subtle to --accent-subtle, the sparkle uses --icon-accent.
import * as React from "react"
import { ChevronRightIcon, SparklesIcon, StarIcon } from "lucide-react"
import { cn } from "cn"

const surface = "bg-linear-to-r from-primary-subtle from-21% to-(--accent-subtle) to-94%"
const focus =
  "outline-none focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring"

type AiSuggestionProps = {
  variant?: "note" | "pill" | "row"
  children: React.ReactNode
  /** pill and row: makes it tappable. A note is not interactive. */
  onClick?: () => void
  /** Replaces the default icon (sparkles on a note, star on a row). Pills have no icon unless one is given. */
  icon?: React.ReactNode
}

function AiSuggestion({ variant = "note", children, onClick, icon }: AiSuggestionProps) {
  if (variant === "note") {
    return (
      <div
        data-slot="ai-suggestion"
        data-variant="note"
        role="status"
        className={cn(
          "flex w-(--size-share-full) items-center gap-(--spacing-inline-sm) rounded-(--radius-md) text-left px-(--spacing-inline-md) py-(--spacing-inline-sm) text-(length:--font-size-sm) text-foreground",
          surface
        )}
      >
        <span aria-hidden className="flex size-(--size-icon-lg) shrink-0 items-center justify-center text-icon-accent [&_svg]:size-(--size-icon-md)">
          {icon ?? <SparklesIcon />}
        </span>
        <span className="min-w-0 flex-1">{children}</span>
      </div>
    )
  }

  if (variant === "pill") {
    const pill = cn(
      "inline-flex items-center justify-start gap-(--spacing-stack-2xs) rounded-(--radius-pill) text-left border-(length:--border-width-hairline) border-primary px-(--spacing-inline-md) py-(--spacing-inline-sm) text-(length:--font-size-sm) text-foreground [&_svg]:size-(--size-icon-sm)",
      surface
    )
    return onClick ? (
      <button data-slot="ai-suggestion" data-variant="pill" type="button" onClick={onClick} className={cn(pill, "cursor-pointer hover:brightness-95 active:brightness-90", focus)}>
        {icon}
        {children}
      </button>
    ) : (
      <span data-slot="ai-suggestion" data-variant="pill" className={pill}>
        {icon}
        {children}
      </span>
    )
  }

  const row = cn(
    "flex w-(--size-share-full) items-center justify-start gap-(--spacing-inline-md) rounded-(--radius-md) px-(--spacing-inline-md) py-(--spacing-inline-md) text-left text-(length:--font-size-sm) font-(--typography-label-md-font-weight) text-primary [&_svg]:size-(--size-icon-sm)",
    surface
  )
  const content = (
    <>
      <span aria-hidden className="flex shrink-0 items-center">
        {icon ?? <StarIcon />}
      </span>
      <span className="min-w-0 flex-1">{children}</span>
      <ChevronRightIcon aria-hidden className="text-icon-default" />
    </>
  )
  return onClick ? (
    <button data-slot="ai-suggestion" data-variant="row" type="button" onClick={onClick} className={cn(row, "cursor-pointer hover:brightness-95 active:brightness-90", focus)}>
      {content}
    </button>
  ) : (
    <div data-slot="ai-suggestion" data-variant="row" className={row}>
      {content}
    </div>
  )
}

export { AiSuggestion, type AiSuggestionProps }

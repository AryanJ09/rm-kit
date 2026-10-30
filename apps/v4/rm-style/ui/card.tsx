"use client"

// RM Kit Card, from Figma "Cards". A host: it owns the shell (surface, radius, hairline, padding) and the states, and the
// content is composed from slots. The patterns in Figma (meeting, holding summary, cue row...) are recipes made of these
// slots, not separate components. Width comes from the parent, so a card fits a column, an accordion or the application shell.
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Skeleton } from "@/rm-style/ui/skeleton"

// Shared with the card variant of Accordion so there is one card look.
export const cardVariants = cva(
  "group/card relative flex min-w-0 flex-col rounded-(--radius-2xl) border border-border text-card-foreground transition-colors outline-none",
  {
    variants: {
      tone: {
        default: "bg-card",
        // Mandatory cue in Figma: nearest tinted role is the info surface.
        info: "bg-(color:--category-moderate-surface)",
        // Dark translucent tile on the hero band (Figma: black at a low opacity, white text, 8px radius).
        inverse:
          "rounded-(--radius-md) border-transparent bg-foreground/[calc(var(--opacity-subtle)*100%)] text-primary-foreground",
      },
      // Raised cards (task) carry the xl elevation instead of the hairline.
      elevated: {
        true: "border-transparent shadow-(--elevation-scale-xl)",
        false: "",
      },
      density: {
        default: "gap-(--spacing-inline-md) p-(--spacing-stack-md)",
        compact: "gap-(--spacing-inline-md) p-(--spacing-inset-sm)",
      },
    },
    defaultVariants: { tone: "default", density: "default", elevated: false },
  }
)

// Hover, press, focus, selected and disabled. Only added when the card is a click target.
// Disabled: the whole card, content and inner controls, goes grey and stops responding (inert), clickable or not.
export const cardDisabledClass = "bg-surface-disabled *:opacity-(--opacity-disabled)"

export const cardInteractiveClass =
  "cursor-pointer not-data-selected:not-data-disabled:hover:bg-surface-hover not-data-selected:not-data-disabled:active:bg-(color:--accent-subtle) focus-visible:border-ring focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring data-selected:border-primary data-selected:bg-primary-subtle data-disabled:cursor-not-allowed"

// A click on an inner control belongs to that control, never to the card.
const innerControl =
  "a,button,input,select,textarea,label,[role=button],[role=checkbox],[role=radio],[role=switch],[role=tab],[role=menuitem],[data-card-control]"

// The shell is locked: no className or style, so no card can drift from the standard. Layout (width, grid) belongs to the parent.
type CardProps = Omit<React.ComponentProps<"div">, "onClick" | "className" | "style"> &
  Omit<VariantProps<typeof cardVariants>, "elevated"> & {
    /** Raised card (the task card): shadow instead of a hairline. */
    elevated?: boolean
    /** Makes the whole card one click target. Inner controls stay the only click target inside them. */
    onClick?: (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void
    /** Single selection. For several cards, put a Checkbox or Radio in the header instead. */
    selected?: boolean
    disabled?: boolean
  }

function Card({ tone, density, elevated, onClick, selected, disabled, onKeyDown, ...props }: CardProps) {
  const interactive = !!onClick
  const fromInnerControl = (target: EventTarget, host: HTMLElement) => {
    const hit = (target as HTMLElement).closest(innerControl)
    return !!hit && hit !== host
  }
  return (
    <div
      data-slot="card"
      data-tone={tone ?? "default"}
      data-selected={selected ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive && !disabled ? 0 : undefined}
      aria-pressed={interactive && selected !== undefined ? selected : undefined}
      aria-disabled={disabled || undefined}
      onClick={
        interactive
          ? (event) => {
              if (disabled || fromInnerControl(event.target, event.currentTarget)) return
              onClick(event)
            }
          : undefined
      }
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (!interactive || disabled || event.defaultPrevented) return
        if (fromInnerControl(event.target, event.currentTarget)) return
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onClick(event)
        }
      }}
      className={cn(cardVariants({ tone, density, elevated }), interactive && cardInteractiveClass, disabled && cardDisabledClass)}
      inert={disabled || undefined}
      {...props}
    />
  )
}

// Leading element, title and subtitle, trailing element. Wraps when the card is narrow.
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex min-w-0 flex-wrap items-center gap-(--spacing-inline-sm)", className)}
      {...props}
    />
  )
}

function CardLeading({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-leading" className={cn("flex shrink-0 items-center", className)} {...props} />
}

function CardTitleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-title-group" className={cn("flex min-w-0 flex-1 flex-col", className)} {...props} />
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-(length:--font-size-sm) font-(--typography-heading-md-font-weight) text-card-foreground",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-(length:--font-size-xs) text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardTrailing({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-trailing" className={cn("flex shrink-0 items-center gap-(--spacing-inline-sm)", className)} {...props} />
}

// Body holds anything: key-value lines, a metric, a table, other cards. `loading` swaps it for the skeleton lines.
function CardBody({
  className,
  children,
  loading = false,
  ...props
}: React.ComponentProps<"div"> & { loading?: boolean }) {
  return (
    <div
      data-slot="card-body"
      className={cn("flex min-w-0 flex-col gap-(--spacing-inline-md)", className)}
      {...props}
    >
      {loading ? (
        <div data-slot="card-skeleton" className="flex flex-col gap-(--spacing-inline-md)" aria-label="Loading">
          <Skeleton className="h-(--size-skeleton-line-height) w-full" />
          <Skeleton className="h-(--size-skeleton-line-height) w-full" />
          <Skeleton className="h-(--size-skeleton-line-height) w-(--size-skeleton-line-width)" />
        </div>
      ) : (
        children
      )}
    </div>
  )
}

// "Label   value" line from Figma.
function CardKeyValue({
  label,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & { label: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div
      data-slot="card-key-value"
      className={cn("flex min-w-0 gap-(--spacing-inline-lg) text-(length:--font-size-xs)", className)}
      {...props}
    >
      <span className="shrink-0 text-muted-foreground">{label}</span>
      {/* Missing content shows a dash, never an empty gap. */}
      <span className="min-w-0 text-card-foreground">{children ?? "—"}</span>
    </div>
  )
}

// Actions. Only rendered when given. Primary action goes last. Wraps when the card is narrow.
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex flex-wrap items-center justify-end gap-(--spacing-inline-sm)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardLeading,
  CardTitleGroup,
  CardTitle,
  CardDescription,
  CardTrailing,
  CardBody,
  CardKeyValue,
  CardFooter,
}

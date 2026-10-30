"use client"

// RM Kit Shell header, from Figma "Shell header": the top bar of the mobile application shell. Four contexts:
// - home (default): a red gradient bar with the user's avatar, a greeting, a notifications button and the menu button (hamburger).
// - inside-page: a white bar with a back arrow and a bold page title.
// - client-detail: the same bar with a regular line (name and reference).
// - inside-page-description: back arrow, title, a trailing plus action and a grey description line below.
import * as React from "react"
import { BellIcon, ChevronLeftIcon, MenuIcon, PlusIcon } from "lucide-react"
import { cn } from "cn"

import { Avatar, AvatarFallback } from "../avatar"

// Icon button: transparent, round, control-sized, white icon. Figma defines no other state.
const iconButtonClass =
  "inline-flex size-(--size-control-md) shrink-0 items-center justify-center rounded-(--radius-pill) text-primary-foreground outline-none focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring [&_svg]:size-(--size-icon-lg)"

type HomeHeaderProps = Omit<React.ComponentProps<"header">, "children"> & {
  /** The gradient bar of the home screen. */
  context?: "home"
  /** Greeting line, e.g. "Hi Lakshmesh". */
  greeting: React.ReactNode
  /** Initials in the avatar. */
  initials: string
  onNotificationsClick?: () => void
  /** Opens the sidebar menu. */
  onMenuClick?: () => void
  /** No gradient of its own: the shell draws one gradient behind the header and the hero. */
  transparent?: boolean
}

type InsideHeaderProps = Omit<React.ComponentProps<"header">, "children" | "title"> & {
  context: "inside-page" | "client-detail" | "inside-page-description"
  /** Page title, or for client-detail the client line ("Jayanti Raj . 45495722"). */
  title: React.ReactNode
  /** inside-page-description only: grey line under the title. */
  description?: React.ReactNode
  /** Clock text shown at the top right, as in the Figma bar. Omit to hide the row. */
  time?: string
  onBack?: () => void
  /** inside-page-description only: the plus action at the end of the title row. */
  onAction?: () => void
  actionLabel?: string
}

type ShellHeaderProps = HomeHeaderProps | InsideHeaderProps

function HomeShellHeader({
  greeting,
  initials,
  onNotificationsClick,
  onMenuClick,
  transparent = false,
  className,
  ...props
}: Omit<HomeHeaderProps, "context">) {
  return (
    <header
      data-slot="shell-header"
      className={cn(
        // Gradient: the error red into the brand accent (Figma #EC1E30 to #F54B61; the end has no exact role, see the hand-over note).
        "flex h-(--size-60) w-full items-center gap-(--spacing-inline-sm) pr-(--spacing-inline-sm) pl-(--spacing-group)",
        !transparent && "bg-linear-to-r from-error to-icon-accent",
        className
      )}
      {...props}
    >
      <Avatar>
        <AvatarFallback className="bg-foreground text-primary-foreground">{initials}</AvatarFallback>
      </Avatar>
      <span className="min-w-0 flex-1 truncate text-(length:--typography-title-md-font-size) leading-(--typography-title-md-line-height) font-(--typography-title-md-font-weight) text-primary-foreground">
        {greeting}
      </span>
      <button type="button" aria-label="Notifications" className={iconButtonClass} onClick={onNotificationsClick}>
        <BellIcon />
      </button>
      <button type="button" aria-label="Menu" className={iconButtonClass} onClick={onMenuClick}>
        <MenuIcon />
      </button>
    </header>
  )
}

// White bar for pages inside the app: back arrow, title, and in one context a plus action and a description.
function InsidePageHeader({
  context,
  title,
  description,
  time,
  onBack,
  onAction,
  actionLabel = "Add",
  className,
  ...props
}: InsideHeaderProps) {
  const bold = context === "inside-page"
  return (
    <header
      data-slot="shell-header"
      data-context={context}
      className={cn(
        "flex w-full flex-col gap-(--spacing-inline-md) rounded-(--radius-2xl) border-(length:--border-width-default) border-border bg-card p-(--spacing-inline-md) text-card-foreground",
        className
      )}
      {...props}
    >
      {time && <div className="flex justify-end text-(length:--font-size-xs)">{time}</div>}
      <div className="flex items-center gap-(--spacing-inline-md)">
        <button
          type="button"
          aria-label="Back"
          onClick={onBack}
          className="inline-flex shrink-0 items-center rounded-(--radius-sm) text-icon-accent outline-none focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring [&_svg]:size-(--size-icon-md)"
        >
          <ChevronLeftIcon />
        </button>
        <span
          className={cn(
            "min-w-0 flex-1 truncate",
            bold
              ? "text-(length:--font-size-base) leading-(--line-height-base) font-(--typography-heading-md-font-weight)"
              : "text-(length:--font-size-sm) leading-(--line-height-sm)"
          )}
        >
          {title}
        </span>
        {context === "inside-page-description" && (
          <button
            type="button"
            aria-label={actionLabel}
            onClick={onAction}
            className="inline-flex shrink-0 items-center rounded-(--radius-sm) text-primary outline-none focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring [&_svg]:size-(--size-icon-md)"
          >
            <PlusIcon />
          </button>
        )}
      </div>
      {context === "inside-page-description" && description && (
        <div className="text-(length:--font-size-xs) text-muted-foreground">{description}</div>
      )}
    </header>
  )
}

const isInside = (props: ShellHeaderProps): props is InsideHeaderProps => !!props.context && props.context !== "home"

function ShellHeader(props: ShellHeaderProps) {
  if (isInside(props)) return <InsidePageHeader {...props} />
  const { context: _context, ...home } = props
  return <HomeShellHeader {...home} />
}

export { ShellHeader, type ShellHeaderProps }

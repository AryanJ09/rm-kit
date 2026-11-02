"use client"

// RM Kit Shell header: the top bar of the mobile application shell. Three contexts, named by what they are, not by a screen:
// - home (default): the red gradient bar with the user's avatar, a title (a greeting), a notifications button and the menu
//   button. When the shell scrolls, `collapsed` replaces the title and buttons with compact content (e.g. metric pills).
// - page: a white bar for a main destination: a large title on the left and an optional action on the right, no back arrow.
// - inside: a white bar for a page opened from another: a back chevron, a centred title, an optional description line under
//   it and an optional action (an icon button) at the end.
// Every label and control is a prop, so any product can fill it; nothing here names a page or a record.
import * as React from "react"
import { BellIcon, ChevronLeftIcon, MenuIcon, PlusIcon } from "lucide-react"
import { cn } from "cn"

import { Avatar, AvatarFallback } from "../avatar"

// Icon button on the red bar: transparent, round, control-sized, white icon.
const iconButtonClass =
  "inline-flex size-(--size-control-md) shrink-0 items-center justify-center rounded-(--radius-pill) text-primary-foreground outline-none focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring [&_svg]:size-(--size-icon-lg)"
const focusRing =
  "outline-none focus-visible:ring-(length:--focus-ring-width) focus-visible:ring-primary-focus-ring"

/** An action on a header: its visible or accessible label, an optional icon, and what it does. */
type ShellHeaderAction = {
  label: string
  /** Defaults to a plus. */
  icon?: React.ReactNode
  onClick?: () => void
}

type HomeHeaderProps = Omit<React.ComponentProps<"header">, "children" | "title"> & {
  /** The gradient bar of the home screen. */
  context?: "home"
  /** The line next to the avatar, e.g. a greeting. */
  title: React.ReactNode
  /** Initials in the avatar. */
  initials: string
  onNotificationsClick?: () => void
  /** Opens the sidebar menu. */
  onMenuClick?: () => void
  /** Compact content shown instead of the title and buttons once the page has scrolled (e.g. metric pills). */
  collapsed?: React.ReactNode
  /** No gradient of its own: the shell draws one gradient behind the header and the hero. */
  transparent?: boolean
}

type PageHeaderProps = Omit<React.ComponentProps<"header">, "children" | "title"> & {
  /** A main destination: a large title and an optional action, no back arrow. */
  context: "page"
  title: React.ReactNode
  /** Shown at the end of the title row as text with an icon. */
  action?: ShellHeaderAction
  /** Device clock text shown at the top right. Omit to hide the row. */
  time?: string
}

type InsideHeaderProps = Omit<React.ComponentProps<"header">, "children" | "title"> & {
  /** A page opened from another: back, a centred title, optional description and action. */
  context: "inside"
  title: React.ReactNode
  /** `heading` is bold and larger, `text` is regular and smaller (for a line such as "Name · reference"). */
  titleStyle?: "heading" | "text"
  /** Muted line under the title. */
  description?: React.ReactNode
  onBack?: () => void
  /** An icon button at the end of the title row. */
  action?: ShellHeaderAction
  /** Device clock text shown at the top right. Omit to hide the row. */
  time?: string
}

type ShellHeaderProps = HomeHeaderProps | PageHeaderProps | InsideHeaderProps

function HomeShellHeader({
  title,
  initials,
  onNotificationsClick,
  onMenuClick,
  collapsed,
  transparent = false,
  className,
  ...props
}: Omit<HomeHeaderProps, "context">) {
  return (
    <header
      data-slot="shell-header"
      data-collapsed={collapsed ? "" : undefined}
      className={cn(
        // Gradient: the error red into the brand accent (Figma #EC1E30 to #F54B61; the end has no exact role, see the hand-over note).
        "flex h-(--size-60) w-(--size-share-full) items-center gap-(--spacing-inline-sm) pr-(--spacing-inline-sm) pl-(--spacing-group)",
        !transparent && "bg-linear-to-r from-error to-icon-accent",
        className
      )}
      {...props}
    >
      <Avatar>
        <AvatarFallback className="bg-foreground text-primary-foreground">{initials}</AvatarFallback>
      </Avatar>
      {collapsed ? (
        <div className="flex min-w-0 flex-1 items-center justify-end gap-(--spacing-inline-sm)">{collapsed}</div>
      ) : (
        <>
          <span className="min-w-0 flex-1 truncate text-(length:--typography-title-md-font-size) leading-(--typography-title-md-line-height) font-(--typography-title-md-font-weight) text-primary-foreground">
            {title}
          </span>
          <button type="button" aria-label="Notifications" className={iconButtonClass} onClick={onNotificationsClick}>
            <BellIcon />
          </button>
          <button type="button" aria-label="Menu" className={iconButtonClass} onClick={onMenuClick}>
            <MenuIcon />
          </button>
        </>
      )}
    </header>
  )
}

const whiteBar =
  "flex w-(--size-share-full) shrink-0 flex-col gap-(--spacing-inline-md) rounded-(--radius-2xl) border-(length:--border-width-default) border-border bg-card p-(--spacing-inline-md) text-card-foreground"

function PageShellHeader({ title, action, time, className, ...props }: Omit<PageHeaderProps, "context">) {
  return (
    <header data-slot="shell-header" data-context="page" className={cn(whiteBar, className)} {...props}>
      {time && <div className="flex justify-end text-(length:--font-size-xs)">{time}</div>}
      <div className="flex items-center justify-between gap-(--spacing-inline-md)">
        <h1 className="min-w-0 truncate text-(length:--font-size-2xl) leading-(--line-height-2xl) font-(--typography-heading-md-font-weight)">
          {title}
        </h1>
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className={cn(
              "inline-flex shrink-0 items-center gap-(--spacing-stack-xs) rounded-(--radius-sm) text-(length:--font-size-sm) font-(--typography-label-md-font-weight) text-primary [&_svg]:size-(--size-icon-sm)",
              focusRing
            )}
          >
            {action.icon ?? <PlusIcon />}
            {action.label}
          </button>
        )}
      </div>
    </header>
  )
}

function InsideShellHeader({
  title,
  titleStyle = "heading",
  description,
  onBack,
  action,
  time,
  className,
  ...props
}: Omit<InsideHeaderProps, "context">) {
  return (
    <header data-slot="shell-header" data-context="inside" className={cn(whiteBar, className)} {...props}>
      {time && <div className="flex justify-end text-(length:--font-size-xs)">{time}</div>}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-(--spacing-inline-md)">
        <button
          type="button"
          aria-label="Back"
          onClick={onBack}
          className={cn("inline-flex w-fit items-center rounded-(--radius-sm) text-icon-accent [&_svg]:size-(--size-icon-md)", focusRing)}
        >
          <ChevronLeftIcon />
        </button>
        <span
          className={cn(
            "min-w-0 truncate text-center",
            titleStyle === "heading"
              ? "text-(length:--font-size-base) leading-(--line-height-base) font-(--typography-heading-md-font-weight)"
              : "text-(length:--font-size-sm) leading-(--line-height-sm)"
          )}
        >
          {title}
        </span>
        {action ? (
          <button
            type="button"
            aria-label={action.label}
            onClick={action.onClick}
            className={cn("inline-flex w-fit items-center justify-self-end rounded-(--radius-sm) text-primary [&_svg]:size-(--size-icon-md)", focusRing)}
          >
            {action.icon ?? <PlusIcon />}
          </button>
        ) : (
          <span aria-hidden />
        )}
      </div>
      {description && <div className="text-center text-(length:--font-size-xs) text-muted-foreground">{description}</div>}
    </header>
  )
}

function ShellHeader(props: ShellHeaderProps) {
  if (props.context === "page") {
    const { context: _c, ...page } = props
    return <PageShellHeader {...page} />
  }
  if (props.context === "inside") {
    const { context: _c, ...inside } = props
    return <InsideShellHeader {...inside} />
  }
  const { context: _c, ...home } = props
  return <HomeShellHeader {...home} />
}

export { ShellHeader, type ShellHeaderAction, type ShellHeaderProps }

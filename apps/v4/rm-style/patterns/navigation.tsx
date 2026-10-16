"use client"

import * as React from "react"
import { ClipboardList, House, Target, Users, type LucideIcon } from "lucide-react"
import { cn } from "cn"

import { BottomNavigationCentralButton } from "@/rm-style/ui/bottom-navigation-central-button"
import { NavigationItem } from "@/rm-style/ui/navigation-item"
import { useIsDesktop } from "@/rm-style/patterns/use-media-query"

// Navigation is a pattern: mobile gets the bottom bar (with the central action), desktop gets a top bar.
// Both share one destination list and one selection model, so the app only handles onValueChange.
type Destination = "Home" | "Leads" | "Clients" | "CRM"

const DESTINATIONS: { value: Destination; icon: LucideIcon }[] = [
  { value: "Home", icon: House },
  { value: "Leads", icon: Target },
  { value: "Clients", icon: Users },
  { value: "CRM", icon: ClipboardList },
]

type SelectionProps = {
  /** Controlled selected destination. Omit to let the navigation keep its own state. */
  value?: Destination
  defaultValue?: Destination
  onValueChange?: (destination: Destination) => void
}

// Selection is shared by both layouts. Clicking the selected item does nothing.
function useSelection({ value, defaultValue = "Home", onValueChange }: SelectionProps) {
  const [inner, setInner] = React.useState<Destination>(defaultValue)
  const current = value ?? inner
  const select = (next: Destination) => {
    if (next === current) return
    if (value === undefined) setInner(next)
    onValueChange?.(next)
  }
  return { current, select }
}

type BottomNavigationProps = Omit<React.ComponentProps<"nav">, "onChange"> &
  SelectionProps & {
    centerState?: "default" | "pressed" | "disabled"
    onCenterClick?: React.MouseEventHandler<HTMLButtonElement>
  }

// Mobile bar. Figma: 430 wide (never wider than the screen), 88 tall: 14px top padding, 74px items.
function BottomNavigation({
  value,
  defaultValue,
  onValueChange,
  centerState = "default",
  onCenterClick,
  className,
  ...props
}: BottomNavigationProps) {
  const { current, select } = useSelection({ value, defaultValue, onValueChange })
  const item = ({ value: destination, icon }: (typeof DESTINATIONS)[number]) => (
    <NavigationItem
      key={destination}
      label={destination}
      icon={icon}
      state={current === destination ? "active" : "inactive"}
      aria-current={current === destination ? "page" : undefined}
      onClick={() => select(destination)}
    />
  )
  return (
    <nav
      data-slot="bottom-navigation"
      aria-label="Primary"
      className={cn(
        "flex w-full max-w-(--ds-size-layout-frame-width) items-start justify-between bg-nav-surface pt-(--ds-spacing-14) shadow-nav",
        className
      )}
      {...props}
    >
      <div className="flex">{DESTINATIONS.slice(0, 2).map(item)}</div>
      <BottomNavigationCentralButton state={centerState} aria-label="Centre action" onClick={onCenterClick} />
      <div className="flex">{DESTINATIONS.slice(2).map(item)}</div>
    </nav>
  )
}

// Desktop bar. Not in Figma yet: same destinations and selection as the mobile bar, laid out as a row
// of labelled tabs with an icon, no central action. Sizes follow the control scale (48 tall).
function TopNavigation({ value, defaultValue, onValueChange, className, ...props }: Omit<React.ComponentProps<"nav">, "onChange"> & SelectionProps) {
  const { current, select } = useSelection({ value, defaultValue, onValueChange })
  return (
    <nav
      data-slot="top-navigation"
      aria-label="Primary"
      className={cn("flex h-(--size-header-height) w-full items-center gap-(--ds-spacing-8) border-b border-border bg-nav-surface px-(--ds-spacing-16)", className)}
      {...props}
    >
      {DESTINATIONS.map(({ value: destination, icon: Icon }) => {
        const active = current === destination
        return (
          <button
            key={destination}
            type="button"
            aria-current={active ? "page" : undefined}
            onClick={() => select(destination)}
            className={cn(
              "inline-flex h-(--size-control-sm) items-center gap-(--ds-spacing-8) rounded-(--ds-radius-full) px-(--ds-spacing-16) text-(length:--typography-label-md-font-size) font-medium transition-colors outline-none focus-visible:ring-(length:--ds-spacing-4) focus-visible:ring-primary-focus-ring [&_svg]:size-(--size-icon-sm)",
              active ? "bg-destructive-subtle text-destructive" : "text-field-helper hover:bg-surface-hover hover:text-field-label"
            )}
          >
            <Icon aria-hidden="true" />
            {destination}
          </button>
        )
      })}
    </nav>
  )
}

// Responsive navigation: the bottom bar on mobile, the top bar on desktop (768px and up).
// The centre action only exists in the bottom bar, so it is only passed there.
type NavigationProps = SelectionProps & {
  centerState?: "default" | "pressed" | "disabled"
  onCenterClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
}

function Navigation({ value, defaultValue, onValueChange, centerState, onCenterClick, className }: NavigationProps) {
  const desktop = useIsDesktop()
  const selection = { value, defaultValue, onValueChange }
  if (desktop) return <TopNavigation className={className} {...selection} />
  return (
    <BottomNavigation
      className={className}
      centerState={centerState}
      onCenterClick={onCenterClick}
      {...selection}
    />
  )
}

export { Navigation, BottomNavigation, TopNavigation, type Destination, type NavigationProps, type BottomNavigationProps }

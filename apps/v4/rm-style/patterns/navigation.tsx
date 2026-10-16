"use client"

import * as React from "react"
import { ClipboardList, House, Menu, Target, Users, type LucideIcon } from "lucide-react"
import { cn } from "cn"

import { BottomNavigationCentralButton } from "@/rm-style/ui/bottom-navigation-central-button"
import { NavigationItem } from "@/rm-style/ui/navigation-item"
import { useIsDesktop } from "@/rm-style/patterns/use-media-query"
import { Button } from "@/rm-style/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/rm-style/ui/sheet"

// Navigation is a pattern: mobile gets the bottom bar (with the central action), desktop gets a menu button.
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

// Desktop: a menu button that opens the destinations in a left side panel. Not in Figma yet: the same
// destinations and selection as the mobile bar, without the central action. Selecting closes the panel.
function HamburgerNavigation({ value, defaultValue, onValueChange }: SelectionProps) {
  const { current, select } = useSelection({ value, defaultValue, onValueChange })
  const [open, setOpen] = React.useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon-md" aria-label="Open navigation" />}>
        <Menu aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="left" className="gap-0 p-0 sm:max-w-xs">
        <SheetHeader className="border-b border-border p-(--ds-spacing-24)">
          <SheetTitle className="text-(length:--ds-typography-font-size-16) font-bold">Menu</SheetTitle>
          <SheetDescription>Go to a section.</SheetDescription>
        </SheetHeader>
        <nav aria-label="Primary" className="flex flex-col gap-(--ds-spacing-4) p-(--ds-spacing-16)">
          {DESTINATIONS.map(({ value: destination, icon: Icon }) => {
            const active = current === destination
            return (
              <button
                key={destination}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => {
                  select(destination)
                  setOpen(false)
                }}
                className={cn(
                  "flex h-(--size-control-md) items-center gap-(--ds-spacing-12) rounded-(--ds-radius-full) px-(--ds-spacing-16) text-(length:--typography-label-md-font-size) font-medium transition-colors outline-none focus-visible:ring-(length:--ds-spacing-4) focus-visible:ring-primary-focus-ring [&_svg]:size-(--size-icon-md)",
                  active ? "bg-destructive-subtle text-destructive" : "text-field-helper hover:bg-surface-hover hover:text-field-label"
                )}
              >
                <Icon aria-hidden="true" />
                {destination}
              </button>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

// Responsive navigation: the bottom bar on mobile, a menu button on desktop (768px and up).
// The centre action only exists in the bottom bar, so it is only passed there.
type NavigationProps = SelectionProps & {
  centerState?: "default" | "pressed" | "disabled"
  onCenterClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
}

function Navigation({ value, defaultValue, onValueChange, centerState, onCenterClick, className }: NavigationProps) {
  const desktop = useIsDesktop()
  const selection = { value, defaultValue, onValueChange }
  if (desktop) return <HamburgerNavigation {...selection} />
  return (
    <BottomNavigation
      className={className}
      centerState={centerState}
      onCenterClick={onCenterClick}
      {...selection}
    />
  )
}

export { Navigation, BottomNavigation, HamburgerNavigation, type Destination, type NavigationProps, type BottomNavigationProps }

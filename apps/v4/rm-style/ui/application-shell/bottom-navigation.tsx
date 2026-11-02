import { useState } from "react"
import { cn } from "cn"
import { ClipboardList, House, Target, Users } from "lucide-react"

import { BottomNavigationCentralButton } from "./bottom-navigation-central-button"
import { NavigationItem } from "./navigation-item"

type Destination = "Home" | "Leads" | "Clients" | "CRM"

const leftItems = [
  { label: "Home", icon: House },
  { label: "Leads", icon: Target },
] as const

const rightItems = [
  { label: "Clients", icon: Users },
  { label: "CRM", icon: ClipboardList },
] as const

type BottomNavigationProps = Omit<React.ComponentProps<"nav">, "onChange"> & {
  /** Controlled active destination. Omit to let the bar keep its own state. */
  active?: Destination
  /** Starting destination when the bar keeps its own state. */
  defaultActive?: Destination
  onActiveChange?: (destination: Destination) => void
  centerState?: "default" | "pressed" | "disabled"
  onCenterClick?: React.MouseEventHandler<HTMLButtonElement>
}

function BottomNavigation({
  active,
  defaultActive = "Home",
  onActiveChange,
  centerState = "default",
  onCenterClick,
  className,
  ...props
}: BottomNavigationProps) {
  const [inner, setInner] = useState<Destination>(defaultActive)
  const current = active ?? inner

  const select = (destination: Destination) => {
    if (active === undefined) setInner(destination)
    onActiveChange?.(destination)
  }
  const stateFor = (label: Destination) =>
    label === current ? "active" : "inactive"

  const renderItem = (
    item: (typeof leftItems)[number] | (typeof rightItems)[number]
  ) => (
    <NavigationItem
      key={item.label}
      label={item.label}
      icon={item.icon}
      state={stateFor(item.label)}
      aria-current={current === item.label ? "page" : undefined}
      onClick={() => select(item.label)}
    />
  )

  return (
    <nav
      data-slot="bottom-navigation"
      aria-label="Primary"
      className={cn(
        "relative isolate flex h-(--size-nav-height) w-(--size-layout-frame-width) items-start justify-between pt-(--spacing-inset-nav)",
        className
      )}
      {...props}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 430 74"
        preserveAspectRatio="none"
        className="fill-nav-surface pointer-events-none absolute inset-x-(--spacing-none) bottom-(--spacing-none) -z-(--z-index-base) h-(--size-nav-surface-height) w-(--size-share-full) drop-shadow-(--elevation-nav)"
      >
        <path d="M411.653 0C421.786 0 430 7.163 430 16V74H0V16C0 7.163 8.214 0 18.347 0H154.035C165.223 0 174.293 7.91 174.293 17.667C174.293 37.181 192.624 53 215 53C237.376 53 255.707 37.181 255.707 17.667C255.707 7.91 264.777 0 275.965 0H411.653Z" />
      </svg>
      <div className="flex">{leftItems.map(renderItem)}</div>
      <BottomNavigationCentralButton
        className="absolute top-(--spacing-none) left-(--size-share-half) -translate-x-(--size-share-half)"
        state={centerState}
        aria-label="Centre action"
        onClick={onCenterClick}
      />
      <div className="flex">{rightItems.map(renderItem)}</div>
    </nav>
  )
}

export { BottomNavigation, type BottomNavigationProps, type Destination }

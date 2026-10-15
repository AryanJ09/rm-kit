import { useState } from "react"
import { ClipboardList, House, Target, Users } from "lucide-react"
import { cn } from "cn"
import { NavigationItem } from "./navigation-item"
import { BottomNavigationCentralButton } from "./bottom-navigation-central-button"

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
  const stateFor = (label: Destination) => (label === current ? "active" : "inactive")

  const renderItem = (item: (typeof leftItems)[number] | (typeof rightItems)[number]) => (
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
        "flex w-(--ds-size-layout-frame-width) items-start justify-between bg-nav-surface pt-(--ds-spacing-14) shadow-nav",
        className
      )}
      {...props}
    >
      <div className="flex">{leftItems.map(renderItem)}</div>
      <BottomNavigationCentralButton
        state={centerState}
        aria-label="Centre action"
        onClick={onCenterClick}
      />
      <div className="flex">{rightItems.map(renderItem)}</div>
    </nav>
  )
}

export { BottomNavigation, type BottomNavigationProps, type Destination }

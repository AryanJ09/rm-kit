import { ClipboardList, House, Target, Users } from "lucide-react"
import { cn } from "cn"
import { NavigationItem } from "./navigation-item"
import { BottomNavigationCentralButton } from "./bottom-navigation-central-button"

const leftItems = [
  { label: "Home", icon: House },
  { label: "Leads", icon: Target },
] as const

const rightItems = [
  { label: "Clients", icon: Users },
  { label: "CRM", icon: ClipboardList },
] as const

type BottomNavigationProps = React.ComponentProps<"nav"> & {
  active: "Home" | "Leads" | "Clients" | "CRM"
  centerState?: "default" | "pressed" | "disabled"
}

function BottomNavigation({
  active,
  centerState = "default",
  className,
  ...props
}: BottomNavigationProps) {
  const stateFor = (label: string) => (label === active ? "active" : "inactive")

  return (
    <nav
      data-slot="bottom-navigation"
      aria-label="Primary"
      className={cn(
        "flex w-(--ds-size-layout-frame-width) items-start justify-between bg-nav-surface pt-(--ds-spacing-12) shadow-nav",
        className
      )}
      {...props}
    >
      <div className="flex">
        {leftItems.map((item) => (
          <NavigationItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            state={stateFor(item.label)}
            aria-current={active === item.label ? "page" : undefined}
          />
        ))}
      </div>
      <BottomNavigationCentralButton state={centerState} aria-label="Centre action" />
      <div className="flex">
        {rightItems.map((item) => (
          <NavigationItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            state={stateFor(item.label)}
            aria-current={active === item.label ? "page" : undefined}
          />
        ))}
      </div>
    </nav>
  )
}

export { BottomNavigation, type BottomNavigationProps }

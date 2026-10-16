import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BottomNavigation, HamburgerNavigation, Navigation, type Destination } from "@/rm-style/patterns/navigation"

// Hand-written: Navigation is a pattern. Mobile shows the bottom bar; desktop shows a menu button.
const meta = {
  title: "RM Kit/Patterns/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Navigation>

export default meta
type Story = StoryObj<typeof meta>

const centerStates = ["default", "pressed", "disabled"] as const

// Mobile bottom bar, each centre-action state (Figma: Bottom navigation).
export const BottomBar: Story = {
  render: () => (
    <div className="flex flex-col gap-(--ds-spacing-16) bg-background p-(--ds-spacing-16)">
      {centerStates.map((state) => (
        <BottomNavigation key={state} defaultValue="Home" centerState={state} />
      ))}
    </div>
  ),
}

// Desktop: a menu button that opens the destinations in a side panel.
export const Menu: Story = {
  render: () => (
    <div className="p-(--ds-spacing-16)">
      <HamburgerNavigation defaultValue="Clients" />
    </div>
  ),
}

// The responsive pattern with real screens: tapping a destination changes the screen.
function ResponsiveExample() {
  const [screen, setScreen] = useState<Destination>("Home")
  const [centreTaps, setCentreTaps] = useState(0)
  return (
    <div className="flex min-h-dvh flex-col bg-background font-sans text-foreground">
      <div className="order-last fixed inset-x-0 bottom-0 z-40 flex justify-center md:static md:order-first md:z-auto md:justify-start md:p-(--ds-spacing-16)">
        <Navigation
          value={screen}
          onValueChange={setScreen}
          onCenterClick={() => setCentreTaps((n) => n + 1)}
        />
      </div>
      <main className="flex flex-1 flex-col gap-(--ds-spacing-8) p-(--ds-spacing-16) pb-(--ds-size-layout-nav-clearance) md:pb-(--ds-spacing-16)">
        <h1 className="text-(length:--ds-typography-font-size-24) font-medium">{screen}</h1>
        <p className="text-(length:--ds-typography-font-size-14) text-text-secondary">
          The {screen} screen. Central action tapped {centreTaps} times.
        </p>
      </main>
    </div>
  )
}

// Mobile: bottom bar at the edge.
export const Mobile: Story = {
  render: () => <ResponsiveExample />,
  globals: { viewport: { value: "mobile1", isRotated: false } },
}

// Desktop: menu button.
export const Desktop: Story = {
  render: () => <ResponsiveExample />,
}

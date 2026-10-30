import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BottomNavigation } from "@/rm-style/ui/application-shell/bottom-navigation"

const meta = {
  title: "RM Kit/Bottom navigation/Bottom navigation",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const centerStates = ["default", "pressed", "disabled"] as const

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex flex-col gap-(--spacing-inline-lg) bg-background p-(--spacing-inline-lg)">
      {centerStates.map((centerState) => (
        <BottomNavigation
          key={centerState}
          defaultActive="Home"
          centerState={centerState}
        />
      ))}
    </div>
  ),
}

// Interactive: the centre button reports taps and shows the pressed colour while held.
function InteractiveCentre() {
  const [taps, setTaps] = useState(0)
  return (
    <div className="flex w-(--size-layout-frame-width) flex-col gap-(--spacing-inline-lg) bg-background p-(--spacing-inline-lg)">
      <p className="text-(length:--font-size-sm) text-text-secondary">Centre button tapped {taps} times</p>
      <BottomNavigation defaultActive="Home" onCenterClick={() => setTaps((n) => n + 1)} />
    </div>
  )
}

export const Interactive: Story = {
  name: "Interactive",
  render: () => <InteractiveCentre />,
}

import type { Meta, StoryObj } from "@storybook/react"
import { BottomNavigation } from "@/rm-style/ui/bottom-navigation"

const meta = {
  title: "RM Kit/Bottom navigation",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const centerStates = ["default", "pressed", "disabled"] as const

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex flex-col gap-(--ds-spacing-16) bg-background p-(--ds-spacing-16)">
      {centerStates.map((centerState) => (
        <BottomNavigation
          key={centerState}
          active="Home"
          centerState={centerState}
        />
      ))}
    </div>
  ),
}

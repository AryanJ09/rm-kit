import type { Meta, StoryObj } from "@storybook/react"
import { ClipboardList, House, Target, Users } from "lucide-react"
import { NavigationItem } from "@/rm-style/ui/navigation-item"

const meta = {
  title: "Components/Navigation item",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { label: "Home", icon: House },
  { label: "Leads", icon: Target },
  { label: "Clients", icon: Users },
  { label: "CRM", icon: ClipboardList },
] as const

const states = ["inactive", "active", "pressed", "disabled"] as const

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex flex-col gap-(--ds-spacing-16) bg-background p-(--ds-spacing-16)">
      {items.map((item) => (
        <div key={item.label} className="flex gap-(--ds-spacing-16)">
          {states.map((state) => (
            <NavigationItem
              key={state}
              label={item.label}
              icon={item.icon}
              state={state}
            />
          ))}
        </div>
      ))}
    </div>
  ),
}

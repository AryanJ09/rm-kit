import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "@/rm-style/ui/badge"

// Figma Badge: Type (7) x Status (Information, Dot, Icon).
const types = ["conservative", "moderate", "growth", "aggressive", "secure", "success", "neutral"] as const
const labels: Record<(typeof types)[number], string> = {
  conservative: "Conservative",
  moderate: "Moderate",
  growth: "Growth",
  aggressive: "Aggressive",
  secure: "Secure",
  success: "Success",
  neutral: "Neutral",
}

function AllStates() {
  return (
    <div className="grid gap-(--ds-spacing-8) p-(--ds-spacing-16)">
      {types.map((type) => (
        <div key={type} className="flex items-center gap-(--ds-spacing-8)">
          <Badge type={type} status="information">{labels[type]}</Badge>
          <Badge type={type} status="dot">{labels[type]}</Badge>
          <Badge type={type} status="icon">{labels[type]}</Badge>
        </div>
      ))}
    </div>
  )
}

const meta = {
  title: "RM/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  render: () => <AllStates />,
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const AllStatesGrid: Story = {}

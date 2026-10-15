import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "@/rm-style/ui/switch"

// Figma Switch: Value (Unchecked, Checked) x State (Default, Disabled, Hover).
// Hover is a CSS :hover state and cannot be forced from a story.
function AllStates() {
  return (
    <div className="grid gap-(--ds-spacing-16) p-(--ds-spacing-16)">
      {[
        { label: "Unchecked", checked: false },
        { label: "Checked", checked: true },
      ].map((value) => (
        <div key={value.label} className="flex items-center gap-(--ds-spacing-16)">
          <span className="w-(--size-control-md) text-(length:--typography-label-md-font-size) text-text-secondary">
            {value.label}
          </span>
          <Switch checked={value.checked} />
          <Switch checked={value.checked} disabled />
        </div>
      ))}
    </div>
  )
}

const meta = {
  title: "RM/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  render: () => <AllStates />,
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const AllStatesGrid: Story = {}

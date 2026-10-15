import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "@/rm-style/ui/checkbox"

// Figma Checkbox: Type (Unchecked, Checked, Intrim) x State (Default, Disabled, Hover).
// Hover is a CSS :hover state and cannot be forced from a story; check it by moving the pointer.
const types = [
  { label: "Unchecked", checked: false },
  { label: "Checked", checked: true },
  { label: "Intrim", checked: "indeterminate" as const },
] as const

function AllStates() {
  return (
    <div className="grid gap-(--ds-spacing-16) p-(--ds-spacing-16)">
      {types.map((type) => (
        <div key={type.label} className="flex items-center gap-(--ds-spacing-16)">
          <span className="w-(--size-control-md) text-(length:--typography-label-md-font-size) text-text-secondary">
            {type.label}
          </span>
          <Checkbox checked={type.checked} />
          <Checkbox checked={type.checked} disabled />
        </div>
      ))}
    </div>
  )
}

const meta = {
  title: "RM/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  render: () => <AllStates />,
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const AllStatesGrid: Story = {}

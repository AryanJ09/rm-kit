import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup, RadioGroupItem } from "@/rm-style/ui/radio-group"

// Figma Radio: Value (Unchecked, Checked) x State (Default, Disabled, Hover).
// Hover is a CSS :hover state and cannot be forced from a story.
function AllStates() {
  return (
    <div className="grid gap-(--ds-spacing-16) p-(--ds-spacing-16)">
      {["Unchecked", "Checked"].map((value) => (
        <div key={value} className="flex items-center gap-(--ds-spacing-16)">
          <span className="w-(--size-control-md) text-(length:--typography-label-md-font-size) text-text-secondary">
            {value}
          </span>
          <RadioGroup defaultValue={value === "Checked" ? "on" : undefined} className="flex">
            <RadioGroupItem value="on" />
          </RadioGroup>
          <RadioGroup defaultValue={value === "Checked" ? "on" : undefined} className="flex">
            <RadioGroupItem value="on" disabled />
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}

const meta = {
  title: "RM/Radio",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  render: () => <AllStates />,
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const AllStatesGrid: Story = {}

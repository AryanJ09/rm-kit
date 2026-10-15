import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@/rm-style/ui/button"

// Figma Button.json: Type (Primary, Secondary, Text) x State (Default, Focused, Pressed, Disabled, Loading).
// Focused and Pressed are forced with data attributes, because a story cannot hold :focus or :active.
const types = [
  { label: "Primary", variant: "default" },
  { label: "Secondary", variant: "secondary" },
  { label: "Text", variant: "ghost" },
] as const

const states = [
  { label: "Default", props: {} },
  { label: "Focused", props: { "data-focused": "" } },
  { label: "Pressed", props: { "data-pressed": "" } },
  { label: "Disabled", props: { disabled: true } },
  { label: "Loading", props: { loading: true } },
] as const

function AllStates() {
  return (
    <div className="grid gap-(--ds-spacing-16) p-(--ds-spacing-16)">
      {types.map((type) => (
        <div key={type.label} className="flex items-center gap-(--ds-spacing-16)">
          <span className="w-(--size-control-md) text-(length:--typography-label-md-font-size) text-text-secondary">
            {type.label}
          </span>
          {states.map((state) => (
            <Button key={state.label} variant={type.variant} {...state.props}>
              Apply
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
}

const meta = {
  title: "RM/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  render: () => <AllStates />,
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const AllStatesGrid: Story = {}

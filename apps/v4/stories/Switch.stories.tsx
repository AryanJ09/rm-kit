// Hand-written (was generated). Not regenerated: edit this file directly. Labelled is the prototype's Family / Individual switch.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SwitchChoiceCard as DemoSwitchChoiceCard } from "@/examples/base/switch-choice-card"
import { SwitchDemo as DemoSwitchDemo } from "@/examples/base/switch-demo"
import { SwitchDescription as DemoSwitchDescription } from "@/examples/base/switch-description"
import { SwitchDisabled as DemoSwitchDisabled } from "@/examples/base/switch-disabled"
import { SwitchInvalid as DemoSwitchInvalid } from "@/examples/base/switch-invalid"
import { SwitchSizes as DemoSwitchSizes } from "@/examples/base/switch-sizes"
import FigmaGrid from "./figma/switch"
import { Switch } from "@/rm-style/ui/switch"

const meta = {
  title: "RM Kit/Switch",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const AllStates: Story = { name: "All States", render: () => <FigmaGrid />, parameters: { layout: "fullscreen" } }
export const ChoiceCard: Story = { render: () => <DemoSwitchChoiceCard /> }
export const Demo: Story = { render: () => <DemoSwitchDemo /> }
export const Description: Story = { render: () => <DemoSwitchDescription /> }
export const Disabled: Story = { render: () => <DemoSwitchDisabled /> }
export const Invalid: Story = { render: () => <DemoSwitchInvalid /> }
export const Sizes: Story = { render: () => <DemoSwitchSizes /> }

type SwitchArgs = { startLabel: string; endLabel: string; checked: boolean; size: "default" | "sm" }

// Labels are props of the same Switch: startLabel and endLabel. The side that is on turns bold.
export const Labelled: StoryObj<SwitchArgs> = {
  args: { startLabel: "Family", endLabel: "Individual", checked: false, size: "default" },
  argTypes: {
    startLabel: { control: "text", description: "Label before the switch (the off side). Empty hides it." },
    endLabel: { control: "text", description: "Label after the switch (the on side). Empty hides it." },
    checked: { control: "boolean" },
    size: { control: "inline-radio", options: ["default", "sm"] },
  },
  render: ({ startLabel, endLabel, checked, size }) => (
    <div className="flex flex-col gap-(--spacing-stack-lg)">
      <Switch startLabel={startLabel || undefined} endLabel={endLabel || undefined} checked={checked} onCheckedChange={() => {}} size={size} />
      <Switch startLabel="Auth" endLabel="Non-Auth" defaultChecked />
      <Switch startLabel="Members" endLabel="Products" />
    </div>
  ),
}

// Hand-written from Figma "Card/RM metric tile". Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Metric } from "@/rm-style/ui/metric"

type Args = {
  label: string
  value: string
  trend: "up" | "down" | "neutral"
  change: string
  period: string
}

const meta = {
  title: "RM Kit/Metric",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-(--size-layout-frame-width)"><Story /></div>],
  args: { label: "AUM", value: "₹9.17 Cr", trend: "up", change: "+3.3%", period: "QoQ Change" },
  argTypes: { trend: { control: "inline-radio", options: ["up", "down", "neutral"] } },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

export const Playground: Story = { render: (args) => <Metric {...args} /> }

export const Trends: Story = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-inline-md)">
      <Metric label="AUM" value="₹9.17 Cr" trend="up" change="+3.3%" period="QoQ Change" />
      <Metric label="Net flow" value="₹1.2 Cr" trend="down" change="−1.1%" period="QoQ Change" />
      <Metric label="eAUM" value="₹5.5 Cr" period="As-on 31 Aug 2026" />
    </div>
  ),
}

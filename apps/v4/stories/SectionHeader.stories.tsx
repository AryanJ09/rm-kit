// Hand-written from Figma "Section header". Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SectionHeader } from "@/rm-style/ui/section-header"

type Args = { title: string; action: boolean; actionLabel: string }

const meta = {
  title: "RM Kit/Section header",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-(--size-layout-frame-width)"><Story /></div>],
  args: { title: "Focussed Products", action: false, actionLabel: "View all" },
  argTypes: { action: { control: "boolean", description: "Trailing action." } },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

export const Playground: Story = {
  render: ({ title, action, actionLabel }) => (
    <SectionHeader title={title} actionLabel={action ? actionLabel : undefined} onAction={() => {}} />
  ),
}

// Figma variants: Action=None, Action=Visible.
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col">
      <SectionHeader title="Focussed Products" />
      <SectionHeader title="Focussed Products" actionLabel="View all" />
    </div>
  ),
}

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "@/rm-style/ui/button"
import { EmptyFilter } from "@/rm-style/ui/empty-filter"

// Hand-written: Figma "Empty filter". Shown in place of results when filters match nothing.
const meta = {
  title: "RM Kit/Empty filter",
  component: EmptyFilter,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof EmptyFilter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => <div className="w-[430px] p-(--ds-spacing-16)"><EmptyFilter {...args} /></div>,
}

export const WithReset: Story = {
  args: {},
  render: (args) => (
    <div className="w-[430px] p-(--ds-spacing-16)">
      <EmptyFilter {...args} action={<Button variant="secondary">Reset filters</Button>} />
    </div>
  ),
}

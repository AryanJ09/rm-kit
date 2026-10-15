// Hand-written: shadcn has no demo for this component, so gen-rm-stories.mjs does not generate it.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DirectionProvider, useDirection } from "@/rm-style/ui/direction"

function DirectionLabel() {
  const dir = useDirection()
  return <p className="text-sm">Current direction: {dir}</p>
}

const meta = {
  title: "Components/Direction",
  component: DirectionProvider,
  tags: ["autodocs"],
  render: (args) => (
    <DirectionProvider {...args}>
      <DirectionLabel />
    </DirectionProvider>
  ),
  args: { direction: "rtl" },
} satisfies Meta<typeof DirectionProvider>

export default meta
type Story = StoryObj<typeof meta>

export const RTL: Story = { args: { direction: "rtl" } }
export const LTR: Story = { args: { direction: "ltr" } }

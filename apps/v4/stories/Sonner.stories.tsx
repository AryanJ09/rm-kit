// Hand-written: shadcn has no demo for this component, so gen-rm-stories.mjs does not generate it.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { toast } from "sonner"
import { Button } from "@/rm-style/ui/button"
import { Toaster } from "@/rm-style/ui/sonner"

const meta = {
  title: "Components/Sonner",
  component: Toaster,
  tags: ["autodocs"],
  render: () => (
    <div>
      <Button variant="outline" onClick={() => toast("Event has been created.")}>Show toast</Button>
      <Toaster />
    </div>
  ),
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

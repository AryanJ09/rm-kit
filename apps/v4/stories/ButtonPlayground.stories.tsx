import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Mail, Plus, Trash2 } from "lucide-react"
import { Button } from "@/rm-style/ui/button"

// Size and variant are properties here: change them in the Controls panel.
const meta = {
  title: "RM Kit/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Continue", variant: "default", size: "md" },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "secondary", "ghost"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg", "icon-sm", "icon-md", "icon-lg"] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

// Use cases: real actions, one per row, so the scale and the hierarchy are visible together.
export const UseCases: Story = {
  render: () => (
    <div className="grid gap-(--spacing-inline-lg) p-(--spacing-inline-lg)">
      <div className="flex items-center gap-(--spacing-inline-sm)">
        <Button>Save client</Button>
        <Button variant="secondary">Save draft</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
      <div className="flex items-center gap-(--spacing-inline-sm)">
        <Button size="sm">Add note</Button>
        <Button size="md">Add note</Button>
        <Button size="lg">Add note</Button>
      </div>
      <div className="flex items-center gap-(--spacing-inline-sm)">
        <Button size="icon-sm" aria-label="Add"><Plus /></Button>
        <Button size="icon-md" variant="secondary" aria-label="Email"><Mail /></Button>
        <Button size="icon-lg" variant="ghost" aria-label="Delete"><Trash2 /></Button>
      </div>
      <div className="flex items-center gap-(--spacing-inline-sm)">
        <Button loading>Saving</Button>
        <Button disabled>Unavailable</Button>
      </div>
    </div>
  ),
}

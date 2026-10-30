// Hand-written from Figma "Divider" (Type=Horizontal). Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Separator } from "@/rm-style/ui/separator"

type Args = { orientation: "horizontal" | "vertical" }

const meta = {
  title: "RM Kit/Separator",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { orientation: "horizontal" },
  argTypes: { orientation: { control: "inline-radio", options: ["horizontal", "vertical"] } },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const text = "text-(length:--font-size-sm) text-text-primary"

export const Playground: Story = {
  render: ({ orientation }) =>
    orientation === "horizontal" ? (
      <div className="flex w-(--size-288) flex-col gap-(--spacing-inline-md)">
        <span className={text}>Contacted in current cycle</span>
        <Separator />
        <span className={text}>Client View</span>
      </div>
    ) : (
      <div className="flex h-(--size-control-md) items-center gap-(--spacing-inline-md)">
        <span className={text}>Clients</span>
        <Separator orientation="vertical" />
        <span className={text}>Leads</span>
        <Separator orientation="vertical" />
        <span className={text}>CRM</span>
      </div>
    ),
}

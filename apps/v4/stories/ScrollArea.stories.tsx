// Hand-written. Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ScrollArea, ScrollBar } from "@/rm-style/ui/scroll-area"
import { Separator } from "@/rm-style/ui/separator"

type Args = { orientation: "vertical" | "horizontal" }

const meta = {
  title: "RM Kit/Scroll area",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { orientation: "vertical" },
  argTypes: { orientation: { control: "inline-radio", options: ["vertical", "horizontal"], description: "Which way the content scrolls." } },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const clients = Array.from({ length: 20 }, (_, i) => `Client ${String(i + 1).padStart(2, "0")}`)
const text = "text-(length:--font-size-sm) text-text-primary"

export const Playground: Story = {
  render: ({ orientation }) =>
    orientation === "vertical" ? (
      <ScrollArea className="h-(--size-160) w-(--size-288) rounded-(--radius-md) border-(length:--border-width-default) border-border">
        <div className="flex flex-col gap-(--spacing-inline-md) p-(--spacing-inline-md)">
          {clients.map((c, i) => (
            <div key={c} className="flex flex-col gap-(--spacing-inline-md)">
              <span className={text}>{c}</span>
              {i < clients.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </ScrollArea>
    ) : (
      <ScrollArea className="w-(--size-288) rounded-(--radius-md) border-(length:--border-width-default) border-border">
        <div className="flex w-max gap-(--spacing-inline-md) p-(--spacing-inline-md)">
          {clients.map((c) => (
            <span key={c} className={text}>{c}</span>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    ),
}

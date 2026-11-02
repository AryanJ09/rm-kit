// Hand-written. The Kompanion conversation pattern, with a live conversation so Send and the chips work in the story.
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { MobileKompanion, type KompanionMessage } from "./patterns/mobile-kompanion"

const meta = {
  title: "RM Kit/Application shell/Kompanion chat",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta

export default meta
type Story = StoryObj

const opening: KompanionMessage[] = [
  { id: "1", sender: "rm", body: "Pitch a laddered FD renewal for Pooja Chawla.", time: "10:12" },
  { id: "2", sender: "ai", body: "Her FD matures in 9 days. Offer a 3-, 5- and 7-year ladder so part of the money renews each year.", time: "10:12" },
]

/** The conversation: the RM types or taps a chip; the AI answers. Replies here are canned, the way a real agent would supply them. */
export const Conversation: Story = {
  render: () => {
    const [messages, setMessages] = React.useState<KompanionMessage[]>(opening)
    const add = (sender: "rm" | "ai", body: string) =>
      setMessages((list) => [...list, { id: String(list.length + 1), sender, body, time: "10:14" }])
    const reply = (body: string) => {
      add("rm", body)
      window.setTimeout(() => add("ai", "Drafted. Want me to send it to the client's email?"), 300)
    }
    return (
      <div className="mx-auto h-(--size-layout-frame-height) w-(--size-layout-frame-width) max-w-(--size-share-full) overflow-hidden rounded-(--radius-2xl) border-(length:--border-width-default) border-border bg-card">
        <MobileKompanion
          title="Kompanion"
          agent="Sales Coach"
          messages={messages}
          chips={["Draft the email", "Show FD options"]}
          onBack={() => {}}
          onSend={reply}
          onChip={reply}
          onAgentClick={() => {}}
          onAttach={() => {}}
        />
      </div>
    )
  },
}

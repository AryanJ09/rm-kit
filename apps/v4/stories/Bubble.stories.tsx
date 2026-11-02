// Hand-written. Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Bubble, BubbleContent, BubbleGroup } from "@/rm-style/ui/bubble"

// Hand-written. The RM Kit bubble: a chat message surface. Sent (end) and received (start) use the same component.
const meta = { title: "RM Kit/Bubble", tags: ["autodocs"], parameters: { layout: "centered" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Conversation: Story = {
  render: () => (
    <BubbleGroup className="w-(--size-layout-frame-width) max-w-(--size-share-full)">
      <Bubble variant="muted"><BubbleContent>Pitch a laddered FD renewal for this client.</BubbleContent></Bubble>
      <Bubble variant="tinted" align="end"><BubbleContent>Her FD matures in 9 days. Offer a three-rung ladder.</BubbleContent></Bubble>
    </BubbleGroup>
  ),
}

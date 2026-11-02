// Hand-written. Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/rm-style/ui/hover-card"
import { Button } from "@/rm-style/ui/button"

// Hand-written. The RM Kit hover card: a short preview that opens on hover or focus. Put only extra detail here;
// anything the user must act on belongs in a sheet or a card.
const meta = { title: "RM Kit/Hover card", tags: ["autodocs"], parameters: { layout: "centered" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link" />}>Relationship value</HoverCardTrigger>
      <HoverCardContent>
        Total value of this client's deposits, investments and insurance, as of the last month end.
      </HoverCardContent>
    </HoverCard>
  ),
}

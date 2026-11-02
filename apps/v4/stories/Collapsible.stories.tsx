// Hand-written. Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/rm-style/ui/collapsible"
import { Button } from "@/rm-style/ui/button"

// Hand-written. The RM Kit collapsible: one region that opens and closes. Use the accordion when there are several.
const meta = { title: "RM Kit/Collapsible", tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => (
    <Collapsible className="w-(--size-layout-frame-width) max-w-(--size-share-full)">
      <CollapsibleTrigger render={<Button variant="ghost" />}>Show details</CollapsibleTrigger>
      <CollapsibleContent className="pt-(--spacing-inline-md) text-(length:--font-size-sm)">
        Account opened 2019. Two products, both current.
      </CollapsibleContent>
    </Collapsible>
  ),
}

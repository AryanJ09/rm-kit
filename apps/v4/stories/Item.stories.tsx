// Hand-written. Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from "@/rm-style/ui/item"
import { Button } from "@/rm-style/ui/button"
import { ChevronRightIcon, UserRound } from "lucide-react"

// Hand-written. The RM Kit item: one row of a list: a media slot, a title and description, and actions at the end.
const meta = { title: "RM Kit/Item", tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const List: Story = {
  render: () => (
    <ItemGroup className="w-(--size-layout-frame-width) max-w-(--size-share-full)">
      <Item>
        <ItemMedia><UserRound /></ItemMedia>
        <ItemContent>
          <ItemTitle>Rajesh Mehra</ItemTitle>
          <ItemDescription>CRN 56792323 · 2 products</ItemDescription>
        </ItemContent>
        <ItemActions><Button variant="ghost" size="icon-sm" aria-label="Open"><ChevronRightIcon /></Button></ItemActions>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemMedia><UserRound /></ItemMedia>
        <ItemContent>
          <ItemTitle>Sunita Mishra</ItemTitle>
          <ItemDescription>CRN 56792324 · 2 products</ItemDescription>
        </ItemContent>
        <ItemActions><Button variant="ghost" size="icon-sm" aria-label="Open"><ChevronRightIcon /></Button></ItemActions>
      </Item>
    </ItemGroup>
  ),
}

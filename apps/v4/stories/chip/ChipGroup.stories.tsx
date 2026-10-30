// Hand-written from Figma "Filters" (Tab choices, Client filter group). Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ChipGroup, ChipGroupItem } from "@/rm-style/ui/chip"

const meta = {
  title: "RM Kit/Chip/Group",
  component: ChipGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof ChipGroup>

export default meta
type Story = StoryObj<typeof meta>

// Single select: one chip on at a time.
export const SingleSelect: Story = {
  render: () => (
    <ChipGroup defaultValue={["not-contacted"]} aria-label="Contacted in current cycle">
      <ChipGroupItem value="contacted">Contacted</ChipGroupItem>
      <ChipGroupItem value="not-contacted">Not Contacted</ChipGroupItem>
    </ChipGroup>
  ),
}

// Multi select: several chips can be on at once.
export const MultiSelect: Story = {
  render: () => (
    <ChipGroup multiple defaultValue={["maturities"]} aria-label="Today's Focus" className="max-w-(--size-layout-frame-width) gap-(--spacing-inline-sm)">
      <ChipGroupItem value="maturities">Maturities Due</ChipGroupItem>
      <ChipGroupItem value="re-kyc">Re-KYC due</ChipGroupItem>
      <ChipGroupItem value="birthdays">Birthdays today</ChipGroupItem>
      <ChipGroupItem value="large-debits">Large debits/credits</ChipGroupItem>
    </ChipGroup>
  ),
}

// Several labelled groups: each label sits above its chips, using the spacing tokens.
export const Grouped: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex w-(--size-layout-frame-width) flex-col gap-(--spacing-inline-md)">
      <div className="flex flex-col gap-(--spacing-stack-xs)">
        <span className="text-(length:--font-size-sm) text-text-primary">Contacted in current cycle</span>
        <ChipGroup defaultValue={["not-contacted"]} aria-label="Contacted in current cycle">
          <ChipGroupItem value="contacted">Contacted</ChipGroupItem>
          <ChipGroupItem value="not-contacted">Not Contacted</ChipGroupItem>
        </ChipGroup>
      </div>
      <div className="flex flex-col gap-(--spacing-stack-xs)">
        <span className="text-(length:--font-size-sm) text-text-primary">Client View</span>
        <ChipGroup defaultValue={["only-heads"]} aria-label="Client View">
          <ChipGroupItem value="only-heads">Only Heads</ChipGroupItem>
          <ChipGroupItem value="all-crn">All CRN</ChipGroupItem>
        </ChipGroup>
      </div>
      <div className="flex flex-col gap-(--spacing-inline-md)">
        <span className="text-(length:--font-size-sm) text-text-primary">Today&apos;s Focus</span>
        <ChipGroup multiple defaultValue={["maturities"]} aria-label="Today's Focus">
          <ChipGroupItem value="maturities">Maturities Due</ChipGroupItem>
          <ChipGroupItem value="re-kyc">Re-KYC due</ChipGroupItem>
          <ChipGroupItem value="birthdays">Birthdays today</ChipGroupItem>
          <ChipGroupItem value="large-debits">Large debits/credits</ChipGroupItem>
        </ChipGroup>
      </div>
    </div>
  ),
}

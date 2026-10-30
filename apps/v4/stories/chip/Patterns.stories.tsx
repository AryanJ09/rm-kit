// Hand-written. A chip is one core component; these are the ways it is used. Not generated: edit this file directly.
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CalendarIcon, StarIcon } from "lucide-react"

import { Chip, ChipGroup, ChipGroupItem } from "@/rm-style/ui/chip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuChipTrigger,
} from "@/rm-style/ui/dropdown-menu"

const meta = {
  title: "RM Kit/Chip/Patterns",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// Filter: chips toggle on and off; several can be on at once.
export const Filter: Story = {
  render: () => (
    <ChipGroup multiple defaultValue={["maturities"]} aria-label="Today's Focus" className="max-w-(--size-layout-frame-width) gap-(--spacing-inline-sm)">
      <ChipGroupItem value="maturities">Maturities Due</ChipGroupItem>
      <ChipGroupItem value="re-kyc">Re-KYC due</ChipGroupItem>
      <ChipGroupItem value="birthdays">Birthdays today</ChipGroupItem>
      <ChipGroupItem value="large-debits">Large debits/credits</ChipGroupItem>
    </ChipGroup>
  ),
}

// Tabs: one chip is always on. Pressing the selected chip does nothing.
export const Tabs: Story = {
  render: function Render() {
    const [value, setValue] = React.useState(["all"])
    return (
      <ChipGroup value={value} onValueChange={(next) => next.length && setValue(next)} aria-label="Client view">
        <ChipGroupItem value="all">All CRN</ChipGroupItem>
        <ChipGroupItem value="heads">Only Heads</ChipGroupItem>
        <ChipGroupItem value="new">New</ChipGroupItem>
      </ChipGroup>
    )
  },
}

// Dropdown: a chip with the dropdown chevron (always) opens a menu and shows the pick.
export const Dropdown: Story = {
  render: function Render() {
    const [value, setValue] = React.useState("All clients")
    return (
      <DropdownMenu>
        <DropdownMenuChipTrigger icon={<StarIcon />}>{value}</DropdownMenuChipTrigger>
        <DropdownMenuContent>
          {["All clients", "My clients", "Watchlist"].map((v) => (
            <DropdownMenuItem key={v} onClick={() => setValue(v)}>{v}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

// Removable: selected chips with a close (×) after the label; pressing it drops the chip.
export const Removable: Story = {
  render: function Render() {
    const [items, setItems] = React.useState(["Renewals and Maturities", "Re-KYC due", "Birthdays today"])
    return (
      <div className="flex flex-wrap gap-(--spacing-inline-sm)">
        {items.map((item) => (
          <Chip key={item} defaultPressed onRemove={() => setItems((c) => c.filter((x) => x !== item))}>
            {item}
          </Chip>
        ))}
      </div>
    )
  },
}

// Icon: an icon before the label.
export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-(--spacing-inline-sm)">
      <Chip icon={<CalendarIcon />}>This month</Chip>
      <Chip icon={<StarIcon />} defaultPressed>Starred</Chip>
    </div>
  ),
}

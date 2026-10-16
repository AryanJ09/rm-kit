import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Chip } from "@/rm-style/ui/chip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/rm-style/ui/table"

// Hand-written: this file is not regenerated. A Chip is a Toggle with the kit's chip look.
const meta = {
  title: "RM Kit/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

const sizes = ["sm", "md", "lg"] as const

// Rows are the size scale (40, 48, 56); columns are the states.
export const AllStates: Story = {
  render: () => (
    <Table className="w-full p-(--ds-spacing-16)">
      <TableHeader>
        <TableRow>
          <TableHead>Size</TableHead>
          <TableHead>Default</TableHead>
          <TableHead>Selected</TableHead>
          <TableHead>With icon</TableHead>
          <TableHead>Disabled</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sizes.map((size) => (
          <TableRow key={size}>
            <TableCell>{size}</TableCell>
            <TableCell><Chip size={size}>Re-KYC due</Chip></TableCell>
            <TableCell><Chip size={size} defaultPressed>Re-KYC due</Chip></TableCell>
            <TableCell>
              <Chip size={size}>
                <span aria-hidden className="size-(--size-icon-sm) rounded-full bg-current" />
                Re-KYC due
              </Chip>
            </TableCell>
            <TableCell><Chip size={size} disabled>Re-KYC due</Chip></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const Interactive: Story = {
  render: () => <InteractiveChip />,
}

import { useState } from "react"

function InteractiveChip() {
  const [on, setOn] = useState(false)
  return (
    <div className="flex flex-col gap-(--ds-spacing-16) p-(--ds-spacing-16)">
      <Chip pressed={on} onPressedChange={setOn}>Maturities due</Chip>
      <p className="text-(length:--ds-typography-font-size-14) text-text-secondary">{on ? "On" : "Off"}</p>
    </div>
  )
}

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { Checkbox } from "@/rm-style/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/rm-style/ui/table"

// Hand-written: this file is not regenerated.
const meta = {
  title: "RM Kit/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const AllStates: Story = {
  render: () => (
    <div className="grid gap-(--ds-spacing-16) p-(--ds-spacing-16)">
      <div className="flex items-center gap-(--ds-spacing-16)"><Checkbox /> Unchecked</div>
      <div className="flex items-center gap-(--ds-spacing-16)"><Checkbox defaultChecked /> Checked</div>
      <div className="flex items-center gap-(--ds-spacing-16)"><Checkbox indeterminate /> Some selected</div>
      <div className="flex items-center gap-(--ds-spacing-16)"><Checkbox disabled /> Disabled</div>
    </div>
  ),
}

const rows = ["Lakshmesh Patel", "Asha Rao", "Mohan Iyer", "Priya Shah"]

// Header checkbox: unchecked when none are selected, indeterminate when some are, checked when all are.
export const SelectTable: Story = {
  render: () => {
    const [picked, setPicked] = useState<boolean[]>(rows.map(() => false))
    const count = picked.filter(Boolean).length
    const headerState = count === 0 ? false : count === rows.length ? true : "indeterminate"
    return (
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-(--ds-size-icon-48)">
              <Checkbox
                aria-label="Select all"
                checked={headerState === true}
                indeterminate={headerState === "indeterminate"}
                onCheckedChange={(next) => setPicked(rows.map(() => next))}
              />
            </TableHead>
            <TableHead>Client</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((name, i) => (
            <TableRow key={name}>
              <TableCell>
                <Checkbox
                  aria-label={name}
                  checked={picked[i]}
                  onCheckedChange={(next) => setPicked((p) => p.map((v, j) => (j === i ? next : v)))}
                />
              </TableCell>
              <TableCell>{name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  },
}

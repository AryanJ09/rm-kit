// Hand-written from Figma "Options". Not generated: edit this file directly.
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuChipTrigger,
} from "@/rm-style/ui/dropdown-menu"

const profiles = ["Conservative", "Moderate", "Growth", "Aggressive"]

type Args = {
  selected: string
  disabledLast: boolean
}

const meta = {
  title: "RM Kit/Dropdown menu",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { selected: "Moderate", disabledLast: false },
  argTypes: {
    selected: { control: "select", options: profiles, description: "The row shown as selected." },
    disabledLast: { control: "boolean", description: "Disables the last option." },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

// The trigger is always a chip with the dropdown chevron. Figma "Options": single choice. The selected row is filled; hover fills a row the same way.
export const SingleChoice: Story = {
  render: function Render({ selected, disabledLast }) {
    const [value, setValue] = React.useState(selected)
    React.useEffect(() => setValue(selected), [selected])
    return (
      <DropdownMenu defaultOpen>
        <DropdownMenuChipTrigger>Risk profile: {value}</DropdownMenuChipTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={value} onValueChange={(v) => setValue(String(v))}>
            {profiles.map((p, i) => (
              <DropdownMenuRadioItem key={p} value={p} disabled={disabledLast && i === profiles.length - 1}>
                {p}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

// Plain actions: rows that do something when pressed, with a label, a divider and a destructive row.
export const Actions: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuChipTrigger>Actions</DropdownMenuChipTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Client</DropdownMenuLabel>
        <DropdownMenuItem>View profile</DropdownMenuItem>
        <DropdownMenuItem>Edit details</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Remove client</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Multiple choice: each row toggles on its own and keeps a tick at the end.
export const MultipleChoice: Story = {
  render: function Render() {
    const [on, setOn] = React.useState<string[]>(["Moderate"])
    return (
      <DropdownMenu>
        <DropdownMenuChipTrigger>Risk profiles ({on.length})</DropdownMenuChipTrigger>
        <DropdownMenuContent>
          {profiles.map((p) => (
            <DropdownMenuCheckboxItem
              key={p}
              checked={on.includes(p)}
              onCheckedChange={(c) => setOn((cur) => (c ? [...cur, p] : cur.filter((x) => x !== p)))}
            >
              {p}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

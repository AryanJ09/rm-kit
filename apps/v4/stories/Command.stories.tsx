// Hand-written. Not generated: edit this file directly.
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CalendarIcon, SettingsIcon, UserIcon } from "lucide-react"

import { Button } from "@/rm-style/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/rm-style/ui/command"

const meta = {
  title: "RM Kit/Command",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// The list of commands, shared by the inline palette and the dialog.
function Commands() {
  return (
    <>
      <CommandInput placeholder="Type a command or search" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem><CalendarIcon />Calendar</CommandItem>
          <CommandItem><UserIcon />Search clients</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <SettingsIcon />Preferences<CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <UserIcon />Profile<CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  )
}

// Command lets people search and run commands. It filters as you type, moves with the arrow keys and runs on Enter.
export const Palette: Story = {
  render: () => (
    <Command className="w-(--size-288) border-(length:--border-width-default) border-(--control-stroke-default) shadow-(--elevation-popover)">
      <Commands />
    </Command>
  ),
}

// The same palette in a dialog, opened by a button (or Cmd+K in an app).
export const Dialog: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>Open command palette</Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Commands />
        </CommandDialog>
      </>
    )
  },
}

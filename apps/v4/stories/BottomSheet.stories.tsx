// Hand-written. The RM Kit bottom sheet: a drag handle, a title with a close button, a scrolling body and a pinned footer.
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BottomSheet, BottomSheetContent, BottomSheetTrigger } from "@/rm-style/ui/bottom-sheet"
import { Button } from "@/rm-style/ui/button"
import { Chip } from "@/rm-style/ui/chip/chip"
import { MeetingLogSheetContent } from "./patterns/meeting-log-sheet"
import { CueActionSheet } from "./patterns/cue-action-sheet"
import { BookIcon, CalculatorIcon, FileTextIcon } from "lucide-react"

const meta = {
  title: "RM Kit/Bottom sheet",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [(Story) => <div className="h-svh bg-muted p-(--spacing-inline-lg)"><div className="mx-auto h-(--size-share-full) w-(--size-layout-frame-width) max-w-(--size-share-full)"><Story /></div></div>],
} satisfies Meta

export default meta
type Story = StoryObj

type Args = { title: string; withFooter: boolean; rows: number }

/** Open it: the handle, the title, the close button, the body and (when on) the pinned footer. */
export const Playground: StoryObj<Args> = {
  args: { title: "Filter Clients", withFooter: true, rows: 12 },
  argTypes: {
    title: { control: "text" },
    withFooter: { control: "boolean", description: "Reset and Apply, pinned under a divider." },
    rows: { control: { type: "number", min: 1, max: 40 }, description: "How many rows of content, to test the scrolling body." },
  },
  render: ({ title, withFooter, rows }) => {
    const [open, setOpen] = React.useState(false)
    return (
      <BottomSheet open={open} onOpenChange={setOpen}>
        <BottomSheetTrigger render={<Button />}>Open sheet</BottomSheetTrigger>
        <BottomSheetContent
          title={title}
          footer={
            withFooter ? (
              <>
                <Button variant="secondary" onClick={() => setOpen(false)}>Reset</Button>
                <Button onClick={() => setOpen(false)}>Apply</Button>
              </>
            ) : undefined
          }
        >
          <div className="flex flex-col gap-(--spacing-stack-sm)">
            {Array.from({ length: rows }, (_, i) => (
              <Chip key={i}>Option {i + 1}</Chip>
            ))}
          </div>
        </BottomSheetContent>
      </BottomSheet>
    )
  },
}

/** Default: a short sheet with a footer, as the Clients filter uses it. */
export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true)
    return (
      <BottomSheet open={open} onOpenChange={setOpen}>
        <BottomSheetTrigger render={<Button />}>Open sheet</BottomSheetTrigger>
        <BottomSheetContent title="Filter Clients" footer={<><Button variant="secondary">Reset</Button><Button>Apply</Button></>}>
          <p className="m-0 text-(length:--font-size-sm) text-text-secondary">The body scrolls; the footer stays where it is.</p>
        </BottomSheetContent>
      </BottomSheet>
    )
  },
}

const meetingModes = [
  { value: "video", label: "Video Conference" },
  { value: "in-person", label: "In Person" },
  { value: "phone", label: "Phone Call" },
]
const statuses = [
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
]
const durations = [
  { value: "30", label: "30 min" },
  { value: "60", label: "1 hr" },
  { value: "120", label: "2 hr" },
]
const attendeeTypes = [
  { value: "customer", label: "Contact (customer side)" },
  { value: "bank", label: "Bank side" },
]

/** A form in the sheet: fixed header and footer, the fields scroll in the middle, the attendees repeat. */
export const MeetingLog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <BottomSheet open={open} onOpenChange={setOpen}>
        <BottomSheetTrigger render={<Button />}>Log meeting</BottomSheetTrigger>
        <MeetingLogSheetContent
          clientName="Pooja Chawla"
          meetingModes={meetingModes}
          statuses={statuses}
          durations={durations}
          attendeeTypes={attendeeTypes}
          onCancel={() => setOpen(false)}
          onSubmit={() => setOpen(false)}
        />
      </BottomSheet>
    )
  },
}

/** The cue action sheet: an AI suggestion first, then actions with a tinted icon tile. Patterned from the prototype's "Actions". */
export const CueActions: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true)
    const [picked, setPicked] = React.useState("")
    return (
      <div className="flex flex-col gap-(--spacing-inline-md)">
        <p className="text-(length:--font-size-sm)">Picked: {picked || "none"}</p>
        <CueActionSheet
          title="Actions"
          open={open}
          onOpenChange={setOpen}
          suggestion={{ id: "script", label: "Personalised Mutual Fund script for Sanjay Gupta" }}
          actions={[
            { id: "pitch", label: "Explore Pitch Perfector for Mutual Fund", icon: <BookIcon /> },
            { id: "brochures", label: "Brochures", icon: <FileTextIcon /> },
            { id: "calculators", label: "Calculators", icon: <CalculatorIcon /> },
          ]}
          onSelect={(id) => {
            setPicked(id)
            setOpen(false)
          }}
        />
      </div>
    )
  },
}

// Pattern, not a component: the Meeting Log bottom sheet (prototype "Meeting Log for <client>"). The sheet's header (handle,
// title, close) and footer (Cancel, the primary action last) stay fixed; only the middle scrolls, as BottomSheetContent does.
// The middle is a stack of form fields: Input, ChipGroup for one-of-several choices, Dropdown, Textarea, and a repeating
// attendee block. Every field is an existing component; nothing here is a new control.
import * as React from "react"
import { PlusIcon } from "lucide-react"

import { BottomSheetContent } from "@/rm-style/ui/bottom-sheet"
import { Button } from "@/rm-style/ui/button"
import { ChipGroup, ChipGroupItem } from "@/rm-style/ui/chip/chip-group"
import { Dropdown } from "@/rm-style/ui/dropdown"
import { Input } from "@/rm-style/ui/input"
import { Textarea } from "@/rm-style/ui/textarea"

type Option = { value: string; label: string }

type MeetingLogSheetProps = {
  clientName: string
  meetingModes: Option[]
  statuses: Option[]
  durations: Option[]
  attendeeTypes: Option[]
  onCancel: () => void
  onSubmit: () => void
}

function MeetingLogSheetContent({ clientName, meetingModes, statuses, durations, attendeeTypes, onCancel, onSubmit }: MeetingLogSheetProps) {
  const [mode, setMode] = React.useState<string[]>([meetingModes[1]?.value ?? ""])
  const [status, setStatus] = React.useState<string[]>([statuses[0]?.value ?? ""])
  const [duration, setDuration] = React.useState<string[]>([durations[1]?.value ?? ""])
  const [attendees, setAttendees] = React.useState<number[]>([])
  const [attendeeType, setAttendeeType] = React.useState<Record<number, string[]>>({})
  const nextId = React.useRef(0)

  return (
    <BottomSheetContent
      title={`Meeting Log for ${clientName}`}
      footer={
        <>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={onSubmit}>Log meeting</Button>
        </>
      }
    >
      <div className="flex flex-col gap-(--spacing-stack-lg)">
        <Input label="Event title" required defaultValue={`Follow-up with ${clientName}`} />

        <div className="flex flex-col gap-(--spacing-stack-sm)">
          <span className="text-(length:--font-size-sm) font-(--typography-label-md-font-weight)">How will you meet?</span>
          <ChipGroup value={mode} onValueChange={setMode}>
            {meetingModes.map((m) => (
              <ChipGroupItem key={m.value} value={m.value}>{m.label}</ChipGroupItem>
            ))}
          </ChipGroup>
        </div>

        <div className="flex flex-col gap-(--spacing-stack-sm)">
          <span className="text-(length:--font-size-sm) font-(--typography-label-md-font-weight)">Status</span>
          <ChipGroup value={status} onValueChange={setStatus}>
            {statuses.map((s) => (
              <ChipGroupItem key={s.value} value={s.value}>{s.label}</ChipGroupItem>
            ))}
          </ChipGroup>
        </div>

        <Input label="Start" required type="datetime-local" defaultValue="2026-02-11T13:15" />

        <Dropdown label="Duration" helper="Ends at 2:15 pm" placeholder="Select duration" options={durations} value={duration} onValueChange={setDuration} />

        <div className="flex flex-col gap-(--spacing-stack-sm)">
          <span className="text-(length:--font-size-sm) font-(--typography-label-md-font-weight)">Attendees ({attendees.length})</span>
          <span className="text-(length:--font-size-xs) text-muted-foreground">Add people only when needed.</span>
          {attendees.map((id) => (
            <div key={id} className="flex flex-col gap-(--spacing-stack-md) rounded-(--radius-lg) border-(length:--border-width-default) border-border p-(--spacing-inline-lg)">
              <div className="flex items-center justify-between">
                <span className="text-(length:--font-size-sm) font-(--typography-label-md-font-weight)">Customer representative</span>
                <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setAttendees((list) => list.filter((x) => x !== id))}>
                  Remove
                </Button>
              </div>
              <Dropdown
                label="Attendee type"
                placeholder="Select type"
                options={attendeeTypes}
                value={attendeeType[id] ?? []}
                onValueChange={(v) => setAttendeeType((map) => ({ ...map, [id]: v }))}
              />
              <Input label="Name" placeholder="Enter the name" />
            </div>
          ))}
          <Button variant="ghost" className="w-(--size-share-full)" onClick={() => setAttendees((list) => [...list, nextId.current++])}>
            <PlusIcon />
            Add attendee
          </Button>
        </div>

        <Textarea label="Notes" placeholder="Add a note if useful" />
      </div>
    </BottomSheetContent>
  )
}

export { MeetingLogSheetContent, type MeetingLogSheetProps }

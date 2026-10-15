import { useState, type ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import type { DateRange } from "react-day-picker"
import { DatePicker } from "@/rm-style/ui/date-picker"

const meta = {
  title: "Components/Date picker",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const cell = "flex w-(--ds-size-288) flex-col gap-(--ds-spacing-16)"

function Cell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={cell}>
      <span className="text-sm text-field-helper">{title}</span>
      {children}
    </div>
  )
}

const sample = new Date(2026, 9, 15, 12, 0)

export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-(--ds-spacing-32)">
      <Cell title="Default">
        <DatePicker label="Client date" helper="Pick a day" />
      </Cell>
      <Cell title="Filled">
        <DatePicker
          label="Client date"
          helper="Pick a day"
          defaultValue={sample}
        />
      </Cell>
      <Cell title="Error">
        <DatePicker
          label="Client date"
          helper="Date must be in the future"
          state="error"
        />
      </Cell>
      <Cell title="Disabled">
        <DatePicker label="Client date" helper="Locked after sign-off" disabled />
      </Cell>
    </div>
  ),
}

export const Single: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>(undefined)
    return (
      <DatePicker
        label="Client date"
        helper="Pick a day"
        value={value}
        onValueChange={(v) => setValue(v as Date | undefined)}
      />
    )
  },
}

export const Range: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange | undefined>(undefined)
    return (
      <DatePicker
        mode="range"
        label="Campaign dates"
        helper="Pick a start and an end"
        placeholder="Select range"
        value={value}
        onValueChange={(v) => setValue(v as DateRange | undefined)}
      />
    )
  },
}

export const WithTime: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>(undefined)
    return (
      <DatePicker
        enableTime
        label="Meeting"
        helper="Pick a day and a time"
        placeholder="Select date and time"
        value={value}
        onValueChange={(v) => setValue(v as Date | undefined)}
      />
    )
  },
}

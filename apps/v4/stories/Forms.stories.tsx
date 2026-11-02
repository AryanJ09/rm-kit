// Hand-written from the owner's forms (RM Kit). Not generated: edit this file directly.
// Every form control takes a label and a helper line through the same FieldShell, so they line up and read the same.
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { DatePicker } from "@/rm-style/ui/date-picker"
import { Dropdown } from "@/rm-style/ui/dropdown"
import { Input } from "@/rm-style/ui/input"
import { Search } from "@/rm-style/ui/search"
import { Textarea } from "@/rm-style/ui/textarea"

const meta = {
  title: "RM Kit/Forms",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta

export default meta
type Story = StoryObj

type States = "default" | "success" | "error"
type Sizes = "sm" | "md" | "lg"

const column = "flex w-(--size-layout-frame-width) max-w-(--size-share-full) flex-col gap-(--spacing-stack-lg)"
const helperFor = (state: States) =>
  state === "error" ? "Enter a valid CRN." : state === "success" ? "CRN verified." : "Nine digits, no spaces."

/** Input: a label, a field and a helper line. The helper takes the colour of the state. */
export const Playground: StoryObj<{ label: string; helper: string; state: States; size: Sizes; placeholder: string; disabled: boolean }> = {
  args: { label: "CRN", helper: "Nine digits, no spaces.", state: "default", size: "md", placeholder: "Enter CRN", disabled: false },
  argTypes: {
    label: { control: "text", description: "Label above the field. Empty hides it." },
    helper: { control: "text", description: "Line below the field. Empty hides it." },
    state: { control: "inline-radio", options: ["default", "success", "error"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  render: ({ label, helper, state, size, placeholder, disabled }) => (
    <div className={column}>
      <Input label={label || undefined} helper={helper || undefined} state={state} size={size} placeholder={placeholder} disabled={disabled} />
    </div>
  ),
}

/** The three states of an input, with the same label and helper. */
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-(--spacing-stack-lg)">
      {(["default", "success", "error"] as const).map((s) => (
        <div key={s} className={column}>
          <Input label="CRN" helper={helperFor(s)} state={s} placeholder="Enter CRN" defaultValue={s === "default" ? "" : "56792323"} />
        </div>
      ))}
    </div>
  ),
}

/** The three sizes. A form uses one size throughout; a field next to a button matches the button's height. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-(--spacing-stack-lg)">
      {(["sm", "md", "lg"] as const).map((s) => (
        <div key={s} className={column}>
          <Input label={`Size ${s}`} size={s} placeholder="Enter CRN" />
        </div>
      ))}
    </div>
  ),
}

/** Textarea: the same label, helper and states; it grows with its text. */
export const TextareaField: Story = {
  render: () => (
    <div className={column}>
      <Textarea label="Remarks" helper="Visible to the team." placeholder="Write a note" />
      <Textarea label="Remarks" helper="Add a note first." state="error" placeholder="Write a note" />
    </div>
  ),
}

/** Search: a pill field with a label and a helper (loading and error lines). */
export const SearchField: Story = {
  render: () => (
    <div className={column}>
      <Search placeholder="Search name, CRN or a filter" />
      <Search placeholder="Search name, CRN or a filter" helper="Search unavailable. Try again." state="error" />
    </div>
  ),
}

/** Dropdown: a field that opens a list (the select and combobox variants live here too). */
export const DropdownField: Story = {
  render: () => {
    const options = [
      { value: "current", label: "Current" },
      { value: "savings", label: "Savings" },
      { value: "term", label: "Term deposit" },
    ]
    const [value, setValue] = React.useState<string[]>([])
    return (
      <div className={column}>
        <Dropdown label="Account type" helper="Pick one." placeholder="Select an option" options={options} value={value} onValueChange={setValue} />
        <Dropdown label="Account type" helper="Pick one." state="error" placeholder="Select an option" options={options} value={[]} onValueChange={() => {}} />
      </div>
    )
  },
}

/** Date picker: a field with a calendar; the same label, helper and states. */
export const DateField: Story = {
  render: () => (
    <div className={column}>
      <DatePicker label="Follow-up date" helper="Next working day by default." placeholder="Select date" />
      <DatePicker label="Follow-up date" helper="Pick a date in the future." state="error" placeholder="Select date" />
    </div>
  ),
}

/** A whole form in order: the controls in one column with one size and a primary action last. */
export const WholeForm: Story = {
  render: () => (
    <div className={column}>
      <Input label="Customer name" placeholder="Enter the name" />
      <Input label="CRN" helper="Nine digits, no spaces." placeholder="Enter CRN" />
      <DatePicker label="Follow-up date" placeholder="Select date" />
      <Textarea label="Remarks" placeholder="Write a note" />
    </div>
  ),
}

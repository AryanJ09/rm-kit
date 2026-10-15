import { useState, type ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Dropdown,
  DropdownPanel,
  FieldShell,
  dropdownPanelClassName,
  fieldTriggerVariants,
  type DropdownOption,
} from "@/rm-style/ui/dropdown"
import { cn } from "cn"
import { ChevronUpIcon } from "lucide-react"

const meta = {
  title: "RM Kit/Dropdown",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const options: DropdownOption[] = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "product", label: "Product" },
  { value: "marketing", label: "Marketing" },
  { value: "legal", label: "Legal", disabled: true },
]

const cell = "flex w-(--ds-size-288) flex-col gap-(--ds-spacing-16)"

function Cell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={cell}>
      <span className="text-sm text-field-helper">{title}</span>
      {children}
    </div>
  )
}

// Static stand-in for the Open state: the trigger in its open look, with the
// options panel rendered in place so it shows without a click.
function StaticOpen() {
  return (
    <FieldShell label="Department" helper="Choose one team">
      <div
        className={cn(fieldTriggerVariants({ open: true }), "cursor-pointer")}
      >
        <span className="min-w-0 flex-1 truncate text-field-label">
          Engineering
        </span>
        <ChevronUpIcon
          aria-hidden
          className="size-(--field-icon-size) shrink-0 text-field-helper"
        />
      </div>
      <div className={dropdownPanelClassName}>
        <DropdownPanel
          options={options}
          selected={["engineering"]}
          onSelect={() => {}}
        />
      </div>
    </FieldShell>
  )
}

export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-(--ds-spacing-32)">
      <Cell title="Default">
        <Dropdown
          label="Department"
          helper="Choose one team"
          options={options}
        />
      </Cell>
      <Cell title="Filled">
        <Dropdown
          label="Department"
          helper="Choose one team"
          options={options}
          defaultValue={["design"]}
        />
      </Cell>
      <Cell title="Open">
        <StaticOpen />
      </Cell>
      <Cell title="Error">
        <Dropdown
          label="Department"
          helper="Select a department to continue"
          state="error"
          options={options}
        />
      </Cell>
      <Cell title="Disabled">
        <Dropdown
          label="Department"
          helper="Locked by your admin"
          options={options}
          disabled
        />
      </Cell>
    </div>
  ),
}

export const Single: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return (
      <Dropdown
        label="Department"
        helper="Choose one team"
        options={options}
        value={value}
        onValueChange={setValue}
      />
    )
  },
}

export const Multi: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["design", "product"])
    return (
      <Dropdown
        mode="multiple"
        label="Teams"
        helper="Choose one or more teams"
        options={options}
        value={value}
        onValueChange={setValue}
      />
    )
  },
}

export const Searchable: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return (
      <Dropdown
        searchable
        label="Department"
        helper="Type to filter the list"
        placeholder="Search departments"
        options={options}
        value={value}
        onValueChange={setValue}
      />
    )
  },
}

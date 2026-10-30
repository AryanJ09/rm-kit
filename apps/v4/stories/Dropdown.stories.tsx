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

const cell = "flex w-(--size-288) flex-col gap-(--spacing-inline-lg)"

function Cell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={cell}>
      <span className="text-(length:--font-size-sm) text-field-helper">{title}</span>
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
        <span className="min-w-0 flex-1 truncate text-(color:--field-label)">
          Engineering
        </span>
        <ChevronUpIcon
          aria-hidden
          className="size-(--size-icon-sm) shrink-0 text-field-helper"
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
    <div className="grid grid-cols-2 gap-(--spacing-section-md)">
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

// ---- Variants: default, select, combobox -------------------------------------------------------------------------

const team: DropdownOption[] = [
  { value: "design", label: "Design", group: "Product" },
  { value: "engineering", label: "Engineering", group: "Product" },
  { value: "product", label: "Product management", group: "Product" },
  { value: "marketing", label: "Marketing", group: "Business" },
  { value: "sales", label: "Sales", group: "Business" },
  { value: "legal", label: "Legal", group: "Business", disabled: true },
]

type PlaygroundArgs = {
  variant: "default" | "select" | "combobox"
  mode: "single" | "multiple"
  searchable: boolean
  state: "default" | "success" | "error"
  size: "sm" | "md" | "lg"
  disabled: boolean
}

// One field, every control. variant switches how it is chosen; mode and searchable apply where the variant allows them.
export const Playground: StoryObj<PlaygroundArgs> = {
  args: { variant: "default", mode: "single", searchable: false, state: "default", size: "md", disabled: false },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "select", "combobox"], description: "default: button + list. select: button + list for one value, grouped. combobox: type to filter, chips for several." },
    mode: { control: "inline-radio", options: ["single", "multiple"], description: "Not used by select (always one value)." },
    searchable: { control: "boolean", description: "default only: the field turns into the search when pressed. A combobox always searches." },
    state: { control: "inline-radio", options: ["default", "success", "error"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  render: ({ variant, mode, searchable, state, size, disabled }) => (
    <div className="w-(--size-288)">
      <Dropdown
        key={`${variant}-${mode}-${searchable}`}
        variant={variant}
        label="Team"
        helper="Who owns this client"
        placeholder="Choose a team"
        options={team}
        mode={mode}
        searchable={searchable}
        state={state}
        size={size}
        disabled={disabled}
      />
    </div>
  ),
}

export const Select: Story = {
  render: () => (
    <div className="w-(--size-288)">
      <Dropdown variant="select" label="Team" placeholder="Choose a team" options={team} />
    </div>
  ),
}

export const Combobox: Story = {
  render: () => (
    <div className="w-(--size-288)">
      <Dropdown variant="combobox" label="Team" placeholder="Search a team" options={team} />
    </div>
  ),
}

export const ComboboxMultiple: Story = {
  render: () => (
    <div className="w-(--size-288)">
      <Dropdown variant="combobox" mode="multiple" label="Teams" placeholder="Search teams" options={team} defaultValue={["design"]} />
    </div>
  ),
}

// The three side by side, same options, so the difference is in how you choose.
export const Compare: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid grid-cols-3 items-start gap-(--spacing-section-sm)">
      <Cell title="Dropdown: press the field, pick from a fixed list. One or several; can search.">
        <Dropdown label="Team" placeholder="Choose a team" options={team} mode="multiple" searchable />
      </Cell>
      <Cell title="Select: press the field, pick one value. Groups, no search, no several.">
        <Dropdown variant="select" label="Team" placeholder="Choose a team" options={team} />
      </Cell>
      <Cell title="Combobox: type in the field to filter, then choose. Several become chips.">
        <Dropdown variant="combobox" mode="multiple" label="Teams" placeholder="Search teams" options={team} defaultValue={["design"]} />
      </Cell>
    </div>
  ),
}

import { useState, type ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Search } from "@/rm-style/ui/search"

const meta = {
  title: "Components/Search",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// Static stand-in for the :focus-within look so every state shows at once.
const focusedClass =
  "border-field-focus ring-(length:--field-focus-ring-width) ring-primary-focus-ring"

function Cell({
  label,
  helper,
  helperClassName,
  children,
}: {
  label: string
  helper?: string
  helperClassName?: string
  children: ReactNode
}) {
  return (
    <div className="flex w-(--ds-size-288) flex-col gap-(--field-label-gap)">
      <span className="text-sm text-field-label">{label}</span>
      {children}
      {helper ? (
        <span
          className={`text-sm text-field-helper ${helperClassName ?? ""}`}
        >
          {helper}
        </span>
      ) : null}
    </div>
  )
}

function FilledSearch() {
  const [value, setValue] = useState("design systems")
  return (
    <Search
      value={value}
      onValueChange={setValue}
      onClear={() => setValue("")}
    />
  )
}

export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-(--ds-spacing-24)">
      <Cell label="Default">
        <Search />
      </Cell>
      <Cell label="Focused">
        <Search className={focusedClass} />
      </Cell>
      <Cell label="Filled">
        <FilledSearch />
      </Cell>
      <Cell label="Loading">
        <Search value="design systems" loading onValueChange={() => {}} />
      </Cell>
      <Cell
        label="Error"
        helper="No results format"
        helperClassName="text-field-error"
      >
        <Search state="error" value="@@" onValueChange={() => {}} onClear={() => {}} />
      </Cell>
      <Cell label="Disabled">
        <Search disabled value="Disabled" onValueChange={() => {}} />
      </Cell>
    </div>
  ),
}

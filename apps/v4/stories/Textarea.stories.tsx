import type { ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "@/rm-style/ui/textarea"

const meta = {
  title: "Components/Textarea",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// Static stand-in for the :focus-visible look so every state shows at once.
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

const sizes = ["sm", "md", "lg"] as const

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-(--ds-spacing-32)">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-(--ds-spacing-16)">
          <span className="text-sm font-medium text-field-label">{size}</span>
          <div className="grid grid-cols-2 gap-(--ds-spacing-24)">
            <Cell label="Default">
              <Textarea size={size} placeholder="Write a note" />
            </Cell>
            <Cell label="Focused">
              <Textarea size={size} className={focusedClass} defaultValue="Focused" />
            </Cell>
            <Cell label="Filled">
              <Textarea
                size={size}
                defaultValue="Meeting moved to Thursday afternoon."
              />
            </Cell>
            <Cell
              label="Error"
              helper="Add at least 10 characters"
              helperClassName="text-field-error"
            >
              <Textarea size={size} state="error" defaultValue="Too short" />
            </Cell>
            <Cell
              label="Success"
              helper="Saved"
              helperClassName="text-field-success"
            >
              <Textarea size={size} state="success" defaultValue="All good." />
            </Cell>
            <Cell label="Disabled">
              <Textarea size={size} disabled defaultValue="Disabled" />
            </Cell>
            <Cell label="Read-only">
              <Textarea size={size} readOnly defaultValue="Read-only" />
            </Cell>
          </div>
        </div>
      ))}
    </div>
  ),
}

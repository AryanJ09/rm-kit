import type { ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Input } from "@/rm-style/ui/input"

const meta = {
  title: "RM Kit/Input",
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
              <Input size={size} placeholder="Placeholder" />
            </Cell>
            <Cell label="Focused">
              <Input size={size} className={focusedClass} defaultValue="Focused" />
            </Cell>
            <Cell label="Filled">
              <Input size={size} defaultValue="Jane Doe" />
            </Cell>
            <Cell
              label="Error"
              helper="Enter a valid email address"
              helperClassName="text-field-error"
            >
              <Input size={size} state="error" defaultValue="jane@" />
            </Cell>
            <Cell
              label="Success"
              helper="Looks good"
              helperClassName="text-field-success"
            >
              <Input size={size} state="success" defaultValue="jane@example.com" />
            </Cell>
            <Cell label="Disabled">
              <Input size={size} disabled defaultValue="Disabled" />
            </Cell>
            <Cell label="Read-only">
              <Input size={size} readOnly defaultValue="Read-only" />
            </Cell>
          </div>
        </div>
      ))}
    </div>
  ),
}

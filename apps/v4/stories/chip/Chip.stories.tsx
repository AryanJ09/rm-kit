// Hand-written from Figma "Chips". Not generated: edit this file directly.
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CalendarIcon, StarIcon, UserIcon } from "lucide-react"

import { Button } from "@/rm-style/ui/button"
import { Chip } from "@/rm-style/ui/chip"

const icons = {
  none: undefined,
  star: <StarIcon />,
  calendar: <CalendarIcon />,
  user: <UserIcon />,
}

type Args = {
  label: string
  icon: keyof typeof icons
  removable: boolean
  dropdown: boolean
  selectable: boolean
  defaultPressed: boolean
  disabled: boolean
  size: "default" | "sm" | "lg"
  variant: "default" | "outline"
}

const meta = {
  title: "RM Kit/Chip/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    label: "Re-KYC due",
    icon: "none",
    removable: false,
    dropdown: false,
    selectable: true,
    defaultPressed: false,
    disabled: false,
    size: "default",
    variant: "default",
  },
  argTypes: {
    label: { control: "text", description: "Chip text." },
    icon: { control: "select", options: Object.keys(icons), description: "Icon before the label." },
    removable: { control: "boolean", description: "Close icon after the label. Shows only while the chip is selected (an applied filter)." },
    dropdown: { control: "boolean", description: "Chevron after the label: the chip opens a menu. Turn off Selectable." },
    selectable: { control: "boolean", description: "On: toggles on and off (filter, tab). Off: plain button (dropdown, action)." },
    defaultPressed: { control: "boolean", description: "Starts selected." },
    disabled: { control: "boolean" },
    size: { control: "inline-radio", options: ["default", "sm", "lg"] },
    variant: { control: "inline-radio", options: ["default", "outline"] },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

// Every control in one chip. Use the Controls panel.
export const Playground: Story = {
  render: function Render({ label, icon, removable, dropdown, selectable, defaultPressed, disabled, size, variant }) {
    // The close icon removes the chip; "Bring back" puts it back so the controls can be tried again.
    const [removed, setRemoved] = React.useState(false)
    if (removed) {
      return <Button variant="ghost" onClick={() => setRemoved(false)}>Bring back</Button>
    }
    return (
      <Chip
        key={`${removable}-${selectable}-${defaultPressed}`}
        icon={icons[icon]}
        onRemove={removable ? () => setRemoved(true) : undefined}
        dropdown={dropdown}
        selectable={selectable}
        defaultPressed={defaultPressed}
        disabled={disabled}
        size={size}
        variant={variant}
      >
        {label}
      </Chip>
    )
  },
}

// Figma matrix: Removable False / True by Default, Selected, Hover, Disabled.
// Hover cannot be forced, so it is drawn with the hover colours.
export const States: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(4,max-content)] items-center gap-x-(--spacing-section-sm) gap-y-(--spacing-inline-lg)">
      <span />
      {["Default", "Selected", "Hover", "Disabled"].map((s) => (
        <span key={s} className="text-(length:--font-size-xs) font-(--typography-title-sm-font-weight) text-text-secondary">{s}</span>
      ))}
      <span className="text-(length:--font-size-xs) font-(--typography-title-sm-font-weight) text-text-secondary">Removable: False</span>
      <Chip>Re-KYC due</Chip>
      <Chip defaultPressed>Re-KYC due</Chip>
      <Chip className="border-primary bg-background text-primary">Re-KYC due</Chip>
      <Chip disabled>Re-KYC due</Chip>
      <span className="text-(length:--font-size-xs) font-(--typography-title-sm-font-weight) text-text-secondary">Removable: True</span>
      <Chip onRemove={() => {}}>Renewals and Maturities</Chip>
      <Chip defaultPressed onRemove={() => {}}>Renewals and Maturities</Chip>
      <Chip className="border-primary bg-background text-primary" onRemove={() => {}}>Renewals and Maturities</Chip>
      <Chip disabled onRemove={() => {}}>Renewals and Maturities</Chip>
    </div>
  ),
}

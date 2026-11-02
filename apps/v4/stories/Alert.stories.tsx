// Hand-written from Figma "Alerts". Not generated: edit this file directly.
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Alert, AlertAction, AlertClose, AlertDescription, AlertTitle, type AlertTone } from "@/rm-style/ui/alert"
import { Button } from "@/rm-style/ui/button"

type Args = {
  tone: AlertTone
  title: string
  description: string
  showIcon: boolean
  action: boolean
}

// Copy from the Figma component for each tone.
const copy: Record<AlertTone, { title: string; description: string }> = {
  info: { title: "Good to know", description: "AUM is refreshed daily." },
  success: { title: "Details saved", description: "The client record is up to date." },
  warning: { title: "Review required", description: "Re-KYC is due for this client." },
  error: { title: "Unable to load", description: "Check your connection and try again." },
}

const meta = {
  title: "RM Kit/Alert",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { tone: "info", ...copy.info, showIcon: true, action: false },
  argTypes: {
    tone: { control: "inline-radio", options: ["info", "success", "warning", "error"], description: "Colour and icon." },
    title: { control: "text" },
    description: { control: "text" },
    showIcon: { control: "boolean", description: "Off removes the icon." },
    action: { control: "boolean", description: "Adds a dismiss button at the end." },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

// Use the Controls panel to try tone, text, icon and the dismiss action. The close icon dismisses the alert;
// "Bring back" shows it again so the controls can be tried again.
export const Playground: Story = {
  render: function Render({ tone, title, description, showIcon, action }) {
    const [gone, setGone] = React.useState(false)
    if (gone) return <Button variant="ghost" onClick={() => setGone(false)}>Bring back</Button>
    return (
      <Alert variant={tone} icon={showIcon ? undefined : null} onDismiss={() => setGone(true)} className="w-(--size-layout-frame-width)">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        {action && (
          <AlertAction>
            <AlertClose />
          </AlertAction>
        )}
      </Alert>
    )
  },
}

// Figma "Alerts": the four tones with their own text.
export const Tones: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex w-(--size-layout-frame-width) max-w-(--size-share-full) flex-col gap-(--spacing-inline-md)">
      {(Object.keys(copy) as AlertTone[]).map((tone) => (
        <Alert key={tone} variant={tone}>
          <AlertTitle>{copy[tone].title}</AlertTitle>
          <AlertDescription>{copy[tone].description}</AlertDescription>
        </Alert>
      ))}
    </div>
  ),
}
